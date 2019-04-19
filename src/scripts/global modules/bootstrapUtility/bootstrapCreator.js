import htmlBuilder from "../htmlBuilder"
import elementClassManager from "../elementClassManager";
//creates HTML with bootstrap classes by calling the HTML builder and assigning the necessary classes.
//normally called by boostrapManager in order to create complicated boostrap configurations.
//Because of the large list of components and other utilities, those will be added here as needed for the time being.
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
    createColumn: function (type, id, content, value, width, size) {
        const column = htmlBuilder.elementBuilder(type, id, content, value);
        if (size) {
            column.classList.add(`col-${size}-${width}`)
        } else {
            column.classList.add(`col-${width}`)
        }
        this.addOptionsMethods(column);
        elementClassManager.elementsList.add(column);
        return column;
    },
    //creates colum that starts out stacked and then becomes horizontal ath the specified breakpoint width.
    createBreakColumn: function (type, id, content, value, width, breakpoint) {
        const column = this.createColumn(type, id, content, value, width, breakpoint)
        column.classList.add(`col-${breakpoint}-${width}`)
        this.addOptionsMethods(column);
        elementClassManager.elementsList.add(column);
        return column;
    },
    createCard: function (type, id) {
        const card = htmlBuilder.elementBuilder(type, id)
        card.classList.add("card");
        this.addOptionsMethods(card)
        const cardBody = htmlBuilder.elementBuilder(type, id)
        cardBody.classList.add("card-body");
        this.addOptionsMethods(cardBody);
        card.appendChild(cardBody);
        elementClassManager.elementsList.add(card);
        return card;
    },
    createCardTitle: function (type, id, content) {
        const cardTitle = htmlBuilder.elementBuilder(type, id, content)
        cardTitle.classList.add("card-title");
        this.addOptionsMethods(cardTitle);
        elementClassManager.elementsList.add(cardTitle);
        return cardTitle;
    },
    createCardText: function (type, id, content) {
        const cardText = htmlBuilder.elementBuilder(type, id, content)
        cardText.classList.add("card-text");
        this.addOptionsMethods(cardText);
        elementClassManager.elementsList.add(cardText);
        return cardText;
    },
    createListGroup: function (type, id) {
        const group = htmlBuilder.elementBuilder(type, id)
        group.classList.add("list-group")
        this.addOptionsMethods(group);
        elementClassManager.elementsList.add(group);
        return group;
    },
    createListItem: function (id) {
        const group = htmlBuilder.elementBuilder("li", id)
        group.classList.add("list-group-item")
        this.addOptionsMethods(group);
        elementClassManager.elementsList.add(group);
        return group;
    },
    createCardImg: function (id, position) {
        const img = htmlBuilder.elementBuilder(img, id)
        img.classList.add(`card-img-${position}`)
        this.addOptionsMethods(img);
        elementClassManager.elementsList.add(img);
        return img;
    },
    createCardDeck: function (type, id) {
        const deck = htmlBuilder.elementBuilder(type, id)
        deck.classList.add("card-deck")
        this.addOptionsMethods(deck);
        elementClassManager.elementsList.add(deck);
        return deck;
    },
    //adds methods as attributes to the DOM object.
    addOptionsMethods: function (element) {
        element.addBorder = this.addBorder;
        element.addBackGround = this.addBackGround;
        element.addTextType = this.addTextType;
        element.addTextAlign = this.addTextAlign;
        element.addPadding = this.addPadding;
        element.addMargin = this.addMargin;
        element.alignItems = this.alignItems;
        element.alignSelf = this.alignSelf;
        element.justifyItems = this.justifyItems;
        element.justifySelf = this.justifySelf;
        element.order = this.order;
        element.automargin = this.automargin;
        element.visible = this.visible;
        element.invisible = this.invisible;
        element.flushList = this.flushList;
    },
    addBorder: function () {
        this.classList.add("border");
    },
    addBackGround: function (type) {
        this.classList.add(`bg-${type}`)
    },
    addTextType: function (type) {
        this.classList.add(`text-${type}`)
    },
    addTextAlign: function (direction) {
        this.classList.add(`text-${direction}`)
    },
    addPadding: function (coord, width, breakpoint) {
        if (breakpoint) {
            this.classList.add(`p${coord}-${breakpoint}-${width}`)
        } else {
            this.classList.add(`p${coord}--${width}`)
        }
    },
    addMargin: function (coord, width, breakpoint) {
        if (breakpoint) {
            this.classList.add(`m${coord}-${breakpoint}-${width}`)
        } else {
            this.classList.add(`m${coord}--${width}`)
        }
    },
    alignItems: function (direction) {
        this.classList.add(`align-items-${direction}`)
    },
    alignSelf: function (direction) {
        this.classList.add(`align-self-${direction}`)
    },
    justifyItems: function (direction) {
        this.classList.add(`justify-items-${direction}`)
    },
    justifySelf: function (direction) {
        this.classList.add(`justify-self-${direction}`)
    },
    order: function (mod) {
        this.classList.add(`order-${mod}`);
    },
    offset: function (size, number) {
        this.classList.add(`offset-${size}-${number}`)
    },
    automargin: function (direction) {
        this.classList.add(`m${direction}-auto`)
    },
    visible: function () {
        this.classList.add("visible");
        this.classList.remove("invisible");
    },
    invisible: function () {
        this.classList.add("invisible");
        this.classList.remove("visible");
    },
    flushList: function (){
        this.classList.add("list-group-flush");
    },
}