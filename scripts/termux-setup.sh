#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

echo "[*] BetaScript Termux Setup"
echo "[*] Updating package lists..."
pkg update -y

echo "[*] Installing Node.js LTS, Clang, Make..."
pkg install -y nodejs-lts clang make

echo "[*] Upgrading npm..."
npm install -g npm@latest

echo "[*] Setting up Termux storage access..."
termux-setup-storage

echo "[*] Cloning BetaScript repository..."
if [ ! -d "$HOME/betascript" ]; then
  git clone https://github.com/USERNAME/betascript.git "$HOME/betascript" || {
    echo "[!] Git clone failed. Please install the package manually."
    exit 1
  }
fi

cd "$HOME/betascript"

echo "[*] Installing BetaScript globally..."
npm install -g .

echo "[*] Creating alias 'beta' for betascript..."
SHELL_RC="$HOME/.bashrc"
if [ -n "${BASH_VERSION:-}" ] || [ -f "$SHELL_RC" ]; then
  :
elif [ -n "${ZSH_VERSION:-}" ]; then
  SHELL_RC="$HOME/.zshrc"
elif [ -n "$FISH_VERSION" ]; then
  SHELL_RC="$HOME/.config/fish/config.fish"
  alias_line='alias beta "betascript"'
else
  SHELL_RC="$HOME/.profile"
  alias_line='alias beta="betascript"'
fi

if [ -n "${ZSH_VERSION:-}" ] || [ -n "${FISH_VERSION:-}" ]; then
  if [ -n "${ZSH_VERSION:-}" ]; then
    alias_line='alias beta="betascript"'
  fi
  if ! grep -qF "alias beta=" "$SHELL_RC" 2>/dev/null; then
    echo "$alias_line" >> "$SHELL_RC"
    echo "[*] Alias added to $SHELL_RC"
  fi
else
  if ! grep -qF 'alias beta="betascript"' "$SHELL_RC" 2>/dev/null; then
    echo 'alias beta="betascript"' >> "$SHELL_RC"
    echo "[*] Alias added to $SHELL_RC"
  fi
fi

echo "[*] Verifying installation..."
if command -v betascript >/dev/null 2>&1; then
  echo "[+] BetaScript installed successfully!"
  echo "    Version: $(betascript --version 2>/dev/null || echo 'unknown')"
  echo "    Path: $(command -v betascript)"
else
  echo "[!] Installation may have failed. Try restarting your shell."
  exit 1
fi

echo ""
echo "[*] Setup complete!"
echo "    Run 'source ~/.bashrc' (or your shell rc) or restart Termux."
echo "    Then use 'beta <file.beta>' to run BetaScript files."
echo "    Use 'beta help' for more commands."
