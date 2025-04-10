import mongoose from "mongoose";

const url="mongodb://localhost:27017/project-storage";

mongoose.connect(url);

console.log("succesfully conntected to database");