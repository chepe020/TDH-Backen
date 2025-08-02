import Flashcard from "./flashcard.model.js";
import CategorySubject from "../categorySubject/categorySubject.model.js";
import { response } from "express";

export const createFlashcard = async (req, res = response) => {
    try {
        const userId = req.usuario._id;
        const { question, answer, nameSubject, difficulty } = req.body;

        const categorySubject = await CategorySubject.findOne({nameSubject: nameSubject.toLowerCase().trim(), status: true});

        const newFlashcard = new Flashcard({
            question,
            answer,
            keeperCategorySubject : categorySubject._id,
            keeperUser: userId,
            difficulty
        });

        await newFlashcard.save();

        res.status(201).json({
            msg: "Flashcard created successfully",
            flashcard: newFlashcard
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};

export const getFlashcard = async (req, res = response) => {
    try {
        const userId = req.usuario._id;
        const { limite = 10, desde = 0, nameSubject } = req.query;

        let categoryFilter = {};
        
        if (nameSubject) {
            const category = await CategorySubject.findOne({nameSubject: nameSubject.toLowerCase().trim(), status: true});

            categoryFilter = { keeperCategorySubject: category._id };
        }

        const query = { status: true, keeperUser: userId, ...categoryFilter };

        const [total, flashcards] = await Promise.all([
            Flashcard.countDocuments(query),
            Flashcard.find(query)
                .populate('keeperCategorySubject', 'nameSubject') 
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            flashcards
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error al obtener flashcards",
            error
        });
    }
};

export const updateFlashcard = async (req, res = response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const flashcard = await Flashcard.findByIdAndUpdate(id, updates, { new: true });

        res.status(200).json({
            success: true,
            msg: "Flashcard updated successfully",
            flashcard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar flashcards",
            error
        });
    }
};

export const deleteFlashcard = async (req, res = response) => {
    try {
        const { id } = req.params;

        await Flashcard.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            success: true,
            msg: "Flashcard deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar flashcards",
            error
        });
    }
};
