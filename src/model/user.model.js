const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    userId: {
        type: String,
        unique: true,
    },

    wallet_address: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    encryptedPrivateKey: {
        type: String,
        required: true,
        trim: true,
    }
})

const user = mongoose.model('user', userSchema)
module.exports = user