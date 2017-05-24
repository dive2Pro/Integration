import {Express} from "express";
import * as mongoose from 'mongoose'
const db_url = `mongo://localhost:27017/db`
import api from './api'


export default function(app:Express){
    mongoose.connect(db_url)
    const db = mongoose.connection;
    (<any>mongoose).Promise = global.Promise;

    db.on('error',function(err:Error){
        console.error(`Mongoose connecting  throw error : ${err}`)
    })
    api(app)
}

