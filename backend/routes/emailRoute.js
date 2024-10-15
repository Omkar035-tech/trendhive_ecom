import express from 'express'
import fireMail from '../controllers/mailController.js';

const mailRoute = express.Router();

mailRoute.post('/firemail', fireMail);

export default mailRoute;