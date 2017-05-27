import {Express, Router} from 'express';
import * as mongoose from 'mongoose'
import * as bodyparser from "body-parser"
import UserModel from '../models/userModel'

export default function(app: Express) {
  const db = mongoose.connection
  const router = Router()

  app.use(bodyparser.urlencoded({extended:false}))
  app.use(bodyparser.json())
  app.use('/api', router);

  router.post('/save', function(req, res) {
    console.log(req.body);
    if(req.body!=={}){
      res.send(req.body)
    const user = new UserModel({username: 'hyc', password: 'haha'})

    user.save(function(err) {
      if (err) {
      } else {
        res.send('asd')
      }
    })
    }else{
      res.send("nah")
    }
  })
  router.get('/', (req, res) => {UserModel.getByName('hyc', function(err) {
                    console.log(err)
                    res.send('')
                  })})
  db;
  router;
}
