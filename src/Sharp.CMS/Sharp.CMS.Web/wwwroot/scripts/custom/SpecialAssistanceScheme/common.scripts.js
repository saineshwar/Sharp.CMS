$("#divApplicantRealationalDtls").hide();
$("#dvBankDetails").hide();
$("#dvPostDetails").hide();
$("#dvDisbled").hide();
$("#dvIllnesType").hide();
$("#dvIsBankPost").hide();
$("#dvDisbledType").hide();
$("#dvGardianDtl").hide();
$("#IsSuicideVictimFarmer").val(0);
$("#IsAnathChild").val(0);
$("#IsTransGender").val(0);
$("#IsNiradharPurush").val(0);
$("#ApplicableSchemeAmount").val(0);
$("#dvWomen").hide();
$("#dvHasOlderSon").hide();
$("#dvElderSonAnnualncome").hide();
$("#dvOtherSchemaName").hide();
$("#dvSpecialAssistanceForm").hide();
$("#dvBPLCardDtls").hide();
$("#dvFamilyIncome").hide();

function SetServices() {
    var Dateofbirth = $("#ApplicantDOB").val();
    var Age = $("#ApplicantAge").val();
    var IsBPL = $("#IsunderBPL:checked").val();
    var hdnIsBPLandAgeBelow65 = 0;

    var IsunderBPL = $("#IsunderBPL:checked").val();

    if (Dateofbirth == "" || Dateofbirth == null) {
        alert("Please select date of birth !");
        return;
    }
    if (Age == "" || Age == null) {
        alert("Please select date of birth !");
        return;
    }
    if (IsBPL == "" || IsBPL == null) {
        alert("Please select the option for BPL !");
        return;
    }

    if (IsunderBPL == "2") {
        $("#dvBPLCardDtls").hide();
        $("#dvFamilyIncome").show();
        $("#dvSpecialAssistanceForm").show();
    } else if (IsunderBPL == "1") {
        $("#dvBPLCardDtls").show();
        $("#dvFamilyIncome").hide();
        $("#dvSpecialAssistanceForm").show();
    }

    //if (Age > 0 && (IsunderBPL == "1" || IsunderBPL == "2")) {

    //    if (IsBPL == '1') {
    //        if (eval(Age) >= 65 && eval(Age) <= 125) {
    //            $("#ApplicableServices").val('IGNOAPS,SBSRNY')
    //            $("#ApplicableServicesID").val('1112,1113')
    //            $("#ApplicableSchemeAmount").val('600')
    //            $("#SchemeGroup").val('OASB')
    //        }
    //        else if (eval(Age) >= 1 && eval(Age) <= 64) {
    //            hdnIsBPLandAgeBelow65 = "1";
    //        }
    //    }
    //    else if (IsBPL == '2') {
    //        if (eval(Age) >= 65 && eval(Age) <= 125) {
    //            $("#ApplicableServices").val('SBSRNY')
    //            $("#ApplicableServicesID").val('1113')
    //            $("#ApplicableSchemeAmount").val('600')
    //            $("#SchemeGroup").val('SB')
    //        } else if (eval(Age) >= 1 && eval(Age) <= 64) {
    //            hdnIsBPLandAgeBelow65 = "2";
    //        }

    //    }

    //}

    $('#ApplicantDOB').prop('readonly', true);
    $("#ApplicantDOB").datepicker("destroy");
    //------ निराधार-पुरुष -----//
    if (Age < 18 || Age > 65) {
        $("#Category option[value='1704']").attr("disabled", "disabled");
    }
    else {
        $("#Category option[value='1704']").removeAttr("disabled");
    }

    //------ अनाथ बालक -----//
    if (Age >= 18) {
        $("#Category option[value='1699']").attr("disabled", "disabled");
    }
    else {
        $("#Category option[value='1699']").removeAttr("disabled");
    }
}

