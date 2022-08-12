﻿$(document).ready(function () {
    var form = $("#certifiedcopyform");
    $("#certifiedcopyform").validate({
        rules: {
            SalutationSelected:
            {
                required: true
            },
            FullName:
            {
                required: true
            },
            FullName_LL:
            {
                required: true,
                maxlength: 100
            },
            FatherSalutationSelected: "required",
            Father_Name:
            {
                required: true,
                maxlength: 100
            },
            Father_Name_LL:
            {
                required: true,
                maxlength: 100
            },
            Age:
            {
                required: true,
                maxlength: 3
            },
            Dateofbirth: "required",
            OccupationSelected: "required",
            GenderSelected: "required",
            Mobile:
            {
                required: true,
                MobileOnly: true
            },
            Email: {
                email: true
            },
            AddrCare:
            {
                required: true,
                maxlength: 100
            },
            Building:
            {
                required: true,
                maxlength: 100
            },
            DistrictSelected: "required",
            TalukaSelected: "required",
            VillageSelected: "required",
            Pincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },
            //Other Detail
            PaperDescription:
            {
                required: true
            },

            ReasonforPaper:
            {
                required: true
            },
            FileNo:
            {
                required: true
            },
            AreaCode:
            {
                required: true,
                ValidateCode : true
            },
        },
        messages: {
            SalutationSelected: {
                required: "Salutation Required"
            },
            FullName: {
                required: "FullName Required",
                maxlength: "100 characters allowed"
            },
            FullName_LL: {
                required: "FullName in Marathi Required",
                maxlength: "100 characters allowed"
            },
            FatherSalutationSelected: "Father Salutation Required",
            Father_Name: {
                required: "Father Name Required",
                maxlength: "100 characters allowed"
            },
            Father_Name_LL: {
                required: "Father Name in Marathi",
                maxlength: "100 characters allowed"
            },
            Age: {
                required: "Applicant Age Required",
                maxlength: "3 characters allowed"
            },
            Dateofbirth: "Date of birth Required",
            OccupationSelected: "Occupation Required",
            GenderSelected: "Gender Required",
            Mobile: {
                required: "Mobile no.Required",
                MobileOnly: "Mobile no Must Start with 7,8,9",
                minlength: "InValid Mobile no",
                maxlength: "InValid Mobile no",
                number: "Must be Number"
            },
            Email: {
                email: "Please Enter a valid email"

            },
            AddrCare: {
                required: "Address Required",
                maxlength: "100 characters allowed"
            },
            Building: {
                required: "Building Required",
                maxlength: "100 characters allowed"
            },
            DistrictSelected: "District Required",
            TalukaSelected: "Taluka Required",
            VillageSelected: "Village Required",
            pincode:
            {
                required: "Pincode Required",
                maxlength: "invalid pincode",
                minlength: "invalid pincode",
                number: "must be number",
                ValidatePincode: "pincode should start with 4 and 8"
            },
            PaperDescription: {
                required: "PaperDescriptionRequired",
                maxlength: "100 characters allowed"
            },
            ReasonforPaper: {
                required: "ReasonforPaper Required",
                maxlength: "100 characters allowed"
            },
            FileNo: {
                required: "FileNo Required",
                maxlength: "100 characters allowed"
            },
            AreaCode: {
                required: "AreaCode Required",
                maxlength: "4 characters allowed",
                ValidateCode: "Enter Valid (A012) Area code",
            },
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element text-danger field-validation-error
            error.addClass("text-danger field-validation-error");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        },
        submitHandler: function (form) {
            // do other things for a valid form
            //if (ValidateDetails()) {
            $.confirm({
                title: 'Confirmation!',
                content: 'Do you want to Submit Application ?',
                buttons: {
                    confirm: function () {
                        form.submit();
                    },
                    cancel: function () {
                        $.alert('Canceled!');
                    }
                }
            });
            //} else {
            //    return false;
            //}
        }
    });


    $.validator.addMethod("ValidateCode", function (value, element) {
        if ($("#AreaCode").val() != "") {
            var reg = /^[A-Z]{1}[0-9]{3}$/;
            if (reg.test($("#AreaCode").val())) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    });


    $.validator.addMethod("MobileOnly", function (value, element) {
        if ($("#Mobile").val() != "") {
            var reg = /^[7-9][0-9]{9}$/;
            if (reg.test($("#Mobile").val())) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    });

    $.validator.addMethod("ValidatePincode", function (value, element) {
        if ($("#Pincode").val() != "") {
            if ($("#Pincode").val().charAt(0) == "4" || $("#Pincode").val().charAt(0) == "8") {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    });

    $("#btnreset").click(function () {

        $.confirm({
            title: 'Confirmation!',
            content: 'Do you want to Reset Application ?',
            buttons: {
                Yes: function () {
                    window.location.reload();
                },
                No: function () {
                    $.alert('Canceled!');
                }
            }
        });
    });


    var datetemp = new Date();
    var tempyear = datetemp.getFullYear();
    //Add Date picker

    $("#Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'mm/dd/yy', yearRange: "1930:" + tempyear, onSelect: function (dateText) {
            CalculateAge();
        }
    });


    $('#Age').prop('readonly', true);

    //Occupation
    
    $("#OccupationSelected").change(function ()
    {
        let OccupationName = $("#OccupationSelected option:selected").text();
        $("#OccupationName").val(OccupationName);
        
     });

    //Applicant Address --START
    $("#DistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#TalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#TalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#TalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#VillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#VillageSelected").append(optionhtml);
                });
            }
        });

    });
    //Applicatant Address -- END


    
});

