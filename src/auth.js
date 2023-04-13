import * as res from "./shared/response";

exports.createAccount = (event, ctx, cb) => {
    cb(null, res.createResponse(200, res.onlyMsgResponse("CreateAccount")));
}

exports.login = (event, ctx, cb) => {
    cb(null, res.createResponse(200, res.onlyMsgResponse("Login")));
}

