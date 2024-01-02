const route=require('express').Router();
const {postSignUp,postLogin, customerSignUp,verifyForgotOTP, managerSignUp, verifyEmail,forgotPassword,resetPassword, verifyOTP} = require('../controllers/authentication.controller');
const {validationMiddleware,validate} = require('../middleware/signup.middleware');
const isUnverifiedUser=require('../middleware/authorization_unverified.middleware');
const { profilePictureUpload } = require('../middleware/storage.middleware');
const { googleAuthGetToken, googleAuthRefreshToken } = require('../controllers/google.controller');

route.post('/api/login',postLogin);
route.post('/api/auth/google',googleAuthGetToken);
route.post('/api/auth/google/refresh',googleAuthRefreshToken);
route.post('/api/signup', validationMiddleware,validate, postSignUp);
route.get('/api/verify',isUnverifiedUser,verifyEmail);
route.post('/api/verify/otp',isUnverifiedUser,verifyOTP);
route.post('/api/customer/signup',isUnverifiedUser,profilePictureUpload.single('profilePicture'),customerSignUp);
route.post('/api/manager/signup',isUnverifiedUser,profilePictureUpload.single('profilePicture'),managerSignUp);
route.patch('/api/reset/:email/:role',resetPassword);
route.get('/api/forgot/:email',forgotPassword);
route.post('/api/forgot/otp/:email',verifyForgotOTP);


module.exports=route;