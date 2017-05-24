import * as bcrypt from 'bcrypt';
import {model, Schema} from 'mongoose';

declare type ErrFn = (err?: any) => void;

interface IUser {
    username: string, password: string
}


const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});


const UserModel = model('User', UserSchema);

class User {
    _id: string
    username: string
    password: string
    // 盐 用来加密密码
    salt: string
    model: any

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
                        new UserModel({username: user.username, password: hashd})
                    user._id = user.model.id;
                    // save unreachable
                    return user.model.save()

                }).then(doc => {
                console.log(doc, '----')
            }).catch(err => {
                    fn(err)
                })
        }
    }

    find() {
    }

    update(fn: ErrFn) {
        const user = this;
        const {model, _id} = user
        console.log(model.findById)
        model.findOneAndUpdate({id: _id}, {user}, function (err, doc) {
            if (err)
                return fn(err);
            else {
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
const tobi = new User({password: 'I am fine', username: 'hyc'})

tobi.save(function (err) {
    if (err) throw err
    console.log(`user id ${tobi._id}`)
})


export default User