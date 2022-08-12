$(document).ready(function () {
    var form = $("#ewscentralgovtform");
    $("#ewscentralgovtform").validate({
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
            //Beneficiary
            BeneficiarySalutationSelected:
            {
                required: true
            },
            RelationofBeneficiary:
            {
                required: true
            },
            Beneficiary_Caste:
            {
                required: true
            },
            Beneficiary_Name:
            {
                required: true
            },
            Beneficiary_Name_LL:
            {
                required: true,
                maxlength: 100
            },
            BenFatherSalutationSelected: "required",
            BenFatherFullNameEng:
            {
                required: true,
                maxlength: 100
            },
            BenFatherFullNameMar:
            {
                required: true,
                maxlength: 100
            },
            BenFatherDOB: "required",
            BenFatherOccuSelected: "required",
            BenFatherGenderSelected: "required",


            Beneficiary_Dateofbirth: "required",
            BeneficiaryOccupationSelected: "required",
            Beneficiary_GenderSelected: "required",

            Dateofbirth: "required",
            OccupationSelected: "required",
            GenderSelected: "required",

            Mobile: {
                required: true,
                MobileOnly: true,
                minlength: 10
              
            },
            Beneficiary_Mobile: {
                required: true,
                MobileOnly: true,
                minlength: 10
            },
            BenFatherMobile: {
                required: true,
                MobileOnly: true,
                minlength: 10
            },
            Email: {
                email: true
            },
            AddrCare:
            {
                required: true,
            },
            Beneficiary_Email: {
                email: true
            },
            BenHouseNo:
            {
                required: true,
            },
            BenFatherEmail: {
                email: true
            },
            BenFatherHouseNo:
            {
                required: true,
            },
            IncomeFromSalary: 
            {
                required: true,
                maxlength: 8
            },
            IncomeFromBusiness:
            {
                required: true,
                maxlength: 8
            },
            IncomeFromAgriCulture:
            {
                required: true,
                maxlength: 8
            },
            IncomeFromInvestment:
            {
                required: true,
                maxlength: 8
             },
            IncomeFromOthersher: 
            {
            required: true,
            maxlength: 8
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

            BenFatherDistrictSelected: "required",
            BenFatherTalukaSelected: "required",
            BenFatherVillageSelected: "required",
            BenFatherPincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },

            BenDistrictSelected: "required",
            BenTalukaSelected: "required",
            BenVillageSelected: "required",
            BenPincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            }
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
            Dateofbirth: "Date of birth Required",
            OccupationSelected: "Occupation Required",
            GenderSelected: "Gender Required",
            Mobile: {
                required: "Mobile Required",
                MobileOnly: "InValid Mobile no",
                minlength: "InValid Mobile no"
            },
            //beneficiary

            BeneficiarySalutationSelected: {
                required: "Salutation Required"
            },
            RelationofBeneficiary: {
                required: "Beneficiary Relation Required"
            },
            Beneficiary_Name: {
                required: "FullName Required",
                maxlength: "100 characters allowed"
            },
            Beneficiary_Name_LL: {
                required: "FullName in Marathi Required",
                maxlength: "100 characters allowed"
            },
            Beneficiary_Dateofbirth: "Date of birth Required",
            BeneficiaryOccupationSelected: "Occupation Required",
            Beneficiary_GenderSelected: "Gender Required",

            Beneficiary_Mobile: {
                required: "Mobile Required",
                MobileOnly: "InValid Mobile no",
                minlength: "InValid Mobile no"
            },
            Beneficiary_Caste: {
                required: "Caste Required",
                maxlength: "100 characters allowed"
            },
            Beneficiary_Email: {
                email: "Please Enter a valid email"

            },
            BenHouseNo: {
                required: "Address Required",
                maxlength: "8 characters allowed"
            },
            //Beneficiary Father

            BenFatherSalutationSelected: {
                required: "Salutation Required"
            },
            BenFatherFullNameEng: {
                required: "FullName Required",
                maxlength: "100 characters allowed"
            },
            BenFatherFullNameMar: {
                required: "FullName in Marathi Required",
                maxlength: "100 characters allowed"
            },
            BenFatherDOB: "Date of birth Required",
            BenFatherOccuSelected: "Occupation Required",
            BenFatherGenderSelected: "Gender Required",

            BenFatherMobile: {
                required: "Mobile Required",
                MobileOnly: "InValid Mobile no",
                minlength: "InValid Mobile no"
            },

            BenFatherEmail: {
                email: "Please Enter a valid email"

            },
            BenFatherHouseNo: {
                required: "Address Required",
                maxlength: "8 characters allowed"
            },

            IncomeFromBusiness: {
                required: "Please enter Business Enterprises income",
                maxlength: "8 characters allowed"
            },
            IncomeFromSalary: {
                required: "Please enter Salary / Wages income.",
                maxlength: "8 characters allowed"
            },
            IncomeFromAgriCulture: {
                required: "Please enter Agriculture income.",
                maxlength: "8 characters allowed"
            },
            IncomeFromInvestment: {
                required: "Please entre Investment income.",
                maxlength: "8 characters allowed"
            },
            IncomeFromOthersher: {
                required: "Please enter income from others.",
                maxlength: "8 characters allowed"
            },

            DistrictSelected: " District Required",
            TalukaSelected: "Taluka Required",
            VillageSelected: "Village Required",
            Pincode:
            {
                required: "PinCode Required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                ValidatePincode: "PinCode should start with 4 and 8"
            },
            BenDistrictSelected: " District Required",
            BenTalukaSelected: "Taluka Required",
            BenVillageSelected: "Village Required",
            BenPincode:
            {
                required: "PinCode Required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                ValidatePincode: "PinCode should start with 4 and 8"
            },
            BenFatherDistrictSelected: " District Required",
            BenFatherTalukaSelected: "Taluka Required",
            BenFatherVillageSelected: "Village Required",
            BenFatherPincode:
            {
                required: "PinCode Required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                ValidatePincode: "PinCode should start with 4 and 8"
            }
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
            debugger;
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

    $("#Beneficiary_Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'mm/dd/yy', yearRange: "1930:2099", onSelect: function (dateText) {
            CalculateBeneficiaryAge();
        }
    });

    $('#Age').prop('readonly', true);
    $('#Beneficiary_Age').prop('readonly', true);

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

    //Beneficary Adress --START
    $("#BenDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#BenDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#BenTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#BenTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#BenTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#BenTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#BenVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BenVillageSelected").append(optionhtml);
                });
            }
        });

    });
    
    //Beneficiary --END

    $("#BenFatherDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#BenFatherDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#BenFatherTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#BenFatherTalukaSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#BenFatherTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#BenFatherTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#BenFatherVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BenFatherVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#land_distSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#land_distSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#land_subdistSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#land_subdistSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#land_subdistSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#land_subdistSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#land_villSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#land_villSelected").append(optionhtml);
                });
            }
        });

    });


    $("#OutSideland_distSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#OutSideland_distSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#OutSideland_subdistSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#OutSideland_subdistSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#OutSideland_subdistSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#OutSideland_subdistSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#OutSideland_villSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#OutSideland_villSelected").append(optionhtml);
                });
            }
        });

    });

    $("#BenFatherDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2010", onSelect: function (dateText) {
        }
    });

    $("#FromDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'mm/dd/yy', yearRange: "1930:2099", onSelect: function (dateText) {
            CalculateYearDiff();
        }
    });

    $("#ToDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'mm/dd/yy', yearRange: "1930:2099", onSelect: function (dateText) {
            CalculateYearDiff();
        }
    });
});

