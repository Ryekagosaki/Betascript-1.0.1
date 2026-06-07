import { SourceLocation } from "./SourceLocation";

export class BetaError extends Error {
  constructor(
    public readonly message: string,
    public readonly position: SourceLocation,
    public readonly filename?: string
  ) {
    super(`${filename ?? position.filename ?? "unknown"}:${position.line}:${position.column}: ${message}`);
    this.name = "BetaError";
  }

  static unexpectedToken(token: string, position: SourceLocation, filename?: string): BetaError {
    return new BetaError(`Unexpected token: '${token}'`, position, filename);
  }

  static expected(identifier: string, position: SourceLocation, filename?: string): BetaError {
    return new BetaError(`Expected ${identifier}`, position, filename);
  }

  static undefinedVariable(name: string, position: SourceLocation, filename?: string): BetaError {
    return new BetaError(`Undefined variable: '${name}'`, position, filename);
  }

  static syntaxError(message: string, position: SourceLocation, filename?: string): BetaError {
    return new BetaError(`Syntax error: ${message}`, position, filename);
  }
}