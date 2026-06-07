(function () {
  const PLUGIN_NAME = "betascript-acode";
  let editor = null;
  let worker = null;
  let runButton = null;
  let outputPanel = null;

  const CSS_ID = "betascript-plugin-style";
  const RUN_BUTTON_ID = "betascript-run-btn";
  const OUTPUT_PANEL_ID = "betascript-output-panel";

  function injectStyles() {
    if (document.getElementById(CSS_ID)) return;
    const style = document.createElement("style");
    style.id = CSS_ID;
    style.textContent = `
      .${RUN_BUTTON_ID} {
        position: fixed;
        bottom: 72px;
        right: 16px;
        z-index: 99999;
        background: #ffd700;
        color: #000;
        border: 2px solid #000;
        border-radius: 8px;
        padding: 10px 18px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
        user-select: none;
      }
      .${RUN_BUTTON_ID}:hover {
        background: #ffe44d;
      }
      .${OUTPUT_PANEL_ID} {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-height: 40%;
        background: #1e1e1e;
        color: #d4d4d4;
        font-family: monospace;
        font-size: 13px;
        overflow-y: auto;
        z-index: 99999;
        border-top: 2px solid #ffd700;
        display: none;
      }
      .${OUTPUT_PANEL_ID}__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 12px;
        background: #252526;
        border-bottom: 1px solid #333;
      }
      .${OUTPUT_PANEL_ID}__body {
        padding: 10px 12px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .${OUTPUT_PANEL_ID}__error {
        color: #f48771;
      }
      .${OUTPUT_PANEL_ID}__success {
        color: #89d185;
      }
    `;
    document.head.appendChild(style);
  }

  function createRunButton() {
    if (runButton) return;
    runButton = document.createElement("button");
    runButton.className = RUN_BUTTON_ID;
    runButton.innerText = "▶ Run BetaScript";
    runButton.addEventListener("click", () => {
      const code = getActiveEditorCode();
      if (code !== null) {
        runCode(code);
      }
    });
    document.body.appendChild(runButton);
  }

  function createOutputPanel() {
    if (outputPanel) return;
    outputPanel = document.createElement("div");
    outputPanel.className = OUTPUT_PANEL_ID;
    outputPanel.innerHTML = `
      <div class="${OUTPUT_PANEL_ID}__header">
        <span>BetaScript Output</span>
        <span style="cursor:pointer" id="betascript-close-panel">✕</span>
      </div>
      <div class="${OUTPUT_PANEL_ID}__body"></div>
    `;
    document.body.appendChild(outputPanel);
    outputPanel.querySelector(`#betascript-close-panel`).addEventListener("click", () => {
      outputPanel.style.display = "none";
    });
  }

  function initWorker() {
    if (worker) return;
    try {
      worker = new Worker("src/worker.js");
      worker.onmessage = (e) => {
        const { type, payload } = e.data;
        if (type === "compiled") {
          writeOutput(`// Compiled JS:\n${payload.code}\n\nRunning...\n`, "success");
          try {
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => {
              logs.push(args.map(a => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "));
              originalLog.apply(console, args);
            };
            new Function(payload.code)();
            console.log = originalLog;
            if (logs.length > 0) {
              writeOutput(logs.join("\n"), "success");
            } else {
              writeOutput("(no output)", "success");
            }
          } catch (err) {
            writeOutput(`Runtime error: ${err.message}\n${err.stack || ""}`, "error");
          }
        } else if (type === "error") {
          writeOutput(`Compile error: ${payload.message}`, "error");
          if (payload.range) {
            highlightErrorRange(payload.range);
          }
        } else if (type === "panic") {
          writeOutput(`Worker panic: ${payload.message}`, "error");
        }
      };
    } catch (err) {
      writeOutput(`Failed to init worker: ${err.message}`, "error");
    }
  }

  function getActiveEditorCode() {
    if (typeof acode !== "undefined" && acode.action) {
      try {
        return acode.action("getActiveEditor").value;
      } catch (_) {
        // fallback below
      }
    }
    if (editor) return editor.getText();
    if (document.querySelector && document.querySelector("[contenteditable]")) {
      return document.querySelector("[contenteditable]").innerText;
    }
    return null;
  }

  function runCode(source) {
    if (!worker) initWorker();
    showOutputPanel();
    writeOutput("Compiling...", "success");
    worker.postMessage({ type: "compile", source });
  }

  function writeOutput(message, kind = "success") {
    if (!outputPanel) createOutputPanel();
    outputPanel.style.display = "block";
    const body = outputPanel.querySelector(`.${OUTPUT_PANEL_ID}__body`) || outputPanel.lastElementChild;
    const line = document.createElement("div");
    line.className = kind === "error" ? `${OUTPUT_PANEL_ID}__error` : `${OUTPUT_PANEL_ID}__success`;
    line.textContent = message;
    body.appendChild(line);
    outputPanel.scrollTop = outputPanel.scrollHeight;
  }

  function highlightErrorRange(range) {
    if (!editor || !editor.somethingSelected || !editor.discardToken) {
      return;
    }
    try {
      const line = range.start.line - 1;
      editor.setCursor({ line, ch: range.start.column || 0 });
      editor.setSelection({ line, ch: range.start.column || 0 }, { line, ch: range.end.column || 0 });
    } catch (_) {}
  }

  function showOutputPanel() {
    createOutputPanel();
    outputPanel.style.display = "block";
  }

  acode?.?.ready?.()?.({
    name: PLUGIN_NAME,
    background: false,
    init: function () {
      injectStyles();
      createRunButton();
      createOutputPanel();
      initWorker();
    },
    onFileSelected: function () {
      runButton.style.display = "block";
    },
    onEditorChanged: function (e) {
      if (e && e.editor && e.editor.getText) {
        editor = e.editor;
      }
    },
    onClose: function () {
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (runButton && runButton.parentNode) {
        runButton.parentNode.removeChild(runButton);
      }
      if (outputPanel && outputPanel.parentNode) {
        outputPanel.parentNode.removeChild(outputPanel);
      }
      outputPanel = null;
      worker = null;
      runButton = null;
    }
  });
})();
