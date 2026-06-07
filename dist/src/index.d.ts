import { Lexer } from "./lexer/Lexer";
import { Parser } from "./parser/Parser";
export interface CompileResult {
    tokens: ReturnType<Lexer["tokenize"]>;
    ast: ReturnType<Parser["parse"]>;
    code: string;
}
export declare class BetaCompiler {
    compile(source: string, filename?: string): string;
    compileDetailed(source: string, filename?: string): CompileResult;
    compileFile(inputPath: string, outputPath?: string): void;
    run(source: string): void;
}
export declare function compile(source: string): string;
//# sourceMappingURL=index.d.ts.map