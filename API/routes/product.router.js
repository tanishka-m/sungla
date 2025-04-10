import express from 'express';
const router = express.Router();

import * as ProductController from '../controller/product.controller.js'; 

router.post("/save",ProductController.save);

router.get("/fetch",ProductController.fetch);

//payment routes
//token
router.get("/braintree/token",ProductController.braintreeToken);

//payments
router.post("/braintree/payment",ProductController.braintreePayment);

export default router;