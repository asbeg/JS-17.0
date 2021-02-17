'use strict';
/*
1)  Переписать наше приложение в ООП стиле, создать Класс (в старом формате использовать es6 не нужно)
2) Создать новый метод в классе, например eventsListeners.
3) Перенести все действия, которые остались за классом внутрь него.
4) Проверить чтобы все работало без ошибок
*/

let startBtn = document.getElementById('start'),
    incomeAdd = document.getElementsByTagName('button')[0], // + btn
    expensesAdd = document.getElementsByTagName('button')[1],// checkbox
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),//Возможный доход
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    periodSelect = document.querySelector('input[class=period-select]'),// range
    targetAmount = document.querySelector('input[class=target-amount]'),
    additionalExpensesItem = document.querySelector('input[class=additional_expenses-item]'),
    expenseTitle = document.querySelector('input[class=expenses-title]'),
    salaryAmount = document.querySelector('input[class=salary-amount]'),
    incomeTitle = document.querySelector('input[class=income-title]'),
    incomeAmount = document.querySelector('input[class=income-amount]'),
    depositAmount = document.querySelector('input[class=deposit-amount]'),
    depositPercent = document.querySelector('input[class=deposit-percent]'),
    cancelBtn = document.getElementById('cancel'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

/*const isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    hasNumber = function (str) {
        if (typeof str != 'string') return false
        return isNaN(str) && isNaN(parseFloat(str))
    };*/

const AppData = function () {

    this.addExpenses = [];
    this.addIncome = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.deposit = false;
    this.expenses = {};
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.mission = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.percentDeposit = 0;

};

AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    this.leftInputsBlock();
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
};

AppData.prototype.leftInputsBlock = (disabled = true) => {
    document.querySelectorAll('.data input[type=text]').forEach(item => {
        item.disabled = disabled;
    });
    document.querySelectorAll('.data button').forEach(item => {
        item.disabled = disabled;
    });
    document.querySelector('#deposit-check').disabled = disabled;
};

//Метод reset должен всю программу возвращать в исходное состояние
AppData.prototype.reset = function () {
    for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    this.leftInputsBlock(false);
    document.querySelectorAll('input[type=text]').forEach(function (item) {
        item.value = '';
    });
    periodSelect.value = document.querySelector('.period-amount').textContent = 1;
    cancelBtn.style.display = 'none';
    startBtn.style.display = 'block';
    depositCheck.checked = false;
    this.addExpenses = [];
    this.addIncome = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.deposit = false;
    this.expenses = {};
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.mission = 0;
    this.moneyDeposit = 0;
    this.period = 0;
    this.percentDeposit = 0;
    this.success();
};

AppData.prototype.showResult = function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.upperCaseFirst(this.addExpenses);
    additionalIncomeValue.value = this.upperCaseFirst(this.addIncome);
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
};

// добав нов блок доп доход
AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    const input = cloneIncomeItem.querySelectorAll('input');
    input.forEach((item) => {
        const textItem = cloneIncomeItem.querySelector('input[placeholder="Наименование"]');
        const numItem = cloneIncomeItem.querySelector('input[placeholder="Сумма"]');
        if (!item.getAttribute('placeholder="Наименование"')) {
            this.textValidate(textItem);
        }
        if (!item.getAttribute('placeholder="Сумма"')) {
            this.numberValidate(numItem);
        }
        item.value = '';
    });
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomeAdd.style.display = 'none';
    }
};

