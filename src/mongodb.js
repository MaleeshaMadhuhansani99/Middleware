const mongoose=require("mongoose")


// mongoose.connect("mongodb://localhost:27017/Project")
// 
// .then(()=>{
    // console.log("mongodb connected");
// })
// .catch(()=>{
    // console.log("failed to connect");
// })
// 
// 
// 
mongoose.connect("mongodb://127.0.0.1:27017/Project", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDB connected");
    // Continue with your application logic here
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });


const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("logincollection",LogInSchema)

module.exports=collection