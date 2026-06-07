import * as vscode from 'vscode';
import { spawn } from 'child_process';
import { resolve } from 'path';

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel('BetaScript');

    const runFileCommand = vscode.commands.registerCommand('betascript.runFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const document = editor.document;
        const filePath = document.fileName;

        outputChannel.show(true);
        outputChannel.appendLine(`Running ${filePath}...`);

        const betaPath = resolve(__dirname, '../../..', 'bin', 'betascript.js');
        
        const child = spawn('node', [betaPath, filePath], {
            cwd: resolve(__dirname, '../../..')
        });

        child.stdout.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.stderr.on('data', (data) => {
            outputChannel.append(data.toString());
        });

        child.on('close', (code) => {
            outputChannel.appendLine(`\nProcess exited with code ${code}`);
        });
    });

    const transpileCommand = vscode.commands.registerCommand('betascript.transpileToJS', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor');
            return;
        }

        const document = editor.document;
        const code = document.getText();

        // Basic transpilation to JavaScript
        const jsCode = code
            .replace(/\bangka\b/g, 'let')
            .replace(/\bkata\b/g, 'let')
            .replace(/\btetep\b/g, 'const')
            .replace(/\bane\b/g, 'let')
            .replace(/\bkaga\b/g, 'false')
            .replace(/\bbetoel\b/g, 'true')
            .replace(/\bkosong\b/g, 'null')
            .replace(/\bkaga_ada\b/g, 'undefined')
            .replace(/\bkalo\b/g, 'if')
            .replace(/\bkagaknye\b/g, 'else if')
            .replace(/\budah_gituh\b/g, 'else')
            .replace(/\bselagi\b/g, 'while')
            .replace(/\bitung\b/g, 'for')
            .replace(/\bsaban\b/g, 'for')
            .replace(/\bdah\b/g, 'break')
            .replace(/\blanjut\b/g, 'continue')
            .replace(/\bbodo_amat\b/g, 'default')
            .replace(/\bpilih\b/g, 'switch')
            .replace(/\bkalo_gini\b/g, 'case')
            .replace(/\bbikin\b/g, 'function')
            .replace(/\bnanti\b/g, 'async function')
            .replace(/\bkasoh\b/g, 'return')
            .replace(/\bcetak\b/g, 'class')
            .replace(/\bturun\b/g, 'extends')
            .replace(/\bikut\b/g, 'extends')
            .replace(/\bmula\b/g, 'constructor')
            .replace(/\bgua\b/g, 'this')
            .replace(/\bpunye\b/g, '.')
            .replace(/\bbabang\b/g, 'super')
            .replace(/\banyar\b/g, 'new')
            .replace(/\bstatik\b/g, 'static')
            .replace(/\bcoba\b/g, 'try')
            .replace(/\btangkep\b/g, 'catch')
            .replace(/\bahkirnye\b/g, 'finally')
            .replace(/\blempar\b/g, 'throw')
            .replace(/\bambil\b/g, 'import')
            .replace(/\bkasoh\b/g, 'export')
            .replace(/\bdari\b/g, 'from');

        vscode.workspace.openTextDocument({
            content: jsCode,
            language: 'javascript'
        }).then(doc => {
            vscode.window.showTextDocument(doc);
        });
    });

    context.subscriptions.push(runFileCommand, transpileCommand);
}

export function deactivate() {}