$(document).ready(function () {
    $("#TalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/SpecialAssistanceScheme/GetSubDivisionDtlByID",
            data: requestVillageModel,
            success: function (data) {
                $("#SubDivisionCode").empty();
                $.each(data, function (i) {
                    var optionhtml = '<option value="' + data[i].SubDivisionCode + '">' + data[i].SubDivisionName + '</option>';
                    $("#SubDivisionCode").append(optionhtml);
                });
            }
        });

        var SubDivisonName = $("#SubDivisionCode").find("option:selected").text();
        $("#SubDivisonName").val(SubDivisonName);

    });
    var current_year = new Date().getFullYear();

    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $('#ApplicantAge').prop('readonly', true);

    $("#OlderSonDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateOlderSonAge();
        }
    });
    $("#Category option[value='1700']").attr("disabled", "disabled");

    $("#NoOfFamilyMember").change(function () {
        var noOfFamilyMember = $("#NoOfFamilyMember").val();
        if (1 <= noOfFamilyMember && noOfFamilyMember <= 20) {
            return true;
        }
        else {
            alert("कुटुंबातील सदस्यांचा संख्या १-२0 दरम्यान असावे");
        }
    });

    $("#NoOfYearResidence").change(function () {
        var noOfYearResidence = $("#NoOfYearResidence").val();
        //var pattern = /^[0-9]{1-3}$/;
        if (noOfYearResidence > 0) { //&& pattern.test(noOfYearResidence)) {
            if (noOfYearResidence > 15) {
                return true;
            }
            else {
                alert("Number of years of residence should be more than 15 years for this scheme.");
            }
        }
        else {
            alert("Please provide valid number of years of residence.");
        }
    });

    $("#GenderSelected").change(function() {

        var genderSelected = $("#GenderSelected option:selected").text();
        if (genderSelected == "स्त्री") {
            $("#IsTransGender").hide();
            $("#dvWomen").show();
        }
        //if (genderSelected == "इतर") {

        //}
    });

});

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#ApplicantDOB").val();
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
            $("#ApplicantDOB").val('');
            $("#ApplicantDOB").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();

            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#ApplicantDOB").val('');
            $("#ApplicantDOB").focus();

            $("#ApplicantAge").val('');
            return false;
        }
        else {
            $("#ApplicantAge").val(age);

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

function CalculateOlderSonAge() {

    var date1 = new Date();
    var dob = $("#OlderSonDOB").val();
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
            $("#OlderSonDOB").val('');
            $("#OlderSonDOB").focus();

            $("#OlderSonAge").val('');

            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#OlderSonDOB").val('');
            $("#OlderSonDOB").focus();

            $("#OlderSonAge").val('');
            return false;
        }
        else {
            $("#OlderSonAge").val(age);

            return true;
        }
    }
    else {
        if (localStorage.getItem('my-lstore') == '1') {
            $("#OlderSonDOB").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $("#OlderSonDOB").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function AddRelationDetails() {

    var ApplicantRelation = $("#ApplicantRelation option:selected").text();
    var ApplicantRelationSalutationID = $("#ApplicantRelationSalutationID").val();
    var ApplicantSchemeName = $("#ApplicantSchemaSelected option:selected").text();
    var ApplicantRelationName = $('#ApplicantRelationName').val();
    var A_Amount = $('#SchemAmount').val();
    var ApplicantRelationSalutation = $("#ApplicantRelationSalutationID option:selected").text();
    var OtherSchemeName = $("#OtherSchemeName").val();

    if (ApplicantRelation == null || ApplicantRelation == "") {
        alert("Applicant Relation!");
    }
    if (ApplicantRelationSalutationID == null || ApplicantRelationSalutationID == "") {
        alert("Select Salutation!");
    }
    else if (ApplicantSchemeName == null || ApplicantSchemeName == "") {
        alert("Select ApplicantSchemeName !");
    }
    else if (ApplicantRelationName == null || ApplicantRelationName == "") {
        alert("Enter ApplicantRelationName !");
    }
    else if (A_Amount == null || A_Amount == "") {
        alert("Enter Amount !");
    } else if ($('#ApplicantSchemaSelected').val() == "6" && (OtherSchemeName == "" || OtherSchemeName == null)) {
        alert("Other Schema details!");
    }
    else {

        if ($('#ApplicantSchemaSelected').val() == "6") {
            ApplicantSchemeName = OtherSchemeName;
        }

        var postdata = {
            ApplicantRelation: ApplicantRelation,
            ApplicantRelationSalutation: ApplicantRelationSalutation,
            ApplicantSchemeName: ApplicantSchemeName,
            ApplicantRelationName: ApplicantRelationName,
            A_Amount: A_Amount,
            ApplicantRelationSalutationID: ApplicantRelationSalutationID
        };

        $.ajax({
            type: 'POST',
            url: '/Service/SpecialAssistanceScheme/Insert_BeneficialyApplicant',
            dataType: 'json',
            data: postdata,
            success: function (data) {

                if (data.length == 0) {
                    $('#RelationalDetailsTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#RelationalDetailsTable').empty();
                        document.getElementById("SGNAYCount").value = "";
                    }
                    else {
                        $('#RelationalDetailsTable').empty();
                        document.getElementById("SGNAYCount").value = "";
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>अर्जदाराशी नाते</th><th>संबोधन</th><th>पूर्ण नाव</th><th>योजनेचे नाव</th><th>अर्थसहाय्याची रक्कम (रु.)</th><th>Delete</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.ApplicantRelation +
                                '</td>' +
                                '<td>' +
                                val.ApplicantRelationSalutation +
                                '</td>' +
                                '<td>' +
                                val.ApplicantRelationName +
                                '</td>' +
                                '<td>' +
                                val.ApplicantSchemeName +
                                '</td>' +
                                '<td>' +
                                val.A_Amount +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteBenificialyDtls('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                            if (val.ApplicantSchemeName == "संजय गांधी निराधार अनुदान योजना") {
                                document.getElementById("SGNAYCount").value = "1";
                            }
                        });
                        temptable += "</table>";
                        $('#RelationalDetailsTable').append(temptable);
                        document.getElementById("ApplicantRelationSalutationID").value = "";
                        document.getElementById("ApplicantRelation").value = "";
                        document.getElementById("ApplicantRelationName").value = "";
                        document.getElementById("ApplicantSchemaSelected").value = "";
                        document.getElementById("SchemAmount").value = "";
                        document.getElementById("OtherSchemeName").value = "";
                        //document.getElementById("ApplicantSchemeName").value = "";
                        document.getElementById("A_Amount").value = "";
                    }
                }


            }
        });
    }
}

