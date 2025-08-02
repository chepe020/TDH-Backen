import CategorySubject from '../categorySubject/categorySubject.model.js';

export const validateCreateCategorySubject = async (req, res, next) => {
    let { nameSubject, descriptionSubject } = req.body;

    if (!nameSubject || !descriptionSubject) {
        return res.status(400).json({
            success: false,
            msg: 'You have to add some nameSubject and descriptionSubject'
        });
    }

    nameSubject = nameSubject.trim();
    if (nameSubject.length === 0) {
        return res.status(400).json({
            success: false,
            msg: 'nameSubject cannot be empty or whitespace'
        });
    }

    const searchCategorySubject = await CategorySubject.findOne({ nameSubject });

    if (searchCategorySubject) {
        return res.status(400).json({
            success: false,
            msg: 'Esta categoria ya existe, puedes asignarte en el apartado de gestion de categorias.'
        });
    }

    next();
};

export const validateUserAlreadyAssigned = async (req, res, next) => {
    const userId = req.usuario._id;
    const { id } = req.params;

    try {
        const categorySubject = await CategorySubject.findById(id);

        if (!categorySubject) {
            return res.status(404).json({
                success: false,
                msg: 'Materia no encontrada.'
            });
        }

        const userAlreadyExists = categorySubject.keeperUser.includes(userId);

        if (userAlreadyExists) {
            return res.status(400).json({
                success: false,
                msg: 'Este usuario ya está asignado a esta materia.'
            });
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error validating user assignment',
            error: error.message
        });
    }
};