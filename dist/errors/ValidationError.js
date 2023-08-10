"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, codeStatus) {
        super(message);
        this.message = message;
        this.codeStatus = codeStatus;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