function deleteBenificialyDtls(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: '/Service/SpecialAssistanceScheme/Delete_BeneficialyApplicant',
        dataType: 'json',
        data: requestModel,
        success: function (data) {

            if (data.length == 0) {
                $('#RelationalDetailsTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#RelationalDetailsTable').empty();
                }
                else {
                    $('#RelationalDetailsTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Education Detail</th><th>Board/university</th><th>Admission Year</th><th>Leaving Year</th><th>Institute Details</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>अर्जदाराशी नाते</th><th>संबोधन</th><th>पूर्ण नाव</th><th>योजनेचे नाव</th><th>अर्थसहाय्याची रक्कम (रु.)</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.ApplicantRelation +
                            '</td>' +
                            '<td>' +
                            val.ApplicantRelationSalutation +
                            '</td>' +
                            '<td>' +
                            val.ApplicantRelationName +
                            '</td>' +
                            '<td>' +
                            val.ApplicantSchemeName +
                            '</td>' +
                            '<td>' +
                            val.A_Amount +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteBenificialyDtls('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#RelationalDetailsTable').append(temptable);
                }
            }
        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function ToggleBankDtails(add) {

    var value = add.split('__')[1]
    if (value == "IsBank" && value != "IsPost") {
        $("#dvBankDetails").show();
        $("#dvPostDetails").hide();
    }
    else if (value == "IsPost" && value != "IsIsBank") {
        $("#dvPostDetails").show();
        $("#dvBankDetails").hide();
    }
    else {
        $("#dvPostDetails").hide();
        $("#dvBankDetails").hide();
    }
}

function ToggleApplicantRelationalDtls(add) {

    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#divApplicantRealationalDtls").show();
    }
    else {
        $("#divApplicantRealationalDtls").hide();
    }
}

function ToggleBankDetailHideShow(add) {

    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#dvIsBankPost").show();
    }
    else {
        $("#dvIsBankPost").hide();
        $("#dvPostDetails").hide();
        $("#dvBankDetails").hide();
    }
}

$("#BankNameValue").change(function () {

    var BankName = $("#BankNameValue").find("option:selected").text();
    $("#BankName").val(BankName);
    $("#BankIFSCCode").val('');
    $("#BankAddress").val('');
    var BankCacheViewModel = { Id: $("#BankNameValue").val() };
    $.ajax({
        type: "POST",
        url: "/Service/SpecialAssistanceScheme/GetBranches",
        dataType: "json",
        data: BankCacheViewModel,
        success: function (data) {
            $("#BankBranchName").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].Ifscid + '">' + data[i].BranchName + '</option>';
                    $("#BankBranchName").append(optionhtml);
                });
        }
    });
});

$("#BankBranchName").change(function () {

    var BankBranch = $("#BankBranchName").find("option:selected").text();
    $("#BankBranch").val(BankBranch);

    $("#BankIFSCCode").val('');
    $("#BankAddress").val('');
    var BankCacheViewModel = { Id: $("#BankBranchName").val() };
    $.ajax({
        type: "POST",
        url: "/Service/SpecialAssistanceScheme/GetBrachDtlsByID",
        dataType: "json",
        data: BankCacheViewModel,
        success: function (data) {
            $("#BankIFSCCode").val(data.BankIFSCCode);
            $("#BankAddress").val(data.BankAddress);

        }
    });
});

$("#GurdianDistrict").change(function () {
    var requestTalukaModel = { Districtcode: $("#GurdianDistrict").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#GurdianTaluka").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#GurdianTaluka").append(optionhtml);
                });
        }
    });
});

