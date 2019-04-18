import bootstrapCreator from "./bootstrapCreator";

export default {
    //ensures this thing is idiot proof and at least puts a bootstrap element on the DOM by defaulting to specific settings.
    manageOptions: function (bp, px, w) {
        let breakpoint
        if (bp && bp === ("lg", "sm", "md")) {
            breakpoint = bp;
        } else {
            breakpoint = "sm";
        }
        let x
        if (px && px === ("px" || "mx")) {
            x = px;
        } else {
            x = "px";
        }
        let width
        if (typeof w === "number") {
            width = w;
        } else {
            width = 1;
        }
        const settingsArray = [breakpoint, x, width];
        return settingsArray;
    }
}