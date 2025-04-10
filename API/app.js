import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();

//to link router to app.js
import userRouter from './routes/user.router.js';
import categoryRouter from './routes/category.router.js';
import subcategoryRouter from './routes/subcategory.router.js';
import productRouter from './routes/product.router.js';

//to configures cors to resolve cors origin problem
app.use(cors()); //accept request from react end 

//to read file express middlewaremiddleware
app.use(fileUpload()); 
 
//to extract a body content load body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//to load router level middleware
app.use("/user",userRouter);
app.use("/category",categoryRouter);
app.use("/subcategory",subcategoryRouter);
app.use("/product",productRouter);

app.listen(3002);
console.log("server invoked at link: http://locolhost:3002")