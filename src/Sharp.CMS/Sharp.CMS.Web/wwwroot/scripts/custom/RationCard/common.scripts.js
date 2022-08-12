$(document).ready(function () {

    //$("#vehicle").hide();
    //$("#salestax").hide();
    //$("#fsRationCard").hide();
    //$("#NewNameDiv").hide();


    //$("#CustDistrictSelected").change(function () {
    //    var requestTalukaModel = { Districtcode: $("#CustDistrictSelected").val() };

    //    $.ajax({
    //        type: "POST",
    //        url: "/Service/CommonDropdown/GetTaluka",
    //        dataType: "json",
    //        data: requestTalukaModel,

    //        success: function (data) {
    //            $("#CustTalukaSelected").empty();
    //            $.each(data,
    //                function (i) {
    //                    var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
    //                    $("#CustTalukaSelected").append(optionhtml);
    //                });
    //        }
    //    });
    //});

    //$("#CustTalukaSelected").change(function () {
    //    var requestVillageModel = { SubDistrictcode: $("#CustTalukaSelected").val() };
    //    $.ajax({
    //        type: "POST",
    //        url: "/Service/CommonDropdown/GetVillage",
    //        data: requestVillageModel,

    //        success: function (data) {
    //            $("#CustVillageSelected").empty();
    //            $.each(data, function (i) {

    //                var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
    //                $("#CustVillageSelected").append(optionhtml);
    //            });
    //        }
    //    });

    //});
    
    $("#ChangeTypeSelected").change(function () {
        
        var changeTypeValue = $("#ChangeTypeSelected option:selected").text();
        if (changeTypeValue == 'कुटुंबप्रमुखांमधील बदल') { //Value may change for नाव बरोबर करणे
            $("#NewNameDiv").hide();
            $("NewMemberDiv").show();
            $("NewShopDetails").hide();
            $("NewAddress").hide();
        }

        if (changeTypeValue == 'नाव बरोबर करणे') {
            $("#NewNameDiv").show();
            $("NewMemberDiv").hide();
            $("NewShopDetails").hide();
            $("NewAddress").hide();
        }

        if (changeTypeValue == 'दुकानासंबंधी बदल') {
            $("#NewNameDiv").hide();
            $("NewMemberDiv").hide();
            $("NewShopDetails").show();
            $("NewAddress").hide();
        }

        if (changeTypeValue == 'पत्यामधील बदल') {
            $("#NewNameDiv").hide();
            $("NewMemberDiv").hide();
            $("NewShopDetails").hide();
            $("NewAddress").show();
        }
    });
});

$(document).ready(function () {
    var current_year = new Date().getFullYear();

    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $('#ApplicantAge').prop('readonly', true);

});

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

//function SelectChangeType() {

//}

//document.getElementById("#BeneficiaryAge").addEventListener("onkeypress", ValidateBeneficiaryAge());
function ValidateBeneficiaryAge() {
    var period = ("#BeneficiaryAge").val();
    var reg = /^[0-9]{3}$/;
    if (reg.test($("#BeneficiaryAge").val())) {
        if (period > 125 || period < 1) {
            alert("Age cannot be more than 125 years.");
        }
        else {
            return false;
        }
    }
    else {
        alert("Please enter numbers only.");
    }
}

//document.getElementById("#PeriodResideinnos").addEventListener("onkeypress", ValidatePeriodResideinnos());
function ValidatePeriodResideinnos() {
    var period = ("#PeriodResideinnos").val();
    var reg = /^[0-9]{3}$/;
    if (reg.test($("#PeriodResideinnos").val())) {
        if (period > 125 || period < 1) {
            alert("Time period cannot be more than 125 years.");
        }
        else {
            return false;
        }
    }
    else {
        alert("Please enter numbers only.");
    }
}

function VehicleSelected(add) {
    
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("Typeofvehicle").value = "";
        document.getElementById("nameofvehicle").value = "";
        $("#vehicle").show();
    }
    else {
        document.getElementById("Typeofvehicle").value = "";
        document.getElementById("nameofvehicle").value = "";
        $("#vehicle").hide();
    }
}

function AreaSelected(add) {
    
    var value = add.split('__')[1]
    if (value == 'IsCity') {
        if (document.getElementById("DivisionNo").value == "" || document.getElementById("DivisionNo").value == null) {
            alert("शहरी, असल्यास प्रभाग क्र.");
        }
    }

}

function TaxSelected(add) {
    
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("saletaxnumber").value = "";
        $("#salestax").show();
    }
    else {
        document.getElementById("saletaxnumber").value = "";
        $("#salestax").hide();
    }
}

function CylinderSelected(add) {
    
    var value = add.split('__')[1]
    if (value == "Istrue") {

        $("#fsRationCard").show();
    }
    else {

        $("#fsRationCard").hide();
    }
}


