$(document).ready(function () {
    $("#permanentaddress").hide(); $("#FathHusbJob").hide(); $("#FathHusBusiness").hide();
});
$(document).ready(function () {
    $("#PermanentDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#PermanentDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PermanentTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PermanentTalukaSelected").append(optionhtml);
                    });
            }
        });
    });


    $("#PermanentTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#PermanentTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PermanentVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PermanentVillageSelected").append(optionhtml);
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
    $('#FathHusJobFirstYearWords').prop('readonly', true);
    $('#FathHusJobSecondYearWords').prop('readonly', true);
    $('#FathHusJobThirdYearWords').prop('readonly', true);
    $('#MotherJobFirstYearWords').prop('readonly', true);
    $('#MotherJobSecondYearWords').prop('readonly', true);
    $('#MotherJobThirdYearWords').prop('readonly', true);
    $('#FathHusBusinessFirstYearWords').prop('readonly', true);
    $('#FathHusBusinessSecondYearWords').prop('readonly', true);
    $('#FathHusBusinessThirdYearWords').prop('readonly', true);

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

$("#CasteSelected").change(function () {
    document.getElementById("CasteSelectedText").value = $("#CasteSelected option:selected").text();
});

function ToggleTextBoxPerAdd(add) {
    var value = add.split('__')[1]
    if (value == "Isfalse") {
        document.getElementById("PermanentAdd").value = document.getElementById("AddrCare").value;
        document.getElementById("PermanentBuilding").value = document.getElementById("Building").value;
        document.getElementById("PermanentLocality").value = document.getElementById("Locality").value;
        document.getElementById("PermanentStateSelected").value = document.getElementById("StateSelected").value;

        document.getElementById("PermanentDistrictSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#PermanentTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#PermanentTalukaSelected").append(optionhtml);
                        $("#PermanentTalukaSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#PermanentVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#PermanentVillageSelected").append(optionhtml);
                    $("#PermanentVillageSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("PermanentPincode").value = document.getElementById("Pincode").value;
        $("#permanentaddress").hide();
    }
    else {
        document.getElementById("PermanentAdd").value = "";
        document.getElementById("PermanentBuilding").value = "";
        document.getElementById("PermanentLocality").value = "";
        document.getElementById("PermanentStateSelected").value = "27";
        document.getElementById("PermanentDistrictSelected").value = "";
        $("#PermanentTalukaSelected").empty();
        $("#PermanentVillageSelected").empty();
        document.getElementById("PermanentPincode").value = "";
        $("#permanentaddress").show();
    }
}

function ToggleTextBoxFathHusbJob(add) {
    var value = add.split('__')[1]
    if (value == "Isfalse") {
        $("#FathHusbJob").hide();
    }
    else {
        $("#FathHusbJob").show();
    }
}

function ToggleTextBoxFathHusBusiness(add) {
    var value = add.split('__')[1]
    if (value == "Isfalse") {
        $("#FathHusBusiness").hide();
    }
    else {
        $("#FathHusBusiness").show();
    }
}

//Fath/Hus Job 1st From Year
$(document).ready(function () {
    $("#FathHusJobFirstFromYear").change(function () {
        var year = $("#FathHusJobFirstFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobFirstFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobFirstFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobFirstFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Fath/Hus Job 1st To Year
$(document).ready(function () {
    $("#FathHusJobFirstToYear").change(function () {
        var year = $("#FathHusJobFirstToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobFirstToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobFirstToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobFirstToYear").value = "";
                return false;
            }
            if (year < $("#FathHusJobFirstFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusJobFirstToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Fath/Hus Job 2nd From Year
$(document).ready(function () {
    $("#FathHusJobSecondFromYear").change(function () {
        var year = $("#FathHusJobSecondFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobSecondFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobSecondFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobSecondFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Fath/Hus Job 2nd To Year
$(document).ready(function () {
    $("#FathHusJobSecondToYear").change(function () {
        var year = $("#FathHusJobSecondToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobSecondToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobSecondToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobSecondToYear").value = "";
                return false;
            }
            if (year < $("#FathHusJobSecondFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusJobSecondToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Fath/Hus Job 3rd From Year
$(document).ready(function () {
    $("#FathHusJobThirdFromYear").change(function () {
        var year = $("#FathHusJobThirdFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobThirdFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobThirdFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobThirdFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Fath/Hus Job 3rd To Year
$(document).ready(function () {
    $("#FathHusJobSThirdToYear").change(function () {
        var year = $("#FathHusJobSThirdToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusJobSThirdToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusJobSThirdToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusJobSThirdToYear").value = "";
                return false;
            }
            if (year < $("#FathHusJobThirdFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusJobSThirdToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 1st From Year
$(document).ready(function () {
    $("#MotherJobFirstFromYear").change(function () {
        var year = $("#MotherJobFirstFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobFirstFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobFirstFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobFirstFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 1st To Year
$(document).ready(function () {
    $("#MotherJobFirstToYear").change(function () {
        var year = $("#MotherJobFirstToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobFirstToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobFirstToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobFirstToYear").value = "";
                return false;
            }
            if (year < $("#MotherJobFirstFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("MotherJobFirstToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 2nd From Year
$(document).ready(function () {
    $("#MotherJobSecondFromYear").change(function () {
        var year = $("#MotherJobSecondFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobSecondFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobSecondFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobSecondFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 2nd To Year
$(document).ready(function () {
    $("#MotherJobSecondToYear").change(function () {
        var year = $("#MotherJobSecondToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobSecondToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobSecondToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobSecondToYear").value = "";
                return false;
            }
            if (year < $("#MotherJobSecondFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("MotherJobSecondToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 3rd From Year
$(document).ready(function () {
    $("#MotherJobThirdFromYear").change(function () {
        var year = $("#MotherJobThirdFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobThirdFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobThirdFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobThirdFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Mother Job 3rd To Year
$(document).ready(function () {
    $("#MotherJobSThirdToYear").change(function () {
        var year = $("#MotherJobSThirdToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("MotherJobSThirdToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("MotherJobSThirdToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("MotherJobSThirdToYear").value = "";
                return false;
            }
            if (year < $("#MotherJobThirdFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("MotherJobSThirdToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Business 1st From Year
$(document).ready(function () {
    $("#FathHusBusinessFirstFromYear").change(function () {
        var year = $("#FathHusBusinessFirstFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessFirstFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessFirstFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessFirstFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Business 1st To Year
$(document).ready(function () {
    $("#FathHusBusinessFirstToYear").change(function () {
        var year = $("#FathHusBusinessFirstToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessFirstToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessFirstToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessFirstToYear").value = "";
                return false;
            }
            if (year < $("#FathHusBusinessFirstFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusBusinessFirstToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Business 2nd From Year
$(document).ready(function () {
    $("#FathHusBusinessSecondFromYear").change(function () {
        var year = $("#FathHusBusinessSecondFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessSecondFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessSecondFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessSecondFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Business 2nd To Year
$(document).ready(function () {
    $("#FathHusBusinessSecondToYear").change(function () {
        var year = $("#FathHusBusinessSecondToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessSecondToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessSecondToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessSecondToYear").value = "";
                return false;
            }
            if (year < $("#FathHusBusinessSecondFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusBusinessSecondToYear").value = "";
                return false;
            }
            return true;
        }
    });
});


//Business 3rd From Year
$(document).ready(function () {
    $("#FathHusBusinessThirdFromYear").change(function () {
        var year = $("#FathHusBusinessThirdFromYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessThirdFromYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessThirdFromYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessThirdFromYear").value = "";
                return false;
            }
            return true;
        }
    });
});

//Business 3rd To Year
$(document).ready(function () {
    $("#FathHusBusinessThirdToYear").change(function () {
        var year = $("#FathHusBusinessThirdToYear").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("FathHusBusinessThirdToYear").value = "";
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("FathHusBusinessThirdToYear").value = "";
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("FathHusBusinessThirdToYear").value = "";
                return false;
            }
            if (year < $("#FathHusBusinessThirdFromYear").val()) {
                alert("Year should be greater than From Year");
                document.getElementById("FathHusBusinessThirdToYear").value = "";
                return false;
            }
            return true;
        }
    });
});

$(document).ready(function () {
    $("#FathHusJobFirstYearNum").change(function () {
        var WRAmount = $("#FathHusJobFirstYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusJobFirstYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#FathHusJobSecondYearNum").change(function () {
        var WRAmount = $("#FathHusJobSecondYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusJobSecondYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#FathHusJobThirdYearNum").change(function () {
        var WRAmount = $("#FathHusJobThirdYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusJobThirdYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#MotherJobFirstYearNum").change(function () {
        var WRAmount = $("#MotherJobFirstYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("MotherJobFirstYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#MotherJobSecondYearNum").change(function () {
        var WRAmount = $("#MotherJobSecondYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("MotherJobSecondYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#MotherJobThirdYearNum").change(function () {
        var WRAmount = $("#MotherJobThirdYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("MotherJobThirdYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#FathHusBusinessFirstYearNum").change(function () {
        var WRAmount = $("#FathHusBusinessFirstYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusBusinessFirstYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#FathHusBusinessSecondYearNum").change(function () {
        var WRAmount = $("#FathHusBusinessSecondYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusBusinessSecondYearWords").value = data;
                }
            }
        });
    });
});

$(document).ready(function () {
    $("#FathHusBusinessThirdYearNum").change(function () {
        var WRAmount = $("#FathHusBusinessThirdYearNum").val();

        $.ajax({
            type: "POST",
            url: "/Service/WomenReservation/convertToWords",
            dataType: "json",
            data: { n: WRAmount },
            success: function (data) {
                if (data != "") {
                    document.getElementById("FathHusBusinessThirdYearWords").value = data;
                }
            }
        });
    });
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