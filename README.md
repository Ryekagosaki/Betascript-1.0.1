# BetaScript 1.1.0

**Bahasa pemrograman berbasis Betawi. Ngoding rasa Betawi, kagak ribet.**

BetaScript adalah bahasa pemrograman yang ditulis dengan kosakata Betawi dan dikompilasi ke JavaScript. File BetaScript memakai ekstensi `.beta`, bisa dijalankan di Node.js, Termux, Acode, VS Code, dan Web IDE.

## Quick Start

```bash
npm install -g betascript
betascript --version
```

Jalankan file `.beta`:

```bash
betascript run hello.beta
```

Compile ke JavaScript:

```bash
betascript compile hello.beta
```

## Hello World

```beta
teriak("Woy, ape kabar bang!");

ane nama = "Bang Azmi";
tetep versi = "1.1.0";

teriak(`Halo ${nama}, ini BetaScript ${versi}`);
```

## Syntax Utama

| BetaScript | JavaScript | Arti |
|---|---|---|
| `ane` | `let` | variabel |
| `tetep` | `const` | konstanta |
| `betoel` | `true` | benar |
| `kaga` | `false` | salah |
| `kosong` | `null` | nilai kosong |
| `entah` | `undefined` | belum diketahui |
| `kalo` | `if` | percabangan |
| `kagaknye` | `else if` | percabangan lanjutan |
| `udah_gituh` | `else` | selain itu |
| `selagi` | `while` | while loop |
| `itung` | `for` | for loop |
| `saban` | `for...of` | loop tiap item |
| `dah` | `break` | berhenti |
| `lanjut` | `continue` | lanjut loop |
| `bikin` | `function` | fungsi |
| `kasoh` | `return` / `export` | return/export |
| `nanti` | `async` | async function |
| `tungguin` | `await` | await |
| `cetak` | `class` | class |
| `turun` | `extends` | inheritance |
| `mula` | `constructor` | constructor |
| `gua` | `this` | instance saat ini |
| `punye` | `.` | akses member |
| `babang` | `super` | parent class |
| `anyar` | `new` | object baru |
| `cobi` | `try` | try |
| `tangkep` | `catch` | catch |
| `akhirnye` | `finally` | finally |
| `lempar` | `throw` | throw |

BetaScript 1.1.0 tetap menerima beberapa alias lama supaya tutorial lama tidak langsung rusak, misalnya `cetakan`, `tetap`, `warisan`, `ini`, `baru`, `balikin`, `asinkron`, dan `tunggu`. Gaya yang disarankan tetap keyword Betawi final di tabel atas.

## Contoh Fungsi

```beta
bikin fibonacci(n: angka): angka {
  kalo (n <= 1) {
    kasoh n;
  }
  kasoh fibonacci(n - 1) + fibonacci(n - 2);
}

ane hasil = fibonacci(10);
teriak("Fibonacci(10) =", hasil);
```

## Async/Await

```beta
nanti bikin ambil_data() {
  teriak("Sabar ya, ambil data...");
  tungguin tidur(500);
  kasoh "data selesai";
}

nanti bikin main() {
  ane hasil = tungguin ambil_data();
  teriak(hasil);
}

main();
```

## OOP

```beta
cetak Binatang {
  mula(ente nama) {
    gua punye nama = nama;
  }

  bikin suara() {
    teriak("Suara binatang");
  }
}

cetak Kucing turun Binatang {
  mula(ente nama) {
    babang(nama);
  }

  bikin suara() {
    teriak(gua punye nama + ": Miaw miaw!");
  }
}

ane kucing = anyar Kucing("Kitty");
kucing punye suara();
```

## Fitur Modern

```beta
mode ketat;

ane orang = { nama: "Ali", umur: 20 };
ane {nama, umur} = orang;

ane daftar = deret[1, 2, 3];

bikin gabung(...isi) {
  kasoh isi;
}

ane hasil = gabung(0, ...daftar);
ane judul = `Halo ${nama}`;
ane pola = /Ali/i;
ane aman = orang?.alamat ?? "Jakarta";

teriak(judul, teks punye cocok(judul, pola)[0], aman, hasil punye sebrapa);
```

Fitur yang didukung:

