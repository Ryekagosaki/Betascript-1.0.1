const { createConnection, TextDocuments, ProposedFeatures, TextDocument, Position, CompletionItem, CompletionItemKind, Diagnostic, DiagnosticSeverity, Range, SymbolInformation, SymbolKind, Hover } = require('vscode-languageserver');
const { readFileSync, existsSync } = require('fs');
const { resolve, dirname, basename, extname } = require('path');

const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
  capabilities: {
    textDocumentSync: {
      openClose: true,
      change: TextDocuments.synchronizeKind.Incremental,
      willSave: true,
      willSaveWaitUntil: true,
      save: {
        includeText: true
      }
    },
    completionProvider: {
      resolveProvider: true,
      triggerCharacters: ['.', '=', '(', '[', ',', '<', ':']
    },
    hoverProvider: true,
    documentSymbolProvider: true,
    definitionProvider: true,
    referencesProvider: true
  }
}));

const keywords = [
  { label: 'ane', kind: CompletionItemKind.Keyword, detail: 'Variable declaration' },
  { label: 'ente', kind: CompletionItemKind.Keyword, detail: 'Parameter marker' },
  { label: 'tetep', kind: CompletionItemKind.Keyword, detail: 'Constant declaration' },
  { label: 'betoel', kind: CompletionItemKind.Keyword, detail: 'Boolean true' },
  { label: 'kaga', kind: CompletionItemKind.Keyword, detail: 'Boolean false' },
  { label: 'kosong', kind: CompletionItemKind.Keyword, detail: 'Null value' },
  { label: 'entah', kind: CompletionItemKind.Keyword, detail: 'Undefined value' },
  { label: 'angka', kind: CompletionItemKind.Keyword, detail: 'Number type' },
  { label: 'kata', kind: CompletionItemKind.Keyword, detail: 'String type' },
  { label: 'tungguin', kind: CompletionItemKind.Keyword, detail: 'Await expression' },
  { label: 'kalo', kind: CompletionItemKind.Keyword, detail: 'If statement' },
  { label: 'kagaknye', kind: CompletionItemKind.Keyword, detail: 'Else-if clause' },
  { label: 'udah_gituh', kind: CompletionItemKind.Keyword, detail: 'Else clause' },
  { label: 'selagi', kind: CompletionItemKind.Keyword, detail: 'While loop' },
  { label: 'itung', kind: CompletionItemKind.Keyword, detail: 'For loop' },
  { label: 'saban', kind: CompletionItemKind.Keyword, detail: 'For-of loop' },
  { label: 'dah', kind: CompletionItemKind.Keyword, detail: 'Break statement' },
  { label: 'lanjut', kind: CompletionItemKind.Keyword, detail: 'Continue statement' },
  { label: 'bodo_amat', kind: CompletionItemKind.Keyword, detail: 'Default clause' },
  { label: 'pilih', kind: CompletionItemKind.Keyword, detail: 'Switch statement' },
  { label: 'kalo_gini', kind: CompletionItemKind.Keyword, detail: 'Case clause' },
  { label: 'bikin', kind: CompletionItemKind.Keyword, detail: 'Function declaration' },
  { label: 'nanti', kind: CompletionItemKind.Keyword, detail: 'Async function' },
  { label: 'kasoh', kind: CompletionItemKind.Keyword, detail: 'Return/export statement' },
  { label: 'cetak', kind: CompletionItemKind.Keyword, detail: 'Class declaration' },
  { label: 'turun', kind: CompletionItemKind.Keyword, detail: 'Extends clause' },
  { label: 'ikut', kind: CompletionItemKind.Keyword, detail: 'Implements clause' },
  { label: 'mula', kind: CompletionItemKind.Keyword, detail: 'Constructor method' },
  { label: 'gua', kind: CompletionItemKind.Keyword, detail: 'This reference' },
  { label: 'punye', kind: CompletionItemKind.Keyword, detail: 'Member access' },
  { label: 'babang', kind: CompletionItemKind.Keyword, detail: 'Super reference' },
  { label: 'anyar', kind: CompletionItemKind.Keyword, detail: 'New expression' },
  { label: 'diem', kind: CompletionItemKind.Keyword, detail: 'Private modifier' },
  { label: 'statik', kind: CompletionItemKind.Keyword, detail: 'Static modifier (alternative)' },
  { label: 'cobi', kind: CompletionItemKind.Keyword, detail: 'Try block' },
  { label: 'tangkep', kind: CompletionItemKind.Keyword, detail: 'Catch block' },
  { label: 'akhirnye', kind: CompletionItemKind.Keyword, detail: 'Finally block' },
  { label: 'lempar', kind: CompletionItemKind.Keyword, detail: 'Throw statement' },
  { label: 'ambil', kind: CompletionItemKind.Keyword, detail: 'Import statement' },
  { label: 'dari', kind: CompletionItemKind.Keyword, detail: 'From clause' },
  { label: 'teriak', kind: CompletionItemKind.Function, detail: 'Print line' },
  { label: 'bisik', kind: CompletionItemKind.Function, detail: 'Write output' },
  { label: 'dengerin', kind: CompletionItemKind.Function, detail: 'Read input' },
  { label: 'sebrapa', kind: CompletionItemKind.Function, detail: 'Length helper' },
  { label: 'ape', kind: CompletionItemKind.Function, detail: 'Type helper' },
  { label: 'itungan', kind: CompletionItemKind.Function, detail: 'Number helper' },
  { label: 'omongan', kind: CompletionItemKind.Function, detail: 'String helper' },
  { label: 'kumpulin', kind: CompletionItemKind.Function, detail: 'Array helper' },
  { label: 'acak', kind: CompletionItemKind.Function, detail: 'Random helper' },
  { label: 'tidur', kind: CompletionItemKind.Function, detail: 'Sleep helper' }
];

