const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquary = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 10;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquary.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value) {
            if (calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value < 10) {
                dayValue *= 1.5;
            }
        }

        if (!!typeValue && !!squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        //  totalValue.textContent = total;
        //анимация суммы - total
        function timer() {
            let step = (total / 100) * 10;
            let n = 0;
            if (+totalValue.textContent !== total) {
                let interval = setInterval(() => {
                    n += step;
                    if (n === total) {
                        clearInterval(interval);
                    }
                    totalValue.textContent = parseInt(n);
                }, 50);
            }
        }
        timer();
    }

    calcBlock.addEventListener('change', event => {
        const target = event.target;
        if (target.matches('.calc-day') || target.matches('.calc-type') ||
            target.matches('.calc-square') || target.matches('.calc-count')) {
            countSum();
        }
    });
};

export default calc;