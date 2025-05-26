
import fetch from 'node-fetch';//este es for ESM module newer
//const fetch = require('node-fetch')//CommonJS older
//const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));// solución for both compatibility
let API = 'http://localhost:8000';

export async function getdata() {
const res = await fetch(API);
const data = await res.json();
try {
 //console.log(data);
 return data;
} catch (e) {
 console.log('Some error');
 console.log(e);
 process.exit(0);
}
}
