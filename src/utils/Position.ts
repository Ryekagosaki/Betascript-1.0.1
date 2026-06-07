export class Position {
  constructor(
    public readonly line: number = 1,
    public readonly column: number = 1
  ) {}

  advance(): Position {
    return new Position(this.line, this.column + 1);
  }

  newline(): Position {
    return new Position(this.line + 1, 1);
  }

  offset(n: number): Position {
    return new Position(this.line, this.column + n);
  }
}