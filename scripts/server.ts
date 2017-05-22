import * as express from 'express'

const app = express()


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/',(req,res,next)=>{
    res.send({
        title:'Hyc',
        age:'name'
    })
})
const port = process.env.PORT||2828
app.listen(port,'localhost',()=>{
    console.log('Listening port : ' + port)
})

