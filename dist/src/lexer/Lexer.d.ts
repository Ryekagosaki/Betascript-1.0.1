import { Token } from "./Token";
export declare class Lexer {
    private readonly source;
    private position;
    private tokens;
    private start;
    constructor(source: string);
    tokenize(): Token[];
    private skipWhitespace;
    private addToken;
    private scanToken;
    private scanString;
    private scanTemplate;
    private scanRegex;
    private canStartRegex;
    private scanNumber;
    private scanIdentifier;
    private getKeyword;
    private isDigit;
    private isAlpha;
}
//# sourceMappingURL=Lexer.d.ts.map