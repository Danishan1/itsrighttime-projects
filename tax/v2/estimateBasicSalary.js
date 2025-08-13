import { calculateTaxFromIncome } from "./calculateTaxAmount.js";
import { estimateInHandSalary } from "./estimateInhandSalary.js";
import { getBenefits } from "./getBenifits.js";
import { getDeductions } from "./getDeductions.js";

const NO_OF_YEAR = 12;

// Function to estimate the Basic Salary based on the in-hand salary (I) and benefits
export function estimateBasicSalary(monthlyInhand, isDebug = false) {
  const benefits = Object.values(getBenefits(monthlyInhand));
  const deductions = Object.values(getDeductions(monthlyInhand));

  const yearlyInhand = monthlyInhand * NO_OF_YEAR;

  // Step 1: Calculate the estimated tax (T) using the tax rate
  const monthlyBenefits = benefits.reduce((sum, benefit) => sum + benefit, 0);
  const monthlyDeductions = deductions.reduce(
    (sum, deduction) => sum + deduction,
    0
  );

  const yearlyBenefits = monthlyBenefits * NO_OF_YEAR;
  const yearlyDeductions = monthlyDeductions * NO_OF_YEAR;

  const tolerance = 500; // Allowable margin of error (e.g., ₹500)

  // Loop to adjust the Basic Salary estimate
  let diff = 1000; // Initial difference to enter the loop
  let taxRate = 0;
  let count = 0;
  let yearlBasicSalary = 0;
  let additionalBenefits = 0;

  if (isDebug) {
    console.log(`\n~~ Estimating Basic Salary ~~`);
    console.log(`Monthly In-Hand Salary: ₹${monthlyInhand.toFixed(2)}`);
    console.log(`Monthly Benefits: ₹${monthlyBenefits.toFixed(2)}`);
    console.log(`Monthly Deductions: ₹${monthlyDeductions.toFixed(2)}`);
    console.log(`Yearly In-Hand Salary: ₹${yearlyInhand.toFixed(2)}`);
    console.log(`Yearly Benefits: ₹${yearlyBenefits.toFixed(2)}`);
    console.log(`Yearly Deductions: ₹${yearlyDeductions.toFixed(2)}`);
    console.log(`Tolerance: ₹${tolerance}`);
  }

  while (Math.abs(diff) > tolerance && count < 100) {
    // Step 2: Estimate the Taxable Income (TI)

    const finalBenefits = yearlyBenefits + additionalBenefits;

    const yearlyTaxableIncome = yearlyInhand + finalBenefits - yearlyDeductions;

    const yearlyTaxAmount = calculateTaxFromIncome(yearlyTaxableIncome);

    yearlBasicSalary =
      yearlyInhand - yearlyBenefits + yearlyDeductions + yearlyTaxAmount;

    const calculatedInhand = estimateInHandSalary(
      yearlBasicSalary,
      [...benefits, additionalBenefits / NO_OF_YEAR],
      deductions,
      isDebug
    );

    // TODO : The problem is try different optimization, by this additional
    // benifits reaches too hign in -ve values or +ve values that income goes to -ve values
    diff = yearlyInhand - calculatedInhand;

    const diffPos = Math.abs(diff);

    // If the difference is too high, adjust B_estimate
    if (diffPos > tolerance) {
      if (diff > 0) additionalBenefits += diffPos / 2;
      else additionalBenefits -= diffPos / 2;
    }

    if (isDebug) {
      console.log(
        `\n###--------### ~~ Progress Count: ${count++} ~~  ###--------### `
      );
      console.log(`Yearly Basic Salary: ₹${yearlBasicSalary.toFixed(2)}`);
      console.log(`Additonal Benifits: ₹${additionalBenefits.toFixed(2)}`);
      console.log(`Yearly Taxable Income: ₹${yearlyTaxableIncome.toFixed(2)}`);
      console.log(`Yearly Tax Amount: ₹${yearlyTaxAmount.toFixed(2)}`);
      console.log(`Final Benefits: ₹${finalBenefits.toFixed(2)}`);
      console.log(
        `Calculative In-Hand Salary: ₹${calculatedInhand.toFixed(2)}`
      );
      console.log(`Difference: ₹${diff.toFixed(2)}`);
    }
  }

  if (isDebug) {
    console.log(`\n~~ Final Results ~~`);
    console.log(`\nIn-Hand Salary: ₹${monthlyInhand.toFixed(2)}`);
    console.log(`Tax Rate: ${(taxRate * 100).toFixed(2)}%`);
    console.log(
      `Total Deductions (%): ${(monthlyDeductions * 100).toFixed(2)}%`
    );
    console.log(`Final Base Salary: ₹${yearlBasicSalary.toFixed(2)}`);
    console.log(`Additonal Benifits: ₹${additionalBenefits.toFixed(2)}`);
  }

  if (count >= 100) {
    console.warn(
      "Warning: Maximum iterations reached. Results may not be accurate."
    );
  }

  // Return the estimated Basic Salary and the tax rate
  return {
    success: count < 100,
    basicSalary: yearlBasicSalary,
    additionalBenefits,
  };
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
