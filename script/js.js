/*
const validateInput = () => {
    const input = document.querySelector('.footer-form-input');
    input.addEventListener('input', (event) => {
        const target = event.target;
        if (target.name === 'user_name') {
            return target.value = target.value.replace(/[^а-яё -]/gi, '');
        }
        if (target.matches('.form-phone')) {
            return target.value = target.value.replace(/[^\d()\-]$/g, '');
        }
        if (target.matches('.mess')) {
            return target.value = target.value.replace(/[^а-яё -]/gi, '');
        }
        if (target.classList.contains('form-email')) {
            return target.value = target.value.replace(/[^_@.!'~*A-Za-z\-]/g, '');
        }
    });
};
validateInput();

const blurListener = () => {
    const input = document.querySelector('.footer-form-input');

    function toUppercase(str) {
        return str.replace(/(^|\s)\S/g, function (st) {
            return st.toUpperCase()
        });
    }

    input.addEventListener('blur', (event) => {
        const target = event.target;
        if (target.name === 'user_name') {
            target.value = target.value.replace(/[^а-яё -]/gi, '')
                .replace(/\s+/g, ' ')
                .replace(/\-+/g, '-')
                .replace(/^-+|-+$/, '')
                .trim();
            let newStr = toUppercase(target.value);
            return target.value = newStr;
        }
        if (event.relatedTarget && target.matches('.form-phone')) {
            return target.value = target.value.replace(/[^()0-9\-]/g, '')
                .replace(/\-+/g, '-')
                .replace(/\s+/g, ' ')
                .replace(/^-+|-+$/, '')
                .trim();
        }
        if (event.relatedTarget && target.matches('.mess')) {
            return target.value = target.value.replace(/[^а-яё -]/gi, '')
                .replace(/\s+/g, ' ')
                .replace(/\-+/g, '-')
                .replace(/^-+|-+$/, '')
                .trim();
        }
        if (event.relatedTarget && target.classList.contains('form-email')) {
            return target.value = target.value.replace(/[^_@.!~*A-Za-z\-]/g, '')
                .replace(/\s+/g, ' ')
                .replace(/\-+/g, '-')
                .replace(/^-+|-+$/, '')
                .trim();


        }
        ;
    }, false);

    blurListener();*/
