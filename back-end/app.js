require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const encrypt = require('mongoose-encryption');

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(express.json())

app.use(cors());

mongoose.connect("mongodb://localhost:27017/mongo",{useNewUrlParser:true ,useCreateIndex:true ,useUnifiedTopology:true});

const typeSchema = {
    _id:String,
    workouts:Array,
    image:String,
}

const exerciseSchema = {
    _id:String,
    name:String,
    decription:String,
    link:String,
    duration:String,
    repeat:String
}

const tipSchema = {
    _id:String,
    image:String,
    tip:String
}

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    beginner:{
        "ARM-BEGINNER":Array,
        "CHEST-BEGINNER":Array,
        "ABS-BEGINNER":Array,
        "LEG-BEGIINER":Array,
        "SHOULDER-&-BACK-BEGINNER":Array
    },
    intermediate:{
        "ARM-INTERMEDIATE":Array,
        "CHEST-INTERMEDIATE":Array,
        "ABS-INTERMEDIATE":Array,
        "LEG-INTERMEDIATE":Array,
        "SHOULDER-&-BACK-INTERMEDIATE":Array
    },
    advanced:{
        "ARM-ADVANCED":Array,
        "CHEST-ADVANCED":Array,
        "ABS-ADVANCED":Array,
        "LEG-ADVANCED":Array,
        "SHOULDER-&-BACK-ADVANCED":Array
    }
    
});

const secret = process.env.SECRET;

console.log(secret);

userSchema.plugin(encrypt,{secret:secret , encryptedFields:['password']});

const Exercise = mongoose.model("exercises",exerciseSchema);

const Type = mongoose.model("types",typeSchema);

const Tip = mongoose.model("tips",tipSchema);

const User = mongoose.model("users",userSchema);

let userInfo = {
    email:String,
    password:String,
    beginner:{
        "ARM-BEGINNER":Array,
        "CHEST-BEGINNER":Array,
        "ABS-BEGINNER":Array,
        "LEG-BEGIINER":Array,
        "SHOULDER-&-BACK-BEGINNER":Array
    },
    intermediate:{
        "ARM-INTERMEDIATE":Array,
        "CHEST-INTERMEDIATE":Array,
        "ABS-INTERMEDIATE":Array,
        "LEG-INTERMEDIATE":Array,
        "SHOULDER-&-BACK-INTERMEDIATE":Array
    },
    advanced:{
        "ARM-ADVANCED":Array,
        "CHEST-ADVANCED":Array,
        "ABS-ADVANCED":Array,
        "LEG-ADVANCED":Array,
        "SHOULDER-&-BACK-ADVANCED":Array
    }
    
}

app.post('/update',function(req,res){
    const id = req.body.id;
    const type = req.body.type;
    const workout = req.body.workout;

    User.findById(id,function(err,data){
        if(err){
            res.send({
                message:"Something Went Wrong",
                success:false
            });
        }else{
            let newData = data;
            const date = new Date();
            newData[type][workout].push(date);
            User.updateOne({_id:id},newData,function(err,success){
                if(err){
                    res.send({
                        message:"Something Went Wrong",
                        success:false
                    });
                }else{
                    res.send({
                        message:"Updated Successfully",
                        success:true
                    });
                }
            })
        }
    })
})

app.post('/signup',function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    userInfo.email = email;
    userInfo.password = password;
    const newUser = new User(
        userInfo
    )

    User.findOne({email:email},function(err,data){
        if(data){
            res.send({
                authenticatedUser:false,
                message:"Account With This Email Already Exists",
            });
        }else{
            newUser.save((error,data) => {
                if(error){
                    res.send({
                        authenticatedUser:false,
                        message:"Failed To Create Account",
                        error:err
                    });
                }else{
                    res.send({
                        authenticatedUser:true,
                        message:"Successfully Created Account",
                        id:data._id
                    });
                }
            });
        }
    })
})

app.post('/signin',function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email},function(err,user){
        if(err){
            res.send({
                authenticatedUser:false,
                message:"Something Went Wrong !"
            });
        }else if(err===null && user===null){
            res.send({
                authenticatedUser:false,
                message:"Entered Email Not Found"
            })
        }
        else{
            if(user!==null && user.password===password){
                res.send({
                    authenticatedUser:true,
                    id:user._id
                });
            }else{
                res.send({
                    authenticatedUser:false,
                    message:"Incorrect Password"
                });
            }
        }
    })
})

app.get('/healthTips',function(req,res){
    Tip.find(function(err,data){
        if(data===null){
            res.send("FOUND NOTHING");
        }else{
            res.send(data);
        }
    })
})

app.get('/Workout/:main_type',function(req,res){
    Type.find({type:req.params.main_type},function(err,data){
        if(data===null){
            res.send("NO DATA FOUND");
        }else{
            res.send(data);
        }
    })
})

app.get('/Workout/:main_type/:workout_type',function(req,res){
    let arr = []
    Type.findById(req.params.workout_type,function(err1,workout_data){
        if(workout_data===null){
            res.send("NO WORKOUT FOUND")
        }else{
            var data = workout_data.workouts;
            for(i = 0;i<data.length;i++)
            {
                Exercise.findById(data[i],(err2,item) => {
                    if(err2)
                    {
                        res.status(400).send(err2);
                    }
                    else
                    {
                        arr = [...arr,item];
                        if(arr.length===data.length)
                        {
                            res.send(arr)
                        }
                    }
                })
            }
        }
    })
})

app.listen(4000,function(){
    console.log("SERVER STARTED AT PORT 4000");
})