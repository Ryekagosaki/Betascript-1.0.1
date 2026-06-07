export declare class Position {
    readonly line: number;
    readonly column: number;
    constructor(line?: number, column?: number);
    advance(): Position;
    newline(): Position;
    offset(n: number): Position;
}
//# sourceMappingURL=Position.d.ts.map