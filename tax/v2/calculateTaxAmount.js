// Import necessary functions
import { getBenefits } from "./getBenifits.js";
import { getDeductions } from "./getDeductions.js";
import { getTaxableIncome } from "./getTaxableIncome.js";

export const calculateTaxFromSalary = (salary, isDebug = false) => {
  // Step 1: Get benefits and deductions based on the salary
  const benefits = getBenefits(salary);
  const deductions = getDeductions(salary);

  // Step 2: Calculate taxable income
  const TI = getTaxableIncome(
    salary,
    Object.values(benefits),
    Object.values(deductions),
    isDebug
  );

  // Step 3: Calculate the tax amount
  const taxAmount = calculateTaxFromIncome(TI);

  return {
    taxableIncome: TI,
    taxRate,
    taxAmount,
    benefits,
    deductions,
  };
};

export function getTaxSlabsAndRatios() {
  return [
    { slab: 250000, rate: 0 }, // Up to ₹2.5 Lakhs - No Tax
    { slab: 500000, rate: 0.05 }, // ₹2.5 Lakhs to ₹5 Lakhs - 5%
    { slab: 1000000, rate: 0.2 }, // ₹5 Lakhs to ₹10 Lakhs - 20%
    { slab: Infinity, rate: 0.3 }, // Above ₹10 Lakhs - 30%
  ];
}

export const getSlabsAmountAndRate = (income) => {
  const taxSlabs = getTaxSlabsAndRatios();
  let remainingIncome = income;
  let slabAmount = [];

  for (let i = 0; i < taxSlabs.length; i++) {
    const currentSlab = taxSlabs[i];
    const nextSlab = taxSlabs[i + 1];

    // Calculate the taxable income for this slab
    if (remainingIncome > currentSlab.slab) {
      const taxableIncome = Math.min(
        remainingIncome - currentSlab.slab,
        nextSlab ? nextSlab.slab - currentSlab.slab : remainingIncome
      );
      slabAmount.push({
        amount: taxableIncome,
        rate: currentSlab.rate,
      });
      remainingIncome -= taxableIncome;
    }

    // Stop if income is exhausted
    if (remainingIncome <= 0) break;
  }

  return slabAmount;
};

export function calculateTaxFromIncome(income) {
  const taxSlabs = getTaxSlabsAndRatios();
  let remainingIncome = income;
  let totalTax = 0;

  for (let i = 0; i < taxSlabs.length; i++) {
    const currentSlab = taxSlabs[i];
    const nextSlab = taxSlabs[i + 1];

    // Calculate the taxable income for this slab
    if (remainingIncome > currentSlab.slab) {
      const taxableIncome = Math.min(
        remainingIncome - currentSlab.slab,
        nextSlab ? nextSlab.slab - currentSlab.slab : remainingIncome
      );
      totalTax += taxableIncome * currentSlab.rate;
      remainingIncome -= taxableIncome;
    }

    // Stop if income is exhausted
    if (remainingIncome <= 0) break;
  }

  console.log(`~~ Tax Calculation ~~`);
  console.log(`Income: ₹${income.toFixed(2)} ------------------------- TODO`); 
  console.log(`Total Tax Calculated: ₹${totalTax.toFixed(2)}`); 


  return totalTax;
}
