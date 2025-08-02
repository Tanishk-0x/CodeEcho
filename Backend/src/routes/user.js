const express = require('express') ; 
const router = express.Router() ; 
const { AddFavourite , getFavourites , getApiUsage } = require('../controllers/userController') ; 
const authMiddleware = require('../Middlewares/authMiddleware') ; 
const checkApiLimit = require('../Middlewares/checkApiLimit') ; 
const { AdminBoard } = require('../controllers/admin') ; 
const { usageHistory } = require('../controllers/userController') ; 
const { DeleteFavourite } = require('../controllers/userController') ; 
const { getFeatureUsageStats} = require('../controllers/admin') ; 

router.post('/addfavourite' , authMiddleware , AddFavourite) ; 
router.get('/getfavourites' , authMiddleware , getFavourites) ; 
router.get('/api-usage' , authMiddleware ,  checkApiLimit , getApiUsage) ; 

// -------- deleting favourite ---------
router.put('/deletefavourite' , authMiddleware , DeleteFavourite ) ; 

// --------- History ----------
router.get('/usagehistory' , authMiddleware , usageHistory) ; 

router.get('/admin' , AdminBoard) ; 
router.get('/usersusagestats' , getFeatureUsageStats ) ; 

module.exports = router ; 