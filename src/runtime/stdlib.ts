import readline from "readline";
import * as fs from "fs";

export interface BetaErrorOptions {
  filename?: string;
  line?: number;
  column?: number;
  original?: Error;
}

export class BetaRuntimeError extends Error {
  public readonly filename?: string;
  public readonly line?: number;
  public readonly column?: number;
  public readonly original?: Error;

  constructor(message: string, options: BetaErrorOptions = {}) {
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

  static unexpectedToken(token: string, options: BetaErrorOptions = {}): BetaRuntimeError {
    return new BetaRuntimeError(`Unexpected token: '${token}'`, options);
  }

  static expected(identifier: string, options: BetaErrorOptions = {}): BetaRuntimeError {
    return new BetaRuntimeError(`Expected ${identifier}`, options);
  }

  static undefinedVariable(name: string, options: BetaErrorOptions = {}): BetaRuntimeError {
    return new BetaRuntimeError(`Undefined variable: '${name}'`, options);
  }

  static syntaxError(message: string, options: BetaErrorOptions = {}): BetaRuntimeError {
    return new BetaRuntimeError(`Syntax error: ${message}`, options);
  }

  static runtime(message: string, options: BetaErrorOptions = {}): BetaRuntimeError {
    return new BetaRuntimeError(`Runtime error: ${message}`, {
      ...options,
      original: options.original,
    });
  }
}

export function wrapError(
  message: string,
  options: BetaErrorOptions = {}
): BetaRuntimeError {
  return BetaRuntimeError.runtime(message, options);
}

export function withOriginalLine(
  error: unknown,
  line: number,
  column: number,
  filename?: string
): BetaRuntimeError {
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const stdlib = {
  async dengerin(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  },

  dengerinSync(prompt: string): string {
    throw wrapError("dengerinSync belom didukung kalo jalan di browser", { line: 0, column: 0 });
  },

  teriak(...args: any[]): void {
    console.log(...args);
  },

  bisik(msg: any): void {
    process.stdout.write(String(msg));
  },

  sebrapa(arr: any[] | string | null | undefined): number {
    if (arr == null) return 0;
    if (typeof arr === "string") return arr.length;
    return Array.isArray(arr) ? arr.length : 0;
  },

  ape(val: any): string {
    if (val === null) return "null";
    if (Array.isArray(val)) return "deret";
    return typeof val;
  },

  itungan(val: any): number {
    const n = Number(val);
    if (Number.isNaN(n)) {
      throw wrapError(`Gak bisa jadi angka: '${val}'`, { line: 0, column: 0 });
    }
    return n;
  },

  omongan(val: any): string {
    return String(val);
  },

  kumpulin(...items: any[]): any[] {
    return Array(...items);
  },

  acak(): number {
    return Math.random();
  },

  tidur(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  semua<T>(promises: Promise<T>[]): Promise<T[]> {
    return Promise.all(promises);
  },

  balap<T>(promises: Promise<T>[]): Promise<T> {
    return Promise.race(promises);
  },

  peta<K, V>(entries?: Iterable<readonly [K, V]>): Map<K, V> {
    return new Map(entries);
  },

  himpunan<T>(values?: Iterable<T>): Set<T> {
    return new Set(values);
  },

  peta_lemah<K extends object, V>(entries?: readonly (readonly [K, V])[] | null): WeakMap<K, V> {
    return new WeakMap(entries);
  },

  himpunan_lemah<T extends object>(values?: readonly T[] | null): WeakSet<T> {
    return new WeakSet(values);
  },
};

export const http = {
  ambil: (url: string, options?: RequestInit) => fetch(url, options),
  kirim: (url: string, data: unknown, options: RequestInit = {}) => fetch(url, {
    ...options,
    method: options.method ?? "POST",
    headers: { "Content-Type": "application/json", ...(options.headers as Record<string, string> | undefined) },
    body: typeof data === "string" ? data : JSON.stringify(data),
  }),
};

export const file = {
  baca: (p: string) => fs.promises.readFile(p, "utf8"),
  tulis: (p: string, data: string) => fs.promises.writeFile(p, data, "utf8"),
  ada: (p: string) => fs.existsSync(p),
};

export const matematika = {
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

export const teks = {
  gede: (v: unknown) => String(v).toUpperCase(),
  kecil: (v: unknown) => String(v).toLowerCase(),
  pisah: (v: unknown, separator: string | RegExp) => String(v).split(separator),
  ganti: (v: unknown, search: string | RegExp, replace: string) => String(v).replace(search, replace),
  cocok: (v: unknown, pattern: RegExp) => String(v).match(pattern),
};

export const deret = {
  petakan: <T, U>(v: T[], fn: (item: T, index: number, array: T[]) => U) => v.map(fn),
  saring: <T>(v: T[], fn: (item: T, index: number, array: T[]) => boolean) => v.filter(fn),
  kurangi: <T, U>(v: T[], fn: (previous: U, current: T, index: number, array: T[]) => U, init: U) => v.reduce(fn, init),
  urutin: <T>(v: T[], fn?: (a: T, b: T) => number) => v.sort(fn),
  gabung: <T>(v: T[], separator?: string) => v.join(separator),
};

export const waktu = {
  sekarang: () => new Date(),
  format: (v: Date | string | number) => new Date(v).toISOString(),
};

export const json = {
  parse: JSON.parse,
  stringify: JSON.stringify,
};

export const teriak = stdlib.teriak;
export const bisik = stdlib.bisik;
export const dengerin = stdlib.dengerin;
export const sebrapa = stdlib.sebrapa;
export const ape = stdlib.ape;
export const itungan = stdlib.itungan;
export const omongan = stdlib.omongan;
export const kumpulin = stdlib.kumpulin;
export const acak = stdlib.acak;
export const tidur = stdlib.tidur;
export const semua = stdlib.semua;
export const balap = stdlib.balap;
export const peta = stdlib.peta;
export const himpunan = stdlib.himpunan;
export const peta_lemah = stdlib.peta_lemah;
export const himpunan_lemah = stdlib.himpunan_lemah;

export const ngomong = stdlib.bisik;
export const panjang = stdlib.sebrapa;
export const tipe = stdlib.ape;
export const angka = stdlib.itungan;
export const kata = stdlib.omongan;

export default stdlib;
