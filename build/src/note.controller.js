"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteController = exports.findAllNotesController = exports.findNoteController = exports.updateNoteController = exports.createNoteController = void 0;
const model_1 = __importDefault(require("./model"));
const createNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, category, published } = req.body;
        const note = yield model_1.default.create({
            title,
            content,
            category,
            published,
        });
        res.status(201).json({
            status: "success",
            data: {
                note,
            },
        });
    }
    catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "Note with that title already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.createNoteController = createNoteController;
const updateNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.update(Object.assign(Object.assign({}, req.body), { updatedAt: Date.now() }), {
            where: {
                id: req.params.noteId,
            },
        });
        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Note with that ID not found",
            });
        }
        const note = yield model_1.default.findByPk(req.params.noteId);
        res.status(200).json({
            status: "success",
            data: {
                note,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.updateNoteController = updateNoteController;
const findNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield model_1.default.findByPk(req.params.noteId);
        if (!note) {
            return res.status(404).json({
                status: "fail",
                message: "Note with that ID not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                note,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.findNoteController = findNoteController;
const findAllNotesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const notes = yield model_1.default.findAll({ limit, offset: skip });
        res.status(200).json({
            status: "success",
            results: notes.length,
            notes,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.findAllNotesController = findAllNotesController;
const deleteNoteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.destroy({
            where: { id: req.params.noteId },
            force: true,
        });
        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Note with that ID not found",
            });
        }
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
});
exports.deleteNoteController = deleteNoteController;
