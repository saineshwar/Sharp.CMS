

$(document).ready(function () {
    var current_year = new Date().getFullYear();

    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#From").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            checkFromAndTo();
        }
    });
    $("#To").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            checkFromAndTo();
        }
    });
    $('#ApplicantAge').prop('readonly', true);

});

function checkFromAndTo() {
        var FromDate = $("#From").val();
        var datePat1 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var matchArray1 = FromDate.match(datePat1); // is the format ok?

        day1 = matchArray1[1]; // p@rse date into variables
        month1 = matchArray1[3];
        year1 = matchArray1[5];

        var FromDateNew = new Date(month1 + "/" + day1 + "/" + year1);

        var ToDate = $("#To").val();
        var datePat2 = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
        var matchArray2 = ToDate.match(datePat2); // is the format ok?

        day2 = matchArray2[1]; // p@rse date into variables
        month2 = matchArray2[3];
        year2 = matchArray2[5];

        var ToDateNew = new Date(month2 + "/" + day2 + "/" + year2);


        if (FromDateNew <= ToDateNew) {

        }
        else {
            alert("To date cannot be less than From date"); 
            document.getElementById("To").value = "";
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
    document.getElementById("ApplicantSalutationText").value = $("#SalutationSelected option:selected").text();
});

$("#FatherSalutationSelected").change(function () {
    document.getElementById("FatherSalutationText").value = $("#FatherSalutationSelected option:selected").text();
});

$("#ModeOfCollectionSelected").change(function () {
    document.getElementById("ModeOfCollectionText").value = $("#ModeOfCollectionSelected option:selected").text();
});

$("#PovertyLineSelected").change(function () {
    document.getElementById("PovertyLineText").value = $("#PovertyLineSelected option:selected").text();
});


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