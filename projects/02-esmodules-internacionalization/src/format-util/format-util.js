export default class FormatUtil {
  #language;

  constructor(language) {
    this.#language = language;
  }

  formatToDate = (date) => {
    return new Intl.DateTimeFormat(this.#language, { month: 'long', day: '2-digit', year: 'numeric' }).format(
      this.#mapToDate(date)
    );
  };

  #mapToDate(date) {
    const [year, month, day] = date.split('-').map(Number);
    return new Date(year, month, day);
  }

  formatToKilometer = (value) => {
    return new Intl.NumberFormat(this.#language, { style: 'unit', unit: 'kilometer' }).format(value);
  };

  unionValues = (values) => {
    return new Intl.ListFormat(this.#language, { style: 'long', type: 'conjunction' }).format(values);
  };
}
