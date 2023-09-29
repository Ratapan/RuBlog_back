import { Schema, model } from "mongoose";


const userSchema = new Schema({
    userName:{
        type: String,
        unique:true
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    checkup: {
        type: Boolean,
        required:true
    },
    role:[{
        ref:"Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps:true,
    versionKey:false
})


export default model('User',userSchema);