$(document).ready(function () {
    var form = $("#armlicenseform");
    $("#armlicenseform").validate({
        rules: {
            Salutation:
            {
                required: true
            },
            FullNameEng:
            {
                required: true
            },
            FullNameMar:
            {
                required: true,
                maxlength: 100
            },
            FatherSalutation: "required",
            FatherFullNameEng:
            {
                required: true,
                maxlength: 100
            },
            FatherFullNameMar:
            {
                required: true,
                maxlength: 100
            },
            Age:
            {
                required: true,
                maxlength: 3
            },
            DOB: "required",
            Occupation: "required",
            Gender: "required",
            Mobile:
            {
                required: true,
                MobileOnly: true
            },
            ApplicantOfficeYear: "required",
            HouseNo:
            {
                required: true,
                maxlength: 100
            },
            
            District: "required",
            Taluka: "required",
            Village: "required",
            Pincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },
            PermanentPincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePermanentPincode: true
            },
            IsPermanentAddress:
            {
                required: true
            },
           
            PermanentHouseNo:
            {
                required: true,
                maxlength: 100
            },
            
            PermanentDistrict: "required",
            PermanentTaluka: "required",
            PermanentVillage: "required",

            IsInnocentValue: "required",
            InnocentDOB: "required",

            InnocentMistake:
            {
                required: true,
                maxlength: 100
            },
            InnocentEducation:
            {
                required: true,
                maxlength: 100
            },
            CRPCEducation:
            {
                required: true,
              
            },
            CRPCEducationDetails:
            {
                required: true,
              
            },
            CRPCDOB:
            {
                required: true,
              
            },
            CRPCBondPeriod:
            {
                required: true,
              
            },
            UseARMPlace:
            {
                required: true,
              
            },
            UseARMDOB:
            {
                required: true,
              
            },
            UseARMResultCategory:
            {
                required: true,
              
            },
            UsedARMDetails:
            {
                required: true,
              
            },
            UsedARMReason:
            {
                required: true,
              
            },
            UsedARMDOB:
            {
                required: true,
              
            },
            
            MemberARMDetails:
            {
                required: true,
              
            },
            MemberARMReason:
            {
                required: true,
              
            },
            Nationality:
            {
                required: true,
              
            },
            ArmDruggistDOB:
            {
                required: true,
              
            },
            
            ArmDruggistApproval:
            {
                required: true,
              
            },
            ArmDruggistPart:
            {
                required: true,
              
            },
            ArmDruggistStreet:
            {
                required: true,
              
            },
            ArmDruggistDetails:
            {
                required: true,
              
            },
            ArmDruggistPlace:
            {
                required: true,
              
            },
            ArmDruggistSuggestion:
            {
                required: true,
              
            },
            ArmDruggistOther:
            {
                required: true,

            },
            ISCRPCValue:
            {
                required: true
            },
            IsARMValue:
            {
                required: true
            },
            IsUseARMValue:
            {
                required: true
            },
            IsUseARMDetails:
            {
                required: true
            },
            IsMemberARMValue:
            {
                required: true
            },
            IsARMSafetyValue:
            {
                required: true
            },
            IsArmDruggistValue:
            {
                required: true
            },
            IsArmDruggistApprov:
            {
                required: true
            },
            ArmDruggistPart:
            {
                requied: true
            }
        },
        messages: {
            Salutation: {
                required: "कृपया अर्जदाराच्या संबोधनाची निवड करा."
            },
            FullNameEng: {
                required: "कृपया अर्जदाराच्या पूर्ण नावाची (इंग्रजी) नोंद करा.",
                maxlength: "100 characters allowed"
            },
            FullNameMar: {
                required: "कृपया अर्जदाराच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "100 characters allowed"
            },
            FatherSalutation: "कृपया अर्जदाराच्या वडिलांच्या संबोधनाची निवड करा.",
            FatherFullNameEng: {
                required: "कृपया अर्जदाराच्या पित्याच्या/ पतीच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "100 characters allowed"
            },
            FatherFullNameMar: {
                required: "कृपया अर्जदाराच्या पित्याच्या/ पतीच्या पूर्ण नावाची (इंग्रजी) नोंद करा.",
                maxlength: "100 characters allowed"
            },
            Age: {
                required: "कृपया अर्जदाराच्या वयाची नोंद करा.",
                maxlength: "3 characters allowed"
            },
            DOB: "कृपया अर्जदाराच्या जन्म दिनांकाची नोंद करा.",
            Occupation: "कृपया अर्जदाराच्या व्यवसायाची निवड करा.",
            Gender: "कृपया अर्जदाराच्या लिंगाची निवड करा.",
            Mobile: {
                required: "कृपया अर्जदाराच्या भ्रमणध्वनी क्रमांकाची नोंद करा.",
                MobileOnly: "Mobile no Must Start with 7,8,9",
                minlength: "InValid Mobile no",
                maxlength: "InValid Mobile no",
                number: "Must be Number"
            },
            ApplicantOfficeYear:"कृपया कार्यालयात असल्यास या रकान्यात तपशिलाची नोंद करा.",
            HouseNo: {
                required: "कृपया अर्जदाराच्या वर्तमान पत्त्याची नोंद करा",
                maxlength: "100 characters allowed"
            },
            District: "कृपया वर्तमान पत्त्यातील जिल्हा निवडा.",
            Taluka: "कृपया वर्तमान पत्त्यातील तालुका निवडा.",
            Village: "कृपया वर्तमान पत्त्यातील गाव निवडा.",
            Pincode:
            {
                required: "Pincode Required",
                maxlength: "invalid pincode",
                minlength: "invalid pincode",
                number: "must be number",
                ValidatePincode: "Pincode should start with 4 and 8"
            },
            PermanentPincode:
            {
                required: "PinCode Required",
                maxlength: "Invalid PinCode",
                minlength: "Invalid PinCode",
                number: "Must be Number",
                ValidatePermanentPincode: "PinCode should start with 4 and 8"
            },
            IsPermanentAddress:
            {
                required:"IsPermanentAddress Required"
            },
            PermanentHouseNo: {
                required: "कृपया अर्जदाराच्या कायमच्या पत्त्याची नोंद करा.",
                maxlength: "100 characters allowed"
            },
            PermanentDistrict: "कृपया कायमच्या पत्त्यातील जिल्हा निवडा.",
            PermanentTaluka: "कृपया कायमच्या पत्त्यातील तालुका निवडा.",
            PermanentVillage: "कृपया कायमच्या पत्त्यातील गाव निवडा.",

            IsInnocentValue:
            {
                required: "IsInnocentValue Required"
            },
            InnocentMistake:
            {
                required: "कृपया कोणत्या गुन्ह्यासाठी अर्जदार दोषी सिद्ध झाला, ते निवडा."
            } ,
            InnocentEducation:
            {
                required: "कृपया गुन्ह्यासाठीच्या शिक्षेच्या तपशिलाची नोंद करा."
            },
            InnocentDOB:
            {
                required: "कृपया शिक्षा सुनावल्याच्या तारखेची नोंद करा."
            },
            CRPCEducation:
            {
                required: "बंधपत्र जारी करायचा आदेश देणाऱ्या प्राधिकरणाच्या नावाची नोंद करा.",

            },
            CRPCEducationDetails:
            {
                required: "बंधपत्र जारी केले, त्या शिक्षेच्या तपशिलाची नोंद करा.",

            },
            CRPCDOB:
            {
                required: "कृपया शिक्षा सुनावल्याच्या तारखेची नोंद करा.",

            },
            CRPCBondPeriod:
            {
                required: "ज्या कालावधीसाठी बंधपत्र जारी केले, तो कालावधी नमूद करा.",

            },
            UseARMPlace:
            {
                required: "अर्जदाराने जेथून शस्त्र परवान्यासाठी अर्ज केला, त्या ठिकाणाची नोंद करा.",

            },
            UseARMDOB:
            {
                required: "अर्जदाराने जेव्हा शस्त्र परवान्यासाठी अर्ज केला, त्या तारखेची नोंद करा.",

            },
            UseARMResultCategory:
            {
                required: "शस्त्र परवाना मंजूर किंवा नामंजूर झाला, ते निवडा.",

            },
            UsedARMDetails:
            {
                required: "अर्जदाराचा शस्त्र परवाना परत घेणाऱ्या/ निलंबित/ रद्द करणाऱ्या प्राधिकरणाच्या नावाची कृपया नोंद करा.",

            },
            UsedARMReason:
            {
                required: "अर्जदाराचा शस्त्र परवाना परत घेण्याच्या /निलंबित/रद्द करण्याच्या कारणाची कृपया नोंद करा.",

            },
            UsedARMDOB:
            {
                required: "शस्त्र परवाना परत घेतला/ निलंबित/ रद्द केला, त्या तारखेची कृपया नोंद करा.",

            },
            MemberARMDetails:
            {
                required: "कुटुंबातील अन्य सदस्य बाळगून असलेल्या शस्त्र परवान्याचा तपशील नोंद करा.",

            },
            MemberARMReason:
            {
                required: "अर्जदार बाळगून असलेल्या शस्त्राच्या वर्णनाची नोंद करा.",

            },
            Nationality:
            {
                required: "कृपया अर्जदाराच्या राष्ट्रीयत्व निवडा.",

            },
            ArmDruggistDOB:
            {
                required: "कृपया भारतातील आगमनाच्या तारखेची नोंद करा.",

            },

            ArmDruggistApproval:
            {
                required: "कृपया परवाना कशासाठी हवा, त्या कारणाची नोंद करा.",

            },
            ArmDruggistPart:
            {
                required: "कृपया परवान्यासाठी आवेदित क्षेत्राच्या वर्णनाची नोंद करा.",

            },
            ArmDruggistStreet:
            {
                required: "आयात/निर्यात/ वाहतुकीचे ठिकाण/ मार्गाची कृपया नोंद करा.",

            },
            ArmDruggistDetails:
            {
                required: "कृपया अर्जदाराकडे असलेल्या शस्त्राच्या वर्णनाची नोंद करा.",

            },
            ArmDruggistPlace:
            {
                required: "शस्त्र साठवणुकीच्या ठिकाणाची कृपया नोंद करा.",

            },
            ArmDruggistSuggestion:
            {
                required: "विशेष विचार करण्याचा एखादा दावा असल्यास कृपया त्याबाबतच्या तपशिलाची नोंद करा.",

            },
            ArmDruggistOther:
            {
                required: "कृपया तपशिलाची नोंद करा",

            },
            ISCRPCValue:
            {
                required: "Please select Yes or No."
            },
            IsARMValue:
            {
                required: "Please select Yes or No."
            },
            IsUseARMValue:
            {
                required: "Please select Yes or No."
            },
            IsUseARMDetails:
            {
                required: "Please select Yes or No."
            },
            IsMemberARMValue:
            {
                required: "Please select Yes or No."
            },
            IsARMSafetyValue:
            {
                required: "Please select Yes or No."
            },
            IsArmDruggistValue:
            {
                required: "Please select Yes or No."
            },
            IsArmDruggistApprov:
            {
                required: "Please select Yes or No."
            },
            ArmDruggistPart:
            {
                required: "आवेदित क्षेत्र देणे अनिवार्य आहे"
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
            $("#btnSubmit").click(function () {
                if ($('input[type=radio][id=ISCRPCValue]:checked').length == 0) {
                    alert("सीआरपीसीच्या आठव्या प्रकरणांतर्गत शांतता बाळगल्याबद्दल अथवा सद्वर्तनाबद्दल अर्जदाराला बंधपत्रानुसार अंमलबजावणीचा आदेश देण्यात आला आहे काय? पाहिजे");
                }
            });
            
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

    //$(document).ready(function () {
        
    //});

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

    $.validator.addMethod("ValidatePermanentPincode", function (value, element) {
        if ($("#PermanentPincode").val() != "") {
            if ($("#PermanentPincode").val().charAt(0) == "4" || $("#PermanentPincode").val().charAt(0) == "8") {
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

        $("#DOB").datepicker({
            maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
                CalculateAge();
            }
        });

        $('#Age').prop('readonly', true);

        $("#InnocentDOB").datepicker({
            maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
            }
        });
        $("#CRPCDOB").datepicker({
            maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
            }
        });
         $("#UseARMDOB").datepicker({
                maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
                }
            });
    $("#UsedARMDOB").datepicker({
                maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
                }
            });
    $("#ArmDruggistDOB").datepicker({
                maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
                }
            });

        $("#State").val("27");
       $("#PermanentState").val("27");


        //Applicant Address --START
        $("#District").change(function () {
            var requestTalukaModel = { Districtcode: $("#District").val() };

            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetTaluka",
                dataType: "json",
                data: requestTalukaModel,

                success: function (data) {
                    $("#Taluka").empty();
                    $.each(data,
                        function (i) {
                            var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                            $("#Taluka").append(optionhtml);
                        });
                }
            });
        });

        $("#Taluka").change(function () {
            var requestVillageModel = { SubDistrictcode: $("#Taluka").val() };
            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetVillage",
                data: requestVillageModel,

                success: function (data) {
                    $("#Village").empty();
                    $.each(data, function (i) {

                        var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                        $("#Village").append(optionhtml);
                    });
                }
            });

        });
        //Applicatant Address -- END


        //Permanent Address --START
        $("#PermanentDistrict").change(function () {
            var requestTalukaModel = { Districtcode: $("#PermanentDistrict").val() };

            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetTaluka",
                dataType: "json",
                data: requestTalukaModel,

                success: function (data) {
                    $("#PermanentTaluka").empty();
                    $.each(data,
                        function (i) {
                            var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                            $("#PermanentTaluka").append(optionhtml);
                        });
                }
            });
        });

        $("#PermanentTaluka").change(function () {
            var requestVillageModel = { SubDistrictcode: $("#PermanentTaluka").val() };
            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetVillage",
                data: requestVillageModel,

                success: function (data) {
                    $("#PermanentVillage").empty();
                    $.each(data, function (i) {

                        var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                        $("#PermanentVillage").append(optionhtml);
                    });
                }
            });

        });
        //Permanent Address -- END



    });

    //Genral Function --Start

    function CalculateAge() {
        var date1 = new Date();
        var dob = $("#DOB").val();
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

    function isNumberKey(evt) {
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

    function ToggleComponentById(_compId, _hide) {

       if (_hide)//hide if true
           $("#" + _compId)[0].hidden = true;
       else
           $("#" + _compId)[0].hidden = false;
       return;
    }

