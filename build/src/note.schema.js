"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterQuery = exports.updateNoteSchema = exports.params = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
exports.createNoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        content: zod_1.z.string({
            required_error: "Content is required",
        }),
        category: zod_1.z.string().optional(),
        published: zod_1.z.boolean().optional(),
    }),
});
exports.params = zod_1.z.object({
    noteId: zod_1.z.string(),
});
exports.updateNoteSchema = zod_1.z.object({
    params: exports.params,
    body: zod_1.z
        .object({
        title: zod_1.z.string(),
        content: zod_1.z.string(),
        category: zod_1.z.string(),
        published: zod_1.z.boolean(),
    })
        .partial(),
});
exports.filterQuery = zod_1.z.object({
    limit: zod_1.z.number().default(1),
    page: zod_1.z.number().default(10),
});
