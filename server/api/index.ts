import loginController from './loginController'
import pollController from './pollController'
import {Express} from "express";
import * as bodyparser from "body-parser"

export default function(app:Express){
    app.use(bodyparser.urlencoded({extended: false}))
    app.use(bodyparser.json())
    loginController(app)
    pollController(app)
}