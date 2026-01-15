import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const teacherSchema = mongoose.Schema({
    _id:Number,
   name:{
        type:String,
        require:[true,'name is required'],
        trim:true,
        lowercase:true
    },
    lastname:{
        type:String,
        require:[true,'name is required'],
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        require:[true,'email is required'],
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:[true,'password is required'],
        trim:true,
        minlength:5,
        maxlength:10
    },

   confirmpassword:{
        type:String,
        require:[true,'password is required'],
        trim:true,
        minlength:5,
        maxlength:10
    },

    mobile:{
        type:String,
        require:[true,'mobile is required'],
        trim:true,
        lowercase:true
    },
     message:{
        type:String,
        require:[true,'city is required'],
        trim:true,
        lowercase:true
    },
    role:String,
    status:Number,
    info:String
})

mongoose.plugin(mongooseUniqueValidator);

const teacherSchemaModel = mongoose.model('teacher_collection',teacherSchema);

export default teacherSchemaModel;
