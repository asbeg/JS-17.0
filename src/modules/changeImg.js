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

export default changeImg;