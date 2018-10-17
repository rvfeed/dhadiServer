import * as express from 'express';
import { DhadiIndices } from './lib/dhadi';
import * as path  from 'path'
import {bodyParser} from 'body-parser'
    // Creates and configures an ExpressJS web server.
    class App {
      // ref to Express instance
      public express: express.Application;
      //Run configuration methods on the Express instance.
      constructor() {
        this.express = express();
        this.middleware();
        this.routes();
       // this.express.use(bodyParser.urlencoded({extended: true}));
      //  this.express.use(bodyParser.json());
      this.express.use(express.static('public'))
        this.express.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "hello, Content-Type, Origin, Accept, x-access-token, X-XSRF-TOKEN");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "text/html, application/json");
    next(); 
});
      }
      // Configure Express middleware.
      private middleware(): void {
      }

      // Configure API endpoints.
      private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
          res.sendFile( path.join(__dirname, '../public/index.html'));
        });
        router.get("/dhadiIndices", (req, res) =>{
          let dObj:DhadiIndices = new DhadiIndices();
          res.send({"dhadiIndices": dObj.dhadiIndices})
      })
        this.express.use('/', router);
      }
    }
    export default new App().express;