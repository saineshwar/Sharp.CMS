
$(document).ready(function () {
    $("#benefit").hide(); $("#Detailsapplication").hide(); $("#Detailscertificate").hide(); $("#Detailscertificate1").hide();
    //$("#Marriage").hide();
    $("#BeforeMarriageDetails").hide();
    $("#BeforeMarriageOption").hide();
    $("#PostMarriageDetails").hide();
    $("#BeforeMarriageAddress").hide();
    $("#PostMarriageOption").hide();
    $("#PostMarriageAddress").hide();
    $("#MigrationDetails").hide();
    $("#MigrationDetailsBeneficiary").hide();
    $("#PropertyOption").hide();
    $("#PropertyAddress").hide();
    $("#PropertyDetails").hide();
    $("#GovernmentAddress").hide();
    $("#FamilyDetails").hide();
    $("#presentaddressoption").hide();
    $("#presentaddress").hide();
    $("#Birthtext").hide();

    $("#BeneficiaryResidenceYearsAtMH").change(function () {
        var noOfYearResidence = $("#BeneficiaryResidenceYearsAtMH").val();
        //var pattern = /^[0-9]{4}/$;
        if (noOfYearResidence > 0) {
            if (noOfYearResidence > 15) {// || pattern.test(noOfYearResidence) {
                return true;
            }
            else {
                alert("Number of years of residence should be more than 15 years for this scheme.");
                $("#BeneficiaryResidenceYearsAtMH").focus();
            }
        }
        else {
            alert("Please provide valid number of years of residence.");
        }
    });

    $("#GenderSelected").change(function () {
        var genderSelected = $("#GenderSelected option:selected").text();
        if (genderSelected == 'स्त्री') {
            alert(genderSelected+" vcuwdv");
            $("#Marriage").show();
            $("#BeforeMarriageDetails").show();
            $("#BeforeMarriageOption").show();
            $("#BeforeMarriageAddress").show();
            $("#PostMarriageDetails").show();
            $("#PostMarriageOption").show();
            $("#PostMarriageAddress").show();
        }
        if (genderSelected == 'पुरुष' || genderSelected == 'इतर') {
            alert(genderSelected + " fvfvv");
            $("#Marriage").hide();
            $("#BeforeMarriageDetails").hide();
            $("#BeforeMarriageOption").hide();
            $("#BeforeMarriageAddress").hide();
            $("#PostMarriageDetails").hide();
            $("#PostMarriageOption").hide();
            $("#PostMarriageAddress").hide();
        }
    });

    $("#RelationOfApplicant").change(function () {
        var relationOfApplicant = $("#RelationOfApplicant option:selected").text();
        if (relationOfApplicant == 'स्वतः') {
            alert(relationOfApplicant+" aaaaa");
            var salutationSelected = $("#SalutationSelected option:selected").text();
            var fullName = $("#FullName").val();
            var applicantDOB = $("#ApplicantDOB").val();
            $("#BeneficiarySalutationSelected option:selected").text() = salutationSelected;
            $("#BeneficiaryName").val() = fullName;
            $("#BeneficiaryMobileNo").hide()
            $("#BeneficiaryDOB").hide()
        }
    });
  
    $("#CountrySelected").change(function () {
        var requestStateModel = { Countryid: $("#CountrySelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetState",
            dataType: "json",
            data: requestStateModel,

            success: function (data) {
                $("#StateSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].Statecode + '">' + data[i].Statename + '</option>';
                        $("#StateSelected").append(optionhtml);
                    });
            }
        });
    });

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
    $("#CountrySelected").change(function () {
        if ($(this).val() != "88") {
            $("#Birthtext").show();
            $("#BirthDropdown").hide();
        }
        else {
            $("#Birthtext").hide();
            $("#BirthDropdown").show();
        }
    });
    $("#BirthaddressStateSelected").change(function () {
        debugger;
        if ($(this).val() != "27") {
            $("#Birthtext").show();
            $("#BirthDropdown").hide();
        }
        else {
            $("#Birthtext").hide();
            $("#BirthDropdown").show();
        }
    });


    $("#GenderSelected").change(function () {
        if ($(this).val() == "1161" || $(this).val() == "1162") {
            $("#Marriage").show();
        } else {
            $("#Marriage").hide();
        }
    });

    $("#BeneficiaryMarried").change(function () {
        if ($(this).val() == "1003" || $(this).val() == "1009" || $(this).val() == "1010") {
            $("#BeforeMarriageDetails").hide();
            $("#BeforeMarriageOption").hide();
            $("#PostMarriageDetails").hide();
            $("#PostMarriageOption").hide();
        } else {
            $("#BeforeMarriageDetails").show();
            $("#BeforeMarriageOption").show();
            $("#PostMarriageDetails").show();
            $("#PostMarriageOption").show();
        }
    });

    //$("#SalutationSelected").change(function () {
    //    if ($(this).val() == "1330" || $(this).val() == "1344" || $(this).val() == "1339") {
           
    //    } else {
            
    //    }
    //});

});

