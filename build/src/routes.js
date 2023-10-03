"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("./middleware/validate");
const note_controller_1 = require("./note.controller");
const note_schema_1 = require("./note.schema");
const router = express_1.default.Router();
router
    .route("/")
    .get(note_controller_1.findAllNotesController)
    .post((0, validate_1.validate)(note_schema_1.createNoteSchema), note_controller_1.createNoteController);
router
    .route("/:noteId")
    .get(note_controller_1.findNoteController)
    .patch((0, validate_1.validate)(note_schema_1.updateNoteSchema), note_controller_1.updateNoteController)
    .delete(note_controller_1.deleteNoteController);
exports.default = router;
