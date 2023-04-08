class Fibonacci {
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }

    // Retorna o valor
    yield current;

    // Delega a função, mas não retorna valor
    yield* this.execute(input - 1, next, current + next);
  }

  /**
   * Entrada: 5
   * 5 0 1
   * 4 1 1
   * 3 1 2
   * 2 2 3
   * 1 3 5
   * 0
   */
}

module.exports = Fibonacci;
