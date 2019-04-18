import htmlBuilder from "../htmlBuilder"
import formObjectManager from "./formObjectManager"
//will be passed to the object that contains all the values of this form.
let elementsArray = [];

//This creates an array of the created elements, iterate through them, dynamically build key/value pairs that refer to the element, store the object. That way, any of the form's elements can be easily referred to. See the comments in formObjectManager.js for more information on how to call specific elements.

//call function:
// formBuilder.buildForm: function (wrapperType, title, keysArray, valuesArray, typesArray, id, arrayOptionsArray)

// The following must be passed to the form builder call function:

// wrappperType = type of wrapper that the form will be displayed in (div, fieldset, ect.)

// let title = "Form Builder Function Test"

// let id = id for form

// let wrapperType = type of wrapper for form

// let keysArray = array of keys associated with each input in the form.

// let valuesArray = array of values associated with each input in the form.

// let typesArray = array of types of inputs to create.

// let arrayOptionsArray = array of arrays containing options. Ideally, these should come from an API database containing those options, and should arrive as an array in the order they appear in the databese. That array should be pushed to this array to create an array of arrays.

// One of each much be defined for EVERY input. If one of the above are not valid, enter "undefined" for that entry.

//ID style guide:
//Whole Form ("form"--id)
//wrapper for each item ("wrapper"--id--type)
//label for each item ("label"--id--type--key--optionId(if multiple))
//field item ("field"--id--type--key--optionId(if multiple))

//Title - defined title.
// id - id of data object.
// type - type of input
// key - name of item in data.

//A reference to the object needs to be made inside the button's event listener. Makes it easy to access.

//One can easily set up a form to be created by using formBuilder.(setWrapper(element type), set title(title string), addKey(key string), addValue(value string), addType(input type string), setId(id integer), addOptions(array of options)). Then, one call the form with formBuilder.createForm (no arguments needed). Store the returned form in a variable and access the form with nameOfFormVariable[0] and the object with nameOfFormVariable[1].

let wrapperType
let title
let keysArray = []
let valuesArray = []
let typesArray = []
let id
let arrayOptionsArray = []

