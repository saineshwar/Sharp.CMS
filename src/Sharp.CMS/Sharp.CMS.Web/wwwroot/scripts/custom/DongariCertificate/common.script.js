$(document).ready(function () {
    var form = $("#dongaricertificateform");
    $("#dongaricertificateform").validate({
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
            Mobile:
            {
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
            DistrictSelected: "required",
            TalukaSelected: "required",
            VillageSelected: "required",
            Pincode:
            {
                required : true,
                 maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },
            RelationofBeneficiary:
            {
                required: true
            },
            //Beneficiary validatation

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
            Beneficiary_Dateofbirth: "required",
            Beneficiary_GenderSelected: "required",
            Beneficiary_Mobile:
            {
                
                BeneficiaryMobileOnly: true,
               
            },
            Beneficiary_Email: {
                email: true
            },
           Beneficiary_AddrCare:
            {
                required: true,
                maxlength: 100
            },
            Beneficiary_DistrictSelected: "required",
            Beneficiary_TalukaSelected: "required",
            Beneficiary_VillageSelected: "required",
            Beneficiary_Pincode:
            {
                required : true,
                maxlength: 6,
                minlength: 6,
                number: true,
                BeneficiaryValidatePincode: true
            },

            //Education Validation
            SchoolName:
            {
                required: true
            },
            SchoolPlace:
            {
                required: true
            },
            SecondarySchoolName:
            {
                required: true
            },
            SecondarySchoolPlace:
            {
                required: true
            },
            RationCardIssuerName:
            {
                required: true
            },
            Grampanchayat:
            {
                required: true
            },
            BirthPlace:
            {
                required: true
            },
            RationCardNumber:
            {
                required: true
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
                required: "Pincode required",
                maxlength: "invalid pincode",
                minlength: "invalid pincode",
                number: "must be number",
                validatepincode: "pincode should start with 4 and 8"
            },

            RelationofBeneficiary: {
                required: "Beneficiary Relation Required"
            },
                
            BeneficiarySalutationSelected: {
                required: "Beneficiary Salutation Required"
                },
            Beneficiary_Name: {
                required: "Beneficiary Name Required",
                    maxlength: "100 characters allowed"
                },
            Beneficiary_Name_LL: {
                required: "Beneficiary Name in Marathi Required",
                    maxlength: "100 characters allowed"
                },
            Beneficiary_Dateofbirth: "Beneficiary DOB Required",
            Beneficiary_GenderSelected: "Beneficiary Gender Required",
              Beneficiary_Mobile: {
                    BeneficiaryMobileOnly: "Mobile no Must Start with 7,8,9",
                    minlength: "InValid Mobile no",
                    maxlength: "InValid Mobile no",
                    number: "Must be Number"
                },
            Beneficiary_Email: {
                    email: "Please Enter a valid Email"

                },
            Beneficiary_AddrCare: {
                required: "Beneficiary Address Required",
                    maxlength: "100 characters allowed"
                },
            Beneficiary_DistrictSelected: "District Required",
            Beneficiary_TalukaSelected: "Taluka Required",
            Beneficiary_VillageSelected: "Village Required",
            Beneficiary_Pincode:
            {
                required: "Pincode required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                BeneficiaryValidatePincode: "PinCode should start with 4 and 8"
            },

            SchoolName: {
                required: "SchoolName Required",
                maxlength: "100 characters allowed"
            },
            SchoolPlace: {
                required: "SchoolPlace Required",
                maxlength: "100 characters allowed"
            },
            SecondarySchoolName: {
                required: "Secondary SchoolName Required",
                maxlength: "100 characters allowed"
            },
            SecondarySchoolPlace: {
                required: "Secondary SchoolPlace Required",
                maxlength: "100 characters allowed"
            },
            RationCardIssuerName: {
                required: "RationCard IssuerName Required",
                maxlength: "100 characters allowed"
            },
            RationCardNumber: {
                required: "Ration CardNumber Required",
                maxlength: "40 characters allowed"
            },
            Grampanchayat: {
                required: "Grampanchayat name Required",
                maxlength: "100 characters allowed"
            },
            BirthPlace: {
                required: "BirthPlace Required",
                maxlength: "100 characters allowed"
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


    $.validator.addMethod("BeneficiaryMobileOnly", function (value, element) {
        if ($("#Beneficiary_Mobile").val() != "") {
            var reg = /^[7-9][0-9]{9}$/;
            if (reg.test($("#Beneficiary_Mobile").val())) {
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
    $.validator.addMethod("BeneficiaryValidatePincode", function (value, element) {
        if ($("#Beneficiary_Pincode").val() != "") {
            if ($("#Beneficiary_Pincode").val().charAt(0) == "4" || $("#Beneficiary_Pincode").val().charAt(0) == "8") {
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
            url: "/Service/DongariCertificate/GetDongariTaluka",
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
            url: "/Service/DongariCertificate/GetDongariVillage",
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
            url: "/Service/DongariCertificate/GetDongariTaluka",
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
            url: "/Service/DongariCertificate/GetDongariVillage",
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


        var tempyear1 = datetemp.getFullYear() - 18;
        var nd1 = new Date(tempyear1, 01, 01);

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
        if (d[2] > nd1.getFullYear()) {
            alert('वय १८ पेक्षा जास्त असावे.');
            $("#Beneficiary_Dateofbirth").val('');
            $("#Beneficiary_Dateofbirth").focus();

            $("#Beneficiary_Age").val('');
            $("#Beneficiary_Age").focus();
            return false;
        }
        //else {
            $("#Beneficiary_Age").val(age);
            $('#Beneficiary_Age').prop('readonly', true);
            return true;
        //}
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

function isNumberKey(evt) {
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

// Hnadle On Change event for beneficaray Relation on change --START
function onRelationofBeneficiaryChange() {

    var ID = $('#RelationofBeneficiaryComponent').val();
    var selectedItemText = $('#RelationofBeneficiaryComponent option:selected').text();
   
     if (selectedItemText == "स्वतः" || ID == 1280)
    {
       //Update the ben deatils with self deatils
     
        /*
         *$('#BeneficiarySalutationSelected').attr("readonly", true);
         $('#Beneficiary_Name').attr("readonly", true);
         $('#Beneficiary_Name_LL').attr("readonly", true);
         $('#Beneficiary_Dateofbirth').attr("readonly", true);
         $('#Beneficiary_Age').attr("readonly", true);
         $('#Beneficiary_GenderSelected').attr("readonly", true);
         $('#Beneficiary_TelephoneNo').attr("readonly", true);
         $('#Beneficiary_Mobile').attr("readonly", true);
         $('#Beneficiary_Email').attr("readonly", true);
         $('#Beneficiary_AddrCare').attr("readonly", true);
         $('#Beneficiary_Locality').attr("readonly", true);
         $('#Beneficiary_Building').attr("readonly", true);
         $('#Beneficiary_Street').attr("readonly", true);
         $('#Beneficiary_Landmark').attr("readonly", true);
         $('#Beneficiary_Pincode').attr("readonly", true);
         $('#Beneficiary_DistrictSelected').attr("readonly", true);
         $('#Beneficiary_VillageSelected').attr("readonly", true);
         $('#Beneficiary_TalukaSelected').attr("readonly", true);
       */

        let selfSal = $('#SalutationSelected').val();
        $('#BeneficiarySalutationSelected').val(selfSal);

        let selfName = $('#FullName').val();
         $('#Beneficiary_Name').val(selfName);

        let selfNameLL = $('#FullName_LL').val();
         $('#Beneficiary_Name_LL').val(selfNameLL);

         let selfDOB = $('#Dateofbirth').val();
         $('#Beneficiary_Dateofbirth').val(selfDOB);

         let selfAge = $('#Age').val();
         $('#Beneficiary_Age').val(selfAge);

         let selfGender = $('#GenderSelected').val();
         $('#Beneficiary_GenderSelected').val(selfGender);

         let selfLandline = $('#LandlineNo').val();
         $('#Beneficiary_TelephoneNo').val(selfLandline);

         let selfMobile = $('#Mobile').val();
         $('#Beneficiary_Mobile').val(selfMobile);

         let selfEmail = $('#Email').val();
         $('#Beneficiary_Email').val(selfEmail);

         let selfAdd = $('#AddrCare').val();
         $('#Beneficiary_AddrCare').val(selfAdd);


         let selfLocality = $('#Locality').val();
         $('#Beneficiary_Locality').val(selfLocality);

         let selfBuild = $('#Building').val();
         $('#Beneficiary_Building').val(selfBuild);

         let selfStreet = $('#Street').val();
         $('#Beneficiary_Street').val(selfStreet);

         let selfLandmark = $('#Landmark').val();
         $('#Beneficiary_Landmark').val(selfLandmark);

         let selfPincode = $('#Pincode').val();
         $('#Beneficiary_Pincode').val(selfPincode);





        //Address Deatls Update

        let valDistrictSelectedID = $('#DistrictSelected').val()
        let valTalukaSelectedID = $('#TalukaSelected').val()
        let valVillageSelectedID = $('#VillageSelected').val()


        $('#Beneficiary_DistrictSelected').val(valDistrictSelectedID);
        var requestTalukaModel = { Districtcode: valDistrictSelectedID };
        $.ajax({
            type: "POST",
            url: "/Service/DongariCertificate/GetDongariTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#Beneficiary_TalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#Beneficiary_TalukaSelected").append(optionhtml);
                       
                    });
                $('#Beneficiary_TalukaSelected').val(valTalukaSelectedID);

            }
        });

         var requestVillageModel = { SubDistrictcode:valTalukaSelectedID };
        $.ajax({
            type: "POST",
            url: "/Service/DongariCertificate/GetDongariVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#Beneficiary_VillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#Beneficiary_VillageSelected").append(optionhtml);
                });
                $('#Beneficiary_VillageSelected').val(valVillageSelectedID);

            }
        });
       





    }
    else
    {
        //Remove all the value that set if relation is self

         $('#Beneficiary_Name').val("");
         $('#BeneficiarySalutationSelected').val("");
         $('#Beneficiary_Name').val("");
         $('#Beneficiary_Name_LL').val("");
         $('#Beneficiary_Dateofbirth').val("");
         $('#Beneficiary_Age').val("");
         $('#Beneficiary_GenderSelected').val("");
         $('#Beneficiary_TelephoneNo').val("");
         $('#Beneficiary_Mobile').val("");
         $('#Beneficiary_Email').val("");
         $('#Beneficiary_AddrCare').val("");
         $('#Beneficiary_Locality').val("");
         $('#Beneficiary_Building').val("");
         $('#Beneficiary_Street').val("");
         $('#Beneficiary_Landmark').val("");
         $('#Beneficiary_Pincode').val("");


         $("#Beneficiary_TalukaSelected").empty();
         $("#Beneficiary_VillageSelected").empty();

         var optionhtml = '<option value="">Select</option>';
         $("#Beneficiary_TalukaSelected").append(optionhtml);
         $("#Beneficiary_VillageSelected").append(optionhtml);

         $('#Beneficiary_DistrictSelected').val("");
         $('#Beneficiary_VillageSelected').val("");
         $('#Beneficiary_TalukaSelected').val("");

         /*
         $('#BeneficiarySalutationSelected').attr("readonly", false);
         $('#Beneficiary_Name').attr("readonly", false);
         $('#Beneficiary_Name_LL').attr("readonly", false);
         $('#Beneficiary_Dateofbirth').attr("readonly", false);
         $('#Beneficiary_Age').attr("readonly", false);
         $('#Beneficiary_GenderSelected').attr("readonly", false);
         $('#Beneficiary_TelephoneNo').attr("readonly", false);
         $('#Beneficiary_Mobile').attr("readonly", false);
         $('#Beneficiary_Email').attr("readonly", false);
         $('#Beneficiary_AddrCare').attr("readonly", false);
         $('#Beneficiary_Locality').attr("readonly", false);
         $('#Beneficiary_Building').attr("readonly", false);
         $('#Beneficiary_Street').attr("readonly", false);
         $('#Beneficiary_Landmark').attr("readonly", false);
         $('#Beneficiary_Pincode').attr("readonly", false);
         $('#Beneficiary_DistrictSelected').attr("readonly", false);
         $('#Beneficiary_VillageSelected').attr("readonly", false);
         $('#Beneficiary_TalukaSelected').attr("readonly", false);
         */
    }
}
//--END

//Validate the other detail of user --Start

//function ValidateDetails() {
//    var isValidate = true;
//    var ID = $('#RelationofBeneficiaryComponent').val();
//    if (ID != "" && ID != undefined && ID != 1263) {
//        isValidate = ValidateBenificiaryDetails();

//        if (isValidate) {
//            var addressID = $('#Beneficiary_Address').val();
//            if (addressID != "" && addressID != undefined && addressID != "No") {
//                isValidate = ValidateBenificiaryAddressDetails();
//            }
//        }
//    }
//    return isValidate;
//}
//--END

//Validate Benificary Deatils
//--START

//function ValidateBenificiaryDetails() {
//    var isValidate = true;

//    $("#noncreamylayerform").validate({
//        rules: {
//            BeneficiarySalutationSelected:
//            {
//                required: true
//            },
//            Beneficiary_Name:
//            {
//                required: true
//            },
//            Beneficiary_Name_LL:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_UID: {
//                required: true
//            }
//            //,
//            //Beneficiary_Citizen_Number: {
//            //    required: true
//            //}
//        },
//        messages: {
//            BeneficiarySalutationSelected: {
//                required: "Beneficiary Salutation Required"
//            },
//            Beneficiary_Name: {
//                required: "Beneficiary FullName Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_Name_LL: {
//                required: "Beneficiary FullName in Marathi Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_UID: {
//                required: "Beneficiary UID Required"
//            }
//            //,
//            //Beneficiary_Citizen_Number: {
//            //    required: "Beneficiary Citizen Required",
//            //    maxlength: "100 characters allowed"
//            //}
//        },
//        errorElement: "span",
//        errorPlacement: function (error, element) {
//            // Add the `help-block` class to the error element text-danger field-validation-error
//            error.addClass("text-danger field-validation-error");

//            if (element.prop("type") === "checkbox") {
//                error.insertAfter(element.parent("label"));
//            } else {
//                error.insertAfter(element);
//            }
//            isValidate = false;
//        },
//        highlight: function (element, errorClass, validClass) {
//            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
//        },
//        unhighlight: function (element, errorClass, validClass) {
//            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
//        }
//    });

//    return isValidate;
//}

//function ValidateBenificiaryAddressDetails() {
//    var isValidate = true;
//    $("#noncreamylayerform").validate({
//        rules: {
//            Beneficiary_AddrCare:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_Building:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_Street:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_Locality:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_Landmark:
//            {
//                required: true,
//                maxlength: 100
//            },
//            Beneficiary_DistrictSelected: "required",
//            Beneficiary_TalukaSelected: "required",
//            Beneficiary_VillageSelected: "required",
//            Beneficiary_Pincode:
//            {
//                required: true,
//                maxlength: 6,
//                minlength: 6,
//                number: true,
//                ValidatePincode: true
//            }

//        },
//        messages: {
//            Beneficiary_AddrCare: {
//                required: "Address Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_Building: {
//                required: "Building Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_Street: {
//                required: "Street Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_Locality: {
//                required: "Locality Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_Landmark: {
//                required: "Landmark Required",
//                maxlength: "100 characters allowed"
//            },
//            Beneficiary_DistrictSelected: "District Required",
//            Beneficiary_TalukaSelected: "Taluka Required",
//            Beneficiary_VillageSelected: "Village Required",
//            Beneficiary_Pincode:
//            {
//                required: "PinCode Required",
//                maxlength: "Invalid PinCode",
//                minlength: "Invalid PinCode",
//                number: "Must be Number",
//                ValidatePincode: "PinCode should start with 4 and 8"
//            }
//        },
//        errorElement: "span",
//        errorPlacement: function (error, element) {
//            // Add the `help-block` class to the error element text-danger field-validation-error
//            error.addClass("text-danger field-validation-error");

//            if (element.prop("type") === "checkbox") {
//                error.insertAfter(element.parent("label"));
//            } else {
//                error.insertAfter(element);
//            }
//            isValidate = false;
//        },
//        highlight: function (element, errorClass, validClass) {
//            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
//        },
//        unhighlight: function (element, errorClass, validClass) {
//            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
//        }

//    });

//    $.validator.addMethod("ValidatePincode", function (value, element) {
//        if ($("#Pincode").val() != "") {
//            if ($("#Pincode").val().charAt(0) == "4" || $("#Pincode").val().charAt(0) == "8") {
//                return true;
//            }
//            else {
//                return false;
//            }
//        }
//        return true;
//    });


//    return isValidate;
//}

//--END

//Validate UID is 12 digit number value start from 0 to 9

function validateUID(UIDValue) {
    let reg = /^[0-9][0-9]{11}$/;
    return reg.test(UIDValue);
}

//--END

//OTP and Bio Matric Verfication Model Window --
//UIDContainerId - Value for UID container to fetch UID.
//ApplicationType - Type of application to verify 1 - Boimetric 2- OTP

//function openWindow(UIDContainerId, ApplicationType) {

//    var code = "";
//    code = document.getElementById(UIDContainerId).value;

//    if (validateUID(code) != false) {
//        var EID = "0";
//        var left = (screen.width / 2) - (560 / 2);
//        var top = (screen.height / 2) - (400 / 2);

//        //Bio Matric
//        if (ApplicationType == "1") {
//            //window.open('../UIDValidation/VerifyUID.aspx?UID=' + ApplicationType + '&EID=' + EID + '&E=N&SessionName=' + SessionName, 'open_window', ' width=560, height=450, top=' + top + ', left=' + left);
//        }
//        //OTP based Verifcation
//        else if (ApplicationType == "2") {
//            //window.open('../UIDValidation/UID_OTP.aspx?UID=' + ApplicationType + '&EID=' + EID + '&SessionName=' + SessionName, 'open_window', ' width=560, height=450, top=' + top + ', left=' + left);
//        }
//    }
//}
//--END
        //Genral Function --End