connection.onCompletion(
  (textDocument, position) => {
    const doc = documents.get(textDocument.uri);
    const completions = [];
    const text = doc ? doc.getText() : '';
    
    const lines = text.split('\n');
    const line = lines[position.line] || '';
    const wordRange = doc ? doc.getWordRangeAtPosition(position) : null;
    const word = wordRange ? doc.getText(wordRange) : '';

    const allKeywords = keywords.filter(k => k.label.includes(word));
    completions.push(...allKeywords);

    if (text.includes('cetak')) {
      completions.push(
        { label: 'mula', kind: CompletionItemKind.Constructor, detail: 'Constructor method' },
        { label: 'gua', kind: CompletionItemKind.Keyword, detail: 'This reference' }
      );
    }

    return completions;
  }
);

connection.onHover(
  (textDocument, position) => {
    const doc = documents.get(textDocument.uri);
    if (!doc) return null;

    const wordRange = doc.getWordRangeAtPosition(position);
    if (!wordRange) return null;

    const word = doc.getText(wordRange);
    const keyword = keywords.find(k => k.label === word.toLowerCase());

    if (keyword) {
      return {
        contents: {
          kind: 'markdown',
          value: `**${keyword.label}**\n\n${keyword.detail}`
        }
      };
    }

    return null;
  }
);

connection.onDocumentSymbol(
  (textDocument) => {
    const doc = documents.get(textDocument.uri);
    if (!doc) return [];

    const symbols = [];
    const text = doc.getText();
    const lines = text.split('\n');

    const functionRegex = /^bikin\s+(\w+)/gm;
    let match;
    while ((match = functionRegex.exec(text)) !== null) {
      const line = text.substring(0, match.index).split('\n').length;
      symbols.push({
        name: match[1],
        kind: SymbolKind.Function,
        location: {
          uri: textDocument.uri,
          range: Range.create(position(line - 1, 0), position(line - 1, match[0].length))
        }
      });
    }

    const classRegex = /^cetak\s+(\w+)/gm;
    while ((match = classRegex.exec(text)) !== null) {
      const line = text.substring(0, match.index).split('\n').length;
      symbols.push({
        name: match[1],
        kind: SymbolKind.Class,
        location: {
          uri: textDocument.uri,
          range: Range.create(position(line - 1, 0), position(line - 1, match[0].length))
        }
      });
    }

    return symbols;
  }
);

documents.listen(connection);
connection.listen();