$(document).ready(function () {
    var getYear = new Date.getFullYear();
    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#MarriageDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
        }
    });
    $("#BeneficiaryDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
        }
    });
    $("#ResidingBefore").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
        }
    });
    $("#HusbandDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
        }
    });
    $("#AdmissionYear").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
            checkAdmissionYearAndCompletionYear()
        }
    });
    $("#CompletionYear").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:" + getYear, onSelect: function (dateText) {
            checkAdmissionYearAndCompletionYear()
        }
    });
    $('#ApplicantAge').prop('readonly', true);

});

function checkAdmissionYearAndCompletionYear() {
    var FromDate = $("#AdmissionYear").val();
    var datePat1 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var matchArray1 = FromDate.match(datePat1); // is the format ok?

    day1 = matchArray1[1]; // p@rse date into variables
    month1 = matchArray1[3];
    year1 = matchArray1[5];

    var FromDateNew = new Date(month1 + "/" + day1 + "/" + year1);

    var ToDate = $("#CompletionYear").val();
    var datePat2 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var matchArray2 = ToDate.match(datePat2); // is the format ok?

    day2 = matchArray2[1]; // p@rse date into variables
    month2 = matchArray2[3];
    year2 = matchArray2[5];

    var ToDateNew = new Date(month2 + "/" + day2 + "/" + year2);


    if (FromDateNew <= ToDateNew) {

    }
    else {
        alert("Completion Year date cannot be less than Admission Year date");
        document.getElementById("CompletionYear").value = "";
        return false;
    }
}

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

$("#RelationofApplicant").change(function () {
    if ($(this).val() == "1263" || $(this).val() == "1280") {
        $("#presentaddressoption").hide();
        document.getElementById("PresentAdd").value = document.getElementById("AddrCare").value;
        document.getElementById("PresentBuilding").value = document.getElementById("Building").value;
        document.getElementById("PresentStreet").value = document.getElementById("Street").value;
        document.getElementById("PresentLocality").value = document.getElementById("Locality").value;
        document.getElementById("PresentLandmark").value = document.getElementById("Landmark").value;
        document.getElementById("PresentDistrictSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PresentTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PresentTalukaSelected").append(optionhtml);
                        $("#PresentTalukaSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PresentVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PresentVillageSelected").append(optionhtml);
                    $("#PresentVillageSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("PresentPincode").value = document.getElementById("Pincode").value;
        $("#presentaddress").hide();
    } else {
        $("#presentaddressoption").show();
    }
});
$("#PresentDistrictSelected").change(function () {
    var requestTalukaModel = { Districtcode: $("#PresentDistrictSelected").val() };
    debugger;
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#PresentTalukaSelected").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#PresentTalukaSelected").append(optionhtml);
                });
        }
    });
});

