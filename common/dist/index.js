"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.sigInInput = exports.sigUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.sigUpInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    firstName: zod_1.default.string().min(2).optional(),
    lastName: zod_1.default.string().min(2).optional(),
});
exports.sigInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.string(),
});
