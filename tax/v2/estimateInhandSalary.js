import { calculateTaxFromIncome } from "./calculateTaxAmount.js";
import { estimateTaxRate } from "./estimateTax.js";
import { getTaxableIncome } from "./getTaxableIncome.js";

export function estimateInHandSalary(B, benefits, deductions, isDebug = false) {
  const yearlyTaxableIncome = getTaxableIncome(
    B,
    benefits,
    deductions,
    isDebug
  );

  // Step 4: Estimate the tax (T) based on taxable income (TI)
  const yearlyTaxAmount = calculateTaxFromIncome(yearlyTaxableIncome);

  // Step 5: Calculate the In-Hand Salary (I)
  const yearlyInHandSalary = yearlyTaxableIncome - yearlyTaxAmount;

  return yearlyInHandSalary;
}

// // Example usage:
// const B = 50000;  // Basic Salary
// const benefits = [15000, 10000, 5000];  // Array of Benefits (e.g., HRA, Special Allowance, etc.)
// const deductions = [
//     { name: 'PF', rate: 0.12 },  // PF: 12% of Basic Salary
//     { name: 'ESI', rate: 0.0075 }  // ESI: 0.75% of Basic Salary
// ];

// const inHandSalary = estimateInHandSalary(B, benefits, deductions);
// console.log(`Estimated In-Hand Salary: ₹${inHandSalary.toFixed(2)}`);
// //
