
$(document).ready(function () {
    var current_year = new Date().getFullYear();

    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#DeathDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
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

function AreaSelected(add) {
    
    var value = add.split('__')[1]
    if (value == "IsCity") {
        if (document.getElementById("DivisionNo").value == "" || document.getElementById("DivisionNo").value == null) {
            alert("शहरी, असल्यास प्रभाग क्र.");
        }
    }

}

function ValidatePeriodResideinnos() {
    var period = ("#PeriodResideinnos").val();
    if (period > 125 || period < 1) {
        alert("Time period cannot be more than 125 years.");
    }
    else {
        return true;
    }
}

function AddBeneficiary() {
    var RelationofApplicant = $("#RelationofApplicant option:selected").text();
    var RelationofApplicantId = $("#RelationofApplicant").val();
    var BeneficiaryName = $('#BeneficiaryName').val();
    var BeneficiaryAge = $('#BeneficiaryAge').val();
    var BeneficiarySaluationId = $('#BeneficiarySalutationSelected').val();
    var BeneficiarySaluation = $("#BeneficiarySalutationSelected option:selected").text();
    var ChangeTypeId = $('#ChangeTypeSelected').val();
    var ChangeType = $("#ChangeTypeSelected option:selected").text();
    var DeathDate = $('#DeathDate').val();
    var ResidencePlace = $('#ResidencePlace').val();


    if (RelationofApplicant == null || RelationofApplicant == "") {
        alert("Enter Relationship of an Applicant!");
    }
    else if (BeneficiaryName == null || BeneficiaryName == "") {
        alert("Enter Beneficiary Name !");
    }
    else if (BeneficiaryAge == null || BeneficiaryAge == "") {
        alert("Enter Beneficiary Age !");
    }
    else if (BeneficiarySaluation == null || BeneficiarySaluation == "") {
        alert("Enter Saluation !");
    }
    else if (ChangeType == null || ChangeType == "") {
        alert("Select Change type !");
    }
    else if (DeathDate == null || DeathDate == "") {
        alert("Enter Date !");
    }
    else if (ResidencePlace == null || ResidencePlace == "") {
        alert("Enter Place !");
    }
    else {
        
        var postdata = {
            RelationofApplicant: RelationofApplicant,
            RelationofApplicantId: RelationofApplicantId,
            BeneficiaryName: BeneficiaryName,
            BeneficiaryAge: BeneficiaryAge,
            BeneficiarySaluationId: BeneficiarySaluationId,
            ChangeTypeId: ChangeTypeId,
            ChangeType: ChangeType,
            DeathDate: DeathDate,
            ResidencePlace: ResidencePlace
        };
        $.ajax({
            type: 'POST',
            url: '/Service/RationCardModify/Insert_Data',
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
                        document.getElementById("BeneficiarySalutationSelected").value = "";
                        document.getElementById("ChangeTypeSelected").value = "";
                        document.getElementById("DeathDate").value = "";
                        document.getElementById("ResidencePlace").value = "";

                    }
                    else {
                        $('#Beneficiarytable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>नाव</th><th>अर्जदाराशी नाते</th><th>वय</th><th>बदलाचा प्रकार</th><th>निघून गेलेल्या किंवा मृत्यूची तारीख</th><th>निघून जाणयाच्याबाबतीत विद्यमान निवासाचे ठिकाण</th><th>Remove</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryName +
                                '</td>' +
                                '<td>' +
                                val.RelationofApplicant +
                                '</td>' +
                                '<td>' +
                                val.BeneficiaryAge +
                                '</td>' +
                                '<td>' +
                                val.ChangeType +
                                '</td>' +
                                '<td>' +
                                val.DeathDate +
                                '</td>' +
                                '<td>' +
                                val.ResidencePlace +
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
                        document.getElementById("BeneficiarySalutationSelected").value = "";
                        document.getElementById("ChangeTypeSelected").value = "";
                        document.getElementById("DeathDate").value = "";
                        document.getElementById("ResidencePlace").value = "";


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
        url: "/Service/RationCardModify/Delete_Data",
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
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>नाव</th><th>अर्जदाराशी नाते</th><th>वय</th><th>बदलाचा प्रकार</th><th>निघून गेलेल्या किंवा मृत्यूची तारीख</th><th>निघून जाणयाच्याबाबतीत विद्यमान निवासाचे ठिकाण</th><th>Remove</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryName +
                            '</td>' +
                            '<td>' +
                            val.RelationofApplicant +
                            '</td>' +
                            '<td>' +
                            val.BeneficiaryAge +
                            '</td>' +
                            '<td>' +
                            val.ChangeType +
                            '</td>' +
                            '<td>' +
                            val.DeathDate +
                            '</td>' +
                            '<td>' +
                            val.ResidencePlace +
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

$("#NoOfEkak").change(function () {
    var noOfEkak = $("#NoOfEkak").val();

    if (noOfEkak < 1 || noOfEkak > 40) {
        alert("कृपया एककांच्या योग्य संख्येची नोंद करा.(1 ते 40 दरम्यान)");
        $("#NoOfEkak").val('');
        $("#NoOfEkak").focus();
    }
});

$("#BeneficiaryAge").change(function () {
    var beneficiaryAge = $("#BeneficiaryAge").val();

    if (beneficiaryAge < 1 || beneficiaryAge > 125) {
        alert("शिधापत्रिकेमध्ये ज्या व्यक्तीचे नाव समाविष्ट केले आहे/वगळले आहे, त्या व्यक्तीच्या योग्य वयाची नोंद करा.");
        $("#BeneficiaryAge").val('');
        $("#BeneficiaryAge").focus();
    }
});