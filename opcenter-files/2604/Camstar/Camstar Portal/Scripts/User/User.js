/*
***************************************************************************
Copyright Siemens 2023  
This file should include all user-defined javascript functions. 
Functions defined in this file will over-ride any functions of the
same name written in any of the Camstar supplied javascript files.
***************************************************************************


*/

(function () {
    if (window.location.pathname.toLowerCase().includes("containermaintenancevp.aspx")) {
        console.log("Entered");
        var style = document.createElement("style");

        style.textContent = `
            .webpart-status #SpanStatusMessage {
                font-size: 15px !important;
            }
        `;
        document.head.appendChild(style);
    }
})();