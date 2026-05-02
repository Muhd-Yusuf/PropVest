/** Format number as Nigerian Naira: N1,234,567 */
export function formatNaira(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `N${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `N${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `N${amount.toLocaleString('en-NG')}`;
  }
  return `N${amount}`;
}

/** Format number with full comma separation */
export function formatNairaFull(amount: number): string {
  return `N${amount.toLocaleString('en-NG')}`;
}

/** Format percentage */
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
