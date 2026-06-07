"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetaError = void 0;
class BetaError extends Error {
    message;
    position;
    filename;
    constructor(message, position, filename) {
        super(`${filename ?? position.filename ?? "unknown"}:${position.line}:${position.column}: ${message}`);
        this.message = message;
        this.position = position;
        this.filename = filename;
        this.name = "BetaError";
    }
    static unexpectedToken(token, position, filename) {
        return new BetaError(`Unexpected token: '${token}'`, position, filename);
    }
    static expected(identifier, position, filename) {
        return new BetaError(`Expected ${identifier}`, position, filename);
    }
    static undefinedVariable(name, position, filename) {
        return new BetaError(`Undefined variable: '${name}'`, position, filename);
    }
    static syntaxError(message, position, filename) {
        return new BetaError(`Syntax error: ${message}`, position, filename);
    }
}
exports.BetaError = BetaError;
//# sourceMappingURL=BetaError.js.map