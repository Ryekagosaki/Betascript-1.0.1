import { Position } from "../utils/Position";
export type TypeAnnotation = "angka" | "kata" | "betoel" | "deret" | "peta" | string;
export interface VariableDeclaration {
    type: "VariableDeclaration";
    kind: "ane" | "tetep";
    name: string;
    typeAnnotation?: TypeAnnotation;
    initializer: Expression | null;
    position: Position;
}
export interface FunctionDeclaration {
    type: "FunctionDeclaration";
    name: string;
    parameters: Parameter[];
    body: BlockStatement;
    isAsync: boolean;
    isExported: boolean;
    returnType?: TypeAnnotation;
    position: Position;
}
export interface Parameter {
    name: string;
    type?: TypeAnnotation;
    isRest?: boolean;
    position: Position;
}
export interface ClassDeclaration {
    type: "ClassDeclaration";
    name: string;
    superclass?: string;
    interfaces: string[];
    members: ClassMember[];
    position: Position;
}
export type ClassMember = MethodDeclaration | FieldDeclaration;
export interface MethodDeclaration {
    type: "MethodDeclaration";
    name: string;
    parameters: Parameter[];
    body: BlockStatement;
    kind: "method" | "constructor";
    visibility: "public" | "private" | "protected";
    isStatic: boolean;
    position: Position;
}
export interface FieldDeclaration {
    type: "FieldDeclaration";
    name: string;
    visibility: "public" | "private" | "protected";
    isStatic: boolean;
    initializer: Expression | null;
    position: Position;
}
export interface InterfaceDeclaration {
    type: "InterfaceDeclaration";
    name: string;
    methods: InterfaceMethod[];
    position: Position;
}
export interface InterfaceMethod {
    type: "InterfaceMethod";
    name: string;
    parameters: Parameter[];
    returnType?: TypeAnnotation;
    position: Position;
}
export interface BlockStatement {
    type: "BlockStatement";
    statements: Statement[];
    position: Position;
}
export interface IfStatement {
    type: "IfStatement";
    test: Expression;
    consequent: BlockStatement;
    alternate: ElseClause | null;
    position: Position;
}
export interface ElseClause {
    type: "ElseClause";
    ifStatement?: IfStatement;
    block?: BlockStatement;
    position: Position;
}
export interface WhileStatement {
    type: "WhileStatement";
    test: Expression;
    body: BlockStatement;
    position: Position;
}
export interface DoWhileStatement {
    type: "DoWhileStatement";
    body: BlockStatement;
    test: Expression;
    position: Position;
}
export interface ForStatement {
    type: "ForStatement";
    init: VariableDeclaration;
    test: Expression;
    update: Expression;
    body: BlockStatement;
    position: Position;
}
export interface ForEachStatement {
    type: "ForEachStatement";
    kind: "ane" | "tetep";
    variable: string;
    iterable: Expression;
    body: BlockStatement;
    position: Position;
}
export interface SwitchStatement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: SwitchCase[];
    position: Position;
}
export interface SwitchCase {
    type: "SwitchCase";
    test: Expression | null;
    consequent: Statement[];
    position: Position;
}
export interface TryStatement {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
    position: Position;
}
export interface CatchClause {
    type: "CatchClause";
    param: string | null;
    block: BlockStatement;
    position: Position;
}
export interface ReturnStatement {
    type: "ReturnStatement";
    argument: Expression | null;
    position: Position;
}
export interface ThrowStatement {
    type: "ThrowStatement";
    argument: Expression;
    position: Position;
}
export interface BreakStatement {
    type: "BreakStatement";
    position: Position;
}
export interface ContinueStatement {
    type: "ContinueStatement";
    position: Position;
}
export interface ImportStatement {
    type: "ImportStatement";
    specifiers: string[];
    source: string;
    defaultImport: string | null;
    position: Position;
}
export interface ExportStatement {
    type: "ExportStatement";
    declaration: Declaration | VariableDeclaration;
    position: Position;
}
export type Declaration = FunctionDeclaration | ClassDeclaration | InterfaceDeclaration;
export type Statement = VariableDeclaration | FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | IfStatement | WhileStatement | DoWhileStatement | ForStatement | ForEachStatement | SwitchStatement | TryStatement | ReturnStatement | ThrowStatement | BreakStatement | ContinueStatement | ImportStatement | ExportStatement | ExpressionStatement | BlockStatement | {
    type: "EmptyStatement";
    position: Position;
};
export interface ExpressionStatement {
    type: "ExpressionStatement";
    expression: Expression;
    position: Position;
}
export type Expression = Identifier | Literal | BinaryExpression | UnaryExpression | AssignmentExpression | CallExpression | MemberExpression | NewExpression | SuperExpression | LambdaExpression | ArrayExpression | ObjectExpression | ConditionalExpression;
export interface Identifier {
    type: "Identifier";
    name: string;
    position: Position;
}
export interface Literal {
    type: "Literal";
    value: string | number | boolean | null | undefined;
    raw: string;
    position: Position;
}
export interface BinaryExpression {
    type: "BinaryExpression";
    operator: string;
    left: Expression;
    right: Expression;
    position: Position;
}
export interface UnaryExpression {
    type: "UnaryExpression";
    operator: string;
    argument: Expression;
    prefix: boolean;
    position: Position;
}
export interface AssignmentExpression {
    type: "AssignmentExpression";
    left: Expression;
    operator: string;
    right: Expression;
    position: Position;
}
export interface CallExpression {
    type: "CallExpression";
    callee: Expression;
    arguments: Expression[];
    optional: boolean;
    position: Position;
}
export interface MemberExpression {
    type: "MemberExpression";
    object: Expression;
    property: Expression;
    computed: boolean;
    optional?: boolean;
    position: Position;
}
export interface NewExpression {
    type: "NewExpression";
    callee: string;
    arguments: Expression[];
    position: Position;
}
export interface SuperExpression {
    type: "SuperExpression";
    property?: Identifier;
    arguments?: Expression[];
    position: Position;
}
export interface LambdaExpression {
    type: "LambdaExpression";
    parameters: Parameter[];
    body: Expression | BlockStatement;
    position: Position;
}
export interface ArrayExpression {
    type: "ArrayExpression";
    elements: Expression[];
    position: Position;
}
export interface ObjectExpression {
    type: "ObjectExpression";
    properties: ObjectProperty[];
    position: Position;
}
export interface ObjectProperty {
    type: "ObjectProperty";
    key: string | Expression;
    value: Expression;
    position: Position;
}
export interface ConditionalExpression {
    type: "ConditionalExpression";
    test: Expression;
    consequent: Expression;
    alternate: Expression;
    position: Position;
}
export interface Program {
    type: "Program";
    body: Statement[];
}
//# sourceMappingURL=AST.d.ts.map