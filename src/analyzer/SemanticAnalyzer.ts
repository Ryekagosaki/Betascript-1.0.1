import { Program, Statement, FunctionDeclaration, ClassDeclaration, InterfaceDeclaration,
  VariableDeclaration, Expression, IfStatement, WhileStatement, ForStatement, ForEachStatement,
  SwitchStatement, TryStatement, ReturnStatement, ThrowStatement, BreakStatement, ContinueStatement,
  ImportStatement, ExportStatement, ExpressionStatement, BlockStatement, ElseClause, CatchClause,
  DoWhileStatement
} from "../parser/AST";
import { BetaError } from "../utils/BetaError";
import { SourceLocation } from "../utils/SourceLocation";

const BUILTIN_FUNCTIONS = [
  "teriak", "bisik", "dengerin", "sebrapa", "ape", "itungan",
  "omongan", "kumpulin", "acak", "tidur", "angka", "kata",
  "semua", "balap", "peta", "himpunan", "peta_lemah", "himpunan_lemah"
];
const BUILTIN_KEYWORDS = [
  "this", "super", "gua", "http", "file", "matematika", "teks",
  "deret", "waktu", "json", "Error", "Map", "Set", "WeakMap", "WeakSet"
];

interface Scope {
  variables: Map<string, boolean>;
  functions: Map<string, boolean>;
}

export class SemanticAnalyzer {
  private scopeStack: Scope[] = [];
  private loopDepth = 0;

  analyze(program: Program): void {
    this.scopeStack = [{ variables: new Map(), functions: new Map() }];
    for (const fn of BUILTIN_FUNCTIONS) {
      this.scopeStack[0].functions.set(fn, true);
    }

    for (const stmt of program.body) {
      this.analyzeStatement(stmt);
    }
  }

  private pushScope(): void {
    this.scopeStack.push({ variables: new Map(), functions: new Map() });
  }

  private popScope(): void {
    this.scopeStack.pop();
  }

  private currentScope(): Scope {
    return this.scopeStack[this.scopeStack.length - 1];
  }

  private declareVariable(name: string, position: SourceLocation): void {
    const current = this.currentScope();
    current.variables.set(name, true);
  }