function AddBeneficiary() {
    

    var RelationApplicant = $("#RelationofApplicant option:selected").text();
    var RelationApplicantId = $("#RelationofApplicant").val();
    var BeneficiaryName = $('#BeneficiaryName').val();
    var BeneficiaryAge = $('#BeneficiaryAge').val();
    var BeneficiaryOccupationId = $('#BeneficiaryOccupationSelected').val();
    var BeneficiaryOccupationSelected = $("#BeneficiaryOccupationSelected option:selected").text();
    var Income = $('#Income').val();
    var BankAccountNo = $('#BankAccountNo').val();
    var BeneficiaryNationalityID = $('#BeneficiaryNationalitySelected').val();
    var BeneficiaryNationality = $("#BeneficiaryNationalitySelected option:selected").text();
    var BeneficiarySaluationId = $('#BeneficiarySalutationSelected').val();
    var BeneficiarySaluation = $("#BeneficiarySalutationSelected option:selected").text();
    

    if (RelationApplicant == null || RelationApplicant == "") {
        alert("Enter Relationship of an Applicant!");
    }
    else if (BeneficiaryName == null || BeneficiaryName == "") {
        alert("Enter Beneficiary Name !");
    }
    else if (BeneficiaryAge == null || BeneficiaryAge == "") {
        alert("Enter Beneficiary Age !");
    }
    else if (BeneficiaryOccupationSelected == null || BeneficiaryOccupationSelected == "") {
        alert("Enter Occuption !");
    }
    else if (Income == null || Income == "") {
        alert("Enter Income !");
    }
    else if (BankAccountNo == null || BankAccountNo == "") {
        alert("Enter Bank Account No. !");
    }
    else if (BeneficiaryNationality == null || BeneficiaryNationality == "") {
        alert("Enter Nationality. !");
    }
    else if (BeneficiarySaluation == null || BeneficiarySaluation == "") {
        alert("Enter Saluation !");
    }
    else {

        var postdata = {
            RelationApplicant: RelationApplicant,
            RelationApplicantId: RelationApplicantId,
            BeneficiaryName: BeneficiaryName,
            BeneficiaryAge: BeneficiaryAge,
            BeneficiaryNationality: BeneficiaryNationality,
            BeneficiaryNationalityID: BeneficiaryNationalityID,
            BeneficiaryOccupationId: BeneficiaryOccupationId,
            BeneficiaryOccupationSelected: BeneficiaryOccupationSelected,
            BeneficiarySaluationId: BeneficiarySaluationId,
            Income: Income,
            BankAccountNo: BankAccountNo
        };

        $.ajax({
            type: 'POST',
            url: '/Service/RationCard/Insert_Data',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                
                if (data.length == 0) {
                    $('#Beneficiarytable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#Beneficiarytable').empty();
                        document.getElementById("RelationofApplicant").value = "";
                        document.getElementById("BeneficiaryName").value = "";
                        document.getElementById("BeneficiaryAge").value = "";
                        document.getElementById("BeneficiaryOccupationSelected").value = "";
                        document.getElementById("BeneficiarySalutationSelected").value = "";
                        document.getElementById("Income").value = "";
                        document.getElementById("BankAccountNo").value = "";
                        document.getElementById("BeneficiaryNationalitySelected").value = "";

                    }
                    else {
                        $('#Beneficiarytable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>नाव</th><th>अर्जदाराशी नाते</th><th>वय</th><th>राष्ट्रीयत्व</th><th>व्यवसाय</th><th>आर्थिक उत्पन्न(रु.)</th><th>बँक खाते क्रमांक</th><th>Remove</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryName +
                                '</td>' +
                                '<td>' +
                                val.RelationApplicant +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryAge +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryNationality +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryOccupationSelected +
                                '</td>' +
                                '<td>' +
                                val.Income +
                                '</td>' +
                                '<td>' +
                                val.BankAccountNo +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteBeneficiary('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#Beneficiarytable').append(temptable);
                        document.getElementById("RelationofApplicant").value = "";
                        document.getElementById("BeneficiaryName").value = "";
                        document.getElementById("BeneficiaryAge").value = "";
                        document.getElementById("BeneficiaryOccupationSelected").value = "";
                        document.getElementById("BeneficiarySalutationSelected").value = "";
                        document.getElementById("Income").value = "";
                        document.getElementById("BankAccountNo").value = "";
                        document.getElementById("BeneficiaryNationalitySelected").value = "";


                    }
                }

            }
        });
    }
}

function deleteBeneficiary(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/RationCard/Delete_Data",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            
            if (data.length == 0) {
                $('#Beneficiarytable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#Beneficiarytable').empty();
                }
                else {
                    $('#Beneficiarytable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>नाव</th><th>अर्जदाराशी नाते</th><th>वय</th><th>राष्ट्रीयत्व</th><th>व्यवसाय</th><th>आर्थिक उत्पन्न(रु.)</th><th>बँक खाते क्रमांक</th><th>Remove</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryName +
                            '</td>' +
                            '<td>' +
                            val.RelationApplicant +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryAge +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryNationality +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryOccupationSelected +
                            '</td>' +
                            '<td>' +
                            val.Income +
                            '</td>' +
                            '<td>' +
                            val.BankAccountNo +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteBeneficiary('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#Beneficiarytable').append(temptable);
                }
            }
        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

$("#SalutationSelected").change(function () {
    var SalutationId = $("#SalutationSelected").find("option:selected").val();

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
});