import htmlBuilder from "./htmlBuilder"
//creates HTML with bootstrap classes by calling the HTML builder and assigning the necessary classes.
//normally called by boostrapManager in order to create complicated boostrap configurations.
export default {
    //create bootstrap container.
    createContainer: function (type, id) {
        const container = htmlBuilder.elementBuilder(type, id);
        container.classList.add("container");
    },
    createFluidContainer: function (type, id) {
        const container = htmlBuilder.elementBuilder(type, id);
        container.classList.add("container-fluid");
    },
    createRowContainer: function (type, id) {
        const row = htmlBuilder.elementBuilder(type, id);
        row.classList.add("row");
    },
    createEqualWidth: function (type, id, width) {
        const equal = htmlBuilder.elementBuilder(type, id);
        equal.classList.add(`w-${width}`)
    },
    createColumn: function (type, id, content, value, width) {
        const column = htmlBuilder.elementBuilder(type, id, content, value);
        if (width && typeof width === "number") {
            column.classList.add(`col-${width}`)
        } else {
            column.classList.add("col")
        }
    },
    //creates colum that starts out stacked and then becomes horizontal ath the specified breakpoint width.
    createBreakColumn: function (type, id, content, value, width, breakpoint) {
        const column = htmlBuilder.elementBuilder(type, id, content, value);
        if (breakpoint && breakpoint === ("sm" || "md" || "lg")) {
            column.classList.add(`col-${breakpoint}-${width}`)
        } else {
            column.classList.add(`col-sm-${width}`)
        }
    },
}