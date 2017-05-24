import * as mongoose from 'mongoose'
import {Express} from "express";
import UserModel from '../models/userModel'

export default function(app:Express){
    const db = mongoose.connection
    const router  = app.route('api')
    db;
    router;
    console.log(UserModel+"----")

}
