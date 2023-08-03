const { catchAsyncError } = require('../middleware/catchAsyncError');
const User = require('../models/user');
const { sendToken } = require('../utils/sendToken');

const kycform = catchAsyncError(async (req, res, next) => {
         
        const { firstName, lastName, address, city, country,file } = req.body;
         
         
        if (!firstName || !lastName || !address || !city || !country) {
                console.error('please fill the form');
                res.send('please fill the form')
        }
        try {  
                const user = await User.findById(req.user);
                const filter = {   _id: req.user._id   };
                const update = {
                        $set: {
                                firstName: firstName,
                                lastName: lastName,
                                Address: address,
                                city: city,
                                country: country,
                                kycSubmitted: true
                                
                        }
                };

                const options = { /* Additional options, if needed */ };

                  await User.updateMany(filter, update, options).then((result)=>{
                        console.log("DONE" )
                        res.status(201).json({
                                success: true,
                                message: "UPLOADED SUCCESSFULLY",
                                user
                        })
                        
                }).catch((error)=>{
                        console.log(error)
                })
               

        } catch (error) {
                console.log(error)
                res.status(500).json({
                        success: false,
                        message: "something went wronge"
                })
        }







})

module.exports = { kycform }