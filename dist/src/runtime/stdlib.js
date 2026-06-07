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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kata = exports.angka = exports.tipe = exports.panjang = exports.ngomong = exports.himpunan_lemah = exports.peta_lemah = exports.himpunan = exports.peta = exports.balap = exports.semua = exports.tidur = exports.acak = exports.kumpulin = exports.omongan = exports.itungan = exports.ape = exports.sebrapa = exports.dengerin = exports.bisik = exports.teriak = exports.json = exports.waktu = exports.deret = exports.teks = exports.matematika = exports.file = exports.http = exports.stdlib = exports.BetaRuntimeError = void 0;
exports.wrapError = wrapError;
exports.withOriginalLine = withOriginalLine;
const readline_1 = __importDefault(require("readline"));
const fs = __importStar(require("fs"));
class BetaRuntimeError extends Error {
    filename;
    line;
    column;
    original;
    constructor(message, options = {}) {
        const location = options.filename
            ? `${options.filename}:${options.line ?? "?"}:${options.column ?? "?"}`
            : `unknown:${options.line ?? "?"}:${options.column ?? "?"}`;
        super(`${location}: ${message}`);
        this.name = "BetaRuntimeError";
        this.filename = options.filename;
        this.line = options.line;
        this.column = options.column;
        this.original = options.original;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BetaRuntimeError);
        }
    }
    static unexpectedToken(token, options = {}) {
        return new BetaRuntimeError(`Unexpected token: '${token}'`, options);
    }
    static expected(identifier, options = {}) {
        return new BetaRuntimeError(`Expected ${identifier}`, options);
    }
    static undefinedVariable(name, options = {}) {
        return new BetaRuntimeError(`Undefined variable: '${name}'`, options);
    }
    static syntaxError(message, options = {}) {
        return new BetaRuntimeError(`Syntax error: ${message}`, options);
    }
    static runtime(message, options = {}) {
        return new BetaRuntimeError(`Runtime error: ${message}`, {
            ...options,
            original: options.original,
        });
    }
}
exports.BetaRuntimeError = BetaRuntimeError;
function wrapError(message, options = {}) {
    return BetaRuntimeError.runtime(message, options);
}
function withOriginalLine(error, line, column, filename) {
    if (error instanceof BetaRuntimeError) {
        return new BetaRuntimeError(error.message, {
            filename: filename ?? error.filename,
            line: line ?? error.line,
            column: column ?? error.column,
            original: error,
        });
    }
    if (error instanceof Error) {
        return new BetaRuntimeError(error.message, {
            filename,
            line,
            column,
            original: error,
        });
    }
    return new BetaRuntimeError(String(error), { filename, line, column });
}
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
exports.stdlib = {
    async dengerin(prompt) {
        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                resolve(answer);
            });
        });
    },
    dengerinSync(prompt) {
        throw wrapError("dengerinSync belom didukung kalo jalan di browser", { line: 0, column: 0 });
    },
    teriak(...args) {
        console.log(...args);
    },
    bisik(msg) {
        process.stdout.write(String(msg));
    },
    sebrapa(arr) {
        if (arr == null)
            return 0;
        if (typeof arr === "string")
            return arr.length;
        return Array.isArray(arr) ? arr.length : 0;
    },
    ape(val) {
        if (val === null)
            return "null";
        if (Array.isArray(val))
            return "deret";
        return typeof val;
    },
    itungan(val) {
        const n = Number(val);
        if (Number.isNaN(n)) {
            throw wrapError(`Gak bisa jadi angka: '${val}'`, { line: 0, column: 0 });
        }
        return n;
    },
    omongan(val) {
        return String(val);
    },
    kumpulin(...items) {
        return Array(...items);
    },
    acak() {
        return Math.random();
    },
    tidur(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    semua(promises) {
        return Promise.all(promises);
    },
    balap(promises) {
        return Promise.race(promises);
    },
    peta(entries) {
        return new Map(entries);
    },
    himpunan(values) {
        return new Set(values);
    },
    peta_lemah(entries) {
        return new WeakMap(entries);
    },
    himpunan_lemah(values) {
        return new WeakSet(values);
    },
};
exports.http = {
    ambil: (url, options) => fetch(url, options),
    kirim: (url, data, options = {}) => fetch(url, {
        ...options,
        method: options.method ?? "POST",
        headers: { "Content-Type": "application/json", ...options.headers },
        body: typeof data === "string" ? data : JSON.stringify(data),
    }),
};
exports.file = {
    baca: (p) => fs.promises.readFile(p, "utf8"),
    tulis: (p, data) => fs.promises.writeFile(p, data, "utf8"),
    ada: (p) => fs.existsSync(p),
};
exports.matematika = {
    pi: Math.PI,
    akar: Math.sqrt,
    acak: Math.random,
    bulat: Math.round,
    lantai: Math.floor,
    atap: Math.ceil,
    mutlak: Math.abs,
    maksimal: Math.max,
    minimal: Math.min,
};
exports.teks = {
    gede: (v) => String(v).toUpperCase(),
    kecil: (v) => String(v).toLowerCase(),
    pisah: (v, separator) => String(v).split(separator),
    ganti: (v, search, replace) => String(v).replace(search, replace),
    cocok: (v, pattern) => String(v).match(pattern),
};
exports.deret = {
    petakan: (v, fn) => v.map(fn),
    saring: (v, fn) => v.filter(fn),
    kurangi: (v, fn, init) => v.reduce(fn, init),
    urutin: (v, fn) => v.sort(fn),
    gabung: (v, separator) => v.join(separator),
};
exports.waktu = {
    sekarang: () => new Date(),
    format: (v) => new Date(v).toISOString(),
    tahun: (v = new Date()) => new Date(v).getFullYear(),
    bulan: (v = new Date()) => new Date(v).getMonth() + 1,
    tanggal: (v = new Date()) => new Date(v).getDate(),
};
exports.json = {
    parse: JSON.parse,
    stringify: JSON.stringify,
};
exports.teriak = exports.stdlib.teriak;
exports.bisik = exports.stdlib.bisik;
exports.dengerin = exports.stdlib.dengerin;
exports.sebrapa = exports.stdlib.sebrapa;
exports.ape = exports.stdlib.ape;
exports.itungan = exports.stdlib.itungan;
exports.omongan = exports.stdlib.omongan;
exports.kumpulin = exports.stdlib.kumpulin;
exports.acak = exports.stdlib.acak;
exports.tidur = exports.stdlib.tidur;
exports.semua = exports.stdlib.semua;
exports.balap = exports.stdlib.balap;
exports.peta = exports.stdlib.peta;
exports.himpunan = exports.stdlib.himpunan;
exports.peta_lemah = exports.stdlib.peta_lemah;
exports.himpunan_lemah = exports.stdlib.himpunan_lemah;
exports.ngomong = exports.stdlib.bisik;
exports.panjang = exports.stdlib.sebrapa;
exports.tipe = exports.stdlib.ape;
exports.angka = exports.stdlib.itungan;
exports.kata = exports.stdlib.omongan;
exports.default = exports.stdlib;
//# sourceMappingURL=stdlib.js.map