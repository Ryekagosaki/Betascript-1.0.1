import { Program } from "../parser/AST";
export declare class JavaScriptEmitter {
    private output;
    private indent;
    private variables;
    private functions;
    private classes;
    emit(program: Program): string;
    private emitRuntimeHelpers;
    private emitStatement;
    private emitVariableDeclaration;
    private emitFunctionDeclaration;
    private emitClassDeclaration;
    private emitClassMember;
    private getVisibility;
    private emitIfStatement;
    private emitWhileStatement;
    private emitDoWhileStatement;
    private emitForStatement;
    private emitForInit;
    private emitForEachStatement;
    private emitSwitchStatement;
    private emitTryStatement;
    private emitBlockStatement;
    private emitReturnStatement;
    private emitThrowStatement;
    private emitImportStatement;
    private emitExportStatement;
    private emitExpressionStatement;
    private emitExpression;
    private emitCallExpression;
    private emitMemberExpression;
    private emitLambdaBody;
    private emitLine;
    private indentString;
}
//# sourceMappingURL=JavaScriptEmitter.d.ts.map