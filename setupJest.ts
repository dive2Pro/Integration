/**
 * Created by hyc on 17-5-23.
 */
const g:any = global
import 'isomorphic-fetch'

g.fetch = require('jest-fetch-mock');
const ws = require('whatwg-fetch');

g.Response =ws.Response;
g.Headers = ws.Headers;
g.Request = ws.Request;