import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

declare type ErrFn = (err?: any, user?: IUser) => void;

interface IUser {
    username: string, password: string
}


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String}
});


const UserModel = mongoose.model('User', UserSchema);

class User {
    _id: string
    username: string
    password: string
    // 盐 用来加密密码
    salt: string
    model: any;

    static getByName(name, fn) {
        User.getUser(name, (err, user) => {
            if (err || !user)
                return fn(`username: ${name} does't  exits`)
            // https://stackoverflow.com/questions/34775687/express-jwt-setting-user-object-to-req-user-doc-instead-of-just-req-user
            fn(null, new User(user.toObject()))
        })
    }

    static getUser(obj, fn) {
        UserModel.findOne({obj}).exec(fn)
    }

    static getById(id, fn) {

        User.getUser(id, (err, user) => {
            if (err || !user)
                return fn(`id: ${name} does't  exits`)
            // https://stackoverflow.com/questions/34775687/express-jwt-setting-user-object-to-req-user-doc-instead-of-just-req-user
            fn(null, new User(user.toObject()))

        })
    }

    static authenticate(name, psw, fn) {
        User.getByName(name, function (err, user) {
            if (err) return fn(err)
            bcrypt.genSalt(12)
                .then(salt => {
                    return bcrypt.hash(psw, user.salt)
                }).then(slatPsw => {
                if (user.password === slatPsw) {
                    // 认证通过,返回
                    fn(null, user)
                } else {
                    fn("password does't match")
                }
            })

        })
    }

    constructor(obj: IUser) {
        Object.getOwnPropertyNames(obj).forEach(key => {
            this[key] = obj[key]
        })
    }

    save(fn: ErrFn) {
        const user = this;
        if (user._id) {
            user.update(fn)
        } else {
            user._hashPassword()
                .then((hashd: string) => {
                    user.password = hashd
                    user.model =
                        new UserModel({username: user.username, password: hashd, salt: user.salt})
                    user._id = user.model.id;
                    // save unreachable
                    user.model.markModified('object');
                    return user.model.save()

                })
                .then(doc => {
                    console.log(doc, '----');
                    fn()
                })
                .catch(err => {
                    fn(err)
                })
        }
    }


    update(fn: ErrFn) {
        const user = this;
        const {model, _id} = user
        model.findOneAndUpdate({id: _id}, {user}, function (err, doc) {
            if (err)
                return fn(err);
            else {
                fn()
            }
        })
    }

    _hashPassword() {
        const user = this;
        const {password} = user
        const saltRounds = 12
        return bcrypt.genSalt(saltRounds)
            .then((salt: string) => {
                user.salt = salt
                return bcrypt.hash(password, salt)
            }).then((hash: string) => {
                return hash;
            })
    }
}


export default User