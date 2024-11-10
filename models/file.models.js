const mongoose = require("mongoose");
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	tags: {
		type: String,
	},
	email: {
		type: String,
	},
});

// post middleware
fileSchema.post("save",async(doc) => {
	try {
		console.log('doc ', doc) /// here doc is the entry created in db

		let transporter = nodemailer.createTransport({
			host:process.env.MAIL_HOST,
			auth:{
				user:process.env.MAIL_USER,
				pass:process.env.MAIL_PASSWORD,
			}
		});

		//send mail
		let info = await transporter.sendMail({
			from:`Omkar` ,
			to: doc.email,
			subject: "New file uploaded on cloudinary",
			html:`<h2>File uploaded</h2> View here : <a href='${doc.imageUrl}'>Image</a>`,
		})
		console.log('info ', info) /// here doc is the entry created in db
		
	} catch (error) {
		console.log(error)
	}
})

module.exports = mongoose.model("File", fileSchema);