- Destructuring object dan array
- Rest/spread operator
- Optional chaining `?.`
- Nullish coalescing `??`
- Template literal
- Regex literal
- Type annotation opsional
- Generic annotation yang diabaikan saat emit JavaScript
- `mode ketat` sebagai directive best-practice

## Standard Library

| Namespace / Fungsi | Isi |
|---|---|
| `teriak` | print ke console |
| `bisik` | tulis output tanpa newline |
| `dengerin` | input async |
| `tidur(ms)` | sleep promise |
| `semua([...])` | `Promise.all` |
| `balap([...])` | `Promise.race` |
| `peta` | `Map` |
| `himpunan` | `Set` |
| `peta_lemah` | `WeakMap` |
| `himpunan_lemah` | `WeakSet` |
| `http` | `ambil`, `kirim` |
| `file` | `baca`, `tulis`, `ada` |
| `matematika` | `pi`, `akar`, `acak`, `bulat`, `lantai`, `atap` |
| `teks` | `gede`, `kecil`, `pisah`, `ganti`, `cocok` |
| `deret` | `petakan`, `saring`, `kurangi`, `urutin`, `gabung` |
| `waktu` | `sekarang`, `format`, `tahun`, `bulan`, `tanggal` |
| `json` | `parse`, `stringify` |

Contoh:

```beta
ane nama = "azmi";
teriak(teks punye gede(nama));

ane angka = deret[1, 2, 3];
teriak(angka punye sebrapa);

ane tahunIni = waktu punye tahun(waktu punye sekarang());
teriak(tahunIni);
```

## CLI 1.1.0

```bash
betascript run file.beta
betascript run file.beta --watch
betascript run file.beta --debug
betascript compile file.beta
betascript compile file.beta --debug
betascript repl
betascript format file.beta
betascript lint file.beta
betascript install nama-package
```

Package manager BetaScript memakai prefix `beta-`. Contoh:

```bash
betascript install http
```

akan menjalankan:

```bash
npm install beta-http
```

## Editor dan Mobile

Editor integration dipisah ke repo sendiri supaya core BetaScript tidak berantakan.

| Platform | Repo |
|---|---|
| Acode Android | https://github.com/Ryekagosaki/Betascript-Acode |
| VS Code | https://github.com/Ryekagosaki/Betascript-VSCode |
| Web IDE | folder `web-ide/` di repo core |

Plugin Source URL Acode:

```text
https://raw.githubusercontent.com/Ryekagosaki/Betascript-Acode/main/acode-plugin-source.json
```

## Ciri Khas BetaScript

BetaScript bukan cuma JavaScript yang diganti nama keyword. BetaScript punya rasa sendiri:

- Kosakata Betawi sebagai identitas bahasa.
- `punye` sebagai operator member access yang terasa alami.
- `gua`, `babang`, `anyar`, `mula` untuk OOP dengan gaya percakapan Betawi.
- Runtime helper seperti `teriak`, `dengerin`, `sebrapa`, `omongan`, `itungan`, dan `tidur`.
- Ekosistem package komunitas dengan prefix `beta-*`.
- Target ramah Termux/Acode supaya bisa belajar dan ngoding dari Android.

## Roadmap 1.x

- [x] Lexer, parser, semantic analyzer
- [x] Transpiler ke JavaScript
- [x] CLI run/compile/repl/watch/debug/format/lint/install
- [x] OOP, async/await, module import/export
- [x] Standard library array/string/time/json/http/file/promise
- [x] Acode plugin repo terpisah
- [x] VS Code extension repo terpisah
- [x] Web IDE dasar
- [x] Dokumentasi lengkap di `PANDUAN_BETASCRIPT.md`
- [ ] Submit Acode plugin ke official Acode Store
- [ ] Tutorial interaktif web bertahap
- [ ] Mobile learning mini app berbasis WebView/Acode guide
- [ ] Registry komunitas package `beta-*`
- [ ] Source map yang lebih presisi untuk error runtime
- [ ] Debugger interaktif step-by-step

## Dokumentasi Lengkap

Baca panduan lengkap:

```text
PANDUAN_BETASCRIPT.md
```

## Lisensi

MIT License.

Copyright (c) 2026 Azmi Hail
