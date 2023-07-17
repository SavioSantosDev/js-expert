export class FormatUtil {
  static fromLanguage(language: string): FormatUtil {
    return new FormatUtil(language);
  }

  constructor(private readonly language: string) {}

  formatToDate = (date: Date) => {
    return new Intl.DateTimeFormat(this.language, { month: 'long', day: '2-digit', year: 'numeric' }).format(date);
  };

  formatToKilometer = (value: number): string => {
    return new Intl.NumberFormat(this.language, { style: 'unit', unit: 'kilometer' }).format(value);
  };

  unionValues = (values: string[]): string => {
    return new Intl.ListFormat(this.language, { style: 'long', type: 'conjunction' }).format(values);
  };

  capitalize = (value: string): string =>
    value.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());
}
