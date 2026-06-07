#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const cliPath = path.join(__dirname, '..', 'dist', 'src', 'cli.js');

if (args.length === 0 || args[0] === 'help' || args[0] === '-h' || args[0] === '--help') {
  console.log(`BetaScript Compiler - Ngoding rasa Betawi, kagak ribet!
  
Usage:
  betascript <command> [options]

Commands:
  compile <file.beta>    Compile BetaScript to JavaScript
  run <file.beta>      Compile and run BetaScript
  help                 Show this help message
`);
} else {
  require('../dist/src/cli.js');
}