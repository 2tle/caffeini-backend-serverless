export default {
    createResponse: (status, body) => ({
        statusCode: status,
        body: JSON.stringify(body)
    }),
    onlyMsgResponse: (msg) => ({
        message: msg.toString()
    })
}