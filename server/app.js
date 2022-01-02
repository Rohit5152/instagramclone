const express = require('express');
const app = express();
const mongoose=require('mongoose');
const cors =require('cors')
const PORT = process.env.PORT || 5000;
const {MONGOURI} =require('./config/keys')

// app.use(cors());
//password of user in mongo db
//lguRy2jPxuxZVBu0
//mongodb+srv://Rohit:<password>@cluster0.6hizc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const URL='mongodb+srv://Rohit:lguRy2jPxuxZVBu0@Cluster0.6hizc.mongodb.net/instagramclone?retryWrites=true&w=majority'
// mongoose.connect(URL);
//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
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb");
})
mongoose.connection.on('error',()=>{
    console.log("NOt connected to mongodb");
})
require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("server is running on ", PORT);
})
