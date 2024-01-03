import initApp from "./app";
import https from 'https';
import http from 'http';
import fs from 'fs';

initApp().then((app) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('development', process.env.PORT);
    http.createServer(app).listen(process.env.PORT);
  }
  // TODO: add pem for production mode
  // const options = {
  //   key: fs.readFileSync('../client-key.pem'),
  //   cert: fs.readFileSync('../client-cert.pem')
  // };
  
  // https.createServer(options, app).listen(process.env.HTTPS_PORT);
  https.createServer(app).listen(process.env.HTTPS_PORT);
});
