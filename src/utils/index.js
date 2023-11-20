export function calculateFinancialHealthScore(monthlyIncome, monthlyExpenses, totalDebts, totalAssets) {
    const weights = {
        income: 0.4,
        expenses: 0.3,
        debts: 0.2,
        assets: 0.1,
    };
    const calculateScore = (value, maxValue = 1) => Math.min(value / maxValue, 1);
    const incomeScore = calculateScore(monthlyIncome, 10000);
    const expensesScore = calculateScore(1 - (monthlyExpenses / monthlyIncome));
    const debtsScore = calculateScore(1 - (totalDebts / (totalAssets + 1)));
    const assetsScore = calculateScore(totalAssets, 100000);

    const financialHealthScore = (
        incomeScore * weights.income +
        expensesScore * weights.expenses +
        debtsScore * weights.debts +
        assetsScore * weights.assets
    ) * 100;

    return Math.min(financialHealthScore, 100);
}
