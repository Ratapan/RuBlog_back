import { Schema, model } from "mongoose";

export const ROLES = ["reader","writer","admin"];

const roleSchema = new Schema({
    name:{
        type: String,
        unique:true
    }
},{
    timestamps:true,
    versionKey:false
})

export default model('Role',roleSchema);