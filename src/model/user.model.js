const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const rounds = +process.env.ROUNDS
const Schema = mongoose.Schema

const userSchema = new Schema({

    userId: {
        type: String,
        // default: uuid.v4,
        unique: true,
    },

    wallet_address: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },

    private_key: {
        type: String,
        required: true,
        trim: true,
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("private_key") || this.isNew("private_key")) {
        const salt = await bcrypt.genSalt(rounds);
        this.private_key = await bcrypt.hash(this.private_key, salt);
    }
    next();
});

userSchema.pre("save", async function (next) {
    if (this.isModified("wallet_address") || this.isNew("wallet_address")) {
        const salt = await bcrypt.genSalt(rounds);
        this.wallet_address = await bcrypt.hash(this.wallet_address, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.wallet_address) {
        const salt = await bcrypt.genSalt(rounds);
        update.wallet_address = await bcrypt.hash(update.wallet_address, salt);
    }
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    if (update.private_key) {
        const salt = await bcrypt.genSalt(rounds);
        update.private_key = await bcrypt.hash(update.private_key, salt);
    }
    next();
});


const user = mongoose.model('user', userSchema)
module.exports = user