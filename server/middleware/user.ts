import UserModel from '../models/userModel'

export default (req, res, next) => {
    const id = req.signedCookies.id
    if (!id || req.user) {
        next()
    } else {
        UserModel.getById(id, (err, user) => {
            if (err) {
                next(err)
            } else {
                req.user = user;
                next()
            }
        })
    }
}