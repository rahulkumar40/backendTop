import express from 'express'
import {registerUser, login} from '../controller/user.controller.js';
import profile from '../controller/profile.controller.js';
const router = express.Router();

router.post('/registere', registerUser);
router.post('/login',login);
router.post('/profiles', profile);

export default router;