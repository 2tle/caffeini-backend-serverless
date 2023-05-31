export default {
    constant: {
        UNF: "User Not Found",
        LGS: "Successfully Login",
        RGS: "Successfully Create"
    },
    createResponse: (status, body) => ({
        statusCode: status,
        body: JSON.stringify(body)
    }),
    onlyMsgResponse: (msg) => ({
        message: msg.toString()
    }),
    tokenResponse: (token) => ({
        token: token.toString()
    }),
    listResponse: (list) => ({
        datas: list
    }),
    amountResponse: (amount) => ({
        amount: amount
    })
}