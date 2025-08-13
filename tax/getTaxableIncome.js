// Function to calculate taxable income based on the current estimate of Basic Salary
export function getTaxableIncome(
  base_salary,
  benefits,
  deductions,
  isDebug = false
) {
  // Step 1: Calculate the estimated tax (T) using the tax rate
  const totalBenefits = benefits.reduce((sum, benefit) => sum + benefit, 0);
  const totalDeductions = deductions.reduce(
    (sum, deduction) => sum + deduction.rate * base_salary,
    0
  );
  // Calculate Taxable Income (TI)
  const TI = base_salary + totalBenefits - totalDeductions;

  if (isDebug) {
    console.log(`\n~~ Taxable Income ~~`);
    console.log(`Salary: ₹${base_salary.toFixed(2)}`);
    console.log(`Total Benefits: ₹${totalBenefits.toFixed(2)}`);
    console.log(`Total Deductions: ₹${totalDeductions.toFixed(2)}`);
    console.log(`Taxable Income (TI): ₹${TI.toFixed(2)}`);
  }

  return { TI };
}
