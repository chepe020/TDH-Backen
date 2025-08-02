import { response } from "express";
import { hash } from 'argon2';
import User from "./user.model.js";

export const getUsers = async (req = request, res = response) => {
    try {
        const { limite = 10, desde = 0} = req.query;

        const query = { status: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuarios",
            error
        });
    }
}


export const viewUserById = async (req, res = response) => {
    const id = req.usuario._id;
    
    try {
        if (id) {
            const user = await User.findOne({ _id: id, status: true });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    msg: 'Usuario no encontrado'
                });
            }

            return res.status(200).json({
                success: true,
                total: 1,
                users: [user]
            });
        }

    } catch (error) {
        return res.status(500).json({        
            success: false,
            msg: "Error al obtener usuario",
            error: error.message
        });
    }
}


export const updateUser = async (req, res = response) => {
    try {
        const id = req.usuario._id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario actualizado correctamente',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

export const updateUserPassword = async (req, res = response) => {
    try {
        const id = req.usuario._id;
        const { passwordNew } = req.body;

        const passwordHashed = await hash(passwordNew);

        await User.findByIdAndUpdate(id, { password: passwordHashed }, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la contraseña',
            error: error.message
        });
    }
};

export const deleteUser = async ( req, res = response) => {
    const logged = req.usuario.id;
    const { id } = req.params;
    const {confirm} = req.body;

    try {
        if(logged !== id) {
            return res.status(403).json({
                success: false,
                msg: 'Solo tu puedes eliminar tu cuenta'
            });
        }
        if(!confirm) {
            return res.status(400).json({
                success: false,
                msg: 'Confirmación requerida'
            });
        }

        await User.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar el usuario',
            error: error.message
        });
    }
}

