import {Express} from 'express';
import * as mongoose from 'mongoose'
const db_url = `mongodb://localhost:27017/db`
import api from './api'
import userMiddleware from './middleware/user'

import * as expressSession from 'express-session'
import * as cookieParser from 'cookie-parser'
import{cookieSecret} from './credentials'
import * as morgan from 'morgan'
export default function(app: Express, server) {
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
  app.use(morgan())
  app.use(userMiddleware)
  app.use(cookieParser(cookieSecret))
  app.use(expressSession())
  app.use(function(req, res, next) {
    const cluster = require('cluster');
    if (cluster.isWorker) {
      console.log(`Worker ${cluster.worker.id} received request`)
    }
    next()
  })
  api(app)
  app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Internel error')
  })
}
