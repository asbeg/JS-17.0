const checkCalcInput = () => {
    const calcBlock = document.querySelector('.calc-block');
    calcBlock.addEventListener('input', (event) => {
        const target = event.target;
        if (target.matches('.calc-square') || target.matches('.calc-count') ||
            target.matches('.calc-day')) {
            target.value = target.value.replace(/[^0-9]/g, '');
        }
    });
};

export default checkCalcInput;