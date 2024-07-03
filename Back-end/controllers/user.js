const User = require("../models/User");

async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function getuserbyID(req, res) {
    try {
        const userID = await User.findById(req.params.id);
        if (!userID) return res.status(404).json({ error: "User not found" });
        return res.json(userID);
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function patching(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        return res.json({ status: "Success", updatedUser });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function deleting(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        return res.json({ status: "Success", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

async function createNewUser(req, res) {
    try {
        const { firstName, lastName, email, gender, jobTitle } = req.body;
        if (!firstName || !lastName || !email || !gender || !jobTitle) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            gender,
            jobTitle,
        });

        const result = await newUser.save();
        return res.status(201).json({ msg: "Success", id: result._id });
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    handleGetAllUsers,
    getuserbyID,
    patching,
    deleting,
    createNewUser,
};
