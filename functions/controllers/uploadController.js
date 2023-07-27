const User = require("../models/user");
 
const { getDataUri } = require("../utils/dataURI")
const singleUpload = require('../middleware/Fileupload.js')
 
const cloudinary = require("cloudinary");
 

const uploadFile = async (req, res) => {
        singleUpload(req, res, async (err) => {


                if (err) {
                        console.error('Error uploading file:', err);
                        return res.status(500).send('Error uploading file');
                }
                try {
                      
                        const file = req.file;
                        const fileUri = getDataUri(file);
                        
                        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
                         

                        const userIdToUpdate = req.user; 
                         

                        User.findByIdAndUpdate(userIdToUpdate._id,
                                {
                                document: {
                                        mycloud,
                                        public_id: mycloud.public_id,
                                        url: mycloud.secure_url,
                                        }
                                        
                                })
                                .then(user => {
                                        console.log('Updated user:', user);
                                })
                                .catch(error => {
                                        console.error('Error updating user:', error);
                                });

                        console.log("FILE UPLOADED")
                        res.status(200).send("FILE UPLOADED SUCCESSFULLY"+ userIdToUpdate.document.url)

                } catch (error) {
                        console.log(error)
                        res.status(500).send('Error processing file');
                }
        });

}
//app.get('/fetchFile',downloadFile)
const downloadFile = async (req, res) => {
        // const fileName = req.query.fileName; // The file name to fetch, provided as a query parameter

        //         console.log("DOWNLOAD")
        // try {   const filename1 = req.body.filename;
        //         console.log("FILENAME IN DOWNLOAD: ",filename1)
        //         const client = new ftp.Client();
        //         await client.access({
        //                 host: process.env.BLUEHOST_HOST,
        //                 user: process.env.BLUEHOST_USERNAME,
        //                 password: process.env.BLUEHOST_PASSWORD,
        //                 secure: false
        //         })
        //         // console.log(`ftp://${process.env.BLUEHOST_USERNAME}:${process.env.BLUEHOST_PASSWORD}@${process.env.BLUEHOST_HOST}/var/uploads/trial.jpg`)

        //         // Download the file
        //         //const username = window.sessionStorage.username;
        //         //const remotePath = await client.cd('/var/uploads/'+filename);


        //         //const startIndex = remotePath.message.indexOf('Current directory is ');
        //        // const endIndex = remotePath.message.length;
        //        // const directoryPath = remotePath.message.substring(startIndex + 'Current directory is '.length, endIndex);
        //         //console.log("directoryPath", directoryPath)

        //         //await client.downloadTo(res, directoryPath + '/' + fileName);
        //        // const stream = await client.downloadToStream('/var/uploads' + '/' + "trial.jpg" /*"fileName"*/);
        //         // res.set('Content-Disposition', `attachment; filename="trial.jpg"`);
        //         // stream.pipe(res);
        //          console.log(`ftp://${process.env.BLUEHOST_USERNAME}:${process.env.BLUEHOST_PASSWORD}@${process.env.BLUEHOST_HOST}/var/uploads/trial.jpg`)
        //         // session.stream = stream;

        //         client.close();
        //         console.log("FILE DOWNLOADED SUCCESSFULLY")
        // } catch (error) {
        //         console.error('Error fetching file:', error);
        //         res.status(500).send('Error fetching the file.');
        // }


}
const saveFileURLToDb = async (res, req) => {
        //         try {
        //                 if (!req.file) {
        //                   return res.status(400).json({ error: 'No document uploaded.' });
        //                 }

        //                 // Perform OCR (Optical Character Recognition) on the uploaded document
        //                 const { data: { text } } = await Tesseract.recognize(req.file.buffer);


        //                 // Here, you can implement your KYC verification logic using the extracted text from the document
        //                 // For demonstration purposes, we'll just return the extracted text as the result
        //                 res.status(200).json({ extractedText: text });
        //               } catch (error) {
        //                 console.error(error);
        //                 res.status(500).json({ error: 'Error verifying the document.' });
        //               }



        //        const stream =  session.stream
        //        console.log("STREAM IN SAVE URL",stream)
        //         const username = window.sessionStorage.username
        //         console.log('Username in saveFile: ',username)

        //         //stream.pipe(res);
        //        // console.log("STREAM",stream)




}

module.exports = { uploadFile, downloadFile, saveFileURLToDb }