const user = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { subject1 } = process.env;
const SECRET_KEY = process.env.SECRET_KEY;
const { USER } = require("../config/config.constant");
const PORT = process.env.PORT;

class userServices {
    //save
    // fetch wallet address
    // fetch private key
    // update wallet address and private key

    async saveUser(data) {
        try {
            //check if  the email exist
            const { Id, wallet_address, private_key } = data;
            const user = await user.create({
                userId: Id,
                wallet_address: wallet_address,
                private_key: private_key
            });

            let new_user = user.findOne({
                userId: user.userId
            })

            if (new_user) {
                return {
                    message: MESSAGES.WALLET_SAVED,
                    success: True,
                    data: new_user
                };
            } else {
                return {
                    message: MESSAGES.WALLET_NOT_SAVED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }

    async fetchWallet() {
        try {
            const user = await user.findOne({ userId: Id });
            if (user) {
                return {
                    message: MESSAGES.WALLET_FETCHED,
                    success: true,
                    wallet_address: user.wallet_address,
r                };
            } else {
                return {
                    message: MESSAGES.WALLET_NOT_FETCHED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }


    async fetch_Private_key(userId) {
        try {
            const user = await user.findOne({ userId: userId });
            if (user) {
                return {
                    message: MESSAGES.PRIVATE_KEY_FETCHED,
                    success: true,
                    private_key: user.private_key,
                };
            } else {
                return {
                    message: MESSAGES.PRIVATE_KEY_NOT_FETCHED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }
    }

    async UpdateUser(userId, data) {
        try {
            const user = await user.updateOne({ userId: userId }, data );
            if (user) {
                return {
                    message: MESSAGES.USER_UPDATED,
                    success: true,
                };
            } else {
                return {
                    message: MESSAGES.USER_NOT_UPDATED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: MESSAGES.USER.ERROR + error,
                success: false,
            };
        }

    }



}


module.exports = new userServices()