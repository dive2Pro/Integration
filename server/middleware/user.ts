import UserModel from '../models/userModel'

export default (req, res, next) => {

    if(!req.signedCookies){
        next()
        return
    }
    /**
     *
     */
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