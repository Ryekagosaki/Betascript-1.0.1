import { Program } from "../parser/AST";
export declare class SemanticAnalyzer {
    private scopeStack;
    private loopDepth;
    analyze(program: Program): void;
    private pushScope;
    private popScope;
    private currentScope;
    private declareVariable;
    private variableExists;
    private functionExists;
    private isVariableInCurrentScope;
    private analyzeStatement;
    private analyzeBlockStatement;
    private analyzeStatementBlock;
    private analyzeIfStatement;
    private analyzeWhileStatement;
    private analyzeDoWhileStatement;
    private analyzeForStatement;
    private analyzeForEachStatement;
    private analyzeSwitchStatement;
    private analyzeTryStatement;
    private analyzeReturnStatement;
    private analyzeThrowStatement;
    private analyzeBreakStatement;
    private analyzeContinueStatement;
    private analyzeVariableDeclaration;
    private analyzeFunctionDeclaration;
    private analyzeClassDeclaration;
    private analyzeMethodDeclaration;
    private analyzeInterfaceDeclaration;
    private analyzeExpression;
    private analyzeIdentifier;
    private analyzeAssignmentExpression;
    private extractBindingNames;
    private analyzeLambdaExpression;
}
//# sourceMappingURL=SemanticAnalyzer.d.ts.map