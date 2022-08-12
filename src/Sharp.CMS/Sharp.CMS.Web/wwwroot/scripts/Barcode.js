function generateBarcode(barcodeval) {
    var value = barcodeval;
    //var btype = "code39" "code93" "code128" "code11";
    var btype = "code39";
    var renderer = "css";

    var quietZone = false;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 40,
        moduleSize: 5,
        posX: 10,
        posY: 20,
        addQuietZone: 1
    };


    $(".Renderbarcode").html("").show().barcode(value, btype, settings);

}


/*for Senior Citizen*/
function genBarcode(barcodeval) {
    var value = barcodeval;
    //var btype = "code39" "code93" "code128" "code11";
    var btype = "code39";
    var renderer = "css";

    var quietZone = false;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 20,
        moduleSize: 5,
        posX: 5,
        posY: 10,
        addQuietZone: 1
    };


    $(".Renderbarcode").html("").show().barcode(value, btype, settings);

}
/*for UID Aadhaar */
function genBarcodeUID(barcodeval) {
    var value = barcodeval;
    //var btype = "code39" "code93" "code128" "code11";
    var btype = "code39";
    var renderer = "css";

    var quietZone = false;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 25,
        moduleSize: 5,
        posX: 5,
        posY: 10,
        addQuietZone: 1
    };


    $(".Renderbarcode").html("").show().barcode(value, btype, settings);

}


/*for UID SGNP */
function BarcodeSGNP(barcodeval) {
    var value = barcodeval;
    //var btype = "code39" "code93" "code128" "code11";
    var btype = "code39";
    var renderer = "css";

    var quietZone = true;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 15,
        moduleSize: 3,
        posX: 5,
        posY: 10,
        addQuietZone: 0,
        fontSize: 8
    };


    $(".Renderbarcode").html("").show().barcode(value, btype, settings);

}
function generateBarcodeSaatBara(barcodeval) {
    var value = barcodeval;
    //var btype = "code39" "code93" "code128" "code11";
    var btype = "code39";
    var renderer = "css";

    var quietZone = false;

    var settings = {
        output: renderer,
        bgColor: "#FFFFFF",
        color: "#000000",
        barWidth: 1,
        barHeight: 40,
        moduleSize: 5,
        posX: 10,
        posY: 20,
        addQuietZone: 1
    };


    $(".Renderbarcode").html("").show().barcode(btype, settings);

}

/*for whether to show a barcode or not */
function ShowBarCode(control,showbarcode) {
             debugger;
             var IsVisibleBarcode = showbarcode;
             if (IsVisibleBarcode == true) {
                 control.style.display = 'block';
             }
             else {             
                 control.style.display = 'none';
             }
}

