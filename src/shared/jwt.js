import jwt from "jsonwebtoken";

export function getIdByToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}