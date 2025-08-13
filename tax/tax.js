import { estimateBasicSalary } from "./estimateBasicSalary.js";
import { estimateInHandSalary } from "./estimateInhandSalary.js";

// Example usage:
const I = 70000; // In-hand Salary
const benefits = [10000, 5000]; // Array of Benefits (e.g., HRA, Special Allowance, etc.)
const deductions = [
  { name: "PF", rate: 0.12 }, // PF: 12% of Basic Salary
  { name: "ESI", rate: 0.0075 }, // ESI: 0.75% of Basic Salary
];

const result = estimateBasicSalary(I, benefits, deductions, true);

console.log(`\n\nEstimated Basic Salary: ₹${result.basicSalary.toFixed(2)}`);
console.log(`Additional Benifit: ₹${result.additionalBenefits.toFixed(2)}`);
console.log(`\n------------------------------------------------------`);

// Example usage:
const additionalBenefits = result.additionalBenefits; // Basic Salary

const inHandSalary = estimateInHandSalary(
  result.basicSalary,
  [...benefits, additionalBenefits],
  deductions, true
);
console.log(`Estimated In-Hand Salary: ₹${inHandSalary.toFixed(2)}`);
