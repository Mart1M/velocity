export function formatPrice(
  value: number,
  locale = "fr-FR",
  currency = "EUR",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatDiscountPercent(
  value: number,
  originalValue: number,
): number | null {
  if (originalValue <= 0 || value >= originalValue) {
    return null;
  }

  return Math.round((1 - value / originalValue) * 100);
}
