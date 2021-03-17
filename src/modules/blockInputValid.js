
const blockInputValid = () => {
    function toUppercase(str) {
        return str.replace(/(^|\s)\S/g, function (st) {
            return st.toUpperCase()
        });
    }

    const input = document.querySelectorAll('input');

    function valid(event) {

        input.forEach(function () {

            const target = event.target;

            if (target.name === 'user_name' || target.name === '.mess') {
                target.value = target.value.replace(/[^а-яё ]/gi, '');
                target.value = target.value.replace(/\s+/g, ' ');
                target.value = target.value.replace(/\-+/g, '');
                let newStr = toUppercase(target.value).trim();
                return target.value = newStr;
            }

            if (target.matches('.form-phone')) {
                target.value = target.value.replace(/[^0-9\+]/g, '')
                target.value = target.value.replace(/\-+/g, '-')
                target.value = target.value.replace(/\s+/g, ' ')
                target.value = target.value.replace(/^-+|-+$/, '')
                return target.value.trim();
            }

            if (target.classList.contains('.form-email')) {
                target.value = target.value.replace(/[^_@.!~*A-Za-z\-]/g, '')
                target.value = target.value.replace(/\s+/g, ' ')
                target.value = target.value.replace(/\-+/g, '-')
                target.value = target.value.replace(/^-+|-+$/, '')
                return target.value.trim();
            }
        });
    }

    document.addEventListener('blur', valid, true);
}

export default blockInputValid;