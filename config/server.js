'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import limiter from '../src/middlewares/validate-cant-peticiones.js';
import { dbConnection } from './mongo.js';
import { createAdmin } from '../src/auth/auth.controller.js';
import { createRoles } from '../src/role/role.controller.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/users/user.routes.js';
import todolistRoutes from "../src/to-do-List/to-do-list.routes.js";
import publicationRoutes from '../src/publications/publication.routes.js';
import categorySubjectRoutes from '../src/categorySubject/categorySubject.routes.js'
import commentRoutes from '../src/comments/comment.routes.js';
import eventRoutes from '../src/events/event.routes.js';
import successesRoutes from '../src/successes/successes.routes.js';
import pucharseWithPointsRoutes from '../src/pucharseWithPoints/pucharseWithPoints.routes.js';
import flashcardsRoutes from '../src/flashcards/flashcard.routes.js';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
};

const routes = (app) => {
    app.use('/TDAHSystem/v1/auth', authRoutes);
    app.use('/TDAHSystem/v1/users', userRoutes);
    app.use('/TDAHSystem/v1/toDoList', todolistRoutes);
    app.use('/TDAHSystem/v1/publications', publicationRoutes);
    app.use('/TDAHSystem/v1/comments', commentRoutes);
    app.use('/TDAHSystem/v1/categorySubject', categorySubjectRoutes);
    app.use('/TDAHSystem/v1/event', eventRoutes);
    app.use('/TDAHSystem/v1/successes', successesRoutes);
    app.use('/TDAHSystem/v1/pucharseWithPoints', pucharseWithPointsRoutes);
    app.use('/TDAHSystem/v1/flashcards', flashcardsRoutes);
};

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('✅ Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    try {
        middlewares(app);
        conectarDB(app);
        routes(app);
        app.listen(port);
        await createRoles();
        console.log(`🚀 Servidor corriendo en el puerto ${port}`);
        await createAdmin();
    } catch (err) {
        console.error('❌ Fallo al iniciar el servidor:', err);
    }
};
