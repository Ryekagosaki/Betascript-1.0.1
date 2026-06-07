require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.45.0/min/vs' }});

require(['vs/editor/editor.api'], function () {
    const monaco = window.monaco;

    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: `// BetaScript Example
bikin selamat_datang(ente nama) {
    kalo (nama === kosong) {
        kasoh "Selamat datang!";
    } udah_gituh {
        kasoh "Selamat datang, " + nama + "!";
    }
}

tetep pesan = selamat_datang("Sahabat");
teriak(pesan);`,
        language: 'betascript',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        lineNumbers: 'on',
        renderWhitespace: 'boundary',
        suggest: { showKeywords: true }
    });

    function log(message, type = 'log') {
        const output = document.getElementById('output-content');
        const line = document.createElement('div');
        line.className = type;
        line.textContent = message;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    function clearOutput() {
        document.getElementById('output-content').innerHTML = '';
    }

    const tutorialText = `BetaScript Mini Tutorial

1. Tulis output:
   teriak("Halo bang!");

2. Bikin variabel:
   ane nama = "Azmi";
   tetep tahun = 2026;

3. Bikin fungsi:
   bikin sapa(ente nama) {
     kasoh "Halo " + nama;
   }

4. Jalankan dengan tombol Run atau Ctrl+Enter.

Tip: pakai keyword final seperti cetak, tetep, gua, anyar, kasoh, nanti, tungguin.`;

    function showTutorial() {
        clearOutput();
        log(tutorialText, 'tutorial');
    }

    function runCode() {
        const code = editor.getValue();
        clearOutput();
        log('> Running BetaScript code...', 'log');

        try {
            const jsCode = transpileToJS(code);
            const teriak = (...args) => log(args.join(' '), 'success');
            const bisik = (msg) => log(String(msg), 'success');
            const dengerin = async () => '';
            const sebrapa = (value) => value?.length ?? 0;
            const ape = (value) => typeof value;
            const itungan = (value) => Number(value);
            const omongan = (value) => String(value);
            const kumpulin = (...items) => Array(...items);
            const acak = () => Math.random();
            const tidur = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
            const result = Function(
                'teriak', 'bisik', 'dengerin', 'sebrapa', 'ape', 'itungan', 'omongan', 'kumpulin', 'acak', 'tidur',
                jsCode
            )(teriak, bisik, dengerin, sebrapa, ape, itungan, omongan, kumpulin, acak, tidur);

            if (result !== undefined) {
                log('Result: ' + result, 'success');
            }
            log('Execution completed', 'success');
        } catch (error) {
            log('Error: ' + error.message, 'error');
        }
    }

    function transpileToJS(code) {
        return code
            .replace(/\bnanti\s+bikin\b/g, 'async function')
            .replace(/\btungguin\b/g, 'await')
            .replace(/\btetep\b/g, 'const')
            .replace(/\bane\b/g, 'let')
            .replace(/\bbetoel\b/g, 'true')
            .replace(/\bkaga\b/g, 'false')
            .replace(/\bkosong\b/g, 'null')
            .replace(/\bentah\b/g, 'undefined')
            .replace(/\bkalo\b/g, 'if')
            .replace(/\bkagaknye\b/g, 'else if')
            .replace(/\budah_gituh\b/g, 'else')
            .replace(/\bselagi\b/g, 'while')
            .replace(/\bitung\b/g, 'for')
            .replace(/\bdah\b/g, 'break')
            .replace(/\blanjut\b/g, 'continue')
            .replace(/\bpilih\b/g, 'switch')
            .replace(/\bkalo_gini\b/g, 'case')
            .replace(/\bbodo_amat\b/g, 'default')
            .replace(/\bbikin\b/g, 'function')
            .replace(/\bkasoh\b/g, 'return')
            .replace(/\bcetak\b/g, 'class')
            .replace(/\bturun\b/g, 'extends')
            .replace(/\bmula\b/g, 'constructor')
            .replace(/\bgua\b/g, 'this')
            .replace(/\bpunye\b/g, '.')
            .replace(/\bbabang\b/g, 'super')
            .replace(/\banyar\b/g, 'new')
            .replace(/\bcobi\b/g, 'try')
            .replace(/\btangkep\b/g, 'catch')
            .replace(/\bakhirnye\b/g, 'finally')
            .replace(/\blempar\b/g, 'throw');
    }

    monaco.languages.register({ id: 'betascript' });

    monaco.languages.setMonarchTokensProvider('betascript', {
        keywords: [
            'ane', 'ente', 'tetep', 'betoel', 'kaga', 'kosong', 'entah',
            'kalo', 'kagaknye', 'udah_gituh', 'selagi', 'itung', 'saban', 'dalem', 'dah', 'lanjut',
            'pilih', 'kalo_gini', 'bodo_amat', 'bikin', 'kasoh', 'sabut', 'nanti', 'tungguin',
            'cetak', 'turun', 'ikut', 'mula', 'gua', 'punye', 'babang', 'anyar', 'diem', 'statik',
            'cobi', 'tangkep', 'akhirnye', 'lempar', 'ambil', 'dari',
            'teriak', 'bisik', 'dengerin', 'sebrapa', 'ape', 'itungan', 'omongan', 'kumpulin', 'acak', 'tidur'
        ],
        operators: [
            '++', '--', '**', '&&', '||', '===', '!==', '==', '!=', '>=', '<='
        ],
        tokenizer: {
            root: [
                [/\/\/.*/, 'comment'],
                [/\/\*[\s\S]*?\*\//, 'comment'],
                [/\b[a-zA-Z_][\w]*\b/, {
                    cases: {
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }],
                [/\d+/, 'number'],
                [/"[^"]*"/, 'string'],
                [/'[^']*'/, 'string'],
                [/[+*/\-=<>!&|]+/, 'operator']
            ]
        }
    });

    monaco.languages.registerCompletionItemProvider('betascript', {
        provideCompletionItems: () => ({
            suggestions: [
                snippet('bikin', 'bikin ${1:nama}(${2:params}) {\n\t${3:// kode}\n}', 'Function declaration'),
                snippet('kalo', 'kalo (${1:kondisi}) {\n\t${2:// kode}\n}', 'If statement'),
                snippet('kagaknye', 'kalo (${1:kondisi}) {\n\t${2:kode}\n} kagaknye (${3:kondisi}) {\n\t${4:kode}\n}', 'Else-if statement'),
                snippet('selagi', 'selagi (${1:kondisi}) {\n\t${2:// kode}\n}', 'While loop'),
                snippet('itung', 'itung (ane ${1:i} = 0; ${1:i} < ${2:batas}; ${1:i}++) {\n\t${3:// kode}\n}', 'For loop'),
                snippet('cetak', 'cetak ${1:NamaKelas} {\n\tmula(${2:params}) {\n\t\t${3:// inisialisasi}\n\t}\n}', 'Class declaration'),
                snippet('cobi', 'cobi {\n\t${1:// kode}\n} tangkep (${2:error}) {\n\t${3:// penanganan error}\n}', 'Try-catch block'),
                snippet('ambil', 'ambil ${1:nama} dari "${2:path}";', 'Import statement'),
                snippet('pilih', 'pilih (${1:ekspresi}) {\n\tkalo_gini ${2:nilai}:\n\t\t${3:// kode}\n\tbodo_amat:\n\t\t${4:// kode}\n}', 'Switch statement'),
                keyword('teriak', 'Print line'),
                keyword('betoel', 'Boolean true'),
                keyword('kaga', 'Boolean false'),
                keyword('kosong', 'Null value')
            ]
        })
    });

    function snippet(label, insertText, documentation) {
        return {
            label,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation
        };
    }

    function keyword(label, documentation) {
        return {
            label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: label,
            documentation
        };
    }

    document.getElementById('run-btn')?.addEventListener('click', runCode);
    document.getElementById('clear-btn')?.addEventListener('click', clearOutput);
    document.getElementById('tutorial-btn')?.addEventListener('click', showTutorial);
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, runCode);
    showTutorial();
    window.runBetaScript = runCode;
});
