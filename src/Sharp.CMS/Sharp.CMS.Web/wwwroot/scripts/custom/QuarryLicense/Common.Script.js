//Main Document.Ready
$(document).ready(function () {
    var form = $("#QuarryLicenseform");
    $("#QuarryLicenseform").validate({
        rules: {
            MineralName: {
                required: true
            },
            MineralProportionInBrass: {
                required: true
            },
            TinNo: {
                required: true
            },
            GroupNo: {
                required: true
            },
            LandConditionsAndDescriptions: {
                required: true
            },
            LandArea: {
                required: true
            },
            LandAreaUnitSelected: {
                required: true
            },
            MineralExtractionPerpose: {
                required: true
            },
            PlaceOwnerName: {
                required: true
            },
            MineralExtractionDurationFrom: {
                required: true
            },
            MineralExtractionDurationTo: {
                required: true,
                CheckMineralExtractionDurationToDate: true

            },
            DateofBirth: {
                required: true
            },
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
            QuarryAddrCare:
            {
                required: true,
                maxlength: 100
            },
            QuarryBuilding:
            {

                maxlength: 100
            },
            QuarryStreet:
            {

                maxlength: 100
            },
            QuarryLocality:
            {

                maxlength: 100
            },
            QuarryLandmark:
            {

                maxlength: 100
            },
            QuarryDistrictSelected: "required",
            QuarryTalukaSelected: "required",
            QuarryVillageSelected: "required",
            QuarryPincode:
            {
                required: true,
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            },

            PermanantAddrCare:
            {
                required: {
                    depends: function () {
                        if ($("#IsPermanentAddress:checked").val() != "1") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                maxlength: 100
            },
            PermanantBuilding:
            {

                maxlength: 100
            },
            PermanantStreet:
            {

                maxlength: 100
            },
            PermanantLocality:
            {

                maxlength: 100
            },
            PermanantLandmark:
            {

                maxlength: 100
            },
            
            NationalitySelected: { required: true },
            ApplicantStatusSelected: { required: true },
            PermanantDistrictSelected:
            {
                required: {
                    depends: function () {
                        if ($("#IsPermanentAddress:checked").val() != "1") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            PermanantTalukaSelected:
            {
                required: {
                    depends: function () {
                        if ($("#IsPermanentAddress:checked").val() != "1") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            PermanantVillageSelected:
            {
                required: {
                    depends: function () {
                        if ($("#IsPermanentAddress:checked").val() != "1") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            PermanantPincode:
            {
                required: {
                    depends: function () {
                        if ($("#IsPermanentAddress:checked").val() != "1") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                maxlength: 6,
                minlength: 6,
                number: true,
                ValidatePincode: true
            }
        },
        messages: {
            MineralName: {
                required: "कृपया गौण खनिजाचे नाव प्रविष्ट करा."
            },
            MineralProportionInBrass: {
                required: "कृपया गौण खनिजाचे प्रमाण ब्रास मध्ये प्रविष्ट करा."
            },
            TinNo: {
                required: "कृपया TIN क्रमांक . प्रविष्ट करा."
            },
            GroupNo: {
                required: "कृपया गट क्रमांक प्रविष्ट करा."
            },
            LandConditionsAndDescriptions: {
                required: "कृपया जमिनीची स्थिति आणि वर्णन प्रविष्ट करा."
            },
            LandArea: {
                required: "कृपया क्षेञफळ प्रविष्ट करा."
            },
            LandAreaUnitSelected: {
                required: "कृपया एकक प्रविष्ट करा."
            },
            MineralExtractionPerpose: {
                required: "कृपया गौण खनिज काढावयाचे कारण प्रविष्ट करा."
            },
            PlaceOwnerName: {
                required: "कृपया जागा मालकाचे नाव प्रविष्ट करा."
            },
            MineralExtractionDurationFrom: {
                required: "कृपया गौण खनिज काढावयाचा कालावधी पासून प्रविष्ट करा."

            },
            MineralExtractionDurationTo: {
                required: "कृपया गौण खनिज काढावयाचा कालावधी पर्यंत प्रविष्ट करा.",
                CheckMineralExtractionDurationToDate: "कृपया गौण खनिज काढावयाचा कालावधी पर्यंत प्रविष्ट करा."

            },
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
            Father_Name_LL: {
                required: "कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DateofBirth: { required: "कृपया जन्मतारीख प्रविष्ट करा." },
            ApplicantStatusSelected: { required: "कृपया अर्जदारस्थिती प्रविष्ट करा."},
           
            GenderSelected: { required: "कृपया अर्जदाराच्या लिंगाची निवड करा." },
            OccupationSelected: { required: "कृपया अर्जदाराच्या व्यवसायाची निवड करा." },
            Mobile: {
                required: "कृपया अर्जदाराच्या भ्रमणध्वनी क्रमांकाची नोंद करा.",
                MobileOnly: "मोबाइल नंबर 7,8,9 ने प्रारंभ करणे आवश्यक आहे.",
                minlength: "मोबाइल नंबर अवैध आहे.",
                maxlength: "मोबाइल नंबर अवैध आहे.",
                number: "मोबाइल नंबर क्रमांक असणे आवश्यक आहे."
            },
            NationalitySelected: { required: "कृपया राष्ट्रीयत्व प्रविष्ट करा." },
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
            QuarryAddrCare: {
                required: "कृपया अर्जदाराच्या पत्त्याची नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            QuarryBuilding: {

                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            QuarryStreet: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            QuarryLocality: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            QuarryLandmark: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            QuarryDistrictSelected: " कृपया अर्जदाराच्या जिल्ह्याची निवड करा.",
            QuarryTalukaSelected: "कृपया अर्जदाराच्या तालुक्याची निवड करा.",
            QuarryVillageSelected: "कृपया अर्जदाराच्या गावाची निवड करा.",
            QuarryPincode:
            {
                required: "कृपया अर्जदाराच्या पिनकोडची नोंद करा.",
                maxlength: "कृपया वैध पिनकोडची नोंद करा",
                minlength: "कृपया वैध पिनकोडची नोंद करा",
                number: "पिनकोड क्रमांक असणे आवश्यक आहे.",
                ValidatePincode: "पिनकोड ४ आणि  ८  ने सुरू झाले पाहिजे."
            },
            PermanantAddrCare: {
                required: "कृपया अर्जदाराच्या पत्त्याची नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            PermanantBuilding: {

                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            PermanantStreet: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            PermanantLocality: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            PermanantLandmark: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            PermanantDistrictSelected: " कृपया अर्जदाराच्या जिल्ह्याची निवड करा.",
            PermanantTalukaSelected: "कृपया अर्जदाराच्या तालुक्याची निवड करा.",
            PermanantVillageSelected: "कृपया अर्जदाराच्या गावाची निवड करा.",
            PermanantPincode:
            {
                required: "कृपया अर्जदाराच्या पिनकोडची नोंद करा.",
                maxlength: "कृपया वैध पिनकोडची नोंद करा",
                minlength: "कृपया वैध पिनकोडची नोंद करा",
                number: "पिनकोड क्रमांक असणे आवश्यक आहे.",
                ValidatePincode: "पिनकोड ४ आणि  ८  ने सुरू झाले पाहिजे."
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
        if ($("#QuarryPincode").val() != "") {
            if ($("#QuarryPincode").val().charAt(0) == "4" || $("#QuarryPincode").val().charAt(0) == "8") {
                return true;
            }
            else {
                return false;
            }
        }
        if ($("#PermanantPincode").val() != "") {
            if ($("#PermanantPincode").val().charAt(0) == "4" || $("#PermanantPincode").val().charAt(0) == "8") {
                return true;
            }
            else {
                return false;
            }
        }
        return true;
    });
   

  
});


$(document).ready(function () {

    $("#PermanantDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#PermanantDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PermanantTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PermanantTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#PermanantTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#PermanantTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PermanantVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PermanantVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#QuarryDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#QuarryDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#QuarryTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#QuarryTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#QuarryTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#QuarryTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#QuarryVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#QuarryVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#DateofBirth").datepicker({
        changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
            CalculateAge();
        }
    });

    $("#MineralExtractionDurationFrom").datepicker({
         changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:5000", onSelect: function (dateText) {

        }
    });

    $("#MineralExtractionDurationTo").datepicker({
        changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:5000", onSelect: function (dateText) {

        }

    });

    $("#MineralExtractionDurationFrom").change(function () {  // check if selected date is from the future
        var dateFrom = $("#MineralExtractionDurationFrom").val();
        debugger;
        // today's date
        var d = new Date();
        var dt = d.getDate();
        var mt = d.getMonth() + 1;
        var yt = d.getFullYear();

        // selected date
        var arr = dateFrom.split("/");
        var ds = parseInt(arr[0]);
        var ms = parseInt(arr[1]);
        var ys = parseInt(arr[2]);

        if (parseInt(ms) < parseInt(mt) || parseInt(ys) < parseInt(yt)) {
            alert("Selected date is invalid, please select a future date.");
            $("#MineralExtractionDurationFrom").val("");
            $("#MineralExtractionDurationTo").val("");
            document.getElementById("MineralExtractionDurationFrom").placeholder = "गौण खनिज काढावयाचा कालावधी पासूनची नोंद करा";
            document.getElementById("MineralExtractionDurationTo").placeholder = "गौण खनिज काढावयाचा कालावधी पर्यंतची नोंद करा";
        }

        if (parseInt(ms) == parseInt(mt) && parseInt(ys) == parseInt(yt)) {
            if (parseInt(ds) < parseInt(dt)) {
                alert("Selected date is invalid, please select a future date.");
                $("#MineralExtractionDurationFrom").val("");
                $("#CPH_txtDurationTo").val("");
                document.getElementById("CPH_txtDurationFrom").placeholder = "dd/mm/yyyy";
                document.getElementById("CPH_txtDurationTo").placeholder = "dd/mm/yyyy";
            }
        }
    });



});

function AddVehicleData() {
    debugger;
    var VehicleRegistrationNo = $("#VehicleRegistrationNo").val();
    if (VehicleRegistrationNo == null || VehicleRegistrationNo == "") {
        alert("enter VehicleRegistrationNo!");
    }
 
    else {

        var postdata = {
            VehicleRegistrationNo: VehicleRegistrationNo
            
        };

        $.ajax({
            type: 'POST',
            url: '/Service/QuarryLicense/Insert_Data',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#VehicleTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#VehicleTable').empty();
                    }
                    else {
                        $('#VehicleTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>Vehicle No</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.VehicleRegistrationNo +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteVehicle('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#VehicleTable').append(temptable);
                        document.getElementById("VehicleRegistrationNo").value = ""
                       

                    }
                }


            }
        });
    }
}

function deleteVehicle(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/QuarryLicense/Delete_Data",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#VehicleTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#VehicleTable').empty();
                }
                else {
                    $('#VehicleTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>VehicleRegistrationNo</th><th>हटवा</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.VehicleRegistrationNo +
                            '</td>' +
                            '<td>' +
                         
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteVehicle('" + val.SrNo + "');> नोंद हटवा</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#VehicleTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

}

function CalculateAge() {
    debugger;
    var date1 = new Date();
    var dob = $("#DateofBirth").val();
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
            $("#DateofBirth").val('');
            $("#DateofBirth").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofBirth").val('');
            $("#DateofBirth").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#DateofBirth").val('');
            $("#DateofBirth").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofBirth").val('');
            $("#DateofBirth").focus();

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
            $("#DateofBirth").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Age').prop('readonly', false);
            $("#DateofBirth").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function ToggleComponentById(_compId, _hide) {
    debugger;
    if (_hide)
        $("#" + _compId)[0].hidden = true;
    else
        $("#" + _compId)[0].hidden = false;
    return;
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

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function ValidatePAN() {
    debugger;

    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    //value is tested using a Regular Expression.
    if (regex.test($("#PanCardNo").val())) {

        return true;
    }
    else {
        alert("पॅन कार्ड क्रमांक चुकीचा आहे ")
    }
}

function CheckMineralExtractionDurationToDate() {
    debugger;
    var fromDate = $("#MineralExtractionDurationFrom").val();
    var toDate = $("#MineralExtractionDurationTo").val();

    if (toDate <fromDate) {
        alert("")
    }
}





