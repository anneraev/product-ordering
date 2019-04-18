//global DOM manager.

//reference to the HTML element all elements will be posted to.
const container = document.getElementById("display-container");

export default {
    //posts HTML to the DOM.
    postToDom: item => {
        container.appendChild(item);
    },
    // Function to clear the selected element of all children.
    clearElement: domElement => {
        while (domElement.firstChild) {
            domElement.removeChild(domElement.firstChild);
        }
    },
    //removes specific element.
    removeElement: domElement => {
        domElement.parentNode.removeChild(domElement);
    }

}