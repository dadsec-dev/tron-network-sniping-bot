const user = require("../model/user.model");
const { USER } = require("../config/config.constant");


class userServices {
    async saveUser(data) {
        try {
            const { id, wallet_address, encryptedPrivateKey } = data;

            const new_user = await user.create({
                userId: id,
                wallet_address: wallet_address,
                encryptedPrivateKey: encryptedPrivateKey
            });

            if (new_user) {
                return {
                    message: USER.WALLET_SAVED,
                    success: true,
                    data: new_user
                };
            } else {
                return {
                    message: USER.WALLET_NOT_SAVED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: USER.ERROR + error.message, 
                success: false,
            };
        }
    }


    async fetchWallet(id) {
        try {
            const getUser = await user.findOne({ userId: id });
            if (getUser) {
                return {
                    message: USER.WALLET_FETCHED,
                    success: true,
                    wallet_address: getUser.wallet_address,
r                };
            } else {
                return {
                    message: USER.WALLET_NOT_FETCHED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: USER.ERROR + error,
                success: false,
            };
        }
    }


    async fetch_Private_key(id) {
        try {
            const fetch_user = await user.findOne({ userId: id });
            if (fetch_user) {
                return {
                    message: USER.PRIVATE_KEY_FETCHED,
                    success: true,
                    encryptedPrivateKey: fetch_user.encryptedPrivateKey,
                };
            } else {
                return {
                    message: USER.PRIVATE_KEY_NOT_FETCHED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: USER.ERROR + error,
                success: false,
            };
        }
    }

    async UpdateUser(id, data) {
        try {
            const fetch_user = await user.findOneAndUpdate({ userId: id }, data );
            if (fetch_user) {
                return {
                    message: USER.USER_UPDATED,
                    success: true,
                };
            } else {
                return {
                    message: USER.USER_NOT_UPDATED,
                    success: false,
                };
            }
        } catch (error) {
            return {
                message: USER.ERROR + error,
                success: false,
            };
        }

    }

}
module.exports = new userServices()