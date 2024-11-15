const express = require('express')
const router = express.Router()

const {imageUpload, videoUpload, imageReduceUpload, localFileUpload} = require('../controllers/file.controllers')

router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageReduceUpload',imageReduceUpload);
router.post('/localFileUpload',localFileUpload);

module.exports = router