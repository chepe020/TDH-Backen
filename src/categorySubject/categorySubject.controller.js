import CategorySubject from './categorySubject.model.js';
import CategorySubjectRequest from './categorySubjcetRequest.model.js';
import User from '../users/user.model.js';
import ToDoList from '../to-do-List/to-do-list.model.js';

export const requestCreateCategorySubject = async (req, res) => {
    const userId = req.usuario._id;
    let { nameSubject, descriptionSubject } = req.body;
    nameSubject = nameSubject.trim().toLowerCase();
    try {
        const requestCategorySubject = await CategorySubjectRequest.create({
            nameSubject,
            descriptionSubject,
            keeperUser: userId
        }); 
        return res.status(201).json({
            success: true,
            msg: 'Request created successfully',
            data: requestCategorySubject
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error creating request category subject',
            error: error.message
        });
    }
};

export const viewnRequestCategorySubjectPending = async (req, res) => {
    const { limite = 100, desde = 0 } = req.query;
    const query = { status: "pending" };
    try {
        
        const categorySubject = await CategorySubjectRequest.find(query)
            .populate('keeperUser', 'name email')
            .skip(Number(desde))
            .limit(Number(limite)); 
        const total = await CategorySubjectRequest.countDocuments(query); 
        return res.status(200).json({
            success: true,
            total, 
            data: categorySubject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting CategorySubject',
            error: error.message
        });
    }

};

export const updateRequestCategorySubject = async (req, res) => {
    const {confirm} = req.body;
    const { id } = req.params;

    try {
        if (confirm === true) {
        
            const categorySubject = await CategorySubjectRequest.findById(id);

            const categorySubjectApproved = await CategorySubject.create({
                nameSubject: categorySubject.nameSubject,
                descriptionSubject: categorySubject.descriptionSubject,
                status: true
            });

            categorySubject.status = 'approved';
            await categorySubject.save();

            return res.status(200).json({
                success: true,
                msg: 'CategorySubject approved successfully',
                data: categorySubjectApproved
            });
        }else if (!confirm) {
            const categorySubject = await CategorySubjectRequest.findById(id);
            categorySubject.status = 'denied';
            await categorySubject.save();
            return res.status(200).json({
                success: true,
                msg: 'CategorySubject denied successfully',
                data: categorySubject
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error updating CategorySubject',
            error: error.message
        });
    }
};

/*export const createCategorySubject = async (req, res) => {
    const userId = req.usuario._id;
    let { nameSubject, descriptionSubject } = req.body;
    nameSubject = nameSubject.trim().toLowerCase();
    
    try {

        let searchCategorySubject = await CategorySubject.findOne({ nameSubject });

        if (searchCategorySubject) {   
            const userAlreadyExists = searchCategorySubject.keeperUser.includes(userId);
            if (userAlreadyExists) {
                return res.status(404).json({
                    success: false,
                    msg: 'User already exists in keeperUser list.'
                });
            }else if(!userAlreadyExists) {
                searchCategorySubject.keeperUser.push(userId);
                await searchCategorySubject.save();
            }
        }

        searchCategorySubject = await CategorySubject.create({
            nameSubject,
            descriptionSubject,
            keeperUser: [userId], 
            status: true
        });

        return res.status(201).json({
            success: true,
            msg: 'CategorySubject created successfully',
            data: searchCategorySubject
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error creating CategorySubject',
            error: error.message
        });
    }
};*/

export const getCategorySubject = async (req, res) => {
    const { limite = 100, desde = 0 } = req.query;
    const query = { status: true };
    try {
        const categorySubject = await CategorySubject.find(query)
            .populate('keeperUser', 'name email')
            .skip(Number(desde))
            .limit(Number(limite)); 

        const total = await CategorySubject.countDocuments(query); 

        return res.status(200).json({
            success: true,
            total, 
            data: categorySubject
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error creating CategorySubject',
            error: error.message
        });
    }
};

export const assignCategorySubject = async (req, res) => {
    const userId = req.usuario._id;
    const { id } = req.params;
    const { assignMe } = req.body;
    try {
        if (assignMe === true) {
            const categorySubject = await CategorySubject.findById(id);
            categorySubject.keeperUser.push(userId);
            await categorySubject.save();
            return res.status(200).json({
                success: true,
                msg: 'CategorySubject assigned successfully',
                data: categorySubject
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error assign CategorySubject',
            error: error.message
        });
    }
};

export const getCategorySubjectByUser = async (req, res) => {
    const userId = req.usuario._id;
    const { limite = 100, desde = 0 } = req.query;
    const query = { status: true, keeperUser: userId };
    try {
        const categorySubject = await CategorySubject.find(query)
            .populate('keeperUser', 'name email')
            .skip(Number(desde))
            .limit(Number(limite)); 

        const total = await CategorySubject.countDocuments(query); 

        return res.status(200).json({
            success: true,
            total, 
            data: categorySubject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error getting CategorySubject',
            error: error.message
        });
    }
};

const createCategorySubjectDefault = async ( nameSubject, descriptionSubject ) => {
    try {
        if (nameSubject === "Matematicas") {
            const existingCategorySubject = await CategorySubject.findOne({ nameSubject: "Matematicas" });
            if (existingCategorySubject) {
                return null;
            };
        }else if (nameSubject === "Estadística") {
            const existingCategorySubject2 = await CategorySubject.findOne({ nameSubject: "Estadística" });
            if (existingCategorySubject2) {
                return null;
            };
        }else if (nameSubject === "Lengua y literatura") {
            const existingCategorySubject3 = await CategorySubject.findOne({ nameSubject: "Lengua y literatura" });
            if (existingCategorySubject3) {
                return null;
            };
        }else if (nameSubject === "Fisica fundamental") {
            const existingCategorySubject4 = await CategorySubject.findOne({ nameSubject: "Fisica fundamental" });
            if (existingCategorySubject4) {
                return null;
            };
        };
    const newCategorySubject = new CategorySubject({ 
        nameSubject, 
        descriptionSubject
        });

        await newCategorySubject.save();
        console.log("CategorySubject created successfully:", newCategorySubject);
        return newCategorySubject;
        
    } catch (error) {
        console.error("Error creating CategorySubject:", error);
        return null;
    }
}

createCategorySubjectDefault("Matematicas", "Aprende y aplica matematicas básicas para resolver problemas y obtener resultados precisos.");
createCategorySubjectDefault("Estadística", "Aprende y aplica estadísticas para analizar datos y tomar decisiones informadas.");
createCategorySubjectDefault("Lengua y literatura", "Aprende y aplica lenguas y literatura para comunicarse de manera efectiva.");
createCategorySubjectDefault("Fisica fundamental", "Aprende y aplica física fundamental para comprender el mundo y resolver problemas.");