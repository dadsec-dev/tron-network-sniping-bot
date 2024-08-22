const user = require("../model/user.model");
const { USER } = require("../config/config.constant");

class userServices {
    //save
    // fetch wallet address
    // fetch private key
    // update wallet address and private key

    async saveUser(data) {
        try {
            const { id, wallet_address, encryptedPrivateKey } = data;

            const user = await user.create({
                userId: id,
                wallet_address: wallet_address,
                encryptedPrivateKey: encryptedPrivateKey
            });

            let new_user = user.findOne({
                userId: user.userId
            })

            if (new_user) {
                return {
                    message: USER.WALLET_SAVED,
                    success: True,
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
                message: USER.ERROR + error,
                success: false,
            };
        }
    }

    async fetchWallet(Id) {
        try {
            const user = await user.findOne({ userId: Id });
            if (user) {
                return {
                    message: USER.WALLET_FETCHED,
                    success: true,
                    wallet_address: user.wallet_address,
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


    async fetch_Private_key(userId) {
        try {
            const user = await user.findOne({ userId: userId });
            if (user) {
                return {
                    message: USER.PRIVATE_KEY_FETCHED,
                    success: true,
                    private_key: user.private_key,
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

    async UpdateUser(userId, data) {
        try {
            const user = await user.findOneAndUpdate({ userId: userId }, data );
            if (user) {
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