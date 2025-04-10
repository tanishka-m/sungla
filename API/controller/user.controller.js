import '../model/connection.js'
import UserSchemaModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import url from 'url';
import sendMail from './email.controller.js';
import orderSchemaModel from '../model/orderModel.js';

export const save = async (req, res) => {
   const userDetails = req.body;
   //logic for automatically update id
   const userList = await UserSchemaModel.find();
   var l = userList.length;
   var _id = l == 0 ? 1 : userList[l - 1]._id + 1;

   const userDetail = { ...userDetails, "_id": _id, "role": "user", "status": 0, "info": Date() };

   try {
      var users =await UserSchemaModel.create(userDetail);//return arr of user
      // console.log(users);
      sendMail(users.email,users.password);
      res.status(200).json({ "status": true });
   }
   catch (error) {
      res.status(500).json({ "status": false });
   }

}

export const login = async (req, res) => {

   var condition_obj = { ...req.body, "status": 1 };
   var users = await UserSchemaModel.find(condition_obj);

   if (users.length != 0) {
      const payload = { "subject": users[0].email };
      const key = rs.generate();
      const token = jwt.sign(payload, key);
      res.status(200).json({ "token": token, "userList": users[0] });
   }
   else {
      res.status(500).json({ "token": "error" });
   }

}

export const fetch = async (req, res) => {
   var urlObj = url.parse(req.url, true).query;
  // console.log(urlObj);

   var user = await UserSchemaModel.find(urlObj);
   if (user.length != 0) {
      res.status(200).json({ "status": true, "userList": user });
   } else {
      res.status(404).json({ "error": "Resource not Found" });
   }
}

export const deleteUser = async (req, res) => {
   //  var condition_obj = JSON.parse(req.body.condition_obj);

   var user = await UserSchemaModel.findOne(req.body);
   if (user) {
      //   var users = await UserSchemaModel.deleteOne(JSON.parse(req.body.condition_obj));
      var users = await UserSchemaModel.deleteOne(req.body);
      if (users)
         res.status(200).json({ "msg": "userDetail deleted successfully" });
      else
         res.status(500).json({ "msg": "error" });

   } else {
      res.status(404).json({ "error": "Resource not Found" });
   }
}

export const update = async (req, res) => {
   //  var condition_obj = JSON.parse(req.body.condition_obj);
   var user = await UserSchemaModel.findOne(req.body.condition_obj);

   if (user) {
      //   var users = await UserSchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});
      var users = await UserSchemaModel.updateOne(req.body.condition_obj, { $set: (req.body.content_obj) });

      if (users)
         res.status(200).json({ "msg": "userDetail updated successfully" });
      else
         res.status(500).json({ "msg": "error" });

   } else {
      res.status(404).json({ "error": "Resource not Found" });
   }
}

//orders
export const getOrders = async(req,res)=>{
   var urlObj = url.parse(req.url, true).query;
   try{
     const orders = await orderSchemaModel.find(urlObj);//buyer id
     res.json(orders);
   }catch(error){
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error while getting orders',
         error
      })
   }
}

//all orders
export const getAllOrders = async(req,res)=>{
   try{
     const orders = await orderSchemaModel.find().sort({createdAt:-1});//buyer id
     res.json(orders);
   }catch(error){
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error while getting orders',
         error
      })
   }
}

//order status update
export const orderStatus = async(req,res)=>{
   try{
     const {orderId} = req.params;
     const {status} = req.body;
     const orders = await orderSchemaModel.findByIdAndUpdate(
      orderId,
      {status},
      {new:true});
     res.json(orders);
   }catch(error){
      console.log(error);
      res.status(500).send({
         success:false,
         message:'Error while updating order',
         error
      })
   }
}