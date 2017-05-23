import * as express from 'express'
import * as path from "path";

const app = express()




app.use(express.static(path.join(__dirname, 'build')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api',(req,res,next)=>{
    res.send({
        title:'Hyc',
        age:'name'
    })
})

const port = process.env.PORT||2828
app.listen(port,'localhost',()=>{
    console.log('Listening port : ' + port)
})

