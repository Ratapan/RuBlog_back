import pkg from "../package.json";
import express from "express";
import morgan from "morgan";
import {createRoles} from './libs/initialSetup'

import routesProduct from './routes/products.routes';
import routesUser from './routes/user.routes';
import routesAuth from './routes/auth.routes';

const app = express();

createRoles();

app.set('package_json',pkg)
app.use(express.json())
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.json({
        autor:   app.get('package_json').author,
        project:   app.get('package_json').name,
        desc:    app.get('package_json').description,
        version: app.get('package_json').version
    })
})

app.use('/product',routesProduct)
app.use('/user',routesUser)
app.use('/auth',routesAuth)

export default app;