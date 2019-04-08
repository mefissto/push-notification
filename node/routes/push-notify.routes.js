const express = require('express');
const pushRouter = express.Router();
const pushController = require('../controllers/push-notify.controller');

pushRouter.get('/', pushController.default);

pushRouter.get('/push/publickey/', pushController.getPublicKey);
pushRouter.post('/push/subscribe/', pushController.newSubscribtion);
pushRouter.post('/push/unsubscribe/', pushController.removeSubscribtion);

module.exports = pushRouter;