$("#GurdianTaluka").change(function () {
    var requestVillageModel = { SubDistrictcode: $("#GurdianTaluka").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#GurdianVillage").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#GurdianVillage").append(optionhtml);
            });
        }
    });
});

$("#PostOfficeDistrictId").change(function () {

    var PODistrict = $("#PostOfficeDistrictId").find("option:selected").text();
    $("#PODistrict").val(PODistrict);

    var requestTalukaModel = { Districtcode: $("#PostOfficeDistrictId").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetTaluka",
        dataType: "json",
        data: requestTalukaModel,

        success: function (data) {
            $("#PostOfficeTalukaID").empty();
            $.each(data,
                function (i) {
                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                    $("#PostOfficeTalukaID").append(optionhtml);
                });
        }
    });
});

$("#PostOfficeTalukaID").change(function () {
    var POTaluka = $("#PostOfficeTalukaID").find("option:selected").text();
    $("#POTaluka").val(POTaluka);

    var requestVillageModel = { SubDistrictcode: $("#PostOfficeTalukaID").val() };
    $.ajax({
        type: "POST",
        url: "/Service/CommonDropdown/GetVillage",
        data: requestVillageModel,

        success: function (data) {
            $("#PostOfficeVillageId").empty();
            $.each(data, function (i) {

                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                $("#PostOfficeVillageId").append(optionhtml);
            });
        }
    });
});

$("#PostOfficeVillageId").change(function () {

    $("#PostOfficePinCOde").val('');
    $("#POfficeName").val('');
    $("#POofficeStatus").val('');

    var POVilage = $("#PostOfficeVillageId").find("option:selected").text();
    $("#POVilage").val(POVilage);
    var VillageCacheViewModel = { Villagecode: $("#PostOfficeVillageId").val() };
    $.ajax({
        type: "POST",
        url: "/Service/SpecialAssistanceScheme/GetPostOfficeDetails",
        dataType: "json",
        data: VillageCacheViewModel,
        success: function (data) {
            $("#PostOfficePinCOde").val(data.PostOfficePinCOde).prop('readonly', true);
            $("#POfficeName").val(data.POfficeName).prop('readonly', true);
            $("#POofficeStatus").val(data.POofficeStatus).prop('readonly', true);
            //$('#ApplicantAge').prop('readonly', true);
        }
    });

});


$("#ApplicantSchemaSelected").change(function () {
    var ApplicantSchemaSelected = $("#ApplicantSchemaSelected").val();
    if (ApplicantSchemaSelected == "6") {  // इतर
        $("#dvOtherSchemaName").show();
    }
    else {
        $("#dvOtherSchemaName").hide();
    }
});

$("#Category").change(function () {
    var schemeCategoryText = $("#Category").find("option:selected").text();
    $("#SchemeCategoryText").val(schemeCategoryText);
    var Category = $("#Category").val();
    var SalutationId = $("#SalutationId").val();
    var Gender = $("#GenderSelected").val();
    var Age = $("#ApplicantAge").val();
    if (Category == "1695") {
        $("#IsDisabled").val(1);
        $("#dvDisbled").show();
        $("#dvDisbledType").show();
        $("#dvIllnesType").hide();
        $("#dvGardianDtl").hide();
        $("#dvWomen").hide();
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
    } else if (Category == "1696") {
        $("#IsDisabled").val(0);
        $("#dvDisbled").hide();
        $("#dvIllnesType").show();
        $("#dvDisbledType").hide();
        $("#dvGardianDtl").hide();
        $("#dvWomen").hide();
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
    } else if (Category == "1699") { //अनाथ बालक
        $("#IsDisabled").val(0);
        $("#dvDisbled").hide();
        $("#dvIllnesType").hide();
        $("#dvDisbledType").hide();
        $("#dvGardianDtl").show();
        $("#dvWomen").hide();
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
    } else if ((SalutationId == "1330" || SalutationId == "1339" || SalutationId == "1344" || Gender == "1161") && (Category == "1697")) { ///सौ,श्रीमती,कुमारी
        $("#dvWomen").show();
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
        $("#dvDisbled").hide();
        $("#dvIllnesType").hide();
        $("#dvDisbledType").hide();
        $("#dvGardianDtl").hide();
    }

    else {
        $("#IsDisabled").val(0);
        $("#dvDisbled").hide();
        $("#dvIllnesType").hide();
        $("#dvDisbledType").hide();
        $("#dvGardianDtl").hide();
        $("#dvWomen").hide();
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
    }
    $("#AnnualFamilyIncome").val('');
    //Category Onchange 
    if (Age >= 1 && Age <= 64) {
        if (Category == "1699") { //अनाथ बालक
            IsAnathChild = 1;
        }
        if (Category == "1700") {  ///Alredy disabled तृतीयपंथी
            IsTransGender = 1;
        }
        if (Category == "1698") { ///आत्महत्येचा बळी ठरलेल्या शेतकऱ्याच्या कुटुंबातील सदस्य
            IsSuicideVictimFarmer = 1;  //   

        }
        if (Category == "1704") { //निराधार-पुरुष
            IsNiradharPurush = 1;
        }
    }
});

