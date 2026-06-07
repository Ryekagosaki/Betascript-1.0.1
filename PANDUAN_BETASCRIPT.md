# Panduan Lengkap BetaScript

BetaScript adalah bahasa pemrograman berbasis kosakata Betawi yang dikompilasi menjadi JavaScript. File program BetaScript memakai ekstensi `.beta` dan bisa dijalankan lewat CLI `betascript`.

Dokumen ini berisi cara pakai, aturan dasar, referensi syntax, contoh kode, dan catatan troubleshooting agar pengguna baru tidak bingung.

## Daftar Isi

- [Instalasi dan Persiapan](#instalasi-dan-persiapan)
- [Cara Menjalankan Program](#cara-menjalankan-program)
- [Program Pertama](#program-pertama)
- [Aturan Dasar Penulisan](#aturan-dasar-penulisan)
- [Keyword Utama](#keyword-utama)
- [Variabel dan Konstanta](#variabel-dan-konstanta)
- [Tipe Data dan Literal](#tipe-data-dan-literal)
- [Operator](#operator)
- [Percabangan](#percabangan)
- [Perulangan](#perulangan)
- [Fungsi](#fungsi)
- [Async dan Await](#async-dan-await)
- [Array dan Object](#array-dan-object)
- [Class dan OOP](#class-dan-oop)
- [Switch Case](#switch-case)
- [Error Handling](#error-handling)
- [Module Import dan Export](#module-import-dan-export)
- [Built-in Function](#built-in-function)
- [Fitur Modern](#fitur-modern)
- [CLI Tooling](#cli-tooling)
- [Contoh Program Lengkap](#contoh-program-lengkap)
- [Troubleshooting](#troubleshooting)
- [Cheat Sheet](#cheat-sheet)

## Instalasi dan Persiapan

### Dari source repository

Jalankan dari root project:

```bash
npm install
npm run build
```

Setelah build berhasil, CLI tersedia melalui:

```bash
node ./bin/betascript.js --version
```

Jika package sudah dipasang secara global, pakai:

```bash
betascript --version
```

### Struktur file

File BetaScript memakai ekstensi `.beta`.

Contoh:

```text
hello.beta
fibonacci.beta
warung.beta
```

Saat dikompilasi, compiler akan membuat file JavaScript dengan nama yang sama:

```text
hello.beta -> hello.js
```

## Cara Menjalankan Program

### Compile ke JavaScript

```bash
betascript compile examples/hello.beta
```

Output:

```text
examples/hello.js
```

### Compile dan langsung jalankan

```bash
betascript run examples/hello.beta
```

### Menjalankan dari repository tanpa install global

```bash
node ./bin/betascript.js run examples/hello.beta
```

### Validasi project

```bash
npm run build
npm test
```

## Program Pertama

Buat file `hello.beta`:

```beta
teriak("Hai dunia!");
teriak("Ngoding rasa Betawi, kaga ribet!");
```

Jalankan:

```bash
betascript run hello.beta
```

Output:

```text
Hai dunia!
Ngoding rasa Betawi, kaga ribet!
```

## Aturan Dasar Penulisan

- Statement boleh diakhiri titik koma `;`. Disarankan tetap memakai `;` agar mudah dibaca.
- String bisa memakai tanda kutip ganda `"..."` atau kutip tunggal `'...'`.
- Komentar satu baris memakai `//`.
- Komentar banyak baris memakai `/* ... */`.
- Block kode memakai `{ ... }`.
- Nama variabel, fungsi, dan class memakai identifier seperti JavaScript: huruf, angka, dan underscore, tetapi tidak diawali angka.
- BetaScript bersifat case-sensitive. `Nama` dan `nama` dianggap berbeda.

Contoh komentar:

```beta
// Ini komentar satu baris

/*
  Ini komentar banyak baris
*/
```

## Keyword Utama

### Deklarasi dan literal

| BetaScript | Arti | JavaScript |
|---|---|---|
| `ane` | deklarasi variabel | `let` |
| `tetep` | deklarasi konstanta | `const` |
| `betoel` | benar | `true` |
| `kaga` | salah | `false` |
| `kosong` | nilai kosong | `null` |
| `entah` | belum diketahui | `undefined` |

Catatan: `benar` juga diterima sebagai alias untuk `betoel`, tetapi gaya BetaScript yang disarankan tetap `betoel`.

### Kontrol alur

| BetaScript | Arti | JavaScript |
|---|---|---|
| `kalo` | jika | `if` |
| `kagaknye` | jika tidak, tapi kondisi lain | `else if` |
| `udah_gituh` | selain itu | `else` |
| `selagi` | selama | `while` |
| `itung` | perulangan hitung | `for` |
| `saban` | setiap item | `for...of` |
| `dah` | berhenti dari loop/switch | `break` |
| `lanjut` | lanjut iterasi berikutnya | `continue` |
| `pilih` | pilih cabang | `switch` |
| `kalo_gini` | case | `case` |
| `bodo_amat` | default | `default` |

### Fungsi dan async

| BetaScript | Arti | JavaScript |
|---|---|---|
| `bikin` | buat fungsi | `function` |
| `ente` | penanda parameter opsional | parameter |
| `kasoh` | return, atau export saat diikuti deklarasi | `return` / `export` |
| `nanti` | fungsi async | `async` |
| `tungguin` | tunggu promise | `await` |

### OOP

| BetaScript | Arti | JavaScript |
|---|---|---|
| `cetak` | class | `class` |
| `turun` | turunan class | `extends` |
| `ikut` | implements, disimpan di AST | `implements` |
| `mula` | constructor | `constructor` |
| `gua` | objek saat ini | `this` |
| `punye` | akses member | `.` |
| `babang` | parent/super | `super` |
| `anyar` | buat object baru | `new` |
| `statik` | static member | `static` |

Catatan: `diem` sudah disediakan sebagai keyword cadangan untuk private member, tetapi belum disarankan untuk dipakai di versi ini.

### Error handling dan module

| BetaScript | Arti | JavaScript |
|---|---|---|
| `cobi` | coba jalankan | `try` |
| `tangkep` | tangkap error | `catch` |
| `akhirnye` | akhirnya | `finally` |
| `lempar` | lempar error | `throw` |
| `ambil` | import | `import` |
| `dari` | from | `from` |

## Variabel dan Konstanta

### Variabel dengan `ane`

```beta
ane nama = "Bang Kodir";
ane umur = 25;

teriak(nama);
teriak(umur);
```

Hasil JavaScript kira-kira:

```js
let nama = "Bang Kodir";
let umur = 25;
```

### Konstanta dengan `tetep`

```beta
tetep PI = 3.14;
teriak(PI);
```

Hasil JavaScript kira-kira:

```js
const PI = 3.14;
```

### Assignment

```beta
ane angka = 10;
angka = angka + 5;
angka += 2;
angka -= 1;
angka *= 3;
angka /= 2;
```

## Tipe Data dan Literal

### Number

```beta
ane umur = 25;
ane harga = 15000.5;
```

### String

```beta
ane nama = "BetaScript";
ane kota = 'Jakarta';
```

### Boolean

```beta
ane aktif = betoel;
ane selesai = kaga;
```

### Null dan undefined

```beta
ane data = kosong;
ane belum_ada = entah;
```

### Type annotation

Type annotation boleh dipakai untuk dokumentasi kode. Saat ini annotation tidak melakukan runtime type-checking ketat, tetapi membantu pembaca kode.

```beta
ane nama: kata = "Mansur";
ane umur: angka = 30;
ane aktif: betoel = betoel;

bikin sapa(ente nama: kata): kata {
  kasoh "Halo " + nama;
}
```

Tipe umum:

| Tipe | Arti |
|---|---|
| `angka` | number |
| `kata` | string |
| `betoel` | boolean |
| identifier custom | tipe buatan sendiri |

## Operator

### Aritmatika

| Operator | Arti |
|---|---|
| `+` | tambah / gabung string |
| `-` | kurang |
| `*` | kali |
| `/` | bagi |
| `%` | modulo |
| `**` | pangkat |

Contoh:

```beta
ane a = 10;
ane b = 3;

teriak(a + b);
teriak(a - b);
teriak(a * b);
teriak(a / b);
teriak(a % b);
teriak(a ** b);
```

### Perbandingan

| Operator | Arti |
|---|---|
| `==` | sama nilai |
| `!=` | tidak sama nilai |
| `===` | sama nilai dan tipe |
| `!==` | tidak sama nilai atau tipe |
| `<` | lebih kecil |
| `>` | lebih besar |
| `<=` | lebih kecil sama dengan |
| `>=` | lebih besar sama dengan |

### Logika

| Operator | Arti |
|---|---|
| `&&` | dan |
| `||` | atau |
| `!` | tidak |

Contoh:

```beta
ane umur = 20;
ane punya_ktp = betoel;

kalo (umur >= 17 && punya_ktp) {
  teriak("Boleh masuk");
}
```

## Percabangan

### `kalo`

```beta
ane umur = 25;

kalo (umur >= 18) {
  teriak("Udah dewasa");
}
```

### `kagaknye` dan `udah_gituh`

```beta
ane umur = 15;

kalo (umur >= 18) {
  teriak("Dewasa");
} kagaknye (umur >= 13) {
  teriak("Remaja");
} udah_gituh {
  teriak("Masih bocah");
}
```

## Perulangan

### While dengan `selagi`

```beta
ane i = 0;

selagi (i < 5) {
  teriak(i);
  i++;
}
```

### For dengan `itung`

```beta
itung (ane i = 0; i < 5; i++) {
  teriak("Nomor", i);
}
```

### For-of dengan `saban`

```beta
ane daftar = ["kopi", "teh", "susu"];

saban (ane item dari daftar) {
  teriak(item);
}
```

Array juga bisa ditulis dengan gaya BetaScript `deret[...]`:

```beta
ane jajanan = deret["Kerak Telor", "Kue Pancong", "Dodol Betawi"];

saban (ane makanan dari jajanan) {
  teriak(makanan);
}
```

### Do-while dengan `kerjain ... selagi`

`kerjain` menjalankan block minimal satu kali, lalu mengecek kondisi `selagi` di akhir.

```beta
ane tebakan = 0;

kerjain {
  tebakan++;
  teriak("Ngecek angka: " + tebakan);
} selagi (tebakan < 3);
```

### Break dan continue

```beta
itung (ane i = 0; i < 10; i++) {
  kalo (i == 3) {
    lanjut;
  }

  kalo (i == 7) {
    dah;
  }

  teriak(i);
}
```

## Fungsi

### Deklarasi fungsi

```beta
bikin tambah(a, b) {
  kasoh a + b;
}

ane hasil = tambah(2, 3);
teriak(hasil);
```

### Parameter dengan `ente`

`ente` boleh dipakai sebagai penanda parameter agar gaya Betawi-Arab lebih jelas.

```beta
bikin sapa(ente nama, ente umur) {
  kasoh "Halo " + nama + ", umur lu " + umur;
}

teriak(sapa("Mamat", 25));
```

### Return type annotation

```beta
bikin kali(a: angka, b: angka): angka {
  kasoh a * b;
}
```

### Function call

Function dipanggil seperti JavaScript:

```beta
bikin halo() {
  teriak("Halo bang!");
}

halo();
```

## Async dan Await

Gunakan `nanti bikin` untuk membuat async function dan `tungguin` untuk await.

```beta
nanti bikin ambil_data() {
  teriak("Sabar ya, ambil data...");
  kasoh "data selesai";
}

nanti bikin main() {
  ane hasil = tungguin ambil_data();
  teriak(hasil);
}

main();
```

Catatan: `tungguin` sebaiknya dipakai di dalam function `nanti bikin`.

## Array dan Object

### Array

```beta
ane angka = [1, 2, 3];
teriak(angka[0]);
```

Alternatif gaya BetaScript:

```beta
ane angka = deret[1, 2, 3];
teriak(angka[0]);
```

Array memakai method JavaScript biasa melalui `punye`:

```beta
ane daftar = [];
daftar punye push("kopi");
daftar punye push("teh");

teriak(daftar);
```

### Object

```beta
ane barang = {
  nama: "Kopi Susu",
  harga: 15000
};

teriak(barang punye nama);
teriak(barang punye harga);
```

### Member access dengan `punye`

```beta
ane orang = { nama: "Jali" };
teriak(orang punye nama);
```

`punye` sama seperti titik `.` di JavaScript.

```beta
orang punye nama
```

setara dengan:

```js
orang.nama
```

## Class dan OOP

### Class sederhana

```beta
cetak Kucing {
  mula(ente nama) {
    gua punye nama = nama;
  }

  bikin suara() {
    teriak(gua punye nama + ": Meong!");
  }
}

ane kucing = anyar Kucing("Si Belang");
kucing punye suara();
```

Penjelasan:

| Syntax | Arti |
|---|---|
| `cetak Kucing` | membuat class `Kucing` |
| `mula(...)` | constructor |
| `gua` | `this` |
| `punye` | akses property/method |
| `anyar Kucing(...)` | `new Kucing(...)` |

### Inheritance dengan `turun`

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
    teriak(gua punye nama + ": Miaw!");
  }
}

ane kucing = anyar Kucing("Kitty");
kucing punye suara();
```

### Super dengan `babang`

Memanggil constructor parent:

```beta
babang(nama);
```

Memanggil method parent:

```beta
babang punye suara();
```

### Static member

```beta
cetak Counter {
  statik tetep jumlah = 0;

  mula() {
    Counter punye jumlah += 1;
  }
}
```

## Switch Case

```beta
ane nilai = "A";

pilih (nilai) {
  kalo_gini "A":
    teriak("Bagus banget");
    dah;

  kalo_gini "B":
    teriak("Bagus");
    dah;

  bodo_amat:
    teriak("Belajar lagi");
}
```

## Error Handling

Gunakan `cobi`, `tangkep`, `akhirnye`, dan `lempar`.

```beta
cobi {
  lempar "Ada masalah";
} tangkep (ente err) {
  teriak("Ketangkep error:", err);
} akhirnye {
  teriak("Selesai");
}
```

Parameter catch bisa ditulis dengan `ente`:

```beta
tangkep (ente err) {
  teriak(err);
}
```

Atau langsung nama parameter:

```beta
tangkep (err) {
  teriak(err);
}
```

## Module Import dan Export

### Import

```beta
ambil { teriak, dengerin } dari "stdlib";
```

Import default:

```beta
ambil paket dari "./paket.beta";
```

Import default dan named import:

```beta
ambil paket, { fungsiA, fungsiB } dari "./paket.beta";
```

### Export

`kasoh` menjadi export jika diikuti deklarasi `bikin`, `cetak`, `ane`, atau `tetep`.

```beta
kasoh bikin sapa(ente nama) {
  kasoh "Halo " + nama;
}
```

Export variabel:

```beta
kasoh ane versi = "1.0.0";
kasoh tetep NAMA = "BetaScript";
```

Export class:

```beta
kasoh cetak Orang {
  mula(ente nama) {
    gua punye nama = nama;
  }
}
```

Catatan: Untuk return biasa di dalam fungsi, `kasoh` dipakai seperti ini:

```beta
bikin tambah(a, b) {
  kasoh a + b;
}
```

## Built-in Function

### `teriak(...args)`

Mencetak output dengan newline.

```beta
teriak("Halo", "Bang");
```

Setara dengan `console.log`.

### `bisik(msg)`

Menulis output tanpa format tambahan.

```beta
bisik("Loading...");
```

Setara dengan `process.stdout.write`.

### `dengerin(prompt)`

Membaca input pengguna secara async.

```beta
nanti bikin main() {
  ane nama = tungguin dengerin("Nama lu siapa? ");
  teriak("Halo", nama);
}

main();
```

### `sebrapa(value)`

Mengambil panjang string atau array.

```beta
teriak(sebrapa("Betawi"));
teriak(sebrapa([1, 2, 3]));
```

### `ape(value)`

Mengambil tipe value.

```beta
teriak(ape(123));
teriak(ape("teks"));
```

### `itungan(value)`

Mengubah value menjadi number.

```beta
ane angka = itungan("42");
teriak(angka + 1);
```

### `omongan(value)`

Mengubah value menjadi string.

```beta
ane teks = omongan(123);
teriak(teks);
```

### `kumpulin(...items)`

Membuat array dari item.

```beta
ane daftar = kumpulin("kopi", "teh", "susu");
teriak(daftar);
```

### `acak()`

Menghasilkan angka random antara 0 dan 1.

```beta
teriak(acak());
```

### `tidur(ms)`

Menunggu beberapa milidetik. Gunakan dengan `tungguin`.

```beta
nanti bikin main() {
  teriak("Mulai");
  tungguin tidur(1000);
  teriak("Selesai setelah 1 detik");
}

main();
```

### `semua(promises)` dan `balap(promises)`

Utility Promise untuk menjalankan beberapa operasi async.

```beta
nanti bikin main() {
  ane hasil = tungguin semua(deret[tugas1(), tugas2()]);
  ane tercepat = tungguin balap(deret[tugas1(), tugas2()]);
  teriak(hasil, tercepat);
}
```

### `peta`, `himpunan`, `peta_lemah`, `himpunan_lemah`

Struktur data modern berbasis `Map`, `Set`, `WeakMap`, dan `WeakSet`.

```beta
ane nilai = peta([["kopi", 15000]]);
nilai punye set("teh", 8000);
teriak(nilai punye get("kopi"));

ane unik = himpunan(deret["a", "b", "a"]);
teriak(unik punye has("a"));
```

### Namespace stdlib

BetaScript juga menyediakan namespace helper modern.

```beta
teriak(matematika punye pi);
teriak(matematika punye akar(16));

teriak(teks punye gede("betawi"));
teriak(teks punye pisah("a,b,c", ","));

bikin dobel(x) {
  kasoh x * 2;
}

ane angka = deret[1, 2, 3];
teriak(deret punye petakan(angka, dobel));

teriak(waktu punye format(waktu punye sekarang()));
teriak(json punye stringify({ nama: "Ali" }));
```

Namespace yang tersedia:

| Namespace | Fungsi |
|---|---|
| `http` | `ambil(url)`, `kirim(url, data)` |
| `file` | `baca(path)`, `tulis(path, data)`, `ada(path)` |
| `matematika` | `pi`, `akar`, `acak`, `bulat`, `lantai`, `atap`, `mutlak`, `maksimal`, `minimal` |
| `teks` | `gede`, `kecil`, `pisah`, `ganti`, `cocok` |
| `deret` | `petakan`, `saring`, `kurangi`, `urutin` |
| `waktu` | `sekarang`, `format` |
| `json` | `parse`, `stringify` |

String dan array juga punya method Betawi langsung:

```beta
teriak("betawi" punye gede());
teriak("a,b,c" punye pisah(","));

ane daftar = deret[1, 2, 3];
teriak(daftar punye sebrapa);
teriak(daftar punye petakan(dobel));
```

## Fitur Modern

### Strict mode dengan `mode ketat`

`mode ketat` bisa ditulis di awal file sebagai directive best-practice.

```beta
mode ketat;

ane nama = "Ali";
teriak(nama);
```

### Destructuring

Object destructuring:

```beta
ane orang = { nama: "Ali", umur: 20 };
ane {nama, umur} = orang;

teriak(nama, umur);
```

Array destructuring:

```beta
ane daftar = deret["kopi", "teh"];
ane [pertama, kedua] = daftar;

teriak(pertama, kedua);
```

### Rest parameter dan spread operator

Rest parameter:

```beta
bikin gabung(...isi) {
  kasoh isi;
}
```

Spread array/function call:

```beta
ane angka = deret[1, 2, 3];
ane semua_angka = deret[0, ...angka];

teriak(...semua_angka);
```

Spread object:

```beta
ane orang = { nama: "Ali" };
ane lengkap = { ...orang, umur: 20 };
```

### Optional chaining dan nullish coalescing

```beta
ane orang = { nama: "Ali" };
ane alamat = orang?.alamat ?? "Belom ada alamat";

teriak(alamat);
```

### Template literal

```beta
ane nama = "Ali";
teriak(`Halo ${nama}`);
```

### Regular expression

```beta
ane pola = /ali/i;
ane hasil = "Halo Ali" punye cocok(pola);

teriak(hasil[0]);
```

### Generic annotation

Generic annotation boleh ditulis untuk dokumentasi API. Saat compile ke JavaScript, annotation generics dihapus.

```beta
bikin identitas<T>(x: T): T {
  kasoh x;
}
```

## CLI Tooling

### Debug AST dan JavaScript

```bash
betascript compile file.beta --debug
betascript run file.beta --debug
```

### Watch mode

```bash
betascript run file.beta --watch
```

### REPL

```bash
betascript repl
```

Di REPL, ketik `.keluar` untuk selesai.

### Formatter

```bash
betascript format file.beta
```

### Linter

```bash
betascript lint file.beta
```

### Package install

Package manager sederhana akan memasang package npm dengan prefix `beta-`.

```bash
betascript install http
```

Command di atas menjalankan:

```bash
npm install beta-http
```

## Interface

BetaScript mengenali keyword `antarmuka` untuk deklarasi interface. Interface dipakai sebagai kontrak struktur dan tidak menghasilkan output JavaScript runtime.

```beta
antarmuka Barang {
  total(): angka;
}
```

Catatan: Interface saat ini bersifat deklaratif dan tidak melakukan type-check runtime.

## Contoh Program Lengkap

```beta
cetak WarungKopi {
  mula() {
    gua punye catetan_pesanan = [];
    teriak("Warung Kopi Bang Jago Buka!");
  }

  bikin pesen(barang) {
    gua punye catetan_pesanan punye push(barang);
    teriak("Pesanan " + barang punye nama + " masuk!");
  }

  bikin total() {
    ane subtotal = 0;

    saban (ane item dari gua punye catetan_pesanan) {
      subtotal += item punye harga;
    }

    kasoh subtotal + (subtotal * 0.10);
  }
}

ane warung = anyar WarungKopi();

itung (ane i = 1; i <= 3; i++) {
  ane kopi = { nama: "Kopi Susu " + i, harga: 15000 };
  warung punye pesen(kopi);
}

teriak("Total:", warung punye total());
```

Output:

```text
Warung Kopi Bang Jago Buka!
Pesanan Kopi Susu 1 masuk!
Pesanan Kopi Susu 2 masuk!
Pesanan Kopi Susu 3 masuk!
Total: 49500
```

## Troubleshooting

### `variabel 'x' belum didefinisikan`

Artinya variabel dipakai sebelum dideklarasikan.

Salah:

```beta
teriak(nama);
```

Benar:

```beta
ane nama = "Mamat";
teriak(nama);
```

### `Expected expression`

Biasanya ada expression yang kosong atau keyword dipakai di posisi yang salah.

Salah:

```beta
ane x = ;
```

Benar:

```beta
ane x = 10;
```

### `Expected variable name`

Biasanya deklarasi `ane` atau `tetep` tidak diikuti nama variabel.

Salah:

```beta
ane = 10;
```

Benar:

```beta
ane angka = 10;
```

### `dah` atau `lanjut` error di luar loop

`dah` dan `lanjut` hanya boleh dipakai di dalam loop.

Salah:

```beta
dah;
```

Benar:

```beta
itung (ane i = 0; i < 5; i++) {
  kalo (i == 3) {
    dah;
  }
}
```

### Program async tidak menunggu hasil

Pastikan `tungguin` dipakai di dalam fungsi `nanti bikin`.

```beta
nanti bikin main() {
  ane nama = tungguin dengerin("Nama? ");
  teriak(nama);
}

main();
```

### File `.js` lama masih berbeda dari `.beta`

Compile ulang file `.beta`.

```bash
betascript compile nama_file.beta
```

Atau jalankan langsung:

```bash
betascript run nama_file.beta
```

## Cheat Sheet

```beta
// Output
teriak("Halo");

// Variabel dan konstanta
ane nama = "Jali";
tetep PI = 3.14;

// Boolean/null/undefined
ane aktif = betoel;
ane gagal = kaga;
ane data = kosong;
ane belum = entah;

// If else
kalo (aktif) {
  teriak("aktif");
} udah_gituh {
  teriak("mati");
}

// Loop
itung (ane i = 0; i < 3; i++) {
  teriak(i);
}

// Function
bikin tambah(a, b) {
  kasoh a + b;
}

// Async
nanti bikin main() {
  tungguin tidur(1000);
  teriak("selesai");
}

// Class
cetak Orang {
  mula(ente nama) {
    gua punye nama = nama;
  }

  bikin sapa() {
    teriak("Halo " + gua punye nama);
  }
}

ane orang = anyar Orang("Mamat");
orang punye sapa();
```

## Ringkasan Command

```bash
# Build compiler
npm run build

# Test compiler
npm test

# Lihat versi
betascript --version

# Compile file beta ke JS
betascript compile file.beta

# Compile dan jalankan
betascript run file.beta
```
