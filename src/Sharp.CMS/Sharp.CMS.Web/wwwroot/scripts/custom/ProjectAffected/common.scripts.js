$(document).ready(function () {

    $("#affectedland").hide();
    $("#affectedhome").hide();
    $("#areadetail").hide();



    $("#LandDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#LandDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#LandTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#LandTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#LandTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#LandTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#LandVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#LandVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#HomeDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#HomeDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#HomeTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#HomeTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#HomeTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#HomeTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#HomeVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#HomeVillageSelected").append(optionhtml);
                });
            }
        });

    });
});

$("#AffectedRegion").change(function () {
    if ($(this).val() == "land") {
        $("#affectedland").show();
        $("#affectedhome").hide();
    }
    else if ($(this).val() == "home") {
        $("#affectedhome").show();
        $("#affectedland").hide();
    }
    else if ($(this).val() == "homeland") {
        $("#affectedhome").show();
        $("#affectedland").show();
    }
    else {
        $("#affectedhome").hide();
        $("#affectedland").hide();
    }
    document.getElementById("AffectedRegionText").value = $("#AffectedRegion option:selected").text();

});

$("#BeneficiaryRelation").change(function () {
    if ($(this).val() == "1280" || $(this).val() == "1263") {
        $('#BeneficiarySalutationSelected').attr('readonly', true);
        $('#BeneficiaryName').prop('readonly', true);
        document.getElementById("BeneficiarySalutationSelected").value = document.getElementById("SalutationSelected").value;
        document.getElementById("BeneficiaryName").value = document.getElementById("FullName_LL").value;
    }
    else {
        $('#BeneficiarySalutationSelected').attr('readonly', false);
        $('#BeneficiaryName').prop('readonly', false);
        document.getElementById("BeneficiarySalutationSelected").value = "";
        document.getElementById("BeneficiaryName").value = "";
    }
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

function AreaSelected(add) {

    var value = add.split('__')[1]
    if (value == "IsCity") {
        $("#areadetail").show();
        if (document.getElementById("AreaNo").value == "" || document.getElementById("AreaNo").value == null) {
            alert("कृपया योग्य प्रभाग क्रमांकाची नोंद करा.");
        }
    }
    else {
        $("#areadetail").hide();
    }

}

$("#LandAreaUnit").change(function () {
    document.getElementById("LandAreaUnitText").value = $("#LandAreaUnit option:selected").text();
});

$("#HomeAreaUnit").change(function () {
    document.getElementById("HomeAreaUnitText").value = $("#HomeAreaUnit option:selected").text();
});

$("#OccupationSelected").change(function () {
    document.getElementById("OccupationText").value = $("#OccupationSelected option:selected").text();
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