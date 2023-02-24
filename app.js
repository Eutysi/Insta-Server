const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const path = require('path');
dotenv.config();
const port = 7000 || process.env.PORT;
const app = express();
const fileUpload = require('express-fileupload');
app.use(express.json());
app.use(cors());
app.use(fileUpload());
const user = require('./models/userSchema');
mongoose.set('strictQuery', false);

// cloudinary.config({ 
//     cloud_name: 'dabpsnddn', 
//     api_key: '498212296545681', 
//     api_secret: '_Ko7Pp5ekdl25kZY_u0glT3_cG0',
//   });
  

mongoose.connect(process.env.URL,{useNewUrlParser: true , useUnifiedTopology: true},
    ()=>{
    console.log('DB CONNECTED');
})
app.post('/form', async (req, res)=>{
    const {image} = req.files;
    const {name, location, description} = req.body;
    image.mv("./uploads/"+image.name);

    const userInfo = new user({
        name ,
        image: image.name,
        location,
        description
    })
    const response =  await userInfo.save()
    res.json({message : "data uploaded suscessfully"})


    });


app.get('/allData', async (req, res)=>{
    res.json({result : await user.find()});
})

app.get("/image/:filename", (req, res)=>{
    res.sendFile(path.join(__dirname, `/uploads/${req.params.filename}`))
})

app.listen(port, ()=>{console.log(`app is listening on ${port}`)});
