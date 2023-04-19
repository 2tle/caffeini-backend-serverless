import mongoose from "mongoose";

let connection = null;

export default {
    connect: () => {
        if(connection && mongoose.connection.readyState === 1) return Promise.resolve(connection);
        return mongoose.connect(process.env.MONGODB_URL).then(
            conn => {
                connection = conn;
                return connection;
            }
        )
    }
}