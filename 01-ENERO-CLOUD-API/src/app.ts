import express from "express";
import { Envs } from "./config/envs";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./presentation/router";

(()=>{
    main();
})();

function main(){

    const app = express();

    app.use( express.json() );

    app.use(bodyParser.json());
    app.use(express.json());

    app.use( AppRoutes.routes )

    app.listen( Envs.PORT, ()=>{
        console.log('App running on port '+ Envs.PORT)
    })

}