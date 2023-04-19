import res from "./shared/response.js";
import db from "./shared/db.js";


export function createAccount(event, ctx, cb)  {
    cb(null, res.createResponse(200, res.onlyMsgResponse("CreateAccount")));
}
export function login(event,ctx,cb) {
    db.connect()
    cb(null, res.createResponse(200, res.onlyMsgResponse("Login")));
}
// module.exports = {
//     createAccount: (event, ctx, cb) => {
//         cb(null, res.createResponse(200, res.onlyMsgResponse("CreateAccount")));
//     },
//     login: (event, ctx, cb) => {
//         db.connect()
//         cb(null, res.createResponse(200, res.onlyMsgResponse("Login")));
//     }
// }