import bootstrapCreator from "../../global modules/bootstrapUtility/bootstrapCreator"

export default {
    create: function (product) {
        const card = bootstrapCreator.createCard("div", "thiscardid");
        console.log(card);
    }
}