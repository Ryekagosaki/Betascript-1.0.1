import { Lexer } from "../src/lexer/Lexer";
import { Parser } from "../src/parser/Parser";
import { JavaScriptEmitter } from "../src/transpiler/JavaScriptEmitter";

describe("Transpiler", () => {
  test("should transpile variable declarations", () => {
    const source = `ane x = 10; tetep y = 20;`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("let x = 10;");
    expect(js).toContain("const y = 20;");
  });

  test("should transpile if statement", () => {
    const source = `kalo (x > 0) { teriak("positif"); }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("if (");
    expect(js).toContain(")");
  });

  test("should transpile function declaration", () => {
    const source = `bikin tambah(a, b) { kasoh a + b; }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("function tambah(a, b)");
    expect(js).toContain("return");
  });

  test("should transpile async function", () => {
    const source = `nanti bikin ambil_data() { kosong }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("async function ambil_data()");
  });

  test("should transpile class declaration", () => {
    const source = `cetak Binatang { tetep nama = ""; mula(nama) { gua punye nama = nama; } }`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("class Binatang");
    expect(js).toContain("constructor");
  });

  test("should transpile await expression", () => {
    const source = `tungguin ambil_data();`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("await ambil_data()");
  });

  test("should transpile do-while loop and deret array literal", () => {
    const source = `ane daftar = deret["a", "b"]; ane i = 0; kerjain { i++; } selagi (i < 2);`;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain('let daftar = ["a", "b"];');
    expect(js).toContain("do {");
    expect(js).toContain("} while ((i < 2));");
  });

  test("should transpile modern Betawi expressions", () => {
    const source = `
      ane orang = { nama: "Ali", umur: 20 };
      ane {nama, umur} = orang;
      ane daftar = deret[1, 2];
      bikin gabung(...isi) { kasoh isi; }
      ane semua_angka = deret[0, ...daftar];
      ane salinan = { ...orang, kota: "Jakarta" };
      ane judul = ` + "`Halo ${nama}`" + `;
      ane pola = /Ali/i;
      ane aman = orang?.alamat ?? "kosong";
      teriak(teks punye gede(judul), pola, aman, semua_angka, salinan, gabung(...daftar));
    `;
    const lexer = new Lexer(source);
    const tokens = lexer.tokenize();
    const parser = new Parser(source);
    const ast = parser.parse(tokens);
    const emitter = new JavaScriptEmitter();
    const js = emitter.emit(ast);

    expect(js).toContain("let {nama,umur} = orang;");
    expect(js).toContain("function gabung(...isi)");
    expect(js).toContain("[0, ... daftar]");
    expect(js).toContain('{...orang, kota: "Jakarta"}');
    expect(js).toContain("`Halo ${nama}`");
    expect(js).toContain("/Ali/i");
    expect(js).toContain('orang?.alamat ?? "kosong"');
  });
});
