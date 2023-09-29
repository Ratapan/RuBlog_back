import mongoose from "mongoose";
import config from "./config";

mongoose.connect(config.URLDB)
.then(_ => console.log('DB is conected'))
.catch(err => console.log(err))