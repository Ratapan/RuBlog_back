import mongoose from "mongoose";

mongoose.connect('mongodb+srv://ru_blog_crud:4HiY9gIpFMROINzT@rublog.5eicvab.mongodb.net/?retryWrites=true&w=majority')
.then(db => console.log('DB is conected'))
.catch(err => console.log(err))