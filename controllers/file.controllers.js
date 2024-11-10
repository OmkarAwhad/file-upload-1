const File = require('../models/file.models')
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res) => {
     try {
          
          // fetch the file
          const file = req.files.file;    // for name,email we use req.body & for files we'll be using this
          console.log(`file `,file);

          let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
          console.log(`path ${path}`)

          // move file to the path
          file.mv(path, (err) => console.log(err))

          res.json({
               success:true,
               msg:"Local file upload successful"
          })

     } catch (error) {
          console.log(error)
          res.json({
               success:false,
               msg:"Error in Local file upload"
          })
     }
}

function isFileTypeSupported(file,supportedType){
     return supportedType.includes(file);
}

async function uploadToCloudinary(file,folder,quality){
     const options = {folder};
     options.resource_type = "auto";

     if (quality){
          options.quality = quality;
     }

     return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) => {
     try {
          //data fetch
          const {name,tags,email} = req.body;
          console.log(name,tags,email);
          
          const fetchedFile = req.files.imageFile;
          console.log("Fetched file ", fetchedFile);

          //validation
          const supportedType = ["jpg","jpeg","png"];
          const typeOfCurrFile = fetchedFile.name.split(".")[1].toLowerCase();
          console.log("typeOfCurrFile : ",typeOfCurrFile)

          //if not valid return response
          if(!isFileTypeSupported(typeOfCurrFile, supportedType)){
               return res.status(401).json({
                    success:false,
                    msg:"File type not supported",
               })
          }

          // if valid :
          //upload to cloudinary
          const response = await uploadToCloudinary(fetchedFile, "Codehelp-Omkar");
          console.log(response);

          //create DB entry
          const fileData = await File.create({
               name,tags,email,imageUrl:response.secure_url
          })

          //return response
          res.status(300).json({
               success:true,
               imageUrl:response.secure_url,
               msg:"Image successfully uploaded"
          })
     } catch (error) {
          console.log(error)
          return res.status(401).json({
               success:false,
               msg:"Something went wrong in image upload",
          })
     }
}

exports.videoUpload = async(req,res) => {
     try {
          //data fetch
          const {name,tags,email} = req.body;
          console.log(name,tags,email)

          const fetchedFile = req.files.videoFile;
          console.log(fetchedFile)

          //validation
          const supportedType = ["mp4","mov"];
          const typeOfCurrFile = fetchedFile.name.split(".")[1].toLowerCase();
          console.log(typeOfCurrFile);

          //not valid
          if(!isFileTypeSupported(typeOfCurrFile, supportedType)){
               return res.status(401).json({
                    success:false,
                    msg:"File type not supported",
               })
          }

          //valid
          //upload to cloudinary
          const response = await uploadToCloudinary(fetchedFile, "Codehelp-Omkar");
          console.log(response);

          //create DB entry
          const fileData = await File.create({
               name,tags,email,imageUrl:response.secure_url
          })

          //return response
          res.status(300).json({
               success:true,
               imageUrl:response.secure_url,
               msg:"Video successfully uploaded"
          })
     } catch (error) {
          console.log(error)
          return res.status(401).json({
               success:false,
               msg:"Something went wrong in video upload",
          })
     }
}

exports.imageReduceUpload = async(req,res) => {
     try {
          //data fetch
          const {name,tags,email} = req.body;
          console.log(name,tags,email);
          
          const fetchedFile = req.files.imageFile;
          console.log("Fetched file ", fetchedFile);

          //validation
          const supportedType = ["jpg","jpeg","png","webp"];
          const typeOfCurrFile = fetchedFile.name.split(".")[1].toLowerCase();
          console.log("typeOfCurrFile : ",typeOfCurrFile)

          //if not valid return response
          if(!isFileTypeSupported(typeOfCurrFile, supportedType)){
               return res.status(401).json({
                    success:false,
                    msg:"File type not supported",
               })
          }

          // if valid :
          //upload to cloudinary
          const response = await uploadToCloudinary(fetchedFile, "Codehelp-Omkar",30);
          console.log(response);

          //create DB entry
          const fileData = await File.create({
               name,tags,email,imageUrl:response.secure_url
          })

          //return response
          res.status(300).json({
               success:true,
               imageUrl:response.secure_url,
               msg:"Image successfully uploaded"
          })
     } catch (error) {
          console.log(error)
          return res.status(401).json({
               success:false,
               msg:"Something went wrong in image upload",
          })
     }
}
