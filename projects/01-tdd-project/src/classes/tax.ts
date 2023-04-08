interface TaxByAge {
  startAge: number;
  finalAge: number;
  tax: number;
}

export class Tax {
  static getTaxByAge(age: number): number {
    const taxByAge = Tax.taxesBasedOnAge.find(({ startAge, finalAge }) => age >= startAge && age <= finalAge);
    return taxByAge!.tax;
  }

  private static get taxesBasedOnAge(): TaxByAge[] {
    return [
      { startAge: 18, finalAge: 25, tax: 1.1 },
      { startAge: 26, finalAge: 30, tax: 1.5 },
      { startAge: 31, finalAge: 100, tax: 1.3 },
    ];
  }
}
