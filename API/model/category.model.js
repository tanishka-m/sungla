import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = mongoose.Schema({
    _id:Number,
    catnm:{
        type:String,
        require:[true,"Category Name is required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    caticonnm:{
        type:String,
        require:[true,"icon name is required"],
        trim:true,
    }
});

//to apply unique validator
CategorySchema.plugin(uniqueValidator);
//schema validation
const CategorySchemaModel = mongoose.model('category_collection',CategorySchema);

export default CategorySchemaModel;