export default {
    //Title of form, Array of original keys, array of original values, array of types of fields, id from dataset.
    buildForm: function (wrapperType, title, keysArray, valuesArray, typesArray, id, arrayOptionsArray) {
        //(elementType, elementId, elementTextContent, elementValue)
        //create form.
        const form = htmlBuilder.elementBuilder(wrapperType, `${title}--${id}`)
        if (wrapperType === "fieldset") {
            const legend = this.buildLegend(title, id);
            form.appendChild(legend);
        }
        //loops through keys and builds a form and label from the passed data.
        for (let i = 0; i < keysArray.length; i += 1) {
            //container for the label/form pairs.
            const type = typesArray[i];
            const key = keysArray[i];
            const optionsArray = arrayOptionsArray[i];
            const value = valuesArray[i];
            //label and form
            if (type === "radio" || type === "checkbox") {
                const heading = this.buildHeader("h5", id, key)
                form.appendChild(heading);
            };
            //specify type
            if (type === "textarea") {
                let textArea = this.buildTextArea(key, id); //?
                form.appendChild(textArea);
            } else if (type === "select") {
                const dropDown = this.buildDropdown(type, key, id, value, optionsArray);
                form.appendChild(dropDown);
                //all other input types.
            } else {
                //if type is checkbox or radio button.
                if (type === "radio" || type === "checkbox") {
                    optionsArray.forEach(option => {
                        let optionIndex = optionsArray.indexOf(option);
                        let newItem = this.buildOption(option, optionIndex, type, id, key) //?
                        form.appendChild(newItem);
                    })
                } else {
                    const field = this.buildInput(type, key, id, value)
                    form.appendChild(field);
                }
            }
        }
        //append the elements to the form, create form object, and return an array containing the form itself for appending, as well as a reference to the form object. The form object contains methods for easy reference to any of the form's elements, as well as functions for adding elements.
        const submitButton = this.buildButton(id, "Submit");
        form.appendChild(submitButton);
        console.log(form);
        const newFormObject = formObjectManager.createFormObject(form, elementsArray, submitButton);
        newFormObject.referenceFormElements();
        const formArray = []
        formArray.push(form);
        formArray.push(newFormObject);
        return formArray;
    },
    buildHeader: function (number, id, key) {
        //number is the header type. (h1, h2, ect.)
        const header = htmlBuilder.elementBuilder(`h${number}`, `label--${id}--h${number}--${key}`, `${key}`);
        elementsArray.push(header);
        return header;
    },
    buildLabel: function (key, id, type) {
        const label = htmlBuilder.elementBuilder("label", `label--${id}--${type}--${key}`, `${key}`, undefined)
        elementsArray.push(label);
        return label
    },
    buildLegend: function (title, id) {
        const legend = htmlBuilder.elementBuilder("legend", `legend--${title}--${id}--legend`, `${title}:`);
        elementsArray.push(legend);
        return legend;
    },
    buildTextArea: function (key, id) {
        const label = this.buildLabel(key, id, "textarea")
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--textarea`)
        const textArea = htmlBuilder.elementBuilder("textarea", `field--${id}--textarea--${key}`);
        div.appendChild(label);
        div.appendChild(textArea);
        elementsArray.push(textArea);
        return div;
    },
    buildDropdown: function (key, id, value, optionsArray) {
        const label = this.buildLabel(key, id, "select")
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--dropdown`)
        const dropdown = htmlBuilder.elementBuilder("select", `field--${id}--"select"--${key}`, undefined, `${value}`) //?
        //build out options for the select input type. The value is alwas an integer representing the Id of the item in the dataset.
        const type = "select"
        optionsArray.forEach(option => {
            const optionIndex = optionsArray.indexOf(option);
            const addedOption = this.buildOption(option, optionIndex, type, id, key);
            dropdown.appendChild(addedOption);
        })
        div.appendChild(label);
        div.appendChild(dropdown);
        elementsArray.push(dropdown);
        return div;
    },
    buildOption: function (option, optionIndex, type, id, key) {
        let optionValue
        let inputType
        const optionNum = optionIndex + 1
        if (type === "select" || type === "dropdown" || type === "option") {
            optionValue = optionNum;
            inputType = "option"
        } else {
            optionValue = option;
            inputType = "input";
        }
        const newOption = htmlBuilder.elementBuilder(`${inputType}`, `field--${id}--${type}--${key}--${optionNum}`, `${option}`, `${optionValue}`)
        elementsArray.push(newOption);
        if (inputType !== "option") {
            const label = htmlBuilder.elementBuilder("label", `label--${id}--${type}--${key}--${optionNum}`, `${option}`);
            if (type === "radio") {
                newOption.setAttribute("name", `${key}`);
            }
            newOption.setAttribute("type", `${type}`);
            const optionDiv = htmlBuilder.elementBuilder("div", `divOption--${id}--${type}--${key}--${optionNum}`)
            optionDiv.appendChild(label);
            optionDiv.appendChild(newOption);
            return optionDiv;
        } else {
            return newOption;
        }
    },
    buildInput: function (type, key, id, value) {
        const label = this.buildLabel(key, id, type)
        const div = htmlBuilder.elementBuilder("div", `wrapper--${id}--${type}`)
        const input = htmlBuilder.elementBuilder("input", `field--${id}--${type}--${key}`);
        input.setAttribute("type", `${type}`);
        if (type === "text") {
            input.setAttribute("placeholder", `add ${key}`);
            if (value){
                input.value = value;
            }
        }
        div.appendChild(label);
        div.appendChild(input);
        elementsArray.push(input);
        return div;
    },
    buildButton: function (id, name) {
        const button = htmlBuilder.elementBuilder("button", `button--${id}--${name}`, name);
        elementsArray.push(button);
        return button;
    },
    clearVariables: function () {
        wrapperType = ""
        title = ""
        keysArray = []
        valuesArray = []
        typesArray = []
        id = ""
        arrayOptionsArray = []
    },
    setWrapper: function (string) {
        wrapperType = string;
    },
    setTitle: function (string) {
        title = string;
    },
    addKey: function (string) {
        keysArray.push(string);
    },
    addValue: function (string) {
        valuesArray.push(string)
    },
    addType: function (string) {
        typesArray.push(string);
    },
    setId: function (num) {
        id = num;
    },
    addOptions: function (array) {
        arrayOptionsArray.push(array);
    },
    createForm: function() {
        const formArray = this.buildForm(wrapperType, title, keysArray, valuesArray, typesArray, id, arrayOptionsArray);
        return formArray;
    }
}