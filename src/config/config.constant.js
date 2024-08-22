MESSAGES = {
    DATABASE: {
        CONNECTED: 'Database connected',
        ERROR: "An error occured while connecting to database ",
    },

    USER: {
        WALLET_SAVED: 'Wallet has been saved successfully',
        WALLET_NOT_SAVED: 'wallet address NOT  saved',
        PRIVATE_KEY_SAVED: 'private key saved successfully',
        PRIVATE_KEY_NOT_SAVED: 'private key NOT saved',
        WALLET_ADDRESS_$_PRIVATE_KEY_CHANGED: 'wallet address and private_key updated successfully',
        WALLET_ADDRESS_$_PRIVATE_KEY_NOT_CHANGED: 'wallet address and private_key NOT updated',
        ERROR: 'An error occured ',
        WALLET_NOT_FETCHED: "Unable to fetch such wallet",
        WALLET_FETCHED: "wallet successfully retreived",
        PRIVATE_KEY_FETCHED: "Private key successfully fetched",
        PRIVATE_KEY_NOT_FETCHED: "Unable to fetch private key",
    
    }
}
module.exports = {
    USER: MESSAGES.USER,
    DATABASE: MESSAGES.DATABASE
};