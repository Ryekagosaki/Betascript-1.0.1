"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemanticAnalyzer = void 0;
const BetaError_1 = require("../utils/BetaError");
const BUILTIN_FUNCTIONS = [
    "teriak", "bisik", "dengerin", "sebrapa", "ape", "itungan",
    "omongan", "kumpulin", "acak", "tidur", "angka", "kata",
    "semua", "balap", "peta", "himpunan", "peta_lemah", "himpunan_lemah"
];
const BUILTIN_KEYWORDS = [
    "this", "super", "gua", "http", "file", "matematika", "teks",
    "deret", "waktu", "json", "Error", "Map", "Set", "WeakMap", "WeakSet"
];
class SemanticAnalyzer {
    scopeStack = [];
    loopDepth = 0;
    analyze(program) {
        this.scopeStack = [{ variables: new Map(), functions: new Map() }];
        for (const fn of BUILTIN_FUNCTIONS) {
            this.scopeStack[0].functions.set(fn, true);
        }
        for (const stmt of program.body) {
            this.analyzeStatement(stmt);
        }
    }
    pushScope() {
        this.scopeStack.push({ variables: new Map(), functions: new Map() });
    }
    popScope() {
        this.scopeStack.pop();
    }
    currentScope() {
        return this.scopeStack[this.scopeStack.length - 1];
    }
    declareVariable(name, position) {
        const current = this.currentScope();
        current.variables.set(name, true);
    }
    variableExists(name) {
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i].variables.has(name)) {
                return true;
            }
        }
        return false;
    }
    functionExists(name) {
        for (let i = this.scopeStack.length - 1; i >= 0; i--) {
            if (this.scopeStack[i].functions.has(name)) {
                return true;
            }
        }
        return false;
    }
    isVariableInCurrentScope(name) {
        return this.currentScope().variables.has(name);
    }
    analyzeStatement(stmt) {
        switch (stmt.type) {
            case "VariableDeclaration":
                this.analyzeVariableDeclaration(stmt);
                break;
            case "FunctionDeclaration":
                this.analyzeFunctionDeclaration(stmt);
                break;
            case "ClassDeclaration":
                this.analyzeClassDeclaration(stmt);
                break;
            case "InterfaceDeclaration":
                this.analyzeInterfaceDeclaration(stmt);
                break;
            case "IfStatement":
                this.analyzeIfStatement(stmt);
                break;
            case "WhileStatement":
                this.analyzeWhileStatement(stmt);
                break;
            case "DoWhileStatement":
                this.analyzeDoWhileStatement(stmt);
                break;
            case "ForStatement":
                this.analyzeForStatement(stmt);
                break;
            case "ForEachStatement":
                this.analyzeForEachStatement(stmt);
                break;
            case "SwitchStatement":
                this.analyzeSwitchStatement(stmt);
                break;
            case "TryStatement":
                this.analyzeTryStatement(stmt);
                break;
            case "ReturnStatement":
                this.analyzeReturnStatement(stmt);
                break;
            case "ThrowStatement":
                this.analyzeThrowStatement(stmt);
                break;
            case "BreakStatement":
                this.analyzeBreakStatement(stmt);
                break;
            case "ContinueStatement":
                this.analyzeContinueStatement(stmt);
                break;
            case "BlockStatement":
                this.analyzeBlockStatement(stmt);
                break;
            case "ImportStatement":
                break;
            case "ExportStatement":
                break;
            case "ExpressionStatement":
                this.analyzeExpression(stmt.expression);
                break;
        }
    }
    analyzeBlockStatement(stmt) {
        this.analyzeStatementBlock(stmt.statements);
    }
    analyzeStatementBlock(statements) {
        for (const s of statements) {
            this.analyzeStatement(s);
        }
    }
    analyzeIfStatement(stmt) {
        this.analyzeExpression(stmt.test);
        this.pushScope();
        this.analyzeStatement(stmt.consequent);
        this.popScope();
        if (stmt.alternate) {
            this.pushScope();
            if (stmt.alternate.ifStatement) {
                this.analyzeStatement(stmt.alternate.ifStatement);
            }
            else if (stmt.alternate.block) {
                this.analyzeStatement(stmt.alternate.block);
            }
            this.popScope();
        }
    }
    analyzeWhileStatement(stmt) {
        this.analyzeExpression(stmt.test);
        this.loopDepth++;
        this.pushScope();
        this.analyzeStatement(stmt.body);
        this.popScope();
        this.loopDepth--;
    }
    analyzeDoWhileStatement(stmt) {
        this.loopDepth++;
        this.pushScope();
        this.analyzeStatement(stmt.body);
        this.popScope();
        this.analyzeExpression(stmt.test);
        this.loopDepth--;
    }
    analyzeForStatement(stmt) {
        this.loopDepth++;
        this.pushScope();
        if (stmt.init) {
            this.analyzeStatement(stmt.init);
        }
        this.analyzeExpression(stmt.test);
        this.analyzeExpression(stmt.update);
        this.analyzeStatement(stmt.body);
        this.popScope();
        this.loopDepth--;
    }
    analyzeForEachStatement(stmt) {
        this.analyzeExpression(stmt.iterable);
        this.loopDepth++;
        this.pushScope();
        this.declareVariable(stmt.variable, stmt.position);
        this.analyzeStatement(stmt.body);
        this.popScope();
        this.loopDepth--;
    }
    analyzeSwitchStatement(stmt) {
        this.analyzeExpression(stmt.discriminant);
        this.pushScope();
        for (const caseItem of stmt.cases) {
            if (caseItem.test) {
                this.analyzeExpression(caseItem.test);
            }
            for (const caseStmt of caseItem.consequent) {
                this.analyzeStatement(caseStmt);
            }
        }
        this.popScope();
    }
    analyzeTryStatement(stmt) {
        this.pushScope();
        this.analyzeStatement(stmt.block);
        this.popScope();
        if (stmt.handler) {
            this.pushScope();
            if (stmt.handler.param) {
                this.declareVariable(stmt.handler.param, stmt.handler.position);
            }
            this.analyzeStatement(stmt.handler.block);
            this.popScope();
        }
        if (stmt.finalizer) {
            this.pushScope();
            this.analyzeStatement(stmt.finalizer);
            this.popScope();
        }
    }
    analyzeReturnStatement(stmt) {
        if (stmt.argument) {
            this.analyzeExpression(stmt.argument);
        }
    }
    analyzeThrowStatement(stmt) {
        this.analyzeExpression(stmt.argument);
    }
    analyzeBreakStatement(stmt) {
        if (this.loopDepth === 0) {
            throw new BetaError_1.BetaError("Eh, 'dah' nggak boleh di sini! Harusnya di dalem loop, cek lagi ye bang.", stmt.position);
        }
    }
    analyzeContinueStatement(stmt) {
        if (this.loopDepth === 0) {
            throw new BetaError_1.BetaError("Waduh, 'lanjut' cuma bisa dipakai di dalam loop saja ya, jangan di luar!", stmt.position);
        }
    }
    analyzeVariableDeclaration(stmt) {
        for (const name of this.extractBindingNames(stmt.name)) {
            if (this.isVariableInCurrentScope(name)) {
                throw new BetaError_1.BetaError(`Aduh, variabel '${name}' udah ada di sini. Nggak boleh timpa ya, nanti bingung orang lain!`, stmt.position);
            }
            this.declareVariable(name, stmt.position);
        }
        if (stmt.initializer) {
            this.analyzeExpression(stmt.initializer);
        }
    }
    analyzeFunctionDeclaration(stmt) {
        this.currentScope().functions.set(stmt.name, true);
        this.pushScope();
        for (const param of stmt.parameters) {
            this.declareVariable(param.name, param.position);
        }
        this.analyzeStatement(stmt.body);
        this.popScope();
    }
    analyzeClassDeclaration(stmt) {
        this.currentScope().variables.set(stmt.name, true);
        this.pushScope();
        for (const member of stmt.members) {
            if (member.type === "MethodDeclaration") {
                this.analyzeMethodDeclaration(member);
            }
            else {
                this.declareVariable(member.name, member.position);
            }
        }
        this.popScope();
    }
    analyzeMethodDeclaration(method) {
        this.pushScope();
        for (const param of method.parameters) {
            this.declareVariable(param.name, param.position);
        }
        this.analyzeStatement(method.body);
        this.popScope();
    }
    analyzeInterfaceDeclaration(stmt) {
        this.currentScope().variables.set(stmt.name, true);
    }
    analyzeExpression(expr) {
        switch (expr.type) {
            case "Identifier":
                this.analyzeIdentifier(expr);
                break;
            case "Literal":
                break;
            case "BinaryExpression":
                this.analyzeExpression(expr.left);
                this.analyzeExpression(expr.right);
                break;
            case "UnaryExpression":
                this.analyzeExpression(expr.argument);
                break;
            case "AssignmentExpression":
                this.analyzeAssignmentExpression(expr);
                break;
            case "CallExpression":
                this.analyzeExpression(expr.callee);
                for (const arg of expr.arguments) {
                    this.analyzeExpression(arg);
                }
                break;
            case "MemberExpression":
                this.analyzeExpression(expr.object);
                break;
            case "NewExpression":
                for (const arg of expr.arguments) {
                    this.analyzeExpression(arg);
                }
                break;
            case "SuperExpression":
                if (expr.property) {
                    this.analyzeExpression(expr.property);
                }
                if (expr.arguments) {
                    for (const arg of expr.arguments) {
                        this.analyzeExpression(arg);
                    }
                }
                break;
            case "LambdaExpression":
                this.analyzeLambdaExpression(expr);
                break;
            case "ArrayExpression":
                for (const elem of expr.elements) {
                    this.analyzeExpression(elem);
                }
                break;
            case "ObjectExpression":
                for (const prop of expr.properties) {
                    this.analyzeExpression(prop.value);
                }
                break;
            case "ConditionalExpression":
                this.analyzeExpression(expr.test);
                this.analyzeExpression(expr.consequent);
                this.analyzeExpression(expr.alternate);
                break;
        }
    }
    analyzeIdentifier(expr) {
        if (BUILTIN_KEYWORDS.includes(expr.name)) {
            return;
        }
        if (!this.variableExists(expr.name) && !this.functionExists(expr.name)) {
            throw new BetaError_1.BetaError(`Ihh, variabel '${expr.name}' belum didefinisikan nih. Jangan sampai lupa deklarasi ya!`, expr.position);
        }
    }
    analyzeAssignmentExpression(expr) {
        this.analyzeExpression(expr.right);
        if (expr.left.type === "Identifier") {
            if (!this.variableExists(expr.left.name)) {
                throw new BetaError_1.BetaError(`Waduh, '${expr.left.name}' belum ada. Deklarasi dulu sebelum diisi ya!`, expr.position);
            }
        }
        else if (expr.left.type === "MemberExpression") {
            this.analyzeExpression(expr.left.object);
        }
    }
    extractBindingNames(name) {
        if (!name.startsWith("{") && !name.startsWith("["))
            return [name];
        const reserved = new Set(["as", "dari"]);
        return Array.from(name.matchAll(/[A-Za-z_]\w*/g))
            .map((match) => match[0])
            .filter((item) => !reserved.has(item));
    }
    analyzeLambdaExpression(expr) {
        this.pushScope();
        for (const param of expr.parameters) {
            this.declareVariable(param.name, param.position);
        }
        if (typeof expr.body === "object" && "type" in expr.body && expr.body.type === "BlockStatement") {
            this.analyzeStatement(expr.body);
        }
        else if (expr.body && typeof expr.body === "object" && "type" in expr.body) {
            this.analyzeExpression(expr.body);
        }
        this.popScope();
    }
}
exports.SemanticAnalyzer = SemanticAnalyzer;
//# sourceMappingURL=SemanticAnalyzer.js.map