function HasWomenYelderSon_Click(add) {

    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#dvHasOlderSon").show();
    } else {
        $("#dvHasOlderSon").hide();
        $("#dvElderSonAnnualncome").hide();
    }
}


function HasPayPosition_Click(add) {

    var value = add.split('__')[1]
    if (value == "Istrue") { $("#dvElderSonAnnualncome").show(); } else { $("#dvElderSonAnnualncome").hide(); }
}

$("#OccupationSelected").change(function () {
    var Occupation = $("#OccupationSelected").find("option:selected").text();
    $("#Occupation").val(Occupation);
});

$("#CasteID").change(function () {
    var casteName = $("#CasteID").find("option:selected").text();
    $("#CasteName").val(casteName);
});


$("#SalutationId").change(function () {
    var ApplicantSalutaion = $("#SalutationId").find("option:selected").text();
    var SalutationId = $("#SalutationId").find("option:selected").val();
    $("#ApplicantSalutaion").val(ApplicantSalutaion);


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

    var GenderId = $("#GenderSelected").find("option:selected").val();
    var Age = $("#ApplicantAge").val();

    if ((SalutationId == "1330" || SalutationId == "1339" || SalutationId == "1344") && GenderId == "1161" && (Age >= 18 && Age <= 65)) {
        $("#Category option[value='1704']").attr("disabled", "disabled");
        $("#Category option[value='1697']").removeAttr("disabled");
    }
    else if ((SalutationId == "1335" || SalutationId == "1338") && GenderId == "1163" && (Age >= 18 && Age <= 65)) {
        $("#Category option[value='1697']").attr("disabled", "disabled");
        $("#Category option[value='1704']").removeAttr("disabled");
    }
    else if (Age >= 18 && Age <= 65) {
        $("#Category option[value='1697']").removeAttr("disabled");
        $("#Category option[value='1704']").removeAttr("disabled");
    }
    else {
        $("#Category option[value='1697']").removeAttr("disabled");
    }
});

$("#FatherSalutationId").change(function () {
    var FatherSalutaion = $("#FatherSalutationId").find("option:selected").text();
    $("#FatherSalutaion").val(FatherSalutaion);
});

$("#SubDivisionCode").change(function () {
    var SubDivisonName = $("#SubDivisionCode").find("option:selected").text();
    $("#SubDivisonName").val(SubDivisonName);
});

$("#GenderSelected").change(function () {
    
    var GenderId = $("#GenderSelected").find("option:selected").val();
    var Age = $("#ApplicantAge").val();
    if (GenderId == "1163" && Age >= 18 && Age <= 65) {
        $("#Category option[value='1697']").attr("disabled", "disabled");
        $("#Category option[value='1700']").attr("disabled", "disabled");
        $("#Category option[value='1704']").removeAttr("disabled");
    }
    else if (GenderId == "1163" && (Age < 18 || Age > 65)) {
        $("#Category option[value='1697']").attr("disabled", "disabled");
        $("#Category option[value='1704']").attr("disabled", "disabled");
        $("#Category option[value='1700']").attr("disabled", "disabled");
    }
    else if (GenderId == "1161") {
        $("#Category option[value='1704']").attr("disabled", "disabled");
        $("#Category option[value='1700']").attr("disabled", "disabled");
        $("#Category option[value='1697']").removeAttr("disabled");
    }
    else if (GenderId == "1159") {
        $("#Category option[value='1704']").attr("disabled", "disabled");
        $("#Category option[value='1697']").attr("disabled", "disabled");
        $("#Category option[value='1700']").removeAttr("disabled");
    }
    else if (GenderId == "" && Age >= 18 && Age <= 65) {
        $("#Category option[value='1700']").attr("disabled", "disabled");
        $("#Category option[value='1697']").removeAttr("disabled");
        $("#Category option[value='1704']").removeAttr("disabled");
    }
    else {
        $("#Category option[value='1700']").attr("disabled", "disabled");
        $("#Category option[value='1704']").attr("disabled", "disabled");
        $("#Category option[value='1697']").removeAttr("disabled");
    }
});

function IsUserBPL_Click(add) {
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#IsunderBPL").val('1');
        $("#dvBPLCardDtls").show();
        $("#dvFamilyIncome").hide();

    } else {
        $("#IsunderBPL").val('2');
        $("#dvBPLCardDtls").hide();
        $("#dvFamilyIncome").show();
    }

}