  private variableExists(name: string): boolean {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      if (this.scopeStack[i].variables.has(name)) {
        return true;
      }
    }
    return false;
  }

  private functionExists(name: string): boolean {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      if (this.scopeStack[i].functions.has(name)) {
        return true;
      }
    }
    return false;
  }

  private isVariableInCurrentScope(name: string): boolean {
    return this.currentScope().variables.has(name);
  }

  private analyzeStatement(stmt: Statement): void {
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

  private analyzeBlockStatement(stmt: BlockStatement): void {
    this.analyzeStatementBlock(stmt.statements);
  }

  private analyzeStatementBlock(statements: Statement[]): void {
    for (const s of statements) {
      this.analyzeStatement(s);
    }
  }

  private analyzeIfStatement(stmt: IfStatement): void {
    this.analyzeExpression(stmt.test);
    this.pushScope();
    this.analyzeStatement(stmt.consequent);
    this.popScope();

    if (stmt.alternate) {
      this.pushScope();
      if (stmt.alternate.ifStatement) {
        this.analyzeStatement(stmt.alternate.ifStatement);
      } else if (stmt.alternate.block) {
        this.analyzeStatement(stmt.alternate.block);
      }
      this.popScope();
    }
  }

  private analyzeWhileStatement(stmt: WhileStatement): void {
    this.analyzeExpression(stmt.test);
    this.loopDepth++;
    this.pushScope();
    this.analyzeStatement(stmt.body);
    this.popScope();
    this.loopDepth--;
  }

  private analyzeDoWhileStatement(stmt: DoWhileStatement): void {
    this.loopDepth++;
    this.pushScope();
    this.analyzeStatement(stmt.body);
    this.popScope();
    this.analyzeExpression(stmt.test);
    this.loopDepth--;
  }

  private analyzeForStatement(stmt: ForStatement): void {
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

  private analyzeForEachStatement(stmt: ForEachStatement): void {
    this.analyzeExpression(stmt.iterable);
    this.loopDepth++;
    this.pushScope();
    this.declareVariable(stmt.variable, stmt.position);
    this.analyzeStatement(stmt.body);
    this.popScope();
    this.loopDepth--;
  }

  private analyzeSwitchStatement(stmt: SwitchStatement): void {
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

  private analyzeTryStatement(stmt: TryStatement): void {
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

  private analyzeReturnStatement(stmt: ReturnStatement): void {
    if (stmt.argument) {
      this.analyzeExpression(stmt.argument);
    }
  }

  private analyzeThrowStatement(stmt: ThrowStatement): void {
    this.analyzeExpression(stmt.argument);
  }

  private analyzeBreakStatement(stmt: BreakStatement): void {
if (this.loopDepth === 0) {
       throw new BetaError(
         "Eh, 'dah' nggak boleh di sini! Harusnya di dalem loop, cek lagi ye bang.",
         stmt.position
       );
     }
  }

  private analyzeContinueStatement(stmt: ContinueStatement): void {
if (this.loopDepth === 0) {
       throw new BetaError(
         "Waduh, 'lanjut' cuma bisa dipakai di dalam loop saja ya, jangan di luar!",
         stmt.position
       );
     }
  }

  private analyzeVariableDeclaration(stmt: VariableDeclaration): void {
    for (const name of this.extractBindingNames(stmt.name)) {
      if (this.isVariableInCurrentScope(name)) {
        throw new BetaError(
          `Aduh, variabel '${name}' udah ada di sini. Nggak boleh timpa ya, nanti bingung orang lain!`,
          stmt.position
        );
      }
      this.declareVariable(name, stmt.position);
    }
    if (stmt.initializer) {
      this.analyzeExpression(stmt.initializer);
    }
  }

  private analyzeFunctionDeclaration(stmt: FunctionDeclaration): void {
    this.currentScope().functions.set(stmt.name, true);
    this.pushScope();
    for (const param of stmt.parameters) {
      this.declareVariable(param.name, param.position);
    }
    this.analyzeStatement(stmt.body);
    this.popScope();
  }

  private analyzeClassDeclaration(stmt: ClassDeclaration): void {
    this.currentScope().variables.set(stmt.name, true);
    this.pushScope();
    for (const member of stmt.members) {
      if (member.type === "MethodDeclaration") {
        this.analyzeMethodDeclaration(member);
      } else {
        this.declareVariable(member.name, member.position);
      }
    }
    this.popScope();
  }

  private analyzeMethodDeclaration(method: { parameters: any[]; body: BlockStatement; position: any }): void {
    this.pushScope();
    for (const param of method.parameters) {
      this.declareVariable(param.name, param.position);
    }
    this.analyzeStatement(method.body);
    this.popScope();
  }

  private analyzeInterfaceDeclaration(stmt: InterfaceDeclaration): void {
    this.currentScope().variables.set(stmt.name, true);
  }

  private analyzeExpression(expr: Expression): void {
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

  private analyzeIdentifier(expr: { name: string; position: { line: number; column: number } }): void {
    if (BUILTIN_KEYWORDS.includes(expr.name)) {
      return;
    }
    if (!this.variableExists(expr.name) && !this.functionExists(expr.name)) {
      throw new BetaError(
        `Ihh, variabel '${expr.name}' belum didefinisikan nih. Jangan sampai lupa deklarasi ya!`,
        expr.position
      );
    }
  }

  private analyzeAssignmentExpression(expr: { left: Expression; right: Expression; position: { line: number; column: number } }): void {
    this.analyzeExpression(expr.right);

    if (expr.left.type === "Identifier") {
      if (!this.variableExists(expr.left.name)) {
        throw new BetaError(
          `Waduh, '${expr.left.name}' belum ada. Deklarasi dulu sebelum diisi ya!`,
          expr.position
        );
      }
    } else if (expr.left.type === "MemberExpression") {
      this.analyzeExpression(expr.left.object);
    }
  }

  private extractBindingNames(name: string): string[] {
    if (!name.startsWith("{") && !name.startsWith("[")) return [name];
    const reserved = new Set(["as", "dari"]);
    return Array.from(name.matchAll(/[A-Za-z_]\w*/g))
      .map((match) => match[0])
      .filter((item) => !reserved.has(item));
  }

  private analyzeLambdaExpression(expr: { parameters: { name: string; position: { line: number; column: number } }[]; body: Expression | BlockStatement; position: { line: number; column: number } }): void {
    this.pushScope();
    for (const param of expr.parameters) {
      this.declareVariable(param.name, param.position);
    }
    if (typeof expr.body === "object" && "type" in expr.body && expr.body.type === "BlockStatement") {
      this.analyzeStatement(expr.body);
    } else if (expr.body && typeof expr.body === "object" && "type" in expr.body) {
      this.analyzeExpression(expr.body);
    }
    this.popScope();
  }
}
