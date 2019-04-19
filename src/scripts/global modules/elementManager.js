//creates an object with selected elements, allows for easy class editing among other features.

//the element object created here contains easy references for each element.
elementsObject = function (elements) {
    const id = element.id;
    const idArray = id.split("--");
    const key = idArray[3];
    const container = element.parentNode;
    elements.forEach(element => {
        let elementKey
        if (id) {
            elementKey = `${key}${id}`
        } else {
            elementKey = key
        }
        this[elementKey] = element;
        const containerKey = `${elementKey}Container`;
        const labelKey = `${elementKey}Label`;
        this[containerKey] = container
        this[labelKey] = this[containerKey].firstChild
        element.addClass = this.addClass;
        element.removeClass = this.removeClass;
        element.toggleClass = this.toggleClass;
    })
    this.addClass = function (classArray) {
        this.classList.add(...classArray);
    };
    this.removeClass = function (classArray) {
        this.classList.remove(...classArray);
    }
    this.toggleClass = function (classArray) {
        this.classList.toggle(...classArray);
    }
}

let elementsObject

export default {
    createElementsObject: function (elements) {
        this.clearElementsObject();
        elementsObject = new elementsObject(elements);
    },
    clearElementsObject: function (){
        elementsObject = "";
    }
}