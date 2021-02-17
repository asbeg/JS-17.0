'use strict';
const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createElements = function () {
    let element;
    if (this.selector[0] === '.') {
        element = document.createElement('div');
        element.className = this.selector.slice(1);
        document.body.appendChild(element);
    } else if (this.selector[0] === '#') {
        element = document.createElement('p');
        element.id = this.selector.slice(1);
        document.body.appendChild(element);
    }

    element.style.cssText = `height: ${this.height}px;
        width: ${this.width}px;
        background: ${this.bg};
        font-size: ${this.fontSize}px;`;
    console.log(element);
    return element;
};
let elementDiv = new DomElement('.block', 100, 100, 'green', 10);

let elementParagraph = new DomElement('#best', 200, 200, 'green', 10);

elementDiv.createElements();
elementParagraph.createElements();

