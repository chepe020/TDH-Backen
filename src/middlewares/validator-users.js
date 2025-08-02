import User from '../users/user.model.js'
import { verify } from 'argon2';

export const validateProperty = async (req, res, next) => {
    const { id } = req.params;
    const userLogued = req.usuario.id;

    if (userLogued !== id) {
        return res.status(403).json({
            success: false,
            msg: "Solo tu puedes modificar tu cuenta"
        });
    }
    next()
}

export const validateUserUpdate = (req, res, next) => {
    const { name, username} = req.body;

    if (
        name === undefined &&
        username === undefined 
    ) {
        return res.status(400).json({
            success: false,
            msg: 'No hay datos válidos para actualizar'
        });
    }

    next();
};

export const validatePasswordChange = async (req, res, next) => {
    try {
        const id = req.usuario._id;
        const { passwordNew, passwordOld } = req.body;

        if (!passwordNew || !passwordOld) {
            return res.status(400).json({
                success: false,
                msg: 'Debes proporcionar la contraseña actual y la nueva'
            });
        }

        const user = await User.findById(id);
        const validPassword = await verify(user.password, passwordOld);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                msg: 'La contraseña actual es incorrecta'
            });
        }

        req.hashedPassword = passwordNew;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Error validando contraseña',
            error: error.message
        });
    }
};