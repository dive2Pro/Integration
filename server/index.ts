import {Express} from 'express';
import * as mongoose from 'mongoose'
const db_url = `mongodb://localhost:27017/db`
import api from './api'
import userMiddleware from './middleware/user'

export default function(app: Express) {
  const db = mongoose.connection;
  (<any>mongoose).Promise = global.Promise;
  // console.log(db.model('User').model)
  db.on('error', function(err: Error) {
    console.error(`Mongoose connecting  throw error : ${err}`)
  });
  db.on('connecting', function() {
    console.log(db.config)
  })
  mongoose.connect(db_url);
  app.use(userMiddleware)
  api(app)
}
