import { Lexer } from "../src/lexer/Lexer";
import { Parser } from "../src/parser/Parser";

describe("Parser", () => {
  test("should parse variable declarations", () => {
    const source = `ane x = 10; tetep y = 20;`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.type).toBe("Program");
    expect(ast.body.length).toBe(2);
    expect(ast.body[0].type).toBe("VariableDeclaration");
    expect((ast.body[0] as any).name).toBe("x");
    expect((ast.body[0] as any).kind).toBe("ane");
    expect(ast.body[1].type).toBe("VariableDeclaration");
    expect((ast.body[1] as any).name).toBe("y");
    expect((ast.body[1] as any).kind).toBe("tetep");
  });

  test("should parse if statement", () => {
    const source = `kalo (x > 0) { teriak("positif"); }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("IfStatement");
  });

  test("should parse while loop", () => {
    const source = `selagi (x > 0) { x = x - 1; }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("WhileStatement");
  });

  test("should parse do-while loop", () => {
    const source = `kerjain { x++; } selagi (x < 3);`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("DoWhileStatement");
  });

  test("should parse deret array literal", () => {
    const source = `ane makanan = deret["Kerak Telor", "Dodol Betawi"];`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("VariableDeclaration");
    expect((ast.body[0] as any).initializer.type).toBe("ArrayExpression");
  });

  test("should parse function declaration", () => {
    const source = `bikin tambah(a, b) { kasoh a + b; }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("FunctionDeclaration");
    expect((ast.body[0] as any).name).toBe("tambah");
  });

  test("should parse async function", () => {
    const source = `nanti bikin ambil_data() { kosong }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("FunctionDeclaration");
    expect((ast.body[0] as any).isAsync).toBe(true);
  });

  test("should parse class with punye (.) member access, gua (this), and anyar (new)", () => {
    const source = `cetak Kucing {
    mula(ente nama) {
      gua punye nama = nama
    }
    
    bikin suara() {
      teriak(gua punye nama + ": Meong! 🐱")
    }
  }

  ane kucing = anyar Kucing("Si Belang")
  kucing punye suara()`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.type).toBe("Program");
    expect(ast.body[0].type).toBe("ClassDeclaration");
    expect((ast.body[0] as any).name).toBe("Kucing");
    expect(ast.body[1].type).toBe("VariableDeclaration");
    expect(ast.body[2].type).toBe("ExpressionStatement");
  });

  test("should parse destructuring and generic annotation", () => {
    const source = `mode ketat; ane {nama, umur} = orang; ane [a, b] = daftar; bikin identitas<T>(x: T): T { kasoh x; }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);

    expect(ast.body[0].type).toBe("EmptyStatement");
    expect(ast.body[1].type).toBe("VariableDeclaration");
    expect((ast.body[1] as any).name).toBe("{nama,umur}");
    expect(ast.body[2].type).toBe("VariableDeclaration");
    expect((ast.body[2] as any).name).toBe("[a,b]");
    expect(ast.body[3].type).toBe("FunctionDeclaration");
  });
});
