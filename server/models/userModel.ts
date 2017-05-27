import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

declare type ErrFn = (err?: any) => void;

interface IUser {
  username: string, password: string
}


const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
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
    User.getId(name, (err, id) => {

      if (err) return fn(err);

    })
  }

  static getId(username, fn) {
    console.log(username);
    UserModel.findOne({username}).exec(fn)
  }

  constructor(obj: IUser){
      Object.getOwnPropertyNames(obj).forEach(key => {this[key] = obj[key]})}

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
            user.model.markModified('object');
            return user.model.save()

          })
          .then(doc => {
            console.log(doc, '----');
            fn()
          })
          .catch(err => {fn(err)})
    }
  }

  find() {}

  update(fn: ErrFn) {
    const user = this;
    const {model, _id} = user
    model.findOneAndUpdate({id: _id}, {user}, function(err, doc) {
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