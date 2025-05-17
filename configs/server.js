'use strict';

import express from 'express'
import cors from 'cors';
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import limiter from '../src/middlewares/validate-cant-peticiones.js'
import subjectRoutes from '../src/subjects/subject.routes.js'
import publicationRoutes from '../src/publications/publication.routes.js'
import commentRoutes from '../src/comments/comment.routes.js'
import categoryRoutes from '../src/categories/category.routes.js'

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) =>{
    app.use('/rafaBlog/v1/subjects', subjectRoutes)
    app.use('/rafaBlog/v1/publications', publicationRoutes)
    app.use('/rafaBlog/v1/comments', commentRoutes)
    app.use('/rafaBlog/v1/categories', categoryRoutes)
}

const conectarDB = async () => {
    try{
        await dbConnection();
        console.log("Conexion a la base de datos exitosa");
    }catch(error){
        console.error('Error Conectando a la base de datos', error);
        process.exit(1);
    }
}

export const initServer = async () =>{
    const app = express();
    const port = process.env.PORT || 3333;

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port:  ${port}`)

    } catch (err) {
        console.log(`Server init fail : ${err}`)
    }
}