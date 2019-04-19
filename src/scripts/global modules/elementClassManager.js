//creates an object with selected elements, allows for easy class editing among other features.

let assembledElementsObject

//the element object created here contains easy references for each element.
const elementsObject = function (elements) {
    elements.forEach(element => {
        const id = element.id;
        const idArray = id.split("--");
        const key = idArray[3];
        const container = element.parentNode;
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

let elementsList = [];

export default {
    buildElementsObject: function (elements) {
        this.clearElementsObject();
        assembledElementsObject = new elementsObject(elements);
        return elementsObject;
    },
    clearElementsObject: function (){
        assembledElementsObject = "";
    },
    elementsList: {
        add: function (element){
            elementsList.push(element)
        },
        remove: function(removeElement){
            elementsList = elementsList.filter(element => element !== removeElement)
        },
    }
}