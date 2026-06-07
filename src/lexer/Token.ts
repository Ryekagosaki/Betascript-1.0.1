import { Position } from "../utils/Position";

export enum TokenType {
  // Literals
  NUMBER = "NUMBER",
  STRING = "STRING",
  TEMPLATE = "TEMPLATE",
  REGEX = "REGEX",
  IDENTIFIER = "IDENTIFIER",

// Keywords
     ANCE = "ane",
     ENTE = "ente",
     BETOEL = "betoel",
     KAGA = "kaga",
     KOSONG = "kosong",
     ENTAH = "entah",
     TETEP = "tetep",
     ANGKA = "angka",
     KATA = "kata",
     TUNGGU = "tungguin",

// Control flow
    KALO = "kalo",
    KAGAKNYE = "kagaknye",
    UDAH_GITUH = "udah_gituh",
    SELAGI = "selagi",
    KERJAIN = "kerjain",
    ITUNG = "itung",
    SABAN = "saban",
    DAH = "dah",
    LANJUT = "lanjut",
    PILIH = "pilih",
    KALO_GINI = "kalo_gini",
    BODO_AMAT = "bodo_amat",

// Functions
    BIKIN = "bikin",
    NANTI = "nanti",
    KASOH = "kasoh",
    SABUT = "sabut",

// OOP
   CETAK = "cetak",
   TURUN = "turun",
   IKUT = "ikut",
   MULA = "mula",
   GUA = "gua",
   PUNYE = "punye",
   BABANG = "babang",
   ANYAR = "anyar",
   DIEM = "diem",
   STATIK = "statik",

  // Error handling
  COBA = "cobi",
  TANGKEP = "tangkep",
  AKHIRNYE = "akhirnye",
  LEMPAR = "lempar",

// Modules
   AMBIL = "ambil",
   DARI = "dari",

// I/O Utility
TERIAK = "teriak",
    BISIK = "bisik",
    DENGERIN = "dengerin",
    SEBRAPA = "sebrapa",
    APE = "ape",
    ITUNGAN = "itungan",
    OMONGAN = "omongan",
    KUMPULIN = "kumpulin",
    ACAK = "acak",
    TIDUR = "tidur",

   // Interfaces
   ANTARMUKA = "antarmuka",
   DERET = "deret",

  // Operators
  PLUS = "+",
  MINUS = "-",
  TIMES = "*",
  DIVIDE = "/",
  MODULO = "%",
  POWER = "**",

  EQUAL = "=",
  PLUS_ASSIGN = "+=",
  MINUS_ASSIGN = "-=",
  TIMES_ASSIGN = "*=",
  DIVIDE_ASSIGN = "/=",

  EQUAL_EQUAL = "==",
  NOT_EQUAL = "!=",
  STRICT_EQUAL = "===",
  STRICT_NOT_EQUAL = "!==",

  LESS = "<",
  GREATER = ">",
  LESS_EQUAL = "<=",
  GREATER_EQUAL = ">=",

  AND = "&&",
  OR = "||",
  NULLISH = "??",

  NOT = "!",
  INCREMENT = "++",
  DECREMENT = "--",
  SPREAD = "...",

  // Delimiters & punctuations
  SEMICOLON = ";",
  DOT = ".",
  QUESTION_DOT = "?.",
  COMMA = ",",
  COLON = ":",
  QUESTION = "?",
  ARROW = "=>",

  LEFT_PAREN = "(",
  RIGHT_PAREN = ")",
  LEFT_BRACE = "{",
  RIGHT_BRACE = "}",
  LEFT_BRACKET = "[",
  RIGHT_BRACKET = "]",

  // End of file
  EOF = "EOF"
}

export interface Token {
  type: TokenType;
  value: string;
  position: Position;
}