$("#BankAccountRefTypeNo").change(function () {
    var confirmAccountNo = $("#BankAccountRefTypeNo").val();
    var AccountNo = $("#BankAccountNo").val();
    if (confirmAccountNo != AccountNo) {
        alert("Bank Acoount number and Confirm Account number must be same");
        $("#BankAccountRefTypeNo").val('');
    }

});

$("#PostBankAccountRefTypeNo").change(function () {
    var confirmAccountNo = $("#PostBankAccountRefTypeNo").val();
    var AccountNo = $("#PostBankAccountNo").val();
    if (confirmAccountNo != AccountNo) {
        alert("Post Office Acoount number and Confirm Account number must be same");
        $("#PostBankAccountRefTypeNo").val('');
    }

});

$("#PercentageofDisability").change(function () {

    var percentageofDisability = $("#PercentageofDisability").val();
    if (eval(percentageofDisability) < "40" || eval(percentageofDisability) > "100") {
        alert("	विकलांगतेची टक्केवारी ४० ते १००% दरम्यान असावी.");
        $("#PercentageofDisability").val('');
    }

});

$("#AnnualFamilyIncome").change(function () {
    var annualFamilyIncome = $("#AnnualFamilyIncome").val();
    var category = $("#Category").val();
    if (category == "1695" && eval(annualFamilyIncome) > 50000) {
        alert("वार्षिक उत्पन्न १ पेक्षा जास्त व ५०००० किंवा त्यापेक्षा कमी असावे.");
        $("#AnnualFamilyIncome").val('');
        $("#AnnualFamilyIncome").focus();
    }
    else if (category != "1695" && eval(annualFamilyIncome) > 21000) {
        alert("वार्षिक उत्पन्न १ पेक्षा जास्त व २१००० किंवा त्यापेक्षा कमी असावे.");
        $("#AnnualFamilyIncome").val('');
        $("#AnnualFamilyIncome").focus();
    }
});

