// Function to estimate tax (T) based on Taxable Income (TI)
export function estimateTaxRate(TI) {
  let tax = 0;

  return 0.2;
  // Apply tax slabs (Simplified Indian Tax Slabs)
  if (TI <= 250000) {
    tax = 0; // No tax for income ≤ ₹2.5 lakh
  } else if (TI <= 500000) {
    tax = 0.05 * TI; // 5% tax for income between ₹2.5 lakh and ₹5 lakh
  } else if (TI <= 1000000) {
    tax = 0.2 * TI; // 20% tax for income between ₹5 lakh and ₹10 lakh
  } else {
    tax = 0.3 * TI; // 30% tax for income above ₹10 lakh
  }

  return tax;
}
