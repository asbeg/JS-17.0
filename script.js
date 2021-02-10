const
    google = document.getElementsByClassName('adv'),
    collection = document.querySelectorAll('.book'),
    cells = document.getElementsByTagName('a'),
    li = collection[0].lastElementChild.children,
    li1 = collection[5].lastElementChild.children,
    li2 = collection[2].lastElementChild.children,
    newElement = document.createElement('li'),
    textnode = document.createTextNode('Глава 8: За пределами ES6');

collection[0].before(collection[1]);
collection[2].before(collection[4]);
collection[5].after(collection[2]);
//фон изображение
document.body.style.backgroundImage = "url(image/you-dont-know-js.jpg)";
cells[2].innerHTML = '<a>Книга 3. this и Прототипы Объектов</a>';

google[0].remove();
li[2].before(li[3]);
li[2].after(li[6]);
li[3].after(li[8]);
li[10].before(li[5]);
li1[1].after(li1[9]);
li1[5].after(li1[3]);
li1[8].after(li1[6]);

newElement.appendChild(textnode);
li2[8].insertAdjacentElement('afterend', newElement);