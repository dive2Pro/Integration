import {Express, Request, Router} from 'express';
import {AppRequest} from "./loginController";

export default function (app){
    const router =  Router()
    app.use('/api/poll',router);

    router.get('/all',(req:AppRequest,res)=>{
        const userId = req.session.userId
        console.log(req.session,req.cookies,req.signedCookies)
        res.send(userId)
    })
}
