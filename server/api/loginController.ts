import {Express, Request, Router} from 'express';
import * as bodyparser from "body-parser"
import UserModel from '../models/userModel'
import * as  session from 'cookie-session'

declare interface AppRequest extends Request {
    user: UserModel | null
}


export default function (app: Express) {
    const router = Router()
    app.use(bodyparser.urlencoded({extended: false}))
    app.use(bodyparser.json())
    app.use('/api', router);
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    app.use(session({
            name: 'session',
            keys: ['userId'],
            cookie: {
                secure: true,
                httpOnly: true,
                domain: 'localhost',
                path: '/',
                expires: expiryDate
            }
        })
    );

    // middleware to catch the req.body ==null
    function validReqBody(req, res, next) {
        if (!!req.body===false) {
            res.status(503).send(JSON.stringify({err: "request body can't be null"}))
        } else {
            next()
        }
    }

    router.use(validReqBody);

    router.post('/register', function (req, res) {
            if (req.body) {
                const {username, password} = req.body
                UserModel.getByName(username, function (err) {
                    // 不存在
                    if (err) {
                        let user = new UserModel({username, password});
                        user.save(err2 => {
                            if (err2) {
                                res.status(503)
                                res.send({err: err2})
                            } else {
                                res.cookie("id", user._id);
                                res.send({
                                    username,
                                    id: user._id
                                })
                            }
                        })
                    } else {
                        res.status(503).send({err: `username: ${username} had registerd!`})
                    }

                })
            }
        }
    )

    router.post('/login', function (req, res) {

        const {username, password} = req.body
        UserModel.authenticate(username, password, function (err, user) {
            if (err) {
                res.status(503);
                res.send({
                    err
                })
            } else {
                res.cookie("id", user._id);
                res.send(user)
            }
        });


    })

    router.post('/logout', function (req: AppRequest, res) {
        const user = req.user
        if (user) {
            req.user = null
            req.clearCookie("id")
        }
        res.send({code: 200, msg: "login out success"})

    })

    router.get('/', (req, res) => {
        UserModel.getByName('hyc', function (err) {
            console.log(err)
            res.send('')
        })
    })

}
