$(document).ready(function () {
    var form = $("#kutumbarthsahayaform");
    $("#kutumbarthsahayaform").validate({
        rules: {
            SalutationSelected:
            {
                required: true
            },
            FullName:
            {
                required: true
            },
            DeceasedAge: {
                required: true,
                ValidateDeceasedAge: true
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
            DateOfBirth: "required",
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
            Building:
            {

                maxlength: 100
            },
            Street:
            {

                maxlength: 100
            },
            Locality:
            {

                maxlength: 100
            },
            Landmark:
            {

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
            DeceasedSalutationSelected: { required: true },
            Shera: {
                required: true
            },
            DaridryaRehsa: {
                required: true
            },
            DeceasedDOD: {
                required: true
            },
            DeceasedPlace: {
                required: true
            },
            DateOfBirthI: { required: true },
            DeceasedFullName: { required: true },
            DeceasedFullName_LL: { required: true },

            DeceasedGenderSelected: { required: true },
            RelationshipOfDeceasedPerson: { required: true },
            CasteOfDeceasedPerson: { required: true },
            DeceasedReason: { required: true },
            HeadOfTheFamily: { required: true },
            DaridryaRehsa: { required: true },
            AnnualIncome:
            {
                required: {
                    depends: function () {
                        if ($("#DaridryaRehsa:checked").val() != "1" || ("#DaridryaRehsa: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                ValidateIncome: true

            },
            BPLCardNo:
            {
                required: {
                    depends: function () {
                        if ($("#DaridryaRehsa:checked").val() != "1" || ("#DaridryaRehsa: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            YearOfIssueOfBPLCard:
            {
                required: {
                    depends: function () {
                        if ($("#DaridryaRehsa:checked").val() != "1" || ("#DaridryaRehsa: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }

        },
        messages: {
            SalutationSelected: {
                required: "कृपया अर्जदाराच्या संबोधनाची निवड करा."
            },
            FullName: {
                required: "कृपया अर्जदाराच्या पूर्ण नावाची (इंग्रजी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे"
            },
            FullName_LL: {
                required: "कृपया अर्जदाराच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            
            FatherSalutationSelected: "कृपया अर्जदाराच्या वडिलांच्या संबोधनाची निवड करा.",
            Father_Name: {
                required: "कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची (इंग्रजी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedAge: {
                required: "कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची (इंग्रजी) नोंद करा.",
                ValidateDeceasedAge: "मृत व्यक्तीचे मृत्युसमयीचे वय 18 ते 64 वर्षे वयोगटातील नाही, त्यामुळे अर्जदार या योजनेसाठी अर्ज करण्यास पात्र नाही."

            },
            Father_Name_LL: {
                required: "कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DateOfBirth: { required: "कृपया जन्मतारीख प्रविष्ट करा." },
          
            GenderSelected: { required: "कृपया अर्जदाराच्या लिंगाची निवड करा." },
            OccupationSelected: { required: "कृपया अर्जदाराच्या व्यवसायाची निवड करा." },
            Mobile: {
                required: "कृपया अर्जदाराच्या भ्रमणध्वनी क्रमांकाची नोंद करा.",
                MobileOnly: "मोबाइल नंबर 7,8,9 ने प्रारंभ करणे आवश्यक आहे.",
                minlength: "मोबाइल नंबर अवैध आहे.",
                maxlength: "मोबाइल नंबर अवैध आहे.",
                number: "मोबाइल नंबर क्रमांक असणे आवश्यक आहे."
            },
            Email: {
                email: "कृपया वैध ईमेलची नोंद करा."

            },
            AddrCare: {
                required: "कृपया अर्जदाराच्या पत्त्याची नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            Building: {

                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            Street: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            Locality: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            Landmark: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DistrictSelected: " कृपया अर्जदाराच्या जिल्ह्याची निवड करा.",
            TalukaSelected: "कृपया अर्जदाराच्या तालुक्याची निवड करा.",
            VillageSelected: "कृपया अर्जदाराच्या गावाची निवड करा.",
            Pincode:
            {
                required: "कृपया अर्जदाराच्या पिनकोडची नोंद करा.",
                maxlength: "कृपया वैध पिनकोडची नोंद करा",
                minlength: "कृपया वैध पिनकोडची नोंद करा",
                number: "पिनकोड क्रमांक असणे आवश्यक आहे.",
                ValidatePincode: "पिनकोड ४ आणि  ८  ने सुरू झाले पाहिजे."
            },
            DeceasedSalutationSelected: { required: "कृपया मयत व्यक्तीचे संबोधन निवडा." },
            DeceasedFullName: { required: "कृपया मयत व्यक्तीच्या पूर्ण नावाची (इंग्रजी) नोंद करा." },
            DeceasedFullName_LL: { required: "कृपया मयत व्यक्तीच्या पूर्ण नावाची (मराठी) नोंद करा." },
            DeceasedDOD: {
                required: "मृत्यु झाला, त्या दिनांकाची नोंद करा."
            },
            DeceasedPlace: {
                required: "मृत्यु झाला, त्या ठिकाणाची नोंद करा."
            },

            DeceasedGenderSelected: { required: "कृपया अर्जदाराच्या लिंगाची निवड करा." },
            RelationshipOfDeceasedPerson: { required: "कृपया मयत व्यक्तीशी असलेल्या नात्याची निवड करा." },
            CasteOfDeceasedPerson: { required: "कृपया जात प्रवर्गाची नोंद करा." },
            DeceasedReason: { required: "कृपया मृत्युच्या कारणाची नोंद करा." },
            HeadOfTheFamily: { required: "अर्जदार हा सध्या मरण पावलेल्या कुटुंब प्रमुखाच्या कुटुंबाचा प्रमुख आहे काय, ते कृपया स्पष्ट करा." },
            DaridryaRehsa: { required: "अर्जदार दारिद्र्य रेषेखालील प्रवर्गातील असल्यास कृपया तसे निवडा." },
            BPLCardNo: { required: "कृपया बीपीएल कार्ड क्रमांकाची नोंद करा." },
            YearOfIssueOfBPLCard: { required: "कृपया बीपीएल कार्ड जारी झाले, त्या वर्षाची नोंद करा." },
            AnnualIncome: {
                required: "कृपया कुटुंबाच्या एकूण वार्षिक उत्पन्नाचीनोंद करा.",
                ValidateIncome: "अर्जदाराचे वार्षिक उत्पन्न रू. 21000  पेक्षा जास्त असल्यामुळे तो/ ती या योजनेसाठी अर्ज करण्यास पात्र नाही."

          
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
    $.validator.addMethod("ValidateDeceasedAge", function (value, element) {
        debugger;
     
            var DeceasedAge = parseInt(document.getElementById("DeceasedAge").value);
            if (DeceasedAge > 17 && DeceasedAge < 65) {
                return true;
            } else {
                return false;
            }
    
    });
    $.validator.addMethod("ValidateIncome", function (value, element) {
        debugger;
        if ($("#AnnualIncome").val() != "") {
            var AnnualIncome = parseInt(document.getElementById("AnnualIncome").value);
            if (AnnualIncome <= 21000) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    });





});

$(document).ready(function () {
    var select = document.getElementById('FatherSalutationSelected');
    debugger;
    for (i = 0; i < select.length; i++) {
        if (select.options[i].value == '1338') {
            select.remove(i);
        }
        if (select.options[i].value == '1330') {
            select.remove(i);
        }
        if (select.options[i].value == '1339') {
            select.remove(i);
        }
        if (select.options[i].value == '1344') {
            select.remove(i);
        }
        

    } 

    $("#DateofbirthI").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
            CalculateAge();
        }
    });

    $("#DeceasedDOD").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {

        }
    });

  
    



 
});

function ToggleComponentById(_compId, _hide) {
    debugger;
    if (_hide)
        $("#" + _compId)[0].hidden = true;
    else
        $("#" + _compId)[0].hidden = false;
    return;
}

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#DateofbirthI").val();
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
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

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
            $("#DateofbirthI").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#ApplicantAge').prop('readonly', false);
            $("#DateofbirthI").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function AddFamilyMember() {
    debugger;

    var FamilyMemberSalutationSelected = $("#FamilyMemberSalutationSelected option:selected").text();
    var FamilyMemberName = $('#FamilyMemberName').val();
    var FamilyMemberAge = $('#FamilyMemberAge').val();
    var RelationshipOfFamilyMember = $("#RelationshipOfFamilyMember option:selected").text();

    var FamilyMemberSalutationSelectedID = $("#FamilyMemberSalutationSelected option:selected").val();
    var RelationshipOfFamilyMemberID = $("#RelationshipOfFamilyMember option:selected").val()
   


    if (FamilyMemberName == null || FamilyMemberName == "") {
        alert("कृपया कुटुंबातील सदस्यांच्या नावांची नोंद करा!");
    }
    else if (FamilyMemberAge == null || FamilyMemberAge == "") {
        alert("कृपया कुटुंबातील सदस्यांच्या वयाची नोंद करा  !");
    }
    else if (parseInt(document.getElementById("FamilyMemberAge").value) > 125)
    {
        alert("कृपया कुटुंबातील सदस्यांच्या वयाची नोंद करा(1 to 125).")
        $("#FamilyMemberAge").val("");
        document.getElementById("FamilyMemberAge").placeholder = "कृपया कुटुंबातील सदस्यांच्या वयाची नोंद करा.";
    }

    else {

        var postdata = {
            FamilyMemberSalutationSelected: FamilyMemberSalutationSelected,
            FamilyMemberName: FamilyMemberName,
            FamilyMemberAge: FamilyMemberAge,
            RelationshipOfFamilyMember: RelationshipOfFamilyMember,
            FamilyMemberSalutationSelectedID: FamilyMemberSalutationSelectedID,
            RelationshipOfFamilyMemberID: RelationshipOfFamilyMemberID

        };

        $.ajax({
            type: 'POST',
            url: '/Service/KutumbArthSahayaCertificate/Insert_FamilyData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FamilyTable').empty();
                    }
                    else {
                        $('#FamilyTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>संबोधन</th><th>नाव</th><th>वय</th><th>अर्जदाराशी नाते</th><th>वगळा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberSalutationSelected +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberName +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberAge +
                                '</td>' +
                                '<td>' +
                                val.RelationshipOfFamilyMember +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> Delete</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FamilyTable').append(temptable);
                        document.getElementById("FamilyMemberSalutationSelected").value = "";
                        document.getElementById("FamilyMemberName").value = "";
                        document.getElementById("FamilyMemberAge").value = "";
                        document.getElementById("RelationshipOfFamilyMember").value = ""
                        

                    }
                }


            }
        });
    }
}

function deleteFamilyMember(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/KutumbArthSahayaCertificate/Delete_FamilyData",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FamilyTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                else {
                    $('#FamilyTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.No.</th><th>FamilyMemberSalutation</th><th>Name</th><th>Age</th><th>RelationshipOfFamilyMember</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberSalutationSelected +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberName +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberAge +
                            '</td>' +
                            '<td>' +
                            val.RelationshipOfFamilyMember +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FamilyTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

}

function onlyAlphabets(e, t) {
    try {
        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }
        if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
            return true;
        else
            return false;
    }
    catch (err) {
        alert(err.Description);
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function GetDeceasedSalutation() {
    debugger;
    var SalutationName;
    var SalutationIndex;
    SalutationIndex = document.getElementById("DeceasedSalutationSelected");
    SalutationName = SalutationIndex.options[SalutationIndex.selectedIndex].text;
    if (SalutationName == 'कुमार' || SalutationName == 'श्री.') {
        for (var option of document.getElementById("DeceasedGenderSelected").options) {
            if (option.text === 'पुरुष') {
                option.selected = true;
                $('#DeceasedGenderSelected option:contains("पुरुष")').removeAttr("disabled");
                $('#DeceasedGenderSelected option:contains("स्त्री")').attr("disabled", "disabled");
                return;
            }
        }
    }

    if (SalutationName == 'कुमारी' || SalutationName == 'श्रीमती' || SalutationName == 'सौ') {
        for (var option of document.getElementById("DeceasedGenderSelected").options) {
            if (option.text === 'स्त्री') {
                option.selected = true;
                $('#DeceasedGenderSelected option:contains("पुरुष")').attr("disabled", "disabled");
                $('#DeceasedGenderSelected option:contains("स्त्री")').removeAttr("disabled");

                return;
            }
        }
    }
    else {
        for (var option of document.getElementById("DeceasedGenderSelected").options) {
            if (option.text === 'Select') {
                document.getElementById("DeceasedGenderSelected").disabled = false;

                option.selected = true;
                return;
            }
        }
    }

}


function GetSalutation() {
    debugger;
    var SalutationName;
    var SalutationIndex;
    SalutationIndex = document.getElementById("SalutationSelected");
    SalutationName = SalutationIndex.options[SalutationIndex.selectedIndex].text;
    if (SalutationName == 'कुमार' || SalutationName == 'श्री.') {
        for (var option of document.getElementById("GenderSelected").options) {
            if (option.text === 'पुरुष') {
                option.selected = true;
                $('#GenderSelected option:contains("पुरुष")').removeAttr("disabled");
                $('#GenderSelected option:contains("स्त्री")').attr("disabled", "disabled");
                return;
            }
        }
    }

    if (SalutationName == 'कुमारी' || SalutationName == 'श्रीमती' || SalutationName == 'सौ') {
        for (var option of document.getElementById("GenderSelected").options) {
            if (option.text === 'स्त्री') {
                option.selected = true;
                $('#GenderSelected option:contains("पुरुष")').attr("disabled", "disabled");
                $('#GenderSelected option:contains("स्त्री")').removeAttr("disabled");

                return;
            }
        }
    }
    else {
        for (var option of document.getElementById("GenderSelected").options) {
            if (option.text === 'Select') {
                document.getElementById("GenderSelected").disabled = false;

                option.selected = true;
                return;
            }
        }
    }

}

//function ValidateIncome() {
//   var AnnualIncome = document.getElementById("AnnualIncome").value;
//   if (AnnualIncome > 21000) {
//   alert("अर्जदाराचे वार्षिक उत्पन्न रू. 21000  पेक्षा जास्त असल्यामुळे तो/ ती या योजनेसाठी अर्ज करण्यास पात्र नाही.");
//   $("#AnnualIncome").val("");
//   document.getElementById("AnnualIncome").placeholder = "कृपया कुटुंबाच्या एकूण वार्षिक उत्पन्नाचीनोंद करा.";
//}
           
//}

//function ValidateDeceasedAge() {
//    debugger;
//    var DeceasedAge = parseInt(document.getElementById("DeceasedAge").value);
//    if (DeceasedAge > 64 ) {
//        alert("मृत व्यक्तीचे मृत्युसमयीचे वय 18 ते 64 वर्षे वयोगटातील नाही, त्यामुळे अर्जदार या योजनेसाठी अर्ज करण्यास पात्र नाही.")
//        $("#DeceasedAge").val("");

//        document.getElementById("DeceasedAge").placeholder = "मृत व्यक्तीच्या मृत्युसमयीच्या वयाची कृपया नोंद करा.";

//    }
//    if ( DeceasedAge < 18) {
//        alert("मृत व्यक्तीचे मृत्युसमयीचे वय 18 ते 64 वर्षे वयोगटातील नाही, त्यामुळे अर्जदार या योजनेसाठी अर्ज करण्यास पात्र नाही.")
//        $("#DeceasedAge").val("");
//        document.getElementById("DeceasedAge").placeholder = "मृत व्यक्तीच्या मृत्युसमयीच्या वयाची कृपया नोंद करा.";
//    }

   
//}

