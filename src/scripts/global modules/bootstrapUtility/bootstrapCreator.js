import htmlBuilder from "../htmlBuilder"
import elementClassManager from "../elementClassManager";
//creates HTML with bootstrap classes by calling the HTML builder and assigning the necessary classes.
//normally called by boostrapManager in order to create complicated boostrap configurations.
export default {
    //create bootstrap container.
    createContainer: function (type, id) {
        const container = htmlBuilder.elementBuilder(type, id);
        container.classList.add("container");
        this.addOptionsMethods(container);
        elementClassManager.elementsList.add(container);
        return container;
    },
    createFluidContainer: function (type, id) {
        const container = htmlBuilder.elementBuilder(type, id);
        container.classList.add("container-fluid");
        this.addOptionsMethods(container);
        elementClassManager.elementsList.add(container);
        return container;
    },
    createRowContainer: function (type, id) {
        const row = htmlBuilder.elementBuilder(type, id);
        row.classList.add("row");
        this.addOptionsMethods(row);
        elementClassManager.elementsList.add(row);
        return row;
    },
    createEqualWidth: function (type, id, width) {
        const equal = htmlBuilder.elementBuilder(type, id);
        equal.classList.add(`w-${width}`)
        this.addOptionsMethods(equal);
        elementClassManager.elementsList.add(equal);
        return equal;
    },
    createColumn: function (type, id, content, value, width) {
        const column = htmlBuilder.elementBuilder(type, id, content, value);
        column.classList.add(`col-${width}`)
        this.addOptionsMethods(column);
        elementClassManager.elementsList.add(column);
        return column;
    },
    //creates colum that starts out stacked and then becomes horizontal ath the specified breakpoint width.
    createBreakColumn: function (type, id, content, value, width, breakpoint) {
        const column = this.createColumn(type, id, content, value, width, breakpoint)
            column.classList.add(`col-${breakpoint}-${width}`)
            return column;
    },
    //adds methods as attributes to the DOM object.
    addOptionsMethods: function (element){
        element.addBorder = this.addBorder;
        element.addBackGround = this.addBackGround;
        element.addPadding = this.addPadding;
        element.addMargin = this.addMargin;
    },
    addBorder: function () {
        this.classList.add("border");
    },
    addBackGround: function (shade) {
        this.classList.add(`${shade}`)
    },
    addPadding: function (coord, breakpoint, width) {
        this.classList.add(`p${coord}-${breakpoint}-${width}`)
    },
    addMargin: function (coord, breakpoint, width){
        this.classList.add(`m${coord}-${breakpoint}-${width}`)
    },
    alignItems: function (direction) {
        this.classList.add(`align-items-${direction}`)
    },
    alignSelf: function (direction) {
        this.classList.add(`align-items-${direction}`)
    }

}