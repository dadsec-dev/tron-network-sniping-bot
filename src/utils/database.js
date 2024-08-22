// @TODO: Implement database functions  

const mongoose = require('mongoose')
const { DATABASE } = require('../config/config.constant');

async function database() {
    mongoose
        .set('strictQuery', true)
        .connect(process.env.DATABASE_URI)
        .then(() => {
            console.log(DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(DATABASE.ERROR + err);
            throw err
        });
}
module.exports = database