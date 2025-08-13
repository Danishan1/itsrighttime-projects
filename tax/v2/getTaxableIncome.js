// Function to calculate taxable income based on the current estimate of Basic Salary
export function getTaxableIncome(
  basicSalary,
  benefits,
  deductions,
  isDebug = false
) {
  // Step 1: Calculate the estimated tax (T) using the tax rate
  const monthlyBenefits = benefits.reduce((sum, benefit) => sum + benefit, 0);
  const monthlyDeductions = deductions.reduce(
    (sum, deduction) => sum + deduction,
    0
  );
  // Calculate Taxable Income (TI)
  const monthlyTaxableIncome =
    basicSalary + monthlyBenefits - monthlyDeductions;

  if (isDebug) {
    console.log(`\n~~ Taxable Income ~~`);
    console.log(`Salary: ₹${basicSalary.toFixed(2)}`);
    console.log(`Total Benefits: ₹${monthlyBenefits.toFixed(2)}`);
    console.log(`Total Deductions: ₹${monthlyDeductions.toFixed(2)}`);
    console.log(`Taxable Income (TI): ₹${monthlyTaxableIncome.toFixed(2)}`);
  }

  return monthlyTaxableIncome * 12; // Return annual taxable income
}
