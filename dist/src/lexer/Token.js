"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    // Literals
    TokenType["NUMBER"] = "NUMBER";
    TokenType["STRING"] = "STRING";
    TokenType["TEMPLATE"] = "TEMPLATE";
    TokenType["REGEX"] = "REGEX";
    TokenType["IDENTIFIER"] = "IDENTIFIER";
    // Keywords
    TokenType["ANCE"] = "ane";
    TokenType["ENTE"] = "ente";
    TokenType["BETOEL"] = "betoel";
    TokenType["KAGA"] = "kaga";
    TokenType["KOSONG"] = "kosong";
    TokenType["ENTAH"] = "entah";
    TokenType["TETEP"] = "tetep";
    TokenType["ANGKA"] = "angka";
    TokenType["KATA"] = "kata";
    TokenType["TUNGGU"] = "tungguin";
    // Control flow
    TokenType["KALO"] = "kalo";
    TokenType["KAGAKNYE"] = "kagaknye";
    TokenType["UDAH_GITUH"] = "udah_gituh";
    TokenType["SELAGI"] = "selagi";
    TokenType["KERJAIN"] = "kerjain";
    TokenType["ITUNG"] = "itung";
    TokenType["SABAN"] = "saban";
    TokenType["DAH"] = "dah";
    TokenType["LANJUT"] = "lanjut";
    TokenType["PILIH"] = "pilih";
    TokenType["KALO_GINI"] = "kalo_gini";
    TokenType["BODO_AMAT"] = "bodo_amat";
    // Functions
    TokenType["BIKIN"] = "bikin";
    TokenType["NANTI"] = "nanti";
    TokenType["KASOH"] = "kasoh";
    TokenType["SABUT"] = "sabut";
    // OOP
    TokenType["CETAK"] = "cetak";
    TokenType["TURUN"] = "turun";
    TokenType["IKUT"] = "ikut";
    TokenType["MULA"] = "mula";
    TokenType["GUA"] = "gua";
    TokenType["PUNYE"] = "punye";
    TokenType["BABANG"] = "babang";
    TokenType["ANYAR"] = "anyar";
    TokenType["DIEM"] = "diem";
    TokenType["STATIK"] = "statik";
    // Error handling
    TokenType["COBA"] = "cobi";
    TokenType["TANGKEP"] = "tangkep";
    TokenType["AKHIRNYE"] = "akhirnye";
    TokenType["LEMPAR"] = "lempar";
    // Modules
    TokenType["AMBIL"] = "ambil";
    TokenType["DARI"] = "dari";
    // I/O Utility
    TokenType["TERIAK"] = "teriak";
    TokenType["BISIK"] = "bisik";
    TokenType["DENGERIN"] = "dengerin";
    TokenType["SEBRAPA"] = "sebrapa";
    TokenType["APE"] = "ape";
    TokenType["ITUNGAN"] = "itungan";
    TokenType["OMONGAN"] = "omongan";
    TokenType["KUMPULIN"] = "kumpulin";
    TokenType["ACAK"] = "acak";
    TokenType["TIDUR"] = "tidur";
    // Interfaces
    TokenType["ANTARMUKA"] = "antarmuka";
    TokenType["DERET"] = "deret";
    // Operators
    TokenType["PLUS"] = "+";
    TokenType["MINUS"] = "-";
    TokenType["TIMES"] = "*";
    TokenType["DIVIDE"] = "/";
    TokenType["MODULO"] = "%";
    TokenType["POWER"] = "**";
    TokenType["EQUAL"] = "=";
    TokenType["PLUS_ASSIGN"] = "+=";
    TokenType["MINUS_ASSIGN"] = "-=";
    TokenType["TIMES_ASSIGN"] = "*=";
    TokenType["DIVIDE_ASSIGN"] = "/=";
    TokenType["EQUAL_EQUAL"] = "==";
    TokenType["NOT_EQUAL"] = "!=";
    TokenType["STRICT_EQUAL"] = "===";
    TokenType["STRICT_NOT_EQUAL"] = "!==";
    TokenType["LESS"] = "<";
    TokenType["GREATER"] = ">";
    TokenType["LESS_EQUAL"] = "<=";
    TokenType["GREATER_EQUAL"] = ">=";
    TokenType["AND"] = "&&";
    TokenType["OR"] = "||";
    TokenType["NULLISH"] = "??";
    TokenType["NOT"] = "!";
    TokenType["INCREMENT"] = "++";
    TokenType["DECREMENT"] = "--";
    TokenType["SPREAD"] = "...";
    // Delimiters & punctuations
    TokenType["SEMICOLON"] = ";";
    TokenType["DOT"] = ".";
    TokenType["QUESTION_DOT"] = "?.";
    TokenType["COMMA"] = ",";
    TokenType["COLON"] = ":";
    TokenType["QUESTION"] = "?";
    TokenType["ARROW"] = "=>";
    TokenType["LEFT_PAREN"] = "(";
    TokenType["RIGHT_PAREN"] = ")";
    TokenType["LEFT_BRACE"] = "{";
    TokenType["RIGHT_BRACE"] = "}";
    TokenType["LEFT_BRACKET"] = "[";
    TokenType["RIGHT_BRACKET"] = "]";
    // End of file
    TokenType["EOF"] = "EOF";
})(TokenType || (exports.TokenType = TokenType = {}));
//# sourceMappingURL=Token.js.map