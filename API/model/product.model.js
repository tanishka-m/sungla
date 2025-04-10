import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema = mongoose.Schema({
  _id: Number,
  title: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true
  },
  catnm: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true
  },
  subcatnm: {
    type: String,
    required: [true,"Sub Category name is required"],
    lowercase: true,
    trim: true
  },
  description:{
    type: String,
    required: [true,"Description name is required"],
    lowercase: true,
    trim: true
  },
  price:Number,
  piconnm: {
    type: String,
    required: [true,"Product icon name is required"],
    trim: true
  },
  info:String
});

// Apply the uniqueValidator plugin to UserSchema.
// ProductSchema.plugin(uniqueValidator);

// compile schema to model
const ProductSchemaModel = mongoose.model('product_collection',ProductSchema);

export default ProductSchemaModel