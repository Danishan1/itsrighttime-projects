export function getTaxRate(taxableIncome) {
  if (taxableIncome <= 250000) return 0;
  if (taxableIncome <= 500000) return 0.05;
  if (taxableIncome <= 1000000) return 0.2;
  return 0.3;
}
