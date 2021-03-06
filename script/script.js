//ждет загрузки только дом дерева, не всей стр.
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            idInterval;

        // вычисляет дату до дедлайна
        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return {timeRemaining, hours, minutes, seconds};
        }

        function addZero(n) {
            return (n > 0 && n < 10) ? '0' + n : n;
        }

        function updateClock() {
            let time = getTimeRemaining();

            timerHours.textContent = addZero(time.hours);
            timerMinutes.textContent = addZero(time.minutes);
            timerSeconds.textContent = addZero(time.seconds);

            if (time.timeRemaining < 0) {
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        idInterval = setInterval(updateClock, 1000);
    };

    countTimer('24 February 2021');

    //меню
    const toggleMenu = () => {
        const handlerMenu = (event) => {
            const target = event.target;
            const displayMenu = () => {
                document.querySelector('menu').classList.toggle('active-menu');
            };

            if (target.closest('.menu') ||
                (!target.closest('menu') &&
                    document.querySelector('menu').classList.contains('active-menu'))) {
                displayMenu();
            } else if (target.closest('menu') && target.closest('[href^="#"]')) {
                displayMenu();
            }
        };
        document.body.addEventListener('click', handlerMenu);
    };

    toggleMenu();

    //popup okno(оставить заявку)
    const animatedTogglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupData = {
                count: 50,
                speed: 5,
                startPos: 200,
                endPos: 0
            };

        const showPopup = () => {

            popupData.startPos > popupData.endPos ?
                popupData.count -= popupData.speed :
                popupData.count += popupData.speed;
            popupContent.style.transform = `translateY(${popupData.count}px)`;

            let condition = popupData.startPos > popupData.endPos ?
                popupData.count > popupData.endPos :
                popupData.count < popupData.endPos;

            if (condition) requestAnimationFrame(showPopup);
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popupData.count = popupData.startPos;
                    requestAnimationFrame(showPopup);
                }
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
        });
    };
    animatedTogglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide = currentSlide < slide.length - 1 ? currentSlide + 1 : 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 2000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (target.matches('.portfolio-btn, .dot')) {
                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');

                if (target.matches('#arrow-right')) {
                    currentSlide++;
                } else if (target.matches('#arrow-left')) {
                    currentSlide--;
                } else if (target.matches('.dot')) {
                    dot.forEach((elem, index) => {
                        if (elem === target) {
                            currentSlide = index;
                        }
                    });
                }

                if (currentSlide >= slide.length) currentSlide = 0;
                if (currentSlide < 0) currentSlide = slide.length - 1;

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dot, currentSlide, 'dot-active');
            }
        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();
    };

    // на страницу добавлять точки с классом dot равному количеству слайдов
    const addDot = () => {
        const portfolioItem = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.appendChild(dot);
        });

        portfolioDots.children[0].classList.add('dot-active');
    };
    addDot();
    slider();

    const changeImg = () => {
        const command = document.querySelector('.command');
        const change = (event) => {
            const target = event.target;
            if (target.classList.contains('command__photo')) {
                const prevSrc = target.src;
                target.src = target.dataset.img;
                target.dataset.img = prevSrc;
            }

        };
        command.addEventListener('mouseover', change);
        command.addEventListener('mouseout', change);
    };

    changeImg();

    /*    const checkCalcInput = () => {
            const calcBlock = document.querySelector('.calc-block');
            calcBlock.addEventListener('input', (event) => {
                const target = event.target;
                if(target === )
                target.value = target.value.replace(/\D/g, '');
            });
        };
        checkCalcInput();*/

    function blockInput() {
        document.addEventListener('input', (event) => {
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
    }

    blockInput();

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
                    target.value = target.value.replace(/[^а-яё -]/gi, '');
                    target.value = target.value.replace(/\s+/g, ' ');
                    target.value = target.value.replace(/\-+/g, '-');
                    target.value = target.value.replace(/\-+/g, '-');
                    let newStr = toUppercase(target.value).trim();
                    return target.value = newStr;
                }

                if (target.matches('.form-phone')) {
                    target.value = target.value.replace(/[^()0-9\-]/g, '')
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
    blockInputValid();

    // калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquary = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                counrValue = 1,
                dayValue = 10;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquary.value;

            if (calcCount.value > 1) {
                counrValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value) {
                if (calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value < 10) {
                    dayValue *= 1.5;
                }
            }

            if (!!typeValue && !!squareValue) {
                total = price * typeValue * squareValue * counrValue * dayValue;
            }

            //  totalValue.textContent = total;

            function timer() {
                let step = (total / 100) * 10;
                const time = 2000;
                let n = 0;
                let t = Math.round(time / (total / step));
                if (+totalValue.textContent !== total) {
                    let interval = setInterval(() => {
                        n += step;
                        if (n === total) {
                            clearInterval(interval);
                        }
                        totalValue.textContent = n;
                    }, t);
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

    calc(100);
});


