import { estimateBasicSalary } from "./estimateBasicSalary.js";
import { estimateInHandSalary } from "./estimateInhandSalary.js";

// Example usage:
const I = 70000; // In-hand Salary
const benefits = [10000, 5000]; // Array of Benefits (e.g., HRA, Special Allowance, etc.)
const deductions = [
  { name: "PF", rate: 0.12 }, // PF: 12% of Basic Salary
  { name: "ESI", rate: 0.0075 }, // ESI: 0.75% of Basic Salary
];

console.log(`Estimated In-Hand Salary: ₹${inHandSalary.toFixed(2)}`);

// TODO : Consider an edge case where it get stuck in the loop because of ranges in benefits and deductions, 
// like inhand salary comes in some range and base salery comes in other rand then after calaculation this process repoeats

export const calculateSalary = (inHandSalary = 0.0, isDebug=false) => {
  const result = estimateBasicSalary(inHandSalary, isDebug);

  const additionalBenefits = result.additionalBenefits; // Basic Salary

  const inHandSalary = estimateInHandSalary(
    result.basicSalary,
    [...benefits, additionalBenefits],
    deductions,
    true
  );
};
