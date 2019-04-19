import formBuilder from "./formBuilder";
import domManager from "../domManager";

// To call a specific input element, use this template(where "key" is the key of the input originally defined in the keysArray):

// referenceVariableContainingObject.key

// To get the label of that input:

// referenceVariableContainingObject.keyLabel

// To get the container around the label and input:

// referenceVariableContainingObject.keyContainer.

//To get a specific option from a select element:

//referenceVariableContainingObject.keyid (where id is the numbered position of the option in the list of options, starting with 0).

// Each form object has methods for adding new elements to the form. Each has specific data that needs to be passed, so examine the structure of the object constructor defined in formObject.js. However, calling them is easy as they have each been made a property of every element in the form object, so you must only reference that element with its key.

const formObject = function (wholeForm, elementArray, submitButton) {
    //dynamically builds a key for the input element, its container, and its label to store a reference to those elements for easy retrieval.
    this.createKeys = function(element, key, container, id) {
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
    };
    this.form = wholeForm;
    this.elements = elementArray;
    this.submitButton = submitButton;
    this.referenceFormElements = function () {
        //array of just the inputs for easy access by the script.
        const inputsArray = [];
        //all the various form inputs are indentified by their key value (the same as the key value that was originall passed to them when the formBuilder function called--they keys stored in the keysArray variable) The keys are also used to identify their label and container. Calling them in this way allows easy access to manipulate the attributes of these elements.
        //Also creates a function for easily adding elements to these elements.
        this.elements.forEach(element => {
            const id = element.id;
            const idArray = id.split("--");
            const key = idArray[3];
            const container = element.parentNode;
            let optionId;
            if (element.tagName === "option") {
                optionId = idArray[4];
            } else {
                optionId = undefined;
            }
            this.createKeys(element, key, container, optionId);
            if (element.tagName.match(/^(INPUT|SELECT|TEXTAREA)$/)) {
                inputsArray.push(element);
            }
            element.createKeys = this.createKeys;
            element.newHeader = this.newHeader;
            element.newButton = this.newButton;
            element.newCheckbox = this.newCheckbox;
            element.newInput = this.newInput;
            element.newRadio = this.newRaido;
            element.newTextArea = this.newTextArea;
            element.newdropDown = this.newdropDown;
            element.remove = this.remove;
        })
        this.inputs = inputsArray
    };
    //these methods allow the user to easily add new elements to the form object, as well as the DOM.
    this.newHeader = function (tag, id, key) {
        const header = formBuilder.buildHeader(tag, id, key);
        this.appendChild(header);
        this.createKeys(header, key, this);

    }
    this.newTextArea = function (key, id) {
        const textarea = formBuilder.buildTextArea(key, id);
        this.appendChild(textarea);
        this.createKeys(textarea, key, this);
    };
    this.newdropDown = function (key, id, value, optionsArray) {
        const dropDown = formBuilder.buildDropdown(key, id, value, optionsArray)
        this.appendChild(dropDown);
        this.createKeys(dropDown, key, this);
    };
    this.newRadio = function (option, optionIndex, id, key) {
        const radio = formBuilder.buildOption(option, optionIndex, "radio", id, key)
        this.appendChild(radio);
        this.createKeys(radio, key, this);

    };
    this.newCheckbox = function (option, optionIndex, id, key) {
        const checkbox = formBuilder.buildOption(option, optionIndex, "checkbox", id, key)
        this.appendChild(checkbox);
        this.createKeys(checkbox, key, this);

    };
    this.newInput = function (type, key, id, value) {
        const input = formBuilder.buildInput(type, key, id, value)
        this.appendChild(input);
        this.createKeys(input, key, this);

    };
    this.newButton = function (id, content) {
        const button = formBuilder.buildButton(id, content)
        this.appendChild(button);
        this.createKeys(button, content, this);
    };
    //remove element and everything inside it.
    this.remove = function () {
        domManager.removeElement(this);
    }
}

export default {
    createFormObject: function (form, elementArray, submitButton) {
        const newFormObject = new formObject(form, elementArray, submitButton);
        return newFormObject;
    }
}