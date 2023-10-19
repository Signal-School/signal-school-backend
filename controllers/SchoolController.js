const Admin = require("../models/Admin");
const School = require("../models/School");


//create a SCHOOL
const createSchool = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        if (!req.admin.OrganizationId || req.admin.OrganizationId === null) {
            throw new Error('Create an organization first');
        }
        const name = req.body.name;
        const address = req.body.address;
        const contactNumber = req.body.contactNumber;
        const location = req.body.location;
        if (!name || !address || !contactNumber || !location) {
            throw new Error('All fields are required');
        }
        const school = await School.create({
            name: name,
            address: address,
            contactNumber: contactNumber,
            location: location,
            OrganizationId: req.admin.OrganizationId
        });
        await Admin.update({currentSchool: school.id}, {where: {id: req.admin.id}}); 
        return res.status(201).json({message: 'School created successfully', school});

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Retrieve list of all Schools
const getAllSchool = async (req, res) => {
    try {
        if (!req.admin && !req.teacher) {
            throw new Error('You are not authorized to access this route');
        }
        let schools;
        if (req.admin) {
            schools = await School.findAll({where: {OrganizationId: req.admin.OrganizationId}});
        }
        //get teacher school from teacherschool table

        return res.status(200).json({schools});
    }
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Retrieve a single School by ID
const getSchoolById = async (req, res) => {
    try {
        if (!req.admin || !req.teacher) {
            throw new Error('You are not authorized to access this route');
        }
        const id = req.params.id;
        const school = await School.findOne({where: {id: id}});
        if (!school) {
            throw new Error('School not found');
        }
        return res.status(200).json({school});
    }
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Update a School
const updateSchool = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const id = req.params.id;
        const school = await School.findOne({where: {id: id}});
        if (!school) {
            throw new Error('School not found');
        }
        const name = req.body.name;
        const address = req.body.address;
        const contactNumber = req.body.contactNumber;
        const location = req.body.location;
        if (!name || !address || !contactNumber || !location) {
            throw new Error('All fields are required');
        }
        await School.update({
            name: name,
            address: address,
            contactNumber: contactNumber,
            location: location
        }, {where: {id: id}});
        return res.status(200).json({message: 'School updated successfully'});
    }
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Delete a School
const deleteSchool = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const id = req.params.id;
        const school = await School.findOne({where: {id: id}});
        if (!school) {
            throw new Error('School not found');
        }
        await school.destroy();
        return res.status(200).json({message: 'School deleted successfully'});
    }
    catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = {
    createSchool,
    getAllSchool,
    getSchoolById,
    updateSchool,
    deleteSchool
}
