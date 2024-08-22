// @TODO: Implement database functions  

const mongoose = require('mongoose')
const { MESSAGES } = require('../config/config.constant');

async function database() {
    mongoose
        .set('strictQuery', true)
        .connect(process.env.DATABASE_URI)
        .then(() => {
            console.log(MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(MESSAGES.DATABASE.ERROR + err);
            throw err
        });
}
module.exports = database