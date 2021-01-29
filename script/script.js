let money,
    budgetDay,
    income,
    addExpenses,
    deposit,
    mission,
    period;

money = 1200;
income = "Freelance";
addExpenses = "Taxi, School, Courses";
deposit = false;
mission = 80000;
period = 6;
budgetDay = money/30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log("Период равен: " + period + " месяцев");
console.log("Цель заработать: " + mission + " рублей");
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
console.log("дневной бюджет: " + budgetDay);



