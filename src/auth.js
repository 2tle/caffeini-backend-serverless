import res from "./shared/response.js";
import db from "./shared/db.js";
import User from "./models/User.js";
import querystring from "querystring";
import crypto from "crypto";
import jwt from "jsonwebtoken";



export function createAccount(event, ctx, cb)  {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const body = querystring.parse(event.body);
    db.connect().then(
        () => {
            const user = new User({
                username: body.username,
                email: body.email,
                password: crypto.createHash('sha512').update(body.password.toString()).digest('base64')
            });
            return user.save();
        }
    ).then(
        user => {
            cb(null, res.createResponse(200, res.onlyMsgResponse(res.constant.RGS)));
        }
    ).catch(e => cb(e) )
}
export function login(event,ctx,cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const body = querystring.parse(event.body);
    db.connect().then(
        () => {
            return User.findOne({email: body.email, password:crypto.createHash('sha512').update(body.password.toString()).digest('base64')})
        }
    ).then(
        user => {
            if(!user) cb(null, res.createResponse(400, res.onlyMsgResponse(res.constant.UNF)));
            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                username: user.username
            }, process.env.JWT_SECRET, {
                expiresIn: '12h',
                subject:'userinfo',
                issuer: 'Caffeini Backend Application'
            });
            cb(null, res.createResponse(200, res.tokenResponse(token)));
        }
    ).catch(e => cb(e))
}

export function test(event,ctx,cb) {
    cb(null, res.createResponse(200, res.onlyMsgResponse("dsaf")));
}