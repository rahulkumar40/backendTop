import express from 'express'
import {registerUser, login,getSingleUser,getAllUser,logout , deleteSingleUser, changePassword, handleResetPassword, handleVarifyOtp, forgetPassword} from '../controller/user.controller.js';

import profile from '../controller/profile.controller.js';
import { auth,isUser ,isAdmin} from '../middlewares/auth.middlewares.js';
import { uplaod } from '../middlewares/multer.middlerware.js';
const router = express.Router();

router.post('/registere', registerUser);
router.post('/login',login);
router.get('/singleUser',auth,isUser,getSingleUser);             
router.get('/getAllUser',auth,isAdmin,getAllUser);             
router.post('/profiles',auth, uplaod.single('image'),  profile);
router.post('/logout',auth, logout)
router.delete('/deleteSingleUser',deleteSingleUser);

router.put('/changePassword',auth, changePassword);

router.post('/forgetPassword', forgetPassword);
router.post('/handleVarifyOtp', handleVarifyOtp);
router.post('/handleResetPassword', handleResetPassword);


export default router;