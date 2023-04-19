import res from "./shared/response.js";
import db from "./shared/db.js";
import User from "./models/User.js";
import querystring from "querystring";
import crypto from "crypto";

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
            cb(null, res.createResponse(200, res.onlyMsgResponse("Successfully Created")));
        }
    ).catch(e => cb(e) )
}
export function login(event,ctx,cb) {
    db.connect()
    cb(null, res.createResponse(200, res.onlyMsgResponse("Login")));
}