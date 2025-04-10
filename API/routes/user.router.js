import express from 'express';

const router = express.Router();

//to link controller on routes
import * as userController from "../controller/user.controller.js"

router.post("/save",userController.save);
router.post("/login",userController.login);
router.get("/fetch",userController.fetch);
router.delete("/delete",userController.deleteUser);
router.patch("/update",userController.update);
//orders
router.get('/orders',userController.getOrders);
//all orders
router.get('/all-orders',userController.getAllOrders);

//order status update
router.put("/order-status/:orderId",userController.orderStatus);


export default router;