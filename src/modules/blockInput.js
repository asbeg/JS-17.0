
function blockInput() {
    document.addEventListener('input', (event) => {
        const target = event.target;
        if (target.name === 'user_name') {
            return target.value = target.value.replace(/[^а-яё ]/gi, '');
        }
        if (target.matches('.form-phone')) {
            return target.value = target.value.replace(/[^+\d]/g, '');
        }
        if (target.matches('.mess')) {
            return target.value = target.value.replace(/[^а-яё ,.!?\d]/gi, '');
        }
        if (target.classList.contains('form-email')) {
            return target.value = target.value.replace(/[^_@.!'~*A-Za-z\-]/g, '');
        }
    });
}

export default blockInput;