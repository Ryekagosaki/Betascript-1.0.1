"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetaCompiler = void 0;
exports.compile = compile;
const Lexer_1 = require("./lexer/Lexer");
const Parser_1 = require("./parser/Parser");
const JavaScriptEmitter_1 = require("./transpiler/JavaScriptEmitter");
const SemanticAnalyzer_1 = require("./analyzer/SemanticAnalyzer");
const fs = __importStar(require("fs"));
class BetaCompiler {
    compile(source, filename = "unknown") {
        return this.compileDetailed(source, filename).code;
    }
    compileDetailed(source, filename = "unknown") {
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        const analyzer = new SemanticAnalyzer_1.SemanticAnalyzer();
        analyzer.analyze(ast);
        const emitter = new JavaScriptEmitter_1.JavaScriptEmitter();
        const code = emitter.emit(ast);
        return { tokens, ast, code };
    }
    compileFile(inputPath, outputPath) {
        const source = fs.readFileSync(inputPath, "utf-8");
        const compiled = this.compile(source, inputPath);
        const outPath = outputPath ?? inputPath.replace(".beta", ".js");
        fs.writeFileSync(outPath, compiled, "utf-8");
    }
    run(source) {
        const compiled = this.compile(source);
        eval(compiled);
    }
}
exports.BetaCompiler = BetaCompiler;
function compile(source) {
    const compiler = new BetaCompiler();
    return compiler.compile(source);
}
//# sourceMappingURL=index.js.map