//добав.новый блок обяз.расходы
AppData.prototype.addExpensesBlock = function () {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    const input = cloneExpensesItem.querySelectorAll('input');
    input.forEach((item) => {
        const textItem = cloneExpensesItem.querySelector('input[placeholder="Наименование"]');
        const numItem = cloneExpensesItem.querySelector('input[placeholder="Сумма"]');
        if (!item.getAttribute('placeholder="Наименование"')) {
            this.textValidate(textItem);
        }
        if (!item.getAttribute('placeholder="Сумма"')) {
            this.numberValidate(numItem);
        }
        item.value = '';
    });
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesAdd.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    expensesItems.forEach((item) => {
        const itemExpenses = item.querySelector('.expenses-title').value;
        const cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach((item) => {
        let incomeTitle = item.querySelector('.income-title').value;
        let incomeAmount = item.querySelector('.income-amount').value;
        if (incomeTitle !== '' && incomeAmount !== '') {
            this.income[incomeTitle] = +incomeAmount;
        }
    });
    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    additionalIncomeItem.forEach((item) => {
        let itemValue = item.value.trim();
        if (item.value !== '') {
            this.addIncome.push(itemValue);
        }
    });
};

// Расходы за месяц
AppData.prototype.getExpensesMonth = function () {
    this.expensesMonth = 0;
    for (let item in this.expenses) {
        this.expensesMonth += +this.expenses[item];
    }
    return this.expensesMonth;
};

//вычисляем бюджет
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

// расчет за ск. будет достигнута цель
AppData.prototype.getTargetMonth = function () {
    if (salaryAmount.value === '') {
        return targetMonthValue.value = '';
    }
    const missionMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    if (missionMonth < 0) {
        return ('Цель не будет достигнута');
    } else
        return missionMonth;
};

//Уровень дохода
/*    AppData.prototype.getStatusIncome= function () {
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600 && this.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay <= 0) {
        return ('Что то пошло не так');
    }
};*/
/*    AppData.prototype.getInfoDeposit= function () {
        if (this.deposit) {
            do {
                this.percentDeposit = parseInt(prompt('Какой годовой процент?', '10'));
            } while (!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = parseInt(prompt('Какая сумма заложенв?', '10000'));
            } while (!isNumber(this.moneyDeposit));
        }
        return this.percentDeposit, this.moneyDeposit;
    };*/

// ** 4 ** RangeInput
AppData.prototype.getPeriod = function (event) {
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.success = function () {
    startBtn.disabled = salaryAmount.value.length === 0;
};

AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.textValidate = function (a) {
    a.addEventListener('input', () => {
        a.value = a.value.replace(/[^?!, .а-яА-ЯёЁ]/, '');
    });
};

AppData.prototype.numberValidate = function (a) {
    a.addEventListener('input', () => {
        a.value = a.value.replace(/[^0-9]/, '');
    });
};

// каждое слово с большой буквы
AppData.prototype.upperCaseFirst = function (newStr) {
    for (let i = 0; i < newStr.length; i++) {
        newStr[i] = newStr[i].charAt(0).toUpperCase().trim() + newStr[i].substring(1).toLowerCase().trim();
    }
    return newStr.join(', ');
}

AppData.prototype.eventListeners = function () {
    const funcStart = this.start.bind(this),
        addExpensesBlock = this.addExpensesBlock.bind(this),
        addIncomeBlock = this.addIncomeBlock.bind(this),
        getPeriod = this.getPeriod.bind(this),
        reset = this.reset.bind(this),
        success = this.success.bind(this);

    this.success();
    startBtn.addEventListener('click', funcStart);
    cancelBtn.addEventListener('click', reset);
    expensesAdd.addEventListener('click', addExpensesBlock);
    incomeAdd.addEventListener('click', addIncomeBlock);
    periodSelect.addEventListener('input', getPeriod);
    salaryAmount.addEventListener('input', success);

    let inputTitle = document.querySelectorAll('input[placeholder="Наименование"]');
    inputTitle.forEach(input => this.textValidate(input));

    let inputSum = document.querySelectorAll('input[placeholder="Сумма"]');
    inputSum.forEach(input => this.numberValidate(input));
}

const appData = new AppData();
appData.eventListeners();

// *** 13 ***
/*
for (let key in appData) {
    let value = appData[key];
    console.log("Наша программа включает в себя данные: " + key + " = " + value);
}
*/