$("#PresentTalukaSelected").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#PresentTalukaSelected").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#PresentVillageSelected").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#PresentVillageSelected").append(optionhtml);
            });
        }
    });

});

function ToggleTextBoxPresentAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("PresentAdd").value = document.getElementById("AddrCare").value;
        document.getElementById("PresentBuilding").value = document.getElementById("Building").value;
        document.getElementById("PresentStreet").value = document.getElementById("Street").value;
        document.getElementById("PresentLocality").value = document.getElementById("Locality").value;
        document.getElementById("PresentLandmark").value = document.getElementById("Landmark").value;
        document.getElementById("PresentDistrictSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PresentTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PresentTalukaSelected").append(optionhtml);
                        $("#PresentTalukaSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PresentVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PresentVillageSelected").append(optionhtml);
                    $("#PresentVillageSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("PresentPincode").value = document.getElementById("Pincode").value;
        $("#presentaddress").hide();
    }
    else {
        document.getElementById("PresentAdd").value = "";
        document.getElementById("PresentBuilding").value = "";
        document.getElementById("PresentStreet").value = "";
        document.getElementById("PresentLocality").value = "";
        document.getElementById("PresentLandmark").value = "";
        document.getElementById("PresentDistrictSelected").value = "";
        $("#PresentTalukaSelected").empty();
        $("#PresentVillageSelected").empty();
        document.getElementById("PresentPincode").value = "";
        $("#presentaddress").show();
    }
}

function ToggleTextBoxPerAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("BeneficiaryAdd").value = document.getElementById("AddrCare").value;
        document.getElementById("BeneficiaryBuilding").value = document.getElementById("Building").value;
        document.getElementById("BeneficiaryStreet").value = document.getElementById("Street").value;
        document.getElementById("BeneficiaryLocality").value = document.getElementById("Locality").value;
        document.getElementById("CountrySelected").value = "88";
        document.getElementById("StateSelected").value = "27";

        document.getElementById("BeneficiaryDistrictSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
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
                        $("#BeneficiaryTalukaSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#BeneficiaryVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BeneficiaryVillageSelected").append(optionhtml);
                    $("#BeneficiaryVillageSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("BeneficiaryPincode").value = document.getElementById("Pincode").value;
        $("#BenfiAddress").hide();
    }
    else {
        document.getElementById("BeneficiaryAdd").value = "";
        document.getElementById("BeneficiaryBuilding").value = "";
        document.getElementById("BeneficiaryStreet").value = "";
        document.getElementById("BeneficiaryLocality").value = "";
        document.getElementById("CountrySelected").value = "";
        document.getElementById("StateSelected").value = "";
        document.getElementById("BeneficiaryDistrictSelected").value = "";
        $("#BeneficiaryTalukaSelected").empty();
        $("#BeneficiaryVillageSelected").empty();
        document.getElementById("BeneficiaryPincode").value = "";
        $("#BenfiAddress").show();
    }
}

function AddEducation() {
    debugger;

    var Education = $('#Education').val();
    var EducationName = $("#Education option:selected").text();
    var University = $('#University').val();
    var AdmissionYear = $('#AdmissionYear').val();
    var CompletionYear = $('#CompletionYear').val();
    var Institute = $("#Institute").val();

    if (Education == null || Education == "") {
        alert("Enter Qualification!");
    }
    else if (University == null || University == "") {
        alert("Enter Board/university !");
    }
    else if (AdmissionYear == null || AdmissionYear == "") {
        alert("Enter Admission Year !");
    }
    else if (CompletionYear == null || CompletionYear == "") {
        alert("Enter Completion Year !");
    }
    else if (Institute == null || Institute == "") {
        alert("Enter Name & Address of Institute !");
    }
    else {

        var postdata = {
            Education: Education,
            EducationName: EducationName,
            University: University,
            AdmissionYear: AdmissionYear,
            CompletionYear: CompletionYear,
            Institute: Institute
        };

        $.ajax({
            type: 'POST',
            url: '/Service/ResidenceCertificate/Insert_EducationData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#EducationTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#EducationTable').empty();
                    }
                    else {
                        $('#EducationTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>शैक्षणिक माहिती</th><th>संस्थेचे नाव</th><th>प्रवेश वर्ष</th><th>सोडल्याचे वर्ष</th><th>शैक्षणिक ठिकाण</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.EducationName +
                                '</td>' +
                                '<td>' +
                                val.University +
                                '</td>' +
                                '<td>' +
                                val.AdmissionYear +
                                '</td>' +
                                '<td>' +
                                val.CompletionYear +
                                '</td>' +
                                '<td>' +
                                val.Institute +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteEducation('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#EducationTable').append(temptable);
                        document.getElementById("Education").value = "";
                        document.getElementById("University").value = "";
                        document.getElementById("AdmissionYear").value = "";
                        document.getElementById("CompletionYear").value = "";
                        document.getElementById("Institute").value = "";
                    }
                }


            }
        });
    }
}

function deleteEducation(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/ResidenceCertificate/Delete_EducationData",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#EducationTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#EducationTable').empty();
                }
                else {
                    $('#EducationTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Education Detail</th><th>Board/university</th><th>Admission Year</th><th>Leaving Year</th><th>Institute Details</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.EducationName +
                            '</td>' +
                            '<td>' +
                            val.University +
                            '</td>' +
                            '<td>' +
                            val.AdmissionYear +
                            '</td>' +
                            '<td>' +
                            val.CompletionYear +
                            '</td>' +
                            '<td>' +
                            val.Institute +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteEducation('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#EducationTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

$("#BeforeMarriageDistrictSelected").change(function () {
    var requestTalukaModel = { Districtcode: $("#BeforeMarriageDistrictSelected").val() };

    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#BeforeMarriageTalukaSelected").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#BeforeMarriageTalukaSelected").append(optionhtml);
                });
        }
    });
});

$("#BeforeMarriageTalukaSelected").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#BeforeMarriageTalukaSelected").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#BeforeMarriageVillageSelected").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#BeforeMarriageVillageSelected").append(optionhtml);
            });
        }
    });

});

function ToggleTextBoxPerBeforeAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("BeforeMarriageAdd").value = document.getElementById("AddrCare").value;
        document.getElementById("BeforeMarriageBuilding").value = document.getElementById("Building").value;
        document.getElementById("BeforeMarriageStreet").value = document.getElementById("Street").value;
        document.getElementById("BeforeMarriageLocality").value = document.getElementById("Locality").value;
        document.getElementById("BeforeMarriageLandmark").value = document.getElementById("Landmark").value;
        document.getElementById("BeforeMarriageDistrictSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#BeforeMarriageTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#BeforeMarriageTalukaSelected").append(optionhtml);
                        $("#BeforeMarriageTalukaSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#BeforeMarriageVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#BeforeMarriageVillageSelected").append(optionhtml);
                    $("#BeforeMarriageVillageSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("BeforeMarriagePincode").value = document.getElementById("Pincode").value;
        $("#BeforeMarriageAddress").hide();
    }
    else {
        document.getElementById("BeforeMarriageAdd").value = "";
        document.getElementById("BeforeMarriageBuilding").value = "";
        document.getElementById("BeforeMarriageStreet").value = "";
        document.getElementById("BeforeMarriageLocality").value = "";
        document.getElementById("BeforeMarriageLandmark").value = "";
        document.getElementById("BeforeMarriageDistrictSelected").value = "";
        $("#BeforeMarriageTalukaSelected").empty();
        $("#BeforeMarriageVillageSelected").empty();
        document.getElementById("BeforeMarriagePincode").value = "";
        $("#BeforeMarriageAddress").show();
    }
}

$("#PostMarriageDistrictSelected").change(function () {
    var requestTalukaModel = { Districtcode: $("#PostMarriageDistrictSelected").val() };

    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#PostMarriageTalukaSelected").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#PostMarriageTalukaSelected").append(optionhtml);
                });
        }
    });
});

