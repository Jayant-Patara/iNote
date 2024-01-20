// mongodb://localhost:27017/inotebook
const mongoose=require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI="mongodb+srv://jayantpatara:1234567890@cluster0.dkpymc7.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo= async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports= connectToMongo;