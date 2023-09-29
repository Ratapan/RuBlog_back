import {ROLES} from '../models/Role'
import User from '../models/User';

export const checkUserDuplicate = async (req, res, next)=>{
    const user = await User.findOne({userName: req.body.username})
    if (user) return res.status(400).json({message:"The user already exists"});
    const mail = await User.findOne({email: req.body.email})
    if (mail) return res.status(400).json({message:"The email already exists"});
    next();
}
export const checkRolesExisted = (req,res, next)=>{
    if(req.userRoles){
        for (let i = 0;i<req.userRoles.length;i++){
            if(!ROLES.includes(req.userRoles[i]))
            return res.status(400).json({message:"Role/s not found"});
        }
    }
    next();
}