$("#PostMarriageTalukaSelected").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#PostMarriageTalukaSelected").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#PostMarriageVillageSelected").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#PostMarriageVillageSelected").append(optionhtml);
            });
        }
    });

});

function ToggleTextBoxPerPostAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("PostMarriageAdd").value = document.getElementById("PresentAdd").value;
        document.getElementById("PostMarriageBuilding").value = document.getElementById("PresentBuilding").value;
        document.getElementById("PostMarriageStreet").value = document.getElementById("PresentStreet").value;
        document.getElementById("PostMarriageLocality").value = document.getElementById("PresentLocality").value;
        document.getElementById("PostMarriageLandmark").value = document.getElementById("PresentLandmark").value;
        document.getElementById("PostMarriageDistrictSelected").value = document.getElementById("PresentDistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#PresentDistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PostMarriageTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PostMarriageTalukaSelected").append(optionhtml);
                        $("#PostMarriageTalukaSelected").val(document.getElementById("PresentTalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#PresentTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PostMarriageVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PostMarriageVillageSelected").append(optionhtml);
                    $("#PostMarriageVillageSelected").val(document.getElementById("PresentVillageSelected").value);
                });
            }
        });
        document.getElementById("PostMarriagePincode").value = document.getElementById("PresentPincode").value;
        $("#PostMarriageAddress").hide();
    }
    else {
        document.getElementById("PostMarriageAdd").value = "";
        document.getElementById("PostMarriageBuilding").value = "";
        document.getElementById("PostMarriageStreet").value = "";
        document.getElementById("PostMarriageLocality").value = "";
        document.getElementById("PostMarriageLandmark").value = "";
        document.getElementById("PostMarriageDistrictSelected").value = "";
        $("#PostMarriageTalukaSelected").empty();
        $("#PostMarriageVillageSelected").empty();
        document.getElementById("PostMarriagePincode").value = "";
        $("#PostMarriageAddress").show();
    }
}

$("#BeneficiaryMigration").change(function () {
    if ($(this).val() == "1177" || $(this).val() == "1178") {
        $("#MigrationDetails").show();
        $("#MigrationDetailsBeneficiary").show();
        $("#PropertyOption").show();
        $("#PropertyDetails").show();
        $("#FamilyDetails").show();
    } else {
        $("#MigrationDetails").hide();
        $("#MigrationDetailsBeneficiary").hide();
        $("#PropertyOption").hide();
        $("#PropertyDetails").hide();
        $("#FamilyDetails").hide();
    }
});

function AddMigration() {
    debugger;

    var PlaceOfMigration = $('#PlaceOfMigration').val();
    var FromYear = $('#FromYear').val();
    var ToYear = $('#ToYear').val();

    if (PlaceOfMigration == null || PlaceOfMigration == "") {
        alert("Enter Migration Place!");
    }
    else if (FromYear == null || FromYear == "") {
        alert("Enter Year !");
    }
    else if (ToYear == null || ToYear == "") {
        alert("Enter Year !");
    }
    else {

        var postdata = {
            PlaceOfMigration: PlaceOfMigration,
            FromYear: FromYear,
            ToYear: ToYear
        };

        $.ajax({
            type: 'POST',
            url: '/Service/ResidenceCertificate/Insert_MigrationData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#MigrationTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#MigrationTable').empty();
                    }
                    else {
                        $('#MigrationTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>स्थलांतराचे ठिकाण</th><th>पासून</th><th>पर्यंत</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.PlaceOfMigration +
                                '</td>' +
                                '<td>' +
                                val.FromYear +
                                '</td>' +
                                '<td>' +
                                val.ToYear +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteMigration('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#MigrationTable').append(temptable);
                        document.getElementById("PlaceOfMigration").value = "";
                        document.getElementById("FromYear").value = "";
                        document.getElementById("ToYear").value = "";
                    }
                }


            }
        });
    }
}

function deleteMigration(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/ResidenceCertificate/Delete_MigartionData",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#MigrationTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#MigrationTable').empty();
                }
                else {
                    $('#MigrationTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Migration Place</th><th>From Year</th><th>To Year</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.PlaceOfMigration +
                            '</td>' +
                            '<td>' +
                            val.FromYear +
                            '</td>' +
                            '<td>' +
                            val.ToYear +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteMigration('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#MigrationTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

$("#PropertyDistrictSelected").change(function () {
    var requestTalukaModel = { Districtcode: $("#PropertyDistrictSelected").val() };

    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#PropertyTalukaSelected").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#PropertyTalukaSelected").append(optionhtml);
                });
        }
    });
});

$("#PropertyTalukaSelected").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#PropertyTalukaSelected").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#PropertyVillageSelected").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#PropertyVillageSelected").append(optionhtml);
            });
        }
    });

});

function ToggleTextBoxProperty(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Isfalse") {
        $("#PropertyAddress").hide();
    }
    else {
        $("#PropertyAddress").show();
    }
}

$("#SchemeDistrictSelected").change(function () {
    var requestTalukaModel = { Districtcode: $("#SchemeDistrictSelected").val() };

    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#SchemeTalukaSelected").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#SchemeTalukaSelected").append(optionhtml);
                });
        }
    });
});

$("#SchemeTalukaSelected").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#SchemeTalukaSelected").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#SchemeVillageSelected").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#SchemeVillageSelected").append(optionhtml);
            });
        }
    });

});

function ToggleTextBoxGovScheme(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#GovernmentAddress").show();
    }
    else {
        $("#GovernmentAddress").hide();
    }
}

function AddFamily() {
    debugger;

    
    var FamilyMemberRelationship = $("#FamilyMemberRelationship option:selected").text();
    var FamilyMemberName = $('#FamilyMemberName').val();
    var FamilyMemberRelationshipID = $("#FamilyMemberRelationship option:selected").val();

    if (FamilyMemberRelationship == null || FamilyMemberRelationship == "") {
        alert("Choose Relation with Beneficiary!");
    }
    else if (FamilyMemberName == null || FamilyMemberName == "") {
        alert("Enter Family member Name !");
    }
    else {

        var postdata = {
            
            FamilyMemberRelationship: FamilyMemberRelationship,
            FamilyMemberName: FamilyMemberName,
            FamilyMemberRelationshipID: FamilyMemberRelationshipID
        };

        $.ajax({
            type: 'POST',
            url: '/Service/ResidenceCertificate/Insert_FamilyData',
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
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>नाते</th><th>व्यक्तिंची नाव</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberRelationship +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberName +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamily('" + val.SrNo + "');> Delete Entry</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FamilyTable').append(temptable);
                        document.getElementById("FamilyMemberRelationship").value = "";
                        document.getElementById("FamilyMemberName").value = "";
                    }
                }


            }
        });
    }
}

function deleteFamily(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/ResidenceCertificate/Delete_FamilyData",
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
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Relation</th><th>Family member name</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberRelationshipName +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberName +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamily('" + val.SrNo + "');> Delete Entry</a>" +
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



function ToggleComponentById(_compId, _hide) {
    debugger;
    if (_hide)
        $("#" + _compId)[0].hidden = true;
    else
        $("#" + _compId)[0].hidden = false;
    return;
}


function ShowHidePresentAddress() {
    debugger;
    var value;
    if (document.getElementById('Presentaddress_NO').checked) {
        value = document.getElementById('Presentaddress_NO').value
        $("#presentaddress").show();
    }
}
function GetState() {
    debugger;
    var stateValue = document.getElementById("BirthaddressStateSelected").value;

}


$("#GenderSelected").change(function () {
    if ($(this).val() == "1161" || $(this).val() == "1162") {
        $("#Marriage").show();
    } else {
        $("#Marriage").hide();
    }
});