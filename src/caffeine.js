import res from "./shared/response.js";
import db from "./shared/db/js";
import User from "./models/User.js";
import Caffeine from "./models/Caffeine.js";
import querystring from "querystring";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getIdByToken } from "./shared/jwt.js";
import moment from "moment-timezone";
import user from "./models/User.js";

export function addCaffeineDrink(event, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const body = querystring.parse(event.body);
    const tz = moment().tz("Asia/Seoul");
    const userId = getIdByToken(event.headers.authorization.split(" ")[1])
    db.connect().then(
        () => {
            const caffeineDrink = new Caffeine({
                uid: userId,
                date: tz.format("YYYY-MM-DD"),
                name: body.name,
                caffeine: Number(body.caffeine)
            });
            return caffeineDrink.save()
        }
    ).then(created => {
        cb(null, res.createResponse(200))
    }).catch(e => cb(e))
}

export function getTodayCaffeines(event, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    //const body=querystring.parse(event.body);
    const tz = moment.tz("Asia/Seoul");
    const userId = getIdByToken(event.headers.authorization.split(" ")[1])
    db.connect().then(
        () => {
            return Caffeine.find({uid: userId, date: tz.format("YYYYMMDD")},{_id:0,__v:0});
        }
    ).then(
        caffeines => {
            cb(null, res.createResponse(200, res.listResponse(caffeines)));
        }
    )
}

export function getCaffeinesByPeriod(event, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const start = event.queryStringParameters.start.toString();
    const end = event.queryStringParameters.end.toString();
    const userId = getIdByToken(event.headers.authorization.split(" ")[1])
    db.connect().then(
        () => {
            return Caffeine.find({date: {$gte: start, $lte: end}, uid: userId},{_id:0, __v:0}).sort({"date":1});
        }
    ).then(
        caffeines => {
            cb(null, res.createResponse(200, res.listResponse(caffeines)));
        }
    )
}

export function calcRecommendAmount(event, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const userId = getIdByToken(event.headers.authorization.split(" ")[1])
    db.connect().then(
        () => {
            return User.findOne({_id: userId});
        }

    ).then(
        user => {
            let amount = (user.age < 20) ? 400 : user.weight * 2.5;
            return cb(null, res.createResponse(200, res.amountResponse(amount)));
        }
    )
}
