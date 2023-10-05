import express from "express";
import { validate } from "./middleware/validate";
import {
  createNoteController,
  deleteNoteController,
  findAllNotesController,
  findNoteController,
  updateNoteController,

} from "./note.controller";
import { createNoteSchema, updateNoteSchema } from "./note.schema";

const router = express.Router();

router
  .route("/")
  .get(findAllNotesController)
  .post(validate(createNoteSchema), createNoteController);
router
  .route("/:noteId")
  .get(findNoteController)
  .patch(validate(updateNoteSchema), updateNoteController)
  .delete(deleteNoteController);


import { createBetaUserController } from "./modules/beta-user.controller";
import { createBetaUserSchema } from "./modules/beta-user.schema";

router.post("/register-beta-user", validate(createBetaUserSchema), createBetaUserController);


export default router;
