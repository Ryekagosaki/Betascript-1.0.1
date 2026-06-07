"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lexer_1 = require("../src/lexer/Lexer");
const Parser_1 = require("../src/parser/Parser");
describe("Parser", () => {
    test("should parse variable declarations", () => {
        const source = `ane x = 10; tetep y = 20;`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.type).toBe("Program");
        expect(ast.body.length).toBe(2);
        expect(ast.body[0].type).toBe("VariableDeclaration");
        expect(ast.body[0].name).toBe("x");
        expect(ast.body[0].kind).toBe("ane");
        expect(ast.body[1].type).toBe("VariableDeclaration");
        expect(ast.body[1].name).toBe("y");
        expect(ast.body[1].kind).toBe("tetep");
    });
    test("should parse if statement", () => {
        const source = `kalo (x > 0) { teriak("positif"); }`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("IfStatement");
    });
    test("should parse while loop", () => {
        const source = `selagi (x > 0) { x = x - 1; }`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("WhileStatement");
    });
    test("should parse do-while loop", () => {
        const source = `kerjain { x++; } selagi (x < 3);`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("DoWhileStatement");
    });
    test("should parse deret array literal", () => {
        const source = `ane makanan = deret["Kerak Telor", "Dodol Betawi"];`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("VariableDeclaration");
        expect(ast.body[0].initializer.type).toBe("ArrayExpression");
    });
    test("should parse function declaration", () => {
        const source = `bikin tambah(a, b) { kasoh a + b; }`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("FunctionDeclaration");
        expect(ast.body[0].name).toBe("tambah");
    });
    test("should parse async function", () => {
        const source = `nanti bikin ambil_data() { kosong }`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("FunctionDeclaration");
        expect(ast.body[0].isAsync).toBe(true);
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
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.type).toBe("Program");
        expect(ast.body[0].type).toBe("ClassDeclaration");
        expect(ast.body[0].name).toBe("Kucing");
        expect(ast.body[1].type).toBe("VariableDeclaration");
        expect(ast.body[2].type).toBe("ExpressionStatement");
    });
    test("should parse legacy OOP aliases", () => {
        const source = `cetakan Binatang {
      tetap nama = "";
      bikin baru(nama: kata) { ini.nama = nama; }
      suara() { teriak("Suara binatang"); }
    }

    cetakan Kucing warisan Binatang {
      bikin baru(nama: kata) { panggil atas.bikin baru(nama); }
      suara() { teriak("Miaw miaw!"); }
    }

    ane kucing = baru Kucing("Kitty");
    kucing.suara();`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("ClassDeclaration");
        expect(ast.body[1].type).toBe("ClassDeclaration");
        expect(ast.body[1].superclass).toBe("Binatang");
    });
    test("should parse destructuring and generic annotation", () => {
        const source = `mode ketat; ane {nama, umur} = orang; ane [a, b] = daftar; bikin identitas<T>(x: T): T { kasoh x; }`;
        const lexer = new Lexer_1.Lexer(source);
        const tokens = lexer.tokenize();
        const parser = new Parser_1.Parser(source);
        const ast = parser.parse(tokens);
        expect(ast.body[0].type).toBe("EmptyStatement");
        expect(ast.body[1].type).toBe("VariableDeclaration");
        expect(ast.body[1].name).toBe("{nama,umur}");
        expect(ast.body[2].type).toBe("VariableDeclaration");
        expect(ast.body[2].name).toBe("[a,b]");
        expect(ast.body[3].type).toBe("FunctionDeclaration");
    });
});
//# sourceMappingURL=parser.test.js.map