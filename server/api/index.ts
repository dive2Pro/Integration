import loginController from './loginController'
import {Express} from "express";

export default function(app:Express){
    loginController(app)
}