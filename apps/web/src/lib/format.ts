export function formatNaira(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₦${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  return `₦${amount}`;
}

export function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
