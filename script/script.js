'use strict';

const money = +prompt('Ваш месячный доход?', '12000'),
 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                           'Taxi, School, Courses').toLowerCase().split(', '),
 deposit = confirm('Есть ли у вас депозит в банке?'),
 income = "Freelance",
 mission = 80000,

 expenses1 = prompt('Введите обязательную статью расходов?', 'School'),
 amount1 = +prompt('Во сколько это обойдется?', '500'),
 expenses2 = prompt('Введите обязательную статью расходов?', 'Taxi'),
 amount2 = +prompt('Во сколько это обойдется?', '1000');

const showTypeOf = function (data) {
    console.log(data, typeof(data));
},
    getStatusIncome = function (){
    if (budgetDay >= 1200){
        return('У вас высокий уровень дохода');
    } else if (budgetDay > 600 && budgetDay < 1200){
        return('У вас средний уровень дохода');
    }else if (budgetDay  <= 600 && budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if (budgetDay <= 0){
        return('Что то пошло не так');
    }
},
    getExpensesMonth = function() {
    return amount1 + amount2;
},
    getAccumulatedMonth = function() {
    return money - getExpensesMonth();
},
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth/30),

    getTargetMonth = function () {
    return Math.ceil(mission/accumulatedMonth);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("Расходы за месяц: ", getExpensesMonth(amount1, amount2));
console.log(addExpenses);
console.log("Цель будет достигнута за: " + getTargetMonth() + " месяцев");
console.log("Бюджет на день: " + budgetDay);
console.log(getStatusIncome());