function GetSchemaDetails() {
    
    var hdnIsBPLandAgeBelow65 = 0;
    var IsBPL = $("#IsunderBPL").val();
    var PercentageOfDisability = $("#PercentageofDisability").val();
    var age = $("#ApplicantAge").val();
    var SchemeGroup = $("#SchemeGroup").val();
    var ApplicableServicesID = $("#ApplicableServicesID").val();
    var ApplicableServices = $("#ApplicableServices").val();
    var hdnIsSanjayGandhi = "";
    var hdnSGNAYCount = $("#SGNAYCount").val();
    var applicableWomenWidow = false;
    var applicableWomen = false;
    var CriticalIllness = false;
    var AbusedWomanFlag = false;
    var RehabilitatedWomanFlag = false;
    var illnessType = $("#TypeOfIllness").val();
    var WomenApplicable = $("#IsWomenApplicable").val();
    var Gender = $("#GenderSelected").val();
    var NoOfYearResidence = $("#NoOfYearResidence").val();
    var Category = $("#Category").val();
    var olderSonAge = $("#OlderSonAge").val();
    var olderSonDOB = $("#OlderSonDOB").val();
    
    if (IsBPL == '1') {
        if (eval(age) >= 65 && eval(age) <= 125) {
            $("#ApplicableServices").val('IGNOAPS,SBSRNY')
            $("#ApplicableServicesID").val('1112,1113')
            $("#ApplicableSchemeAmount").val('600')
            $("#SchemeGroup").val('OASB')
        } else if (eval(age) >= 1 && eval(age) <= 64) {
            hdnIsBPLandAgeBelow65 = "1";
        }
    }
    else if (IsBPL == '2') {
        if (eval(age) >= 65 && eval(age) <= 125) {
            $("#ApplicableServices").val('SBSRNY')
            $("#ApplicableServicesID").val('1113')
            $("#ApplicableSchemeAmount").val('600')
            $("#SchemeGroup").val('SB')
        }

    }
    
    if (WomenApplicable == "1374") {
        applicableWomenWidow = true;
    }
    else {
        applicableWomen = true;
    }

    if (WomenApplicable == "1376") {
        AbusedWomanFlag = true;
    }
    else if (WomenApplicable == "1373") {
        RehabilitatedWomanFlag = true;
    }

    if (illnessType != "") {
        CriticalIllness = true;
    }


    if (hdnIsBPLandAgeBelow65 == "1") {
        if ((eval(age) >= 18 && eval(age) <= 64) && eval(PercentageOfDisability) >= 80) {
            $("#ApplicableSchemeAmount").val(600)
            if (SchemeGroup != "" && SchemeGroup != "DPSG") {
                SchemeGroup = SchemeGroup + "," + "DPSG";
                $("#SchemeGroup").val(SchemeGroup)
            }
            else {
                $("#SchemeGroup").val("DPSG")
            }
            if (ApplicableServicesID != "") {
                ApplicableServicesID = ApplicableServicesID + ":" + "1115,1111";
                ApplicableServices = ApplicableServices + ":" + "SGNAY,IGNDPS";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
            else {
                ApplicableServicesID = "1115,1111";
                ApplicableServices = "SGNAY,IGNDPS";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
        }
        if (applicableWomenWidow == true && (eval(age) >= 40 && eval(age) <= 64)) {
            hdnApplicableSchemeAmount.Value = "600";
            if (SchemeGroup != "" && SchemeGroup != "WPSG") {
                SchemeGroup = SchemeGroup + "," + "WPSG";
                $("#SchemeGroup").val(SchemeGroup)
            }
            else {
                SchemeGroup = "WPSG";
                $("#SchemeGroup").val(SchemeGroup)
            }
            if (ApplicableServicesID != "") {
                ApplicableServicesID = ApplicableServicesID + ":" + "1111,1114";
                ApplicableServices = ApplicableServices + ":" + "SGNAY,IGNWPS";
                $("#ApplicableServicesID").val(ApplicableServicesID)
            }
            else {
                ApplicableServicesID = "1111,1114";
                ApplicableServices = "SGNAY,IGNWPS";
                $("#ApplicableServicesID").val(ApplicableServicesID)
            }
        }
    }

    if (hdnIsSanjayGandhi != "1") {
        if (((eval(age) >= 1 && eval(age) <= 64) && (eval(PercentageOfDisability) >= 40 && eval(PercentageOfDisability) <= 100) && (IsBPL == '2')) ||
            ((eval(age) >= 18 && eval(age) <= 64) && (eval(PercentageOfDisability) >= 40 && eval(PercentageOfDisability) <= 79) && (IsBPL == '1')) ||
            ((eval(age) >= 1 && eval(age) <= 17) && (eval(PercentageOfDisability) >= 40 && eval(PercentageOfDisability) <= 100) && (IsBPL == '1'))) {
            hdnIsSanjayGandhi = "1";
            $("#ApplicableSchemeAmount").val(600);
            if (SchemeGroup != "" && SchemeGroup != "SG") {
                SchemeGroup = SchemeGroup + "," + "SG";
                $("#SchemeGroup").val(SchemeGroup);
            }
            else {
                $("#SchemeGroup").val("SG")
            }
            if (ApplicableServicesID != "") {
                ApplicableServicesID = ApplicableServicesID + ":" + "1111";
                ApplicableServices = ApplicableServices + ":" + "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
            else {
                ApplicableServicesID = "1111";
                ApplicableServices = "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }

        }
    }

    if (hdnSGNAYCount == "1" && ApplicableServices == "SGNAY" && ApplicableServices != "") {
        $("#ApplicableSchemeAmount").val(900);
    }
    if (hdnIsSanjayGandhi != "1") {
        if (applicableWomenWidow == true && (eval(age) >= 18 && eval(age) <= 39)) {
            hdnIsSanjayGandhi = "1";
            $("#ApplicableSchemeAmount").val(600);
            if (SchemeGroup != "" && SchemeGroup != "SG") {
                SchemeGroup = SchemeGroup.Value + "," + "SG";
                $("#SchemeGroup").val(SchemeGroup);
            }
            else {
                $("#SchemeGroup").val("SG")
            }
            hdnDocSchemeGroup.Value = "SGWidow";
            if (ApplicableServicesID.Value != "") {
                ApplicableServicesID = ApplicableServicesID.Value + ":" + "1111";
                ApplicableServices = ApplicableServices.Value + ":" + "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
            else {
                ApplicableServicesID = "1111";
                ApplicableServices = "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
        }
    }
    
    if (hdnIsSanjayGandhi != "1") {
        if ((age >= 1 && age <= 64) && (applicableWomen == true || IsSuicideVictimFarmer == 1 || IsTransGender == 1 || CriticalIllness == true)) {
            $("#ApplicableSchemeAmount").val(600);
            if (SchemeGroup != "" && SchemeGroup != "SG") {
                SchemeGroup = SchemeGroup + "," + "SG";
                $("#SchemeGroup").val(SchemeGroup);
            }
            else {
                $("#SchemeGroup").val("SG")
            }
            if (ApplicableServicesID.Value != "") {
                ApplicableServicesID = ApplicableServicesID.Value + ":" + "1111";
                ApplicableServices = ApplicableServices.Value + ":" + "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
            else {
                ApplicableServicesID = "1111";
                ApplicableServices = "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
        }
        else if ((age >= 1 && age <= 18) && (IsAnathChild == 1)) {
            $("#ApplicableSchemeAmount").val(600);
            if (SchemeGroup != "" && SchemeGroup != "SG") {
                SchemeGroup = SchemeGroup + "," + "SG";
                $("#SchemeGroup").val(SchemeGroup);
            }
            else {
                $("#SchemeGroup").val("SG")
            }
            hdnDocSchemeGroup.Value = "SGAnath";
            if (hdnApplicableServicesID.Value != "") {
                ApplicableServicesID = ApplicableServicesID.Value + ":" + "1111";
                ApplicableServices = ApplicableServices.Value + ":" + "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
            else {
                ApplicableServicesID = "1111";
                ApplicableServices = "SGNAY";
                $("#ApplicableServicesID").val(ApplicableServicesID)
                $("#ApplicableServices").val(ApplicableServices)
            }
        }
    }

    if ((eval(age) >= 18 && eval(age) <= 65) && Gender == "1163" && IsNiradharPurush == 1) {
        $("#ApplicableSchemeAmount").val(600);
        $("#SchemeGroup").val("SG");
        ApplicableServicesID = "1111";
        ApplicableServices = "SGNAY";
        $("#ApplicableServicesID").val(ApplicableServicesID);
        $("#ApplicableServices").val(ApplicableServices);
    }
    if (IsNiradharPurush == 1 && NoOfYearResidence < 15) {
        alert("संजय गांधी निराधार अनुदान - पुरुष योजनेअंतर्गत पात्र ठरण्यासाठी महाराष्ट्रातील रहिवासाचा कालावधी १५ वर्षे किंवा त्यापेक्षा जास्त असला पाहिजे.");
        $("#NoOfYearResidence").val('');
        return false;
    }
    
    var hdnSchemeGroup = $("#SchemeGroup").val();

    if (hdnSchemeGroup == "SG" && Category != "1696" && Category != "1699" && Category != "1700" && AbusedWomanFlag == false && RehabilitatedWomanFlag == false) {
        if (NoOfYearResidence < 15) {
            alert("संजय गांधी निराधार अनुदान योजनेअंतर्गत पात्र ठरण्यासाठी महाराष्ट्रातील रहिवासाचा कालावधी १५ वर्षे किंवा त्यापेक्षा जास्त असला पाहिजे.");
            $("#NoOfYearResidence").val('');
            return false;
        }
    }

    if (hdnSchemeGroup == "SG" && olderSonDOB != "" && eval(olderSonAge) >= 25) {
        alert("संजय गांधी निराधार अनुदान योजनेअंतर्गत पात्र ठरण्यासाठी मोठ्या मुलाचे वय २५ वर्षांपेक्षा कमी असले पाहिजे.");
        $("#OlderSonDOB").val('');
        return false;
    }

    //isBnak Verified
    var IsBank_Post = $("#IsBank_Post").val();
    var Post_Bank_Dtls = $("#Post_Bank_Dtls").val();// 1 = bank and 2 post

    var BankAccountNo = $("#BankAccountNo").val();
    var BankName = $("#BankName").val();
    var BankBranch = $("#BankBranch").val();
    var BankIFSCCode = $("#BankIFSCCode").val();

    var PODistrict = $("#PODistrict").val();
    var POTaluka = $("#POTaluka").val();
    var POVilage = $("#POVilage").val();

    var PostOfficePinCOde = $("#PostOfficePinCOde").val();
    var POfficeName = $("#POfficeName").val();
    var POofficeStatus = $("#POofficeStatus").val();


    if (IsBank_Post == "1") {
        if (Post_Bank_Dtls == "1") {
            if (BankAccountNo != "" && BankName != "" && BankBranch != "" && BankIFSCCode != "") {
                VerifyBankDetails = 1;
                $("#VerifyBankDetails").val(VerifyBankDetails);
            }
            //else if (txtBankName.Text != "" && txtBranch_Name.Text != "" && hdnBankAccno.Value != "" && txtIFSCCode.Text != "" && txtBankAddress.Text != "") {
            //    VerifyBankDetails = 1;
            //}
            else {
                VerifyBankDetails = 2;
                $("#VerifyBankDetails").val(VerifyBankDetails);
            }
        }
        else {
            if (PODistrict != "" && POTaluka != "" && PostOfficePinCOde != "" && POVilage != "" && POfficeName != "" && POofficeStatus != ""
                && PostBankAccountNo != "" && PostCustomerName != "") {
                VerifyBankDetails = 1;
                $("#VerifyBankDetails").val(VerifyBankDetails);
            }
            else {
                VerifyBankDetails = 2;
                $("#VerifyBankDetails").val(VerifyBankDetails);
            }
        }
    }
    else {
        VerifyBankDetails = 2;
        $("#VerifyBankDetails").val(VerifyBankDetails);
    }
    //end 
}