//Genral Function --Start

function UpdateBeneficiaryCategory(_SelectedItem) {
    var Beneficiary_Category = $("#Beneficiary_Category_List");
    Beneficiary_Category[0].selectedIndex = _SelectedItem.selectedIndex;
    SetBeneficiaryCategory(Beneficiary_Category[0]);
    return
}

function SetBeneficiaryCategory(_SelectedItem) {
    var Beneficiary_Category_ID = $("#Beneficiary_Category");
    Beneficiary_Category_ID[0].value = _SelectedItem.value;
    var Beneficiary_Category_Data = $("#Beneficiary_Category_Data");
    Beneficiary_Category_Data[0].value = _SelectedItem.selectedOptions[0].text;
    return
}

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
        else {
            $("#Age").val(age);
            $('#Age').prop('readonly', true);
            return true;
        }
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

function   CalculateBeneficiaryAge() {
    var date1 = new Date();
    var dob = $("#Beneficiary_Dateofbirth").val();
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

        var age = y1 - y2;


        if (d[2] == "0000") {
            alert("अवैध दिनांक.");
            $("#Beneficiary_Dateofbirth").val('');
            $("#Beneficiary_Dateofbirth").focus();

            $("#Beneficiary_Age").val('');
            $("#Beneficiary_Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Beneficiary_Dateofbirth").val('');
            $("#Beneficiary_Dateofbirth").focus();

            $("#Beneficiary_Age").val('');
            $("#Beneficiary_Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Beneficiary_Dateofbirth").val('');
            $("#Beneficiary_Dateofbirth").focus();

            $("#Beneficiary_Age").val('');
            return false;
        }
        else {
            $("#Beneficiary_Age").val(age);
            $('#Beneficiary_Age').prop('readonly', true);
            return true;
        }
    }
    else {
        if (localStorage.getItem('my-lstore') == '1') {
            $('#Beneficiary_Age').prop('readonly', true);
            $("#Beneficiary_Dateofbirth").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Beneficiary_Age').prop('readonly', false);
            $("#Beneficiary_Dateofbirth").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}


function CalculateYearDiff() {
    var date1 = document.getElementById("ToDate").value;
    var date2 = document.getElementById("FromDate").value;

    var d1 = date1.split("/");
    var d2 = date2.split("/");

    var pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/; //Regex to validate date format (dd/mm/yyyy)
    if (d1[2] < d2[2])
    {
        alert("FromDate should be Less than ToDate");
        return;
    }
   else if (d1[2] == d2[2])
    {
        if (d1[0] < d2[0])
        {
            alert("FromDate should be Less than ToDate");
            return;
        }
        else if (d1[0] == d2[0])
        {
            if (d1[1] < d2[1])
            {
                alert("FromDate should be Less than ToDate");
                return;
            }
        }
    }

    if ((pattern.test(date1)) || (pattern.test(date2)))
    {

        var dateTimeInput1 = new Date(d1[0] + "/" + d1[1] + "/" + d1[2]);
        var date1 = new Date(dateTimeInput1);

        var dateTimeInput2 = new Date(d2[0] + "/" + d2[1] + "/" + d2[2]);
        var date2 = new Date(dateTimeInput2);
        
        var year = parseInt((date1.getTime() - date2.getTime()) / (365.25 * 24 * 60 * 60 * 1000), 10);

        document.getElementById("Year").value = year;
    }
}


function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function isAlphabetKey(evt)
{
    var inputValue = (evt.which) ? evt.which : event.keyCode
    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
        event.preventDefault();
    }

}


var a = ['', 'एक', 'दोन', 'तीन', 'चार', 'पाच', 'सहा', 'सात', 'आठ', 'नऊ', 'दहा', 'अकरा', 'बारा', 'तेरा', 'चौदा', 'पंधरा', 'सोळा', 'सतरा', 'अठरा', 'एकोणीस', 'वीस', 'एकवीस', 'बावीस', 'तेवीस', 'चोवीस', 'पंचवीस', 'सव्वीस', 'सत्तावीस', 'अठ्ठावीस', 'एकोणतीस', 'तीस', 'एकतीस', 'बत्तीस', 'तेहतीस', 'चौतीस', 'पस्तीस', 'छत्तीस', 'सदतीस', 'अडतीस', 'एकोणचाळीस', 'चाळीस', 'एकेचाळीस', 'बेचाळीस', 'त्रेचाळीस', 'चव्वेचाळीस', 'पंचेचाळीस', 'सेहेचाळीस', 'सत्तेचाळीस', 'अठ्ठेचाळीस', 'एकोणपन्नास', 'पन्नास', 'एकावन्न', 'बावन्न', 'त्रेपन्न', 'चौपन्न', 'पंचावन्न', 'छपन्न', 'सत्तावन्न', 'अठ्ठावन्न', 'एकोणसाठ', 'साठ', 'एकसष्ट', 'बासष्ट', 'त्रेसष्ट', 'चौसष्ट', 'पासष्ट', 'सहासष्ट', 'सदुसष्ट', 'अडुसष्ट', 'एकोणसत्तर', 'सत्तर', 'एकाहत्तर', 'बाहत्तर', 'त्र्याहत्तर', 'चौ-याहत्तर', 'पंच्याहत्तर', 'शाहत्तर', 'सत्याहत्तर', 'अठ्ठ्याहत्तर', 'एकोणऐंशी', 'ऐंशी', 'एक्याऐंशी', 'ब्याऐंशी', 'त्र्याऐंशी', 'चौ-याऐंशी', 'पंच्याऐंशी', 'शहाऐंशी', 'सत्याऐंशी', 'अठ्ठ्याऐंशी', 'एकोणनव्वद', 'नव्वद', 'एक्याण्णव', 'ब्याण्णव', 'त्र्याण्णव', 'चौ-याण्णव', 'पंच्याण्णव', 'शहाण्णव', 'सत्याण्णव', 'अठ्ठ्याण्णव', 'नव्याण्णव', 'शंभर'];
var b = ['', 'वीस', 'तीस', 'चाळीस', 'पन्नास', 'साठ', 'सत्तर', 'ऐंशी', 'नव्वद'];

