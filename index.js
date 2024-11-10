const express = require('express')
const app = express();
require('dotenv').config();


app.use(express.json());
// we need a middleware by which we can interact with the files or to upload files (multer / express-fileupload)
const fileupload = require('express-fileupload')
app.use(fileupload({
     useTempFiles:true,
     tempFileDir:'/tmp/',
}));

// db connect
require('./config/mongoose').connect()

// cloudinary connect
require('./config/cloudinary').cloudinaryConnect();

const routes = require('./routes/file.routes')
app.use('/api/v1',routes)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))