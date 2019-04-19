//creates an object with selected elements, allows for easy class editing among other features.

let assembledElementsObject

//the element object created here contains easy references for each element.
const elementsObject = function (elements) {
    elements.forEach(element => {
        // const id = element.id;
        // const idArray = id.split("--");
        const key = element.id;//idArray[3];
        const container = element.parentNode;
        // let elementKey
        // if (id) {
        //     elementKey = `${key}${id}`
        // } else {
        //     elementKey = key
        // }
        this[key] = element;
        const containerKey = `${key}Container`;
        const labelKey = `${key}Label`;
        this[containerKey] = container
        this[labelKey] = this[containerKey].firstChild
        element.addClasses = this.addClasses;
        element.removeClasses = this.removeClasses;
        element.toggleClasses = this.toggleClasses;
    })
    this.addClasses = function (classArray) {
        this.classList.add(...classArray);
    };
    this.removeClasses = function (classArray) {
        this.classList.remove(...classArray);
    }
    this.toggleClasses = function (classArray) {
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