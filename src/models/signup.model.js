import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const signupSchema = mongoose.Schema({
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

      gender:{
        type:String,
        require:[true,'city is required'],
        trim:true,
        lowercase:true
    },

     grade:{
        type:String,
        require:[true,'grade is required'],
        trim:true,
    },
     maincourse:{
        type:String,
        require:[true,'grade is required'],
        trim:true,
    },

     subject:{
        type:String,
        require:[true,'grade is required'],
        trim:true,
    },

    ageGroup:{
        type:String,
        require:[true,'age is required'],
        trim:true,
        lowercase:true
    },

    nationality:{
        type:String,
        require:[true,'city is required'],
        trim:true,
        lowercase:true
    },


     experience:{
        type:String,
        require:[true,'city is required'],
        trim:true,
        lowercase:true
    },

    
     pettern:{
        type:String,
        require:[true,'pettern is required'],
        trim:true
    },

     price:{
        type:String,
        require:[true,'session is required'],
        trim:true
    },
 hour: {
        type: String,
        require: [true, 'session is required'],
        trim: true
    },
    // ye vala model he dashboard ke hisb se
     session:{
        type:String,
        require:[true,'session is required'],
        trim:true
    },

     courseprice:{
        type:String,
        require:[true,'courseprice is required'],
        trim:true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "completed"],
        default: "pending",
    },
   role: String,
   status:Number,
    info: String,
}, { timestamps: true });   // ✅ YAHAN HONA CHAHIYE


mongoose.plugin(mongooseUniqueValidator);

const signupSchemaModel = mongoose.model('signup_collection',signupSchema);

export default signupSchemaModel;
