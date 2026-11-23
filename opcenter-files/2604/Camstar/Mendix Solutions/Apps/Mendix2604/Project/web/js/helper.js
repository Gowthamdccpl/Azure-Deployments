async function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

/*-------------------------------------------------Eprocedure Starts-------------------------------------------------------------------------*/
const Show_Pane = "showpane";
const Hide_Pane = "hidepane";
const showPane = (pane) => pane?.addClass(Show_Pane).removeClass(Hide_Pane);
const hidePane = (pane) => pane?.removeClass(Show_Pane).addClass(Hide_Pane);
const isPaneVisible = (pane) => !pane?.hasClass(Hide_Pane);
function showMinMaxSplitButtons(currentButtonClass) {
    let otherButtonClass = "";

    if (currentButtonClass.includes("_max")) {
        otherButtonClass = currentButtonClass.replace("_max", "_min");
    } else {
        otherButtonClass = currentButtonClass.replace("_min", "_max");
    }

    $("." + currentButtonClass).hide();
    $("." + otherButtonClass).show();
}

//This will add css classes to carousel container as per different panes visibility
function adjustDocumentCarousalWidgetWidth() {

    const outerSplitter = $(".splitPane-Outer");
    const innerSplitter = $(".splitPane-Inner");

    const instructionPane = outerSplitter.find(".Pane1").first();
    const taskWorkAreaPane = innerSplitter.find(".Pane1").first();

    const instructionPaneVisible = isPaneVisible(instructionPane);
    const taskWorkAreaPaneVisible = isPaneVisible(taskWorkAreaPane);

    if (instructionPaneVisible && taskWorkAreaPaneVisible) {
        addClassToDocPreviewFooter("carouselMinWidth");
    } else if (taskWorkAreaPaneVisible) {
        addClassToDocPreviewFooter("carouselMedWidth");
    } else {
        addClassToDocPreviewFooter("carouselMaxWidth");
    }
}

// Write a function to add css class to an document preview footer
function addClassToDocPreviewFooter(className) {
    const CarouselMinWidth = "carouselMinWidth";
    const CarouselMedWidth = "carouselMedWidth";
    const CarouselMaxWidth = "carouselMaxWidth";

    const DocPreviewFooter = $(".docPreviewFooter");
    if (DocPreviewFooter.length) {
        switch (className) {
            case CarouselMinWidth:
                DocPreviewFooter.addClass(CarouselMinWidth).removeClass(CarouselMedWidth).removeClass(CarouselMaxWidth);
                break;
            case CarouselMedWidth:
                DocPreviewFooter.removeClass(CarouselMinWidth).addClass(CarouselMedWidth).removeClass(CarouselMaxWidth);
                break;
            case CarouselMaxWidth:
                DocPreviewFooter.removeClass(CarouselMinWidth).removeClass(CarouselMedWidth).addClass(CarouselMaxWidth);
                break;
        }
        DocPreviewFooter.addClass(className);
    }
}

/*-------------------------------------------------Eprocedure Ends---------------------------------------------------------------------------*/