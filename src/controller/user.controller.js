const userServices = require("../service/user.service")

const {
    saveUser,
    fetchWallet,
    fetch_Private_key,
    UpdateUser,
} = userServices


class userController {

    //    @route   POST /api/v1/user/saveUser
    //     @desc    Handles user account creation
    //     *  @access  Private
    async save_User(req, res) {
        try {

            const data = req.body
            const result = await saveUser(data)
            return res.status(200).send(
                result,
            )
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
                success: false
            })
        }
    }

    async fetch_wallet(req, res) {
        try {
            const data = req.body
            const result = await fetchWallet(data)
            return res.status(200).send(
                result,
            )
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
                success: false
            })
        }

    }

    async get_Private_key(req, res) {
        try {
            const data = req.body
            const result = await fetch_Private_key(data)
            return res.status(200).send(
                result,
            )
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
                success: false
            })
        }


    }

    async update_user(req, res) {
        try {
            const data = req.body
            const result = await update_user(data)
            return res.status(200).send(
                result,
            )
        } catch (error) {
            res.status(500).send({
                message: 'Internal Server Error ' + error,
                success: false
            })
        }




    }





}


module.exports = new userController()