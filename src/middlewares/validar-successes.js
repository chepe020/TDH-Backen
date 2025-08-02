import Successes from '../successes/successes.model.js';
export const deleteSuccessesValidator = async (req, res, next) => {
    const {confirm} = req.body;

    if(!confirm) {
        return res.status(400).json({
            success: false,
            msg: 'Confirmación requerida'
        });
    }

    next();
};

export const validateCreateSuccess = async (req, res, next) => {
    let { nameSuccess, descriptionSuccess, points, amountTasks } = req.body;

    if (!nameSuccess || !descriptionSuccess || !points || !amountTasks) {
        return res.status(400).json({
            success: false,
            msg: 'You have to add some nameSuccess, descriptionSuccess, points and amountTasks'
        });
    }

    nameSuccess = nameSuccess.trim();
    if (nameSuccess.length === 0) {
        return res.status(400).json({
            success: false,
            msg: 'nameSuccess cannot be empty or whitespace'
        });
    }

    const searchSuccess = await Successes.findOne({ nameSuccess });
    
    if (searchSuccess) {
        return res.status(400).json({
            success: false,
            msg: 'Este logro ya existe, intenta con otro.'
        });
    }

    next();
};  