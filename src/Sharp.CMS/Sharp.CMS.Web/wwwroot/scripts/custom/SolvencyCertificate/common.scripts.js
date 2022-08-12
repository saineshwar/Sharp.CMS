$(document).ready(function () {
    $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
    $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
    $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
});
$(document).ready(function () {
    $("#BeneficiaryDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#BeneficiaryDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#BeneficiaryTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#BeneficiaryTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#BeneficiaryTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#BeneficiaryTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,
            
            success: function (data) {
                $("#BeneficiaryVillageSelected").empty();
                $.each(data, function (i) {
                    
                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BeneficiaryVillageSelected").append(optionhtml);
                });
            }
        });

    });

});

$(document).ready(function () {
    $("#SolvencyCategory").change(function () {
        var requestSolvencyEnumModel = { enumerationId: $("#SolvencyCategory").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetSolvencyEnum",
            dataType: "json",
            data: requestSolvencyEnumModel,

            success: function (data) {
                $("#SolvencySubCategory").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].EnumerationValueID + '">' + data[i].EnumerationValue + '</option>';
                        $("#SolvencySubCategory").append(optionhtml);
                    });
            }
        });
    });
});

$(document).ready(function () {
    var current_year = new Date().getFullYear();

    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#BeneficiaryDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
       
        }
    });
    $('#ApplicantAge').prop('readonly', true);
    $('#AmountInWords').prop('readonly', true);

});
function CalculateAge() {

    var date1 = new Date();
    var dob = $("#ApplicantDOB").val();
    var d = dob.split("/");
    var dateTimeInput = new Date(d[1] + "/" + d[0] + "/" + d[2]);
    var date2 = new Date(dateTimeInput);

    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (pattern.test(dob)) {

        var y1 = date1.getFullYear();
        var y2 = date2.getFullYear();

        var age = y1 - y2;

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय 18 वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#ApplicantDOB").val('');
            $("#ApplicantDOB").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();
            return false;
        }
        if (d[2] == "0000") {
            alert("अवैध दिनांक.");
            $("#ApplicantDOB").val('');
            $("#ApplicantDOB").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();

            return false;
        }
        else {
            $("#ApplicantAge").val(age);
            $('#ApplicantAge').prop('readonly', true);
            return true;
        }
    }
    else {
        if (localStorage.getItem('my-lstore') == '1') {
            $('#ApplicantAge').prop('readonly', true);
            $("#ApplicantDOB").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#ApplicantAge').prop('readonly', false);
            $("#ApplicantDOB").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}



$("#Share").change(function () {
    if ($(this).val() > 100) {
        $("#Share").val() == "";
        alert("हिस्सा १००% पेक्षा जास्त असू शकत नाही.")
    } else if ($(this).val() == 100) {
        $("#partner").hide();
    }
    else {
        $("#partner").show();   
    }
});

$("#SalutationSelected").change(function () {
    document.getElementById("SalutationSelectedText").value = $("#SalutationSelected option:selected").text();
    var SalutationId = $("#SalutationSelected").find("option:selected").val();

    if (SalutationId == "1330" || SalutationId == "1339" || SalutationId == "1344") { //सौ श्रीमती कुमारी
        $("#GenderSelected").val('1161');
        $("#GenderSelected option[value='1163']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
    } else if (SalutationId == "1335" || SalutationId == "1338") {
        $("#GenderSelected").val('1163');
        $("#GenderSelected option[value='1161']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
    } else {
        $("#GenderSelected").val('');
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
    }
});


$(document).ready(function () {
    $("#SolvencyAmount").change(function () {
        var SolvencyAmount = $("#SolvencyAmount").val();

        $.ajax({
            type: "POST",
            url: "/Service/Solvency/convertToWords",
            dataType: "json",
            data: { n: SolvencyAmount },
            success: function (data) {
                if (data!="") {
                    document.getElementById("AmountInWords").value = data;
                }
            }
        });
    });
});
$(document).ready(function () {
    $("#SolvencySubCategory").change(function () {
        if ($(this).val() == "1204") {
            $("#SheetKapat").show(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1207") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").show(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1214") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").show(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1209") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").show(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1213") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").show();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1197") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").show(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1196") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").show(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1199") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").show(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1218") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").show(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1217") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").show();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1205") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").show(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1212") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").show(); $("#Shop").hide(); $("#Land").hide();
        }
        else if ($(this).val() == "1211") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").show(); $("#Land").hide();
        }
        else if ($(this).val() == "1190") {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").show();
        }
        else {
            $("#SheetKapat").hide(); $("#GhargutiVastu").hide(); $("#HardAmount").hide(); $("#Durchitravani").hide(); $("#Pashudhan").hide();
            $("#Lakudsaman").hide(); $("#Jewellery").hide(); $("#othersubcategory").hide(); $("#WashingMachine").hide(); $("#Vehicle").hide();
            $("#Sadnika").hide(); $("#Bunglow").hide(); $("#Shop").hide(); $("#Land").hide();
        }
    });
});

$("#RelationofApplicant").change(function () {
    if ($(this).val() == "1280") {
        $("#beneficiarydetails").hide();
    } else {
        $("#beneficiarydetails").show();
    }
});
//Sadnika
$(document).ready(function () {
    $("#SadnikaDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#SadnikaDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#SadnikaTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#SadnikaTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#SadnikaTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#SadnikaTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#SadnikaVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#SadnikaVillageSelected").append(optionhtml);
                });
            }
        });

    });

});

//Bunglow
$(document).ready(function () {
    $("#BunglowDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#BunglowDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#BunglowTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#BunglowTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#BunglowTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#BunglowTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#BunglowVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BunglowVillageSelected").append(optionhtml);
                });
            }
        });

    });

});

//Shop
$(document).ready(function () {
    $("#ShopDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ShopDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ShopTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ShopTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#ShopTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ShopTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ShopVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ShopVillageSelected").append(optionhtml);
                });
            }
        });

    });

});

//Land
$(document).ready(function () {
    $("#LandDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#LandDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#LandTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#LandTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#LandTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#LandTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#LandVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#LandVillageSelected").append(optionhtml);
                });
            }
        });

    });

});