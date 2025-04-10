import '../model/connection.js';
import rs from 'randomstring';
import url from 'url';
import path from 'path';
import ProductSchemaModel from '../model/product.model.js';
import braintree from 'braintree';
import orderSchemaModel from '../model/orderModel.js';

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "8vvhzmxdhb74jx9x",
  publicKey: "458hfrcpjzjqqbrm",
  privateKey: "3b2a439e109569e45bfdf17b012ff0b0",
});

export const save = async(req,res) => {
  var pList = await ProductSchemaModel.find();
  var l = pList.length;
  var _id = l == 0 ? 1 : pList[l - 1]._id + 1;

  var picon = req.files.picon;
  var piconnm = rs.generate() + "-" + Date.now() + "-" + picon.name;
  var pDetails = { ...req.body, "piconnm": piconnm, "_id": _id,"info":Date()};

  try {
    await ProductSchemaModel.create(pDetails);
    var __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    var uploadpath = path.join(__dirname, "../../UI/public/assets/uploads/picons", piconnm);
    picon.mv(uploadpath);
    res.status(201).json({ "status": true });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ "status": false });
  }
}

export const fetch = async(req,res) => {
  var condition_obj=url.parse(req.url,true).query;    
    var pList=await ProductSchemaModel.find(condition_obj);
    if(pList.length!=0)
      res.status(200).json(pList);
    else
      res.status(404).json({"status":"Resource not found"});
}

//payment gateway api, token
export const braintreeToken = async(req,res)=>{
  try{
    gateway.clientToken.generate({},function(err,response){
      if(err){
        res.status(500).send(err);
      }else{
        res.send(response);
      }
    });
  }catch(error){
    console.log(error)
  }
}

//payment
export const braintreePayment = async(req,res)=>{
  try{
    const{cart,nonce,userId} = req.body;
    let total=0;
    cart.map((i)=>{
      total += (i.price*i.quantity);
    });
    let newTransaction = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true,
      },
    },
    function(error,result){
      if(result){
        const order = new orderSchemaModel({
          products:cart,
          payment:result,
          buyer:userId
        }).save()
        res.json({ok:true});
      }else{
        res.status(500).send(error)
      }
    }
   )
  }catch(error){
    console.log(error)
  }
};