//Genral Function --Start

function CalculateAge() {
    var date1 = new Date();
    var dob = $("#Dateofbirth").val();
    var d = dob.split("/");
    var dateTimeInput = new Date(d[0] + "/" + d[1] + "/" + d[2]);
    var date2 = new Date(dateTimeInput);

    var allMonths = date1.getMonth() - date2.getMonth() + (12 * (date1.getFullYear() - date2.getFullYear()));

    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (pattern.test(dob)) {

        var y1 = date1.getFullYear();
        var y2 = date2.getFullYear();

        var datetemp = new Date();
        var tempyear = datetemp.getFullYear() - 125;
        var nd = new Date(tempyear, 01, 01);

        var tempyear1 = datetemp.getFullYear() - 18;
        var nd1 = new Date(tempyear1, 01, 01);

        var age = y1 - y2;


        if (d[2] == "0000") {
            alert("अवैध दिनांक.");
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            return false;
        }

        if (d[2] > nd1.getFullYear()) {
            alert('वय १८ पेक्षा जास्त असावे.');
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        // else {
        $("#Age").val(age);
        $('#Age').prop('readonly', true);
        return true;
        // }
    }
    else {
        if (localStorage.getItem('my-lstore') == '1') {
            $('#Age').prop('readonly', true);
            $("#Dateofbirth").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Age').prop('readonly', false);
            $("#Dateofbirth").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isAlphabetKey(evt) {

            var charCode = (evt.which) ? evt.which : event.keyCode

            var txt = String.fromCharCode(charCode)

            if (txt.match(/^[a-zA-Z\b ]+$/))

                return true;

            return false;

        }

function IsMarEngNum(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode

    var txt = String.fromCharCode(charCode)

    if (txt.match(/^[\u0900-\u097F]+$/) || (charCode == 32) || (charCode == 8 || charCode == 46) || (/^[A-z]+$/))

        if (txt.match(/^[0-9]*$/))
            return true;
        else

            return true;

    return false;

}

function IsMarEngNumSPC(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode

    var txt = String.fromCharCode(charCode)

    if (txt.match(/^[\u0900-\u097F]+$/) || (charCode == 8 || charCode == 46) || (/^[A-z]+$/))

        if (txt.match(/^[0-9]*$/))
            return true;
    if (charCode == 32)
        return false;
    else

        return true;

    return false;

}

