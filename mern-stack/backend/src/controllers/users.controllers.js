const userCtrl = {};

const User = require('../models/User');

userCtrl.getUser = async(req,res) => {

    const users = await User.find();

    res.json(users)
}

userCtrl.deleteUser = async(req,res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({message: 'User Deleted'})
}

userCtrl.createUser = async( req,res) => {
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save();
    res.json({message: 'User Updated'})

}
module.exports = userCtrl;