
$(document).ready(function () {
    $("#IdentifierDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#IdentifierDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#IdentifierTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#IdentifierTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#IdentifierTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#IdentifierTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,
            
            success: function (data) {
                $("#IdentifierVillageSelected").empty();
                $.each(data, function (i) {
                    
                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#IdentifierVillageSelected").append(optionhtml);
                });
            }
        });

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

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय 18 वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#ApplicantDOB").val('');
            $("#ApplicantDOB").focus();

            $("#ApplicantAge").val('');
            $("#ApplicantAge").focus();
            return false;
        }
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



$("#SalutationSelected").change(function () {
    var SalutationId = $("#SalutationSelected").find("option:selected").val();

    if (SalutationId == "1330" || SalutationId == "1339" || SalutationId == "1344") { //सौ श्रीमती कुमारी
        $("#GenderSelected").val('1161');
        $("#GenderSelected option[value='1163']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    } else if (SalutationId == "1333" || SalutationId == "1334" || SalutationId == "1343" || SalutationId == "1345") {
        $("#GenderSelected").val('1162');
        $("#GenderSelected option[value='1160']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    }
    else if (SalutationId == "1335" || SalutationId == "1338") {
        $("#GenderSelected").val('1163');
        $("#GenderSelected option[value='1161']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    } else if (SalutationId == "1328" || SalutationId == "1332" || SalutationId == "1340") {
        $("#GenderSelected").val('1160');
        $("#GenderSelected option[value='1162']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
    } else {
        $("#GenderSelected").val('');
        $("#GenderSelected option[value='1161']").removeAttr("disabled");
        $("#GenderSelected option[value='1163']").removeAttr("disabled");
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    }
});
