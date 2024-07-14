const app = require("./src/app");
const connectDB = require("./src/db");
require("dotenv").config()

connectDB().then(()=>{
  app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  });
}).catch((e)=>{
    console.log("DB Error: "+e);
})


