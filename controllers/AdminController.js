const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//ADMIN Register 
const AdminRegister = async (req, res) => {
    try {
        //check if email already exists
        const emailExists = await Admin.findOne({ where: { email: req.body.email } });
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).json({ error: 'Please fill all the fields' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const admin = await Admin.create({
            name: req.body.name,
            email : req.body.email,
            password: hashedPassword,
        });
        //create jwt and send it to client
        const accessToken = jwt.sign({ email: admin.email, id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
        //send it to client
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Admin Login
const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ where: { email } });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const accessToken = jwt.sign({ email: admin.email, id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
            res.status(200).json({ accessToken });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Admin Retrieve (List of all admins)
const AdminRetrieve = async (req, res) => {
    try {
        const admins = await Admin.findAll();
        res.status(200).json({ admins });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Admin Retrieve (Single admin) (by ID)
const AdminRetrieveById = async (req, res) => {
    try {
        const admin = await Admin.findOne({ where: { id: req.params.id } });
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Admin Update
const AdminUpdate = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Update the admin's information
        if (req.body.name) {
            admin.name = req.body.name;
        }
        if (req.body.email) {
            admin.email = req.body.email;
        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            admin.password = hashedPassword;
        }

        await admin.save();

        res.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Admin Delete
const AdminDelete = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        await admin.destroy();

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    AdminRegister,
    AdminLogin,
    AdminRetrieve,
    AdminRetrieveById,
    AdminUpdate,
    AdminDelete
}


