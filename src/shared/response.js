exports.createResponse = (status, body) => ({
    statusCode: status,
    body: JSON.stringify(body)
});

exports.onlyMsgResponse = (msg) => ({
    message: msg.toString()
});