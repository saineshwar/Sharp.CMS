
$(document).ready(function () {
    var form = $("#noncreamylayerrenewalform");
    $("#noncreamylayerrenewalform").validate({
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
            Dateofbirth: "required",
            OccupationSelected: "required",
            GenderSelected: "required",
            Mobile: {
                required: true,
                MobileOnly: true,
                minlength: 10,
                maxlength: 10,
                number: true
            },
            Email: {
                email: true
            },
            AddrCare:
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

            //Beneficiary

            Beneficiary_Caste: "required",
            Beneficiary_Category: "required",
            Beneficiary_Validity_Duration: "required",
            Beneficiary_Father_Husband_DetailSalutationSelected: "required",
            Beneficiary_Father_Husband_Detail_Name: "required",
            Beneficiary_Father_Husband_Detail_Name_LL: "required",
            RelationofBeneficiary: "required",
            Beneficiary_Father_Husband_Detail_GenderSelected: "required",
            BeneficiarySalutationSelected:
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
            Beneficiary_AddrCare:
            {
                required: true,
                maxlength: 100
            },

            Beneficiary_DistrictSelected: "required",
            Beneficiary_TalukaSelected: "required",
            Beneficiary_VillageSelected: "required",
            Beneficiary_GenderSelected: "required",
            Beneficiary_Pincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },
            Reason:
            {
                required: true,
                maxlength: 100
            },
            Affidavit:
            {
                required: true,
                maxlength: 100
            },

            MigrantDistrictSelected: "required",
            MigrantTalukaSelected: "required",
            MigrantVillageSelected: "required",



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
            //Beneficiary 
            Beneficiary_Caste: "Beneficiary Caste Required",
            Beneficiary_Category: "Beneficiary Category Required",
            Beneficiary_Validity_Duration: "Beneficiary Validity Duration Required",
            Beneficiary_Father_Husband_DetailSalutationSelected: " Salutation required",
            Beneficiary_Father_Husband_Detail_Name: "Father/Husband Name required",
            Beneficiary_Father_Husband_Detail_Name_LL: " Father/Husband Name(in Marathi)required",
            RelationofBeneficiary: " Select Relation of Beneficiary",
            Beneficiary_Father_Husband_Detail_GenderSelected: "Gender required",

            BeneficiarySalutationSelected: {
                required: "Beneficiary Salutation Required"
            },
            Beneficiary_Name: {
                required: "Beneficiary FullName Required",
                maxlength: "100 characters allowed"
            },
            Beneficiary_Name_LL: {
                required: "Beneficiary FullName in Marathi Required",
                maxlength: "100 characters allowed"
            },

            Beneficiary_DistrictSelected: "District Required",
            Beneficiary_TalukaSelected: "Taluka Required",
            Beneficiary_VillageSelected: "Village Required",
            Beneficiary_GenderSelected: "Gender Required",
            Beneficiary_Pincode:
            {
                required: "PinCode Required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                ValidatePincode: "PinCode should start with 4 and 8"
            },
            MigrantDistrictSelected: "District Required",
            MigrantTalukaSelected: "Taluka Required",
            MigrantVillageSelected: "Village Required",

            Reason:
            {
                required: "Reason Required",

            },
            Affidavit:
            {
                required: "Affidavit Required",
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


    var datetemp = new Date();
    var tempyear = datetemp.getFullYear();
    //Add Date picker
    $("#Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + tempyear, onSelect: function (dateText) {
            CalculateAge();
        }
    });

    $("#Beneficiary_Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {
            //CalculateAge();
        }
    });

    $("#Beneficiary_Father_Husband_Detail_Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#IssueDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });


    $("#DateOfJoining_FatherSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#DateOfJoining_MotherSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#DateOfJoining_SpouseSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#DateOfRetirement_FatherSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#DateOfRetirement_MotherSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });

    $("#DateOfRetirement_SpouseSelected").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2099", onSelect: function (dateText) {

        }
    });


    //Load Year
    function LoadYears() {
        var todayDate = new Date();
        var currentYear = todayDate.getFullYear();
        var month = todayDate.getMonth() + 1;
        var LastPreviousYear = 3;
        if (month >= 1 && month <= 3) {
            LastPreviousYear = 4;
        }

        $("#lblyr3").text((currentYear - (LastPreviousYear - 2)) + " - " + (currentYear - (LastPreviousYear - 3)));
        $("#lblyr2").text((currentYear - (LastPreviousYear - 1)) + " - " + (currentYear - (LastPreviousYear - 2)));
        $("#lblyr1").text((currentYear - LastPreviousYear) + " - " + (currentYear - (LastPreviousYear - 1)));
    }

    LoadYears();

    $('#Age').prop('readonly', true);

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
    $("#Beneficiary_DistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#Beneficiary_DistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#Beneficiary_TalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#Beneficiary_TalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#Beneficiary_TalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#Beneficiary_TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#Beneficiary_VillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#Beneficiary_VillageSelected").append(optionhtml);
                });
            }
        });

    });
    //Beneficiary --END

    //Migrant District Selected Adress --START
    $("#MigrantDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#MigrantDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#MigrantTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#MigrantTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#MigrantTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#MigrantTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#MigrantVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#MigrantVillageSelected").append(optionhtml);
                });
            }
        });

    });
    //Beneficiary --END

    //Other Family Detail  Adress --START
    $("#OtherFamilyDetailDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#OtherFamilyDetailDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#OtherFamilyDetailTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#OtherFamilyDetailTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#OtherFamilyDetailTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#OtherFamilyDetailTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#OtherFamilyDetailVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#OtherFamilyDetailVillageSelected").append(optionhtml);
                });
            }
        });

    });
    //Other Family Detail Address --END


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
    var dateTimeInput = new Date(d[1] + "/" + d[0] + "/" + d[2]);
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


function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function isAlphabetKey(evt) {
    var inputValue = (evt.which) ? evt.which : event.keyCode
    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
        event.preventDefault();
    }

}

function OneYearIncome() {
    var t_Field = $("#txtagri1").val();
    var t_Bussi = $("#txtBusiness1").val();
    var t_other = $("#txtOther1").val();
    var t_totalIncm = $("#txtTotal1").val();

    if (t_Field == "") t_Field = 0;
    if (t_Bussi == "") t_Bussi = 0;
    if (t_other == "") t_other = 0;
    if (t_totalIncm == "") t_totalIncm = 0;

    t_totalIncm = parseInt(t_Field) + parseInt(t_Bussi) + parseInt(t_other);

    $("#txtTotal1").val(t_totalIncm);

    return;

}

function SecondYearIncome() {
    var t_Field = $("#txtagri2").val();
    var t_Bussi = $("#txtBusiness2").val();
    var t_other = $("#txtOther2").val();
    var t_totalIncm = $("#txtTotal2").val();
    if (t_Field == "") t_Field = 0;
    if (t_Bussi == "") t_Bussi = 0;
    if (t_other == "") t_other = 0;
    if (t_totalIncm == "") t_totalIncm = 0;
    t_totalIncm = parseInt(t_Field) + parseInt(t_Bussi) + parseInt(t_other);
    $("#txtTotal2").val(t_totalIncm);
    return;
}

function ThirdYearIncome() {
    var t_Field = $("#txtagri3").val();
    var t_Bussi = $("#txtBusiness3").val();
    var t_other = $("#txtOther3").val();
    var t_totalIncm = $("#txtTotal3").val();
    if (t_Field == "") t_Field = 0;
    if (t_Bussi == "") t_Bussi = 0;
    if (t_other == "") t_other = 0;
    if (t_totalIncm == "") t_totalIncm = 0;
    t_totalIncm = parseInt(t_Field) + parseInt(t_Bussi) + parseInt(t_other);
    $("#txtTotal3").val(t_totalIncm);
    return;
}

function ToggleComponentById(_compId, _hide) {

    if (_hide)
        $("#" + _compId)[0].hidden = true;
    else
        $("#" + _compId)[0].hidden = false;
    return;
}

function MigrantAddressDetail(_flag) {
    ToggleComponentById('MigrantAddressDetailComponent', _flag);
    ToggleComponentById('CasteCertificateAppliedComponent', _flag);
}

function onRelationofBeneficiaryChange() {

    var ID = $('#RelationofBeneficiaryComponent').val();
    if (ID == "" || ID == undefined || ID == 1263) {
        //Hide the Beneficary Detail Component
        $("#BeneficiaryDetailComponent")[0].hidden = true;
        //$("#BeneficiaryUIDDetailComponent")[0].hidden = true;

    } else {
        $("#BeneficiaryDetailComponent")[0].hidden = false;
        //$("#BeneficiaryUIDDetailComponent")[0].hidden = false;
    }
}


        //Genral Function --End
