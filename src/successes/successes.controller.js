import Successes from "./successes.model.js";
import { response } from "express";

export const createSuccesses = async (req, res = response) => {
    try {
        const { nameSuccess, descriptionSuccess, points, amountTasks } = req.body;

        const newSuccesses = new Successes({
            nameSuccess,
            descriptionSuccess,
            points,
            amountTasks,
        });

        await newSuccesses.save();

        res.status(201).json({
            msg: "Successes created successfully",
            successes: newSuccesses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};

export const getSuccesses = async (req, res = response) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const userId = req.usuario._id;

        const query = {
            status: true,
            'keeperUser.userCompletedTask.user': { $ne: userId }
        };

        const [total, successes] = await Promise.all([
            Successes.countDocuments(query),
            Successes.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            successes
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener successes",
            error: error.message
        });
    }
};

export const updateSuccesses = async (req, res = response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const successes = await Successes.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({
            success: true,
            msg: "Successes updated successfully",
            successes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar successes",
            error
        }); 
    }
};

export const deleteSuccesses = async (req, res = response) => {
    try {
        const { id } = req.params;

        await Successes.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            msg: "Successes deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar successes",
            error
        });
    }
};

const createSuccessesDefault = async ( nameSuccess, descriptionSuccess, points, amountTasks ) => {
    try {
        if (nameSuccess === "Primer Logro") {
            const existSuccesses = await Successes.findOne({ nameSuccess: "Primer Logro" });
            if (existSuccesses) {
                return null;
            };
        }else if (nameSuccess === "Segundo Logro") {
            const existSuccesses2 = await Successes.findOne({ nameSuccess: "Segundo Logro" });
            if (existSuccesses2) {
                return null;
            };
        }else if (nameSuccess === "Tercer Logro") {
            const existSuccesses3 = await Successes.findOne({ nameSuccess: "Tercer Logro" });
            if (existSuccesses3) {
                return null;
            };
        }else if (nameSuccess === "Cuarto Logro") {
            const existSuccesses4 = await Successes.findOne({ nameSuccess: "Cuarto Logro" });
            if (existSuccesses4) {
                return null;
            };
        }else if (nameSuccess === "Quinto Logro") {
            const existSuccesses5 = await Successes.findOne({ nameSuccess: "Quinto Logro" });
            if (existSuccesses5) {
                return null;
            };
        }else if (nameSuccess === "Sexto Logro") {
            const existSuccesses6 = await Successes.findOne({ nameSuccess: "Sexto Logro" });
            if (existSuccesses6) {
                return null;
            };
        }else if (nameSuccess === "Septimo Logro") {
            const existSuccesses7 = await Successes.findOne({ nameSuccess: "Septimo Logro" });
            if (existSuccesses7) {
                return null;
            };
        }else if (nameSuccess === "Octavo Logro") {
            const existSuccesses8 = await Successes.findOne({ nameSuccess: "Octavo Logro" });
            if (existSuccesses8) {
                return null;
            };
        }else if (nameSuccess === "Noveno Logro") {
            const existSuccesses9 = await Successes.findOne({ nameSuccess: "Noveno Logro" });
            if (existSuccesses9) {
                return null;
            };
        }else if (nameSuccess === "Decimo Logro") {
            const existSuccesses10 = await Successes.findOne({ nameSuccess: "Decimo Logro" });
            if (existSuccesses10) {
                return null;
            };  
        };
    const newSuccess = new Successes({ 
        nameSuccess, 
        descriptionSuccess, 
        points, 
        amountTasks
        });

        await newSuccess.save();
        console.log("Success created successfully:", newSuccess);
        return newSuccess;
        
    } catch (error) {
        console.error("Error creating Successes:", error);
        return null;
    }
}

createSuccessesDefault("Primer Logro", "Entrega 2 tareas para recibir 2000 puntos que podras canjear por premios", 2000, 2);
createSuccessesDefault("Segundo Logro", "Entrega 10 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 10);
createSuccessesDefault("Tercer Logro", "Entrega 20 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 20);
createSuccessesDefault("Cuarto Logro", "Entrega 30 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 30);
createSuccessesDefault("Quinto Logro", "Entrega 40 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 40);
createSuccessesDefault("Sexto Logro", "Entrega 50 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 50);
createSuccessesDefault("Septimo Logro", "Entrega 60 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 60);
createSuccessesDefault("Octavo Logro", "Entrega 70 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 70);
createSuccessesDefault("Noveno Logro", "Entrega 90 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 90);
createSuccessesDefault("Decimo Logro", "Entrega 100 tareas para recibir 1000 puntos extras que podras canjear por premios", 1000, 100);