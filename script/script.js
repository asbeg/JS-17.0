'use strict';
/*
1) Привязать контекст вызова функции start к appData
2) В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
3) Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать,
после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую
навешиваем событие и выполнение метода reset
Метод reset должен всю программу возвращать в исходное состояние
*/

let startBtn = document.getElementById('start'),
    // + btn
    incomeAdd = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    // checkbox
    depositCheck = document.querySelector('#deposit-check'),
    //Возможный доход
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // e
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    // range
    periodSelect = document.querySelector('input[class=period-select]'),
    // f
    targetAmount = document.querySelector('input[class=target-amount]'),
    additionalExpensesItem = document.querySelector('input[class=additional_expenses-item]'),
    expenseTitle = document.querySelector('input[class=expenses-title]'),
    salaryAmount = document.querySelector('input[class=salary-amount]'),
    incomeTitle = document.querySelector('input[class=income-title]'),
    incomeAmount = document.querySelector('input[class=income-amount]'),
    depositAmount = document.querySelector('input[class=deposit-amount]'),
    depositPercent = document.querySelector('input[class=deposit-percent]');
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    hasNumber = function (str) {
        if (typeof str != 'string') return false
        return isNaN(str) && isNaN(parseFloat(str))
    };

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 0,
    period: 0,
    budget: 0,
    incomeMonth: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    start: function () {
        this.budget = +salaryAmount.value;

        this.success();

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();

        if (start.textContent === 'Рассчитать') {
            this.leftInputsBlock();
            start.textContent = 'Сбросить';
        } else {
            start.textContent = 'Рассчитать';
            this.reset();
        }
    },
    leftInputsBlock: (disabled = true) => {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
    },
    reset: function () {
        for (let i = incomeItems.length - 1; i > 0; i--) {
            incomeItems[0].parentNode.removeChild(incomeItems[i]);
        }
        for (let i = expensesItems.length - 1; i > 0; i--) {
            expensesItems[0].parentNode.removeChild(expensesItems[i]);
        }
        incomeAdd.style.display = '';
        expensesAdd.style.display = '';
        this.leftInputsBlock(false);
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.value = '';
        });
    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = upperCaseFirst(appData.addExpenses);
        additionalIncomeValue.value = upperCaseFirst(appData.addIncome);
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
    },

    addExpensesBlock: function () {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
        const input = cloneExpensesItem.querySelectorAll('input');

        input.forEach(function (item) {
            const textItem = cloneExpensesItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneExpensesItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                appData.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                appData.numberValidate(numItem);
            }
            item.value = '';
        });
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },

    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
        const input = cloneIncomeItem.querySelectorAll('input');
        input.forEach(function (item) {
            const textItem = cloneIncomeItem.querySelector('input[placeholder="Наименование"]');
            const numItem = cloneIncomeItem.querySelector('input[placeholder="Сумма"]');
            if (!item.getAttribute('placeholder="Наименование"')) {
                appData.textValidate(textItem);
            }
            if (!item.getAttribute('placeholder="Сумма"')) {
                appData.numberValidate(numItem);
            }
            item.value = '';
        });
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },

    getIncome: function () {
        incomeItems.forEach(function (item) {
            let incomeTitle = item.querySelector('.income-title').value;
            let incomeAmount = item.querySelector('.income-amount').value;
            if (incomeTitle !== '' && incomeAmount !== '') {
                appData.income[incomeTitle] = +incomeAmount;
            }
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },

    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    // Расходы за месяц
    getExpensesMonth: function () {
        this.expensesMonth = 0;
        for (let item in this.expenses) {
            this.expensesMonth += +this.expenses[item];
        }
        return this.expensesMonth;
    },

    //вычисляем бюджет
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    },

    // расчет за ск. будет достигнута цель
    getTargetMonth: function () {
        if (salaryAmount.value === '') {
            return targetMonthValue.value = '';
        }
        const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        if (missionMonth < 0) {
            return ('Цель не будет достигнута');
        } else
            return missionMonth;
    },

    //Уровень дохода
    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay <= 0) {
            return ('Что то пошло не так');
        }
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = parseInt(prompt('Какой годовой процент?', '10'));
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = parseInt(prompt('Какая сумма заложенв?', '10000'));
            } while (!isNumber(this.moneyDeposit));
        }
        return this.percentDeposit, this.moneyDeposit;
    },

    // ** 4 ** RangeInput
    getPeriod: function (event) {
        document.querySelector('.period-amount').textContent = event.target.value;
        incomePeriodValue.value = appData.calcSavedMoney();
    },

    success: function () {
        startBtn.disabled = salaryAmount.value.length === 0;
    },

    calcSavedMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },

    textValidate: function (a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^?!, .а-яА-ЯёЁ]/, '');
        });
    },

    numberValidate: function (a) {
        a.addEventListener('input', () => {
            a.value = a.value.replace(/[^0-9]/, '');
        });
    },
};

const funcStart = appData.start.bind(appData);

appData.success();
startBtn.addEventListener('click', funcStart);

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getPeriod);
salaryAmount.addEventListener('input', appData.success);

let inputTitle = document.querySelectorAll('input[placeholder="Наименование"]');
inputTitle.forEach(input => appData.textValidate(input));

let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
inputSum.forEach(input => appData.numberValidate(input));

//2 каждое слово с большой буквы
function upperCaseFirst(newStr) {
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase().trim() + newStr[i].substring(1).toLowerCase().trim();
    }
    return newStr.join(', ');
}

// *** 13 ***
/*
for (let key in appData) {
    let value = appData[key];
    console.log("Наша программа включает в себя данные: " + key + " = " + value);
}
*/

