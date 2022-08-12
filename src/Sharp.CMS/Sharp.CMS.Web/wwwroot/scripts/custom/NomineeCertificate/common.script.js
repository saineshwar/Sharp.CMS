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

    $("#DistrictSelectedOfInheritance").change(function () {
        var requestTalukaModel = { Districtcode: $("#DistrictSelectedOfInheritance").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#TalukaSelectedOfInheritance").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#TalukaSelectedOfInheritance").append(optionhtml);
                    });
            }
        });
    });

    $("#TalukaSelectedOfInheritance").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelectedOfInheritance").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#VillageSelectedOfInheritance").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#VillageSelectedOfInheritance").append(optionhtml);
                });
            }
        });

    });

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

    $("#DeceasedDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#DeceasedDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#DeceasedTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#DeceasedTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#DeceasedTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#DeceasedTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#DeceasedVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#DeceasedVillageSelected").append(optionhtml);
                });
            }
        });

    });

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

$(document).ready(function () {


    var form = $("#NomineeCertificateform");
    $("#NomineeCertificateform").validate({
        rules: {
            ApplicantAge: {
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
            BenificaryRelationSelected: "required",
            BenificarySalutationSelected: "required",
            BenificaryName: {
                required: true

            },
            DeceasedSalutationSelected: { required: true },
            Shera: {
                required: true
            },
            Birthaddress: {
                required: true
            },
            DeceasedDOD: {
                required: true
            },
            DeceasedPlace: {
                required: true
            },
            DeceasedAge: {
                required: true
            },
            DeceasedFullName: { required: true },
            DeceasedFullName_LL: { required: true },
            AppFarmingAcre: {
                number: true
            },

            FamilyMemberAge: {

                number: true,
                ValidateFamilyMemberAge: true
            },
            DeceasedGovernmentPost: { required: true },
            DeceasedGenderSelected: { required: true },
            RelationshipOfDeceasedPerson: { required: true },
            MillWorkerYesNo: { required: true },
            DeceasedAddrCare:
            {
                required: {
                    depends: function () {
                        if ($("#Birthaddress:checked").val() != "1" || ("#Birthaddress: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                maxlength: 100
            },



            DeceasedDistrictSelected:
            {
                required: {
                    depends: function () {
                        if ($("#Birthaddress:checked").val() != "1" || ("#Birthaddress: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            DeceasedTalukaSelected:
            {
                required: {
                    depends: function () {
                        if ($("#Birthaddress:checked").val() != "1" || ("#Birthaddress: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            DeceasedVillageSelected:
            {
                required: {
                    depends: function () {
                        if ($("#Birthaddress:checked").val() != "1" || ("#Birthaddress: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            },
            DeceasedPincode:
            {
                required: {
                    depends: function () {
                        if ($("#Birthaddress:checked").val() != "1" || ("#Birthaddress: checked").val() != "2") {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
            },

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
            Father_Name_LL: {
                required: "कृपया अर्जदाराच्या वडिलांच्या पूर्ण नावाची (मराठी) नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            ApplicantDOB: { required: "कृपया जन्मतारीख प्रविष्ट करा" },
            ApplicantAge: {
                required: "कृपया अर्जदाराच्या वयाची नोंद करा."
            },
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
            Shera: {
                required: "कृपया शेरा नोंद करा."
            },
            FamilyMemberAge: {
                ValidateFamilyMemberAge: "Age Should be greater than 18"
            },
            Birthaddress: {
                required: "जन्माचे तपशील नोंद करा."
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
            DeceasedAge: {
                required: "कृपया मयत व्यक्तीच्या मृत्युसमयीच्या वयाची नोंद करा."
            },
            DeceasedGovernmentPost: { required: "मयत व्यक्तीच्या शासकीय सेवेतील पदाची नोंद करा." },
            DeceasedGenderSelected: { required: "कृपया अर्जदाराच्या लिंगाची निवड करा." },
            RelationshipOfDeceasedPerson: { required: "कृपया अर्जदाराच्या लिंगाची निवड करा." },
            MillWorkerYesNo: { required: "मयत व्यक्ती गिरणी कामगार असल्यास तसे निवडा." },
            DeceasedAddrCare: {
                required: "कृपया मृत्यु झाला, त्या ठिकाणाची नोंद करा.",
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedBuilding: {

                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedStreet: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedLocality: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedLandmark: {
                maxlength: "केवळ १०० वर्णांना परवानगी आहे."
            },
            DeceasedDistrictSelected: " कृपया मयत व्यक्तीच्या जिल्ह्याची निवड करा.",
            DeceasedTalukaSelected: "कृपया मयत व्यक्तीच्या तालुक्याची निवड करा.",
            DeceasedVillageSelected: "कृपया मयत व्यक्तीच्या गावाची निवड करा.",
            DeceasedPincode:
            {
                required: "कृपया मयत व्यक्तीच्या  पिनकोडची नोंद करा.",
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

        if ($("#DeceasedPincode").val() != "") {
            if ($("#DeceasedPincode").val().charAt(0) == "4" || $("#DeceasedPincode").val().charAt(0) == "8") {
                return true;
            }
            else {
                return false;
            }
        }
        return true;


    });


    $.validator.addMethod("ValidateFamilyMemberAge", function (value, element) {
        if ($("#FamilyMemberAge").val() >= 18) {
            {
                return true;
            }
            return false;
        }


    });

});

function AddFamilyHeirs() {
    debugger;

    var NameOfInheritance = $("#NameOfInheritance").val();
    var DistrictSelectedOfInheritance = $("#DistrictSelectedOfInheritance option:selected").text();
    var TalukaSelectedOfInheritance = $("#TalukaSelectedOfInheritance option:selected").text();
    var VillageSelectedOfInheritance = $("#VillageSelectedOfInheritance option:selected").text();
    var RelationshipOfInheritance = $("#RelationshipOfInheritance option:selected").text(); 
    var AgeOfInheritance = $('#AgeOfInheritance').val();
    var OccupationSelectedOfInheritance = $('#OccupationSelectedOfInheritance option:selected').text();

    var DistrictSelectedOfInheritanceID = $("#DistrictSelectedOfInheritance option:selected").val();
    var TalukaSelectedOfInheritanceID = $("#TalukaSelectedOfInheritance option:selected").val();
    var VillageSelectedOfInheritanceID = $("#VillageSelectedOfInheritance option:selected").val();
    var RelationshipOfInheritanceID = $("#RelationshipOfInheritance option:selected").val();
    var OccupationSelectedOfInheritanceID = $('#OccupationSelectedOfInheritance option:selected').val();


    if (NameOfInheritance == null || NameOfInheritance == "") {
        alert("Name Of Inheritance!");
    }
    else if (DistrictSelectedOfInheritance == null || DistrictSelectedOfInheritance == "") {
        alert("Enter District Of Inheritance  !");
    }
    else if (TalukaSelectedOfInheritance == null || TalukaSelectedOfInheritance == "") {
        alert("Enter Taluka Of Inheritance  !");
    }
    else if (VillageSelectedOfInheritance == null || VillageSelectedOfInheritance == "") {
        alert("Enter Village Of Inheritance  !");
    }
    else if (RelationshipOfInheritance == null || RelationshipOfInheritance == "") {
        alert("Enter Relationship Of Inheritance  !");
    }
    else if (AgeOfInheritance == null || AgeOfInheritance == "") {
        alert("Enter Age Of Inheritance Of Inheritance  !");
    }

    //else if (OccupationSelectedOfInheritance == null || OccupationSelectedOfInheritance == "") {
    //    alert("Enter Occupation Of Inheritance  !");
    //}

    else {

        var postdata = {
            NameOfInheritance: NameOfInheritance,
            DistrictSelectedOfInheritance: DistrictSelectedOfInheritance,
            TalukaSelectedOfInheritance: TalukaSelectedOfInheritance,
            VillageSelectedOfInheritance: VillageSelectedOfInheritance,
            RelationshipOfInheritance: RelationshipOfInheritance,
            AgeOfInheritance: AgeOfInheritance,
            OccupationSelectedOfInheritance: OccupationSelectedOfInheritance,

            DistrictSelectedOfInheritanceID: DistrictSelectedOfInheritanceID,
            TalukaSelectedOfInheritanceID: TalukaSelectedOfInheritanceID,
            VillageSelectedOfInheritanceID: VillageSelectedOfInheritanceID,
            RelationshipOfInheritanceID: RelationshipOfInheritanceID,
            OccupationSelectedOfInheritanceID: OccupationSelectedOfInheritanceID

        };

        $.ajax({
            type: 'POST',
            url: '/Service/NomineeCertificate/Insert_Data',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FamilyHeirsTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FamilyHeirsTable').empty();
                    }
                    else {
                        $('#FamilyHeirsTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>वारसाचे नाव</th><th>जिल्हा</th><th>तालुका</th><th>गाव</th><th>वय</th><th>नाते</th><th>व्यवसाय</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.NameOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.DistrictSelectedOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.TalukaSelectedOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.VillageSelectedOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.AgeOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.RelationshipOfInheritance +
                                '</td>' +
                                '<td>' +
                                val.OccupationSelectedOfInheritance +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteAddHeir('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FamilyHeirsTable').append(temptable);
                        document.getElementById("NameOfInheritance").value = "";
                        document.getElementById("DistrictSelectedOfInheritance").value = "";
                        document.getElementById("TalukaSelectedOfInheritance").value = "";
                        document.getElementById("VillageSelectedOfInheritance").value = "";
                        document.getElementById("RelationshipOfInheritance").value = "";
                        document.getElementById("AgeOfInheritance").value = "";
                        document.getElementById("OccupationSelectedOfInheritance").value = "";
                    }
                }


            }
        });
    }
}

function deleteAddHeir(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NomineeCertificate/Delete_Data",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FamilyHeirsTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FamilyHeirsTable').empty();
                }
                else {
                    $('#FamilyHeirsTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>NameOfInheritance</th><th>DistrictSelectedOfInheritance</th><th>TalukaSelectedOfInheritance</th><th>VillageSelectedOfInheritance</th><th>RelationshipOfInheritance</th><th>TalukaSelectedOfInheritance</th><th>VillageSelectedOfInheritance</th><th>AgeOfInheritance</th><th>OccupationSelectedOfInheritance</th><th>हटवा</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.NameOfInheritance +
                            '</td>' +
                            '<td>' +
                            val.DistrictSelectedOfInheritance +
                            '</td>' +
                            '<td>' +
                            val.TalukaSelectedOfInheritance +
                            '</td>' +
                            '<td>' +
                            val.VillageSelectedOfInheritance +
                            '</td>' +
                            '<td>' +
                            val.AgeOfInheritance +
                            '</td>' +
                            '<td>' +
                            val.OccupationSelectedOfInheritance +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteAddHeir('" + val.SrNo + "');> नोंद हटवा</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FamilyHeirsTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

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

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#ApplicantAge").val('');
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

function ToggleComponentById(_compId, _hide) {
    debugger;
    if (_hide)
        $("#" + _compId)[0].hidden = true;
    else
        $("#" + _compId)[0].hidden = false;
    return;
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