function toWordsTotalIncome() {
    var num = document.getElementById("txtTotal").value;
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'कोटी ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'लाख ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'हजार ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'शे ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';

    var aa = str;
   // document.getElementById("txt_totalIncome_Words").value = str;
    return str;
}


function OneYearIncome() {
    var t_sal = $("#txtSalary").val();
    var t_Bussi = $("#txtBusiness").val();
    var t_other = $("#txtOther").val();
    var t_invest = $("#txtInvest").val();
    var t_agri = $("#txtAgri").val();

    var t_totalIncm = $("#txtTotal").val();

    if (t_sal == "") t_sal = 0;
    if (t_Bussi == "") t_Bussi = 0;
    if (t_other == "") t_other = 0;
    if (t_invest == "") t_invest = 0;
    if (t_agri == "") t_agri = 0;

    if (t_totalIncm == "") t_totalIncm = 0;

    t_totalIncm = parseInt(t_sal) + parseInt(t_Bussi) + parseInt(t_other) + parseInt(t_invest) + parseInt(t_agri);

    $("#txtTotal").val(t_totalIncm);
    var words = toWordsTotalIncome(txtTotal);

    $("#txt_totalIncome_Words").val(words);
    //document.getElementById("txt_totalIncome_Words").value = words;

    return;

}

function ToggleTextBoxmigAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#MIgrantDistAddress").show();
    }
    else {
        $("#MIgrantDistAddress").hide();
    }
}

function ToggleTextBoxPerAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#BenfiAddress").hide();
    }
    else {
        $("#BenfiAddress").show();
    }
}

function ToggleComponentById(_compId, _hide) {

    if (_hide)
      $("#" + _compId)[0].hidden = false;
        //$("#" + _compId).show();
    else
        $("#" + _compId)[0].hidden = true;
       // $("#" + _compId).hide();
    return;
}


//function validateUID(UIDValue) {
//    let reg = /^[0-9][0-9]{11}$/;
//    return reg.test(UIDValue);
//}
