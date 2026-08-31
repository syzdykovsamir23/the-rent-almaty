/** Prices are always shown in tenge with thin-space grouping: 17 000 ₸ */
export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("en-US").format(value).replace(/,/g, " ")} ₸`;
}
