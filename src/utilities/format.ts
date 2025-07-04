export function formatDate(utcDate: string): string {
  const date = new Date(utcDate).toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return date;
}

export function numberToDate(
  day: number,
  option?: {
    month_due: boolean;
    payday: number;
  }
): string {
  const date = new Date();
  date.setDate(day);
  if (option?.month_due) {
    if (day > option.payday) {
      date.setMonth(date.getMonth() + 1);
    } else {
      date.setMonth(date.getMonth());
    }
  }

  return date.toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatPrice(value: number) {
  return `$${value.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}`;
}
