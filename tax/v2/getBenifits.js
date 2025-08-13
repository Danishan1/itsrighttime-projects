export function getBenefits(salary) {
  const salaryRanges = [
    {
      range: [0, 25000],
      benefits: { HRA: 0.2, SpecialAllowance: 0.1, PerformanceBonus: 0 },
    },
    {
      range: [25001, 50000],
      benefits: { HRA: 0.25, SpecialAllowance: 0.15, PerformanceBonus: 5000 },
    },
    {
      range: [50001, 75000],
      benefits: { HRA: 0.25, SpecialAllowance: 0.2, PerformanceBonus: 10000 },
    },
    {
      range: [75001, 100000],
      benefits: { HRA: 0.3, SpecialAllowance: 0.25, PerformanceBonus: 15000 },
    },
    {
      range: [100001, Infinity],
      benefits: { HRA: 0.35, SpecialAllowance: 0.3, PerformanceBonus: 20000 },
    },
  ];

  const range = salaryRanges.find((r) => salary >= r.range[0] && salary <= r.range[1]);

  if (range) {
    const { HRA, SpecialAllowance, PerformanceBonus } = range.benefits;

    return {
      HRA: HRA * salary,
      SpecialAllowance: SpecialAllowance * salary,
      PerformanceBonus: PerformanceBonus,
    };
  }

  // Return an empty object if no range is found (this should not occur unless an invalid salary is passed)
  return {};
}
