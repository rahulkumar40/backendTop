import express from 'express'
import {registerUser, login} from '../controller/user.controller.js';
const router = express.Router();

router.post('/registere', registerUser);
router.post('/login',login);

export default router;