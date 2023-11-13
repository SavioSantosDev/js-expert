export class FormatUtil {
  static fromLanguage(language: string): FormatUtil {
    return new FormatUtil(language);
  }

  constructor(private readonly language: string) {}

  formatToDate = (date: Date): string => {
    return this.formatOrEmptyString(date, () =>
      new Intl.DateTimeFormat(this.language, { month: 'long', day: '2-digit', year: 'numeric' }).format(date)
    );
  };

  private formatOrEmptyString<T>(value: T, formater: () => string): string {
    return value ? formater() : '';
  }

  formatToKilometer = (value: number): string => {
    return this.formatOrEmptyString(value, () =>
      new Intl.NumberFormat(this.language, { style: 'unit', unit: 'kilometer' }).format(value)
    );
  };

  unionValues = (values: string[]): string => {
    return this.formatOrEmptyString(values, () =>
      new Intl.ListFormat(this.language, { style: 'long', type: 'conjunction' }).format(values)
    );
  };

  capitalize = (value: string): string => {
    return this.formatOrEmptyString(value, () =>
      value ? value.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase()) : ''
    );
  };
}
