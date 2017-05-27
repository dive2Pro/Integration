import {Express, Router} from 'express';
import * as mongoose from 'mongoose'

import UserModel from '../models/userModel'

export default function(app: Express) {
  const db = mongoose.connection
  const router = Router()
  app.use('/api', router);
  router.get('/', function(req, res) {
    const user = new UserModel({username: 'hyc', password: 'haha'})
    user.save(function(err) {
      if (err) {
      } else {
        res.send('asd')
      }
    })
  })
  db;
  router;
}
