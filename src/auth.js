import res from "./shared/response.js";
import db from "./shared/db.js";
import User from "./models/User.js";
import querystring from "querystring";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { getIdByToken} from "./shared/jwt.js"

// todo
// 카페인 모델 설계 -> Ok
// 오늘 마신 카페인 추가 -> OK
// 오늘 마신 카페인 정보 가져오기
// 기간 내 마신 카페인 정보 가져오기
// 적정 카페인 계산기
// 카페인 초과/미달 여부 알려주는 api

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

export function updateUserInfo(event, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop=false;
    const body = querystring.parse(event.body);
    console.log(body)
    const userId = getIdByToken(event.headers.authorization.split(" ")[1])
    db.connect().then(
        () => {
            let obj = {}
            if(body.height) obj['height'] = body.height;
            if(body.weight) obj['weight'] = body.weight;
            if(body.age) obj['age'] = body.age;

            return User.updateOne({_id: userId}, obj);
        }
    ).then( updated => {
        cb(null, res.createResponse(200))
    }).catch(e => cb(e))
}

