import '../model/connection.js'
import rs from 'randomstring';
import url from 'url';
import path from 'path';
import CategorySchemaModel from '../model/category.model.js';


export const save = async(req,res)=>{
    //logic for automatically update id
    const categoryList = await CategorySchemaModel.find();
    var l = categoryList.length;
    var _id = l==0?1:categoryList[l-1]._id+1;

    var caticon=req.files.caticon;
    var caticonnm = rs.generate()+"-"+Date.now()+"-"+caticon.name;
    var cDetails = {...req.body,"caticonnm":caticonnm,"_id":_id};

    try{
    await CategorySchemaModel.create(cDetails);
    var __dirname = url.fileURLToPath(new URL('.',import.meta.url));
    var uploadpath=path.join(__dirname,"../../UI/public/assets/uploads/caticons",caticonnm);
    caticon.mv(uploadpath);
    res.status(201).json({"status":true});
    }
    catch(error){
        res.status(500).json({"status":false});
    }
    
}

export const fetch = async(req,res)=>{
    var condition_obj = url.parse(req.url,true).query;
    
     var cList = await CategorySchemaModel.find(condition_obj);
     if(cList.length!=0){
        res.status(200).json(cList);
     }else{  
        res.status(500).json({"error":"Resource not Found"});
     }
}
/*
export const deleteCategory = async(req,res)=>{
    var condition_obj = JSON.parse(req.body.condition_obj);
    
     var category = await CategorySchemaModel.findOne(condition_obj);
     if(category){
        var categorys = await CategorySchemaModel.deleteOne(JSON.parse(req.body.condition_obj));

        if(categorys)
        res.status(200).json({"msg":"Category Detail deleted successfully"});
        else
        res.status(500).json({"msg":"error"});

     }else{
        res.status(404).json({"error":"Resource not Found"});
     }
}

export const update = async(req,res)=>{
   var condition_obj = JSON.parse(req.body.condition_obj);
   var category = await CategorySchemaModel.findOne(condition_obj);

    if(category){
       var categorys = await CategorySchemaModel.updateOne(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});

       if(categorys)
       res.status(200).json({"msg":"Category DDetail updated successfully"});
       else
       res.status(500).json({"msg":"error"});

    }else{
       res.status(404).json({"error":"Resource not Found"});
    }
}
*/