const Admin = require('../models/Admin');
const Organization = require('../models/Organization');


//Create Organization
const createOrganization = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const name = req.body.name;
        const headOffice = req.body.headOffice;
        const contactNumber = req.body.contactNumber;
        const organization = await Organization.create({
            name: name,
            headOffice: headOffice,
            contactNumber: contactNumber
        });
        await Admin.update({ OrganizationId: organization.id }, { where: { id: req.admin.id } });
        return res.status(201).json({ message: 'Organization created successfully', organization });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve list of all Organizations
const retrieveAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        return res.status(200).json({ organizations });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Retrieve Organization by ID
const retrieveOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.findOne({ where: { id: req.params.id } });
        
        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        return res.status(200).json({ organization });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


//Update Organization
const updateOrganization = async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organization = await Organization.findByPk(organizationId);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        // Update the organization's information
        if (req.body.name) {
            organization.name = req.body.name;
        }
        if (req.body.headOffice) {
            organization.headOffice = req.body.headOffice;
        }
        if (req.body.contactNumber) {
            organization.contactNumber = req.body.contactNumber;
        }

        await organization.save();

        res.status(200).json({ message: 'Organization updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Delete Organization
const deleteOrganization = async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organization = await Organization.findByPk(organizationId);

        if (!organization) {
            return res.status(404).json({ error: 'Organization not found' });
        }

        await organization.destroy();

        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createOrganization,
    retrieveAllOrganizations,
    retrieveOrganizationById,
    updateOrganization,
    deleteOrganization
}

