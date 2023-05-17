import jwt from "jsonwebtoken";

export async function auth(event) {
    const [type, token] = event.authorizationToken.split(" ");
    const allow = type === "Bearer" && !!jwt.verify(token, process.env.JWT_SECRET);
    return {
        principalId: "user",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: allow ? "Allow" : "Deny",
                    Resource: event.methodArn,
                },
            ],
        },
    };
}