import * as bodyparser from 'body-parser'
import {Express} from 'express';

import loginController from './loginController'
import pollController from './pollController'

export default function(app: Express) {
  app.use(bodyparser.urlencoded({extended: false}))
  app.use(bodyparser.json())
  app.get(
      '/fail',
      (req, res) => {process.nextTick(() => {throw new Error('Nope!')})})
  loginController(app)
  pollController(app)
}