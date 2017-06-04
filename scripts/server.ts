import * as express from 'express'
import * as http from 'http'
import * as path from 'path';
import serverFig from '../server'
import domainCatchError from '../server/middleware/domainCatchError'
const domainCatcher = domainCatchError();
const app = express();

app.use(domainCatcher.middleWare);
app.use(express.static(path.join(__dirname, 'build')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/', function(req, res) {
  console.log(req)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let server = {};
serverFig(app, server);

const port = process.env.PORT || 2828
function startServer() {
  server = http.createServer(app).listen(port, function() {
    domainCatcher.setServer(server);
  })
}

if (require.main === module) {
  startServer()
} else {
  module.exports = startServer
}
