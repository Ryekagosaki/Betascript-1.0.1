import { Lexer } from "./lexer/Lexer";
import { Parser } from "./parser/Parser";
import { JavaScriptEmitter } from "./transpiler/JavaScriptEmitter";
import { SemanticAnalyzer } from "./analyzer/SemanticAnalyzer";
import * as fs from "fs";
import * as path from "path";

export interface CompileResult {
  tokens: ReturnType<Lexer["tokenize"]>;
  ast: ReturnType<Parser["parse"]>;
  code: string;
}

export class BetaCompiler {
  compile(source: string, filename: string = "unknown"): string {
    return this.compileDetailed(source, filename).code;
  }

  compileDetailed(source: string, filename: string = "unknown"): CompileResult {
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    
    const analyzer = new SemanticAnalyzer();
    analyzer.analyze(ast);
    
    const emitter = new JavaScriptEmitter();
    const code = emitter.emit(ast);

    return { tokens, ast, code };
  }

  compileFile(inputPath: string, outputPath?: string): void {
    const source = fs.readFileSync(inputPath, "utf-8");
    const compiled = this.compile(source, inputPath);
    
    const outPath = outputPath ?? inputPath.replace(".beta", ".js");
    fs.writeFileSync(outPath, compiled, "utf-8");
  }

  run(source: string): void {
    const compiled = this.compile(source);
    eval(compiled);
  }
}

export function compile(source: string): string {
  const compiler = new BetaCompiler();
  return compiler.compile(source);
}
