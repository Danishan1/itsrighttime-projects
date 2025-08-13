import { estimateInHandSalary } from "./estimateInhandSalary.js";
import { estimateTaxRate } from "./estimateTax.js";

// Function to estimate the Basic Salary based on the in-hand salary (I) and benefits
export function estimateBasicSalary(I, benefits, deductions, isDebug = false) {
  // Step 1: Calculate the estimated tax (T) using the tax rate
  const totalBenefits = benefits.reduce((sum, benefit) => sum + benefit, 0);
  const totalDeductions = deductions.reduce(
    (sum, deduction) => sum + deduction.rate,
    0
  );

  const tolerance = 500; // Allowable margin of error (e.g., ₹500)

  // Loop to adjust the Basic Salary estimate
  let diff = 1000; // Initial difference to enter the loop
  let taxRate = 0;
  let count = 0;
  let basicSalary = 0;
  let additionalBenefits = 0;

  while (Math.abs(diff) > tolerance) {
    // Step 2: Estimate the Taxable Income (TI)

    const finalBenefits = totalBenefits + additionalBenefits;

    const TI = I + finalBenefits - totalDeductions * I;

    // Step 3: Estimate the tax rate based on taxable income
    taxRate = estimateTaxRate(TI);

    basicSalary =
      (I + (taxRate - 1) * finalBenefits) /
      (1 - totalDeductions) /
      (1 - taxRate);

    const calculatedInhandSalary = estimateInHandSalary(
      basicSalary,
      [...benefits, additionalBenefits],
      deductions,
      isDebug
    );

    diff = I - calculatedInhandSalary;

    const diffPos = Math.abs(diff);

    // If the difference is too high, adjust B_estimate
    if (diffPos > tolerance) {
      if (diff > 0) additionalBenefits += diffPos / 2;
      else additionalBenefits -= diffPos / 2;
    }

    if (isDebug) {
      console.log(`\n~~ Progress Count: ${count++} ~~`);
      console.log(`Base Salary: ₹${basicSalary.toFixed(2)}`);
      console.log(`Additonal Benifits: ₹${additionalBenefits.toFixed(2)}`);
      console.log(`Final Benefits: ₹${finalBenefits.toFixed(2)}`);
      console.log(
        `Calculative In-Hand Salary: ₹${calculatedInhandSalary.toFixed(2)}`
      );
      console.log(`Difference: ₹${diff.toFixed(2)}`);
    }
  }

  if (isDebug) {
    console.log(`\n~~ Final Results ~~`);
    console.log(`\nIn-Hand Salary: ₹${I.toFixed(2)}`);
    console.log(`Tax Rate: ${(taxRate * 100).toFixed(2)}%`);
    console.log(`Total Deductions (%): ${(totalDeductions * 100).toFixed(2)}%`);
    console.log(`Final Base Salary: ₹${basicSalary.toFixed(2)}`);
    console.log(`Additonal Benifits: ₹${additionalBenefits.toFixed(2)}`);
  }

  // Return the estimated Basic Salary and the tax rate
  return { basicSalary, additionalBenefits };
}

// // Example usage:
// const I = 60000; // In-hand Salary
// const benefits = [20000, 10000, 5000]; // Array of Benefits (e.g., HRA, Special Allowance, etc.)
// const deductions = [
//   { name: 'PF', rate: 0.12 },  // PF: 12% of Basic Salary
//   { name: 'ESI', rate: 0.0075 }  // ESI: 0.75% of Basic Salary
// ];

// const result = estimateBasicSalary(I, benefits, deductions);
// console.log(`Estimated Basic Salary (B): ₹${result.B_estimate}`);
// console.log(`Estimated Tax Rate: ${(result.tax_rate * 100).toFixed(2)}%`);
