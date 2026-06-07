"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Position = void 0;
class Position {
    line;
    column;
    constructor(line = 1, column = 1) {
        this.line = line;
        this.column = column;
    }
    advance() {
        return new Position(this.line, this.column + 1);
    }
    newline() {
        return new Position(this.line + 1, 1);
    }
    offset(n) {
        return new Position(this.line, this.column + n);
    }
}
exports.Position = Position;
//# sourceMappingURL=Position.js.map