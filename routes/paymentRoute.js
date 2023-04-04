const express = require('express');
const {
  orderDetails,
  getOrders,
} = require('../controllers/cashonDeliveryPayment');
const { PaymentsController } = require('../controllers/paymentController');

const { verifyUser } = require('../middlewares/authMiddleware');
const generateToken = require('../middlewares/paymentMiddleware');

const router = express.Router();

router.post('/payments/stk', generateToken, PaymentsController);
router.post('/cashondelivery', verifyUser, orderDetails);
router.get('/getorders/:id', verifyUser, getOrders);
//localhost:5000/api/v1/payments/stk

module.exports = router;
