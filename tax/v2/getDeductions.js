export function getDeductions(salary) {
  const salaryRanges = [
    {
      range: [0, 25000],
      deductions: { PF: 0.12, ESI: 0.0075, OtherDeductions: 0 },
    },
    {
      range: [25001, 50000],
      deductions: { PF: 0.12, ESI: 0.0075, OtherDeductions: 500 },
    },
    {
      range: [50001, 75000],
      deductions: { PF: 0.12, ESI: 0.0075, OtherDeductions: 1000 },
    },
    {
      range: [75001, 100000],
      deductions: { PF: 0.12, ESI: 0.0075, OtherDeductions: 1500 },
    },
    {
      range: [100001, Infinity],
      deductions: { PF: 0.12, ESI: 0.0075, OtherDeductions: 2000 },
    },
  ];

  // Find the appropriate range for the in-hand salary
  const range = salaryRanges.find(
    (r) => salary >= r.range[0] && salary <= r.range[1]
  );

  // If a valid range is found, calculate the deductions based on the in-hand salary
  if (range) {
    const { PF, ESI, OtherDeductions } = range.deductions;

    const PFAmount = PF * salary;
    const ESIAmount = ESI * salary;

    return {
      PF: PFAmount,
      ESI: ESIAmount,
      OtherDeductions: OtherDeductions,
    };
  }

  return {};
}
