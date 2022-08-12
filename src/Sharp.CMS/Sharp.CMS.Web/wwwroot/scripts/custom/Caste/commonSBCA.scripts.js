
$(document).ready(function () {
    $("#BenfiAddress").hide(); $("#benefit").hide(); $("#Detailsapplication").hide();
    $("#BenefDetails").hide();
    $('#txtcategory').prop('readonly', true);


    $("#ddlbenef2disSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddlbenef2disSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddlbenefsubdisSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddlbenefsubdisSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#ddlbenefsubdisSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddlbenefsubdisSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddlbenef2vilSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddlbenef2vilSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddl_birthdistSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddl_birthdistSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddl_birthtalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddl_birthtalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#ddl_birthtalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddl_birthtalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddl_birthvillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddl_birthvillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddlfatherdistSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddlfatherdistSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddlfathertalSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddlfathertalSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#ddlfathertalSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddlfathertalSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddlfathervillSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddlfathervillSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddlrelationSelected").change(function () {
        var requestBefrelation = $("#ddlrelationSelected").val();
        if (requestBefrelation == "1263") {
            document.getElementById("ddlBenefSalSelected").value = document.getElementById("SalutationSelected").value;
            document.getElementById("txtbenef2fullname").value = document.getElementById("FullName").value;
            document.getElementById("txtbenef2fullnamell").value = document.getElementById("FullName_LL").value;
            document.getElementById("ddlbenefgenderSelected").value = document.getElementById("GenderSelected").value;
            document.getElementById("txtbenef2mobile").value = document.getElementById("Mobile").value;
            document.getElementById("txtbenef2email").value = document.getElementById("Email").value;
            //document.getElementById("txtBenifUID").value = document.getElementById("ApplicantUID").value;
            document.getElementById("txtbenef2addcareof").value = document.getElementById("AddrCare").value;
            document.getElementById("txtbenef2build").value = document.getElementById("Building").value;
            document.getElementById("txtbenef2street").value = document.getElementById("Street").value;
            document.getElementById("txtbenef2local").value = document.getElementById("Locality").value;
            document.getElementById("txtbenef2land").value = document.getElementById("Landmark").value;
            document.getElementById("ddlbenef2disSelected").value = document.getElementById("DistrictSelected").value;
            var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetTaluka",
                dataType: "json",
                data: requestTalukaModel,

                success: function (data) {
                    $("#ddlbenefsubdisSelected").empty();
                    $.each(data,
                        function (i) {
                            var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                            $("#ddlbenefsubdisSelected").append(optionhtml);
                            $("#ddlbenefsubdisSelected").val(document.getElementById("TalukaSelected").value);
                        });
                }
            });
            var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
            $.ajax({
                type: "POST",
                url: "/Service/CommonDropdown/GetVillage",
                data: requestVillageModel,

                success: function (data) {
                    $("#ddlbenef2vilSelected").empty();
                    $.each(data, function (i) {

                        var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                        $("#ddlbenef2vilSelected").append(optionhtml);
                        $("#ddlbenef2vilSelected").val(document.getElementById("VillageSelected").value);
                    });
                }
            });
            document.getElementById("txtbenef2pincode").value = document.getElementById("Pincode").value;
            document.getElementById("ddlBenefFHSalSelected").value = document.getElementById("FatherSalutationSelected").value;
            document.getElementById("txtbeneffhfullname").value = document.getElementById("Father_Name").value;
            document.getElementById("txtbeneffhfullnamell").value = document.getElementById("Father_Name_LL").value;
            $("#BenefDetails").hide();
        }
        else {
            document.getElementById("ddlBenefSalSelected").value = "";
            document.getElementById("txtbenef2fullname").value = "";
            document.getElementById("txtbenef2fullnamell").value = "";
            document.getElementById("txtbenefdob").value = "";
            document.getElementById("ddlbenefgenderSelected").value = "";
            document.getElementById("txtbenef2mobile").value = "";
            document.getElementById("txtbenef2email").value = "";
            //document.getElementById("txtBenifUID").value = "";
            document.getElementById("txtbenef2addcareof").value = "";
            document.getElementById("txtbenef2build").value = "";
            document.getElementById("txtbenef2street").value = "";
            document.getElementById("txtbenef2local").value = "";
            document.getElementById("txtbenef2land").value = "";
            document.getElementById("ddlbenef2disSelected").value = "";
            $("#ddlbenefsubdisSelected").empty();
            $("#ddlbenef2vilSelected").empty();
            document.getElementById("txtbenef2pincode").value = "";
            document.getElementById("ddlBenefFHSalSelected").value = "";
            document.getElementById("txtbeneffhfullname").value = "";
            document.getElementById("txtbeneffhfullnamell").value = "";
            $("#BenefDetails").show();
        }

    });

});

$(document).ready(function () {
    var current_year = new Date().getFullYear();

    $("#DateofbirthCaste").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
            CalculateAgeCaste();
        }
    });
    $('#Age').prop('readonly', true);

    $("#txtbenefdob").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
        }
    });
    $("#txt_appdate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
        }
    });
    $("#txtbeneffhdob").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
        }
    });
    $("#txtcastedate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:current_year", onSelect: function (dateText) {
        }
    });


});

function ToggleTextBoxPerAdd(add) {
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("txtbenef2addcareof").value = document.getElementById("AddrCare").value;
        document.getElementById("txtbenef2build").value = document.getElementById("Building").value;
        document.getElementById("txtbenef2street").value = document.getElementById("Street").value;
        document.getElementById("txtbenef2local").value = document.getElementById("Locality").value;
        document.getElementById("txtbenef2land").value = document.getElementById("Landmark").value;
        document.getElementById("ddlbenef2disSelected").value = document.getElementById("DistrictSelected").value;
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddlbenefsubdisSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddlbenefsubdisSelected").append(optionhtml);
                        $("#ddlbenefsubdisSelected").val(document.getElementById("TalukaSelected").value);
                    });
            }
        });
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddlbenef2vilSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddlbenef2vilSelected").append(optionhtml);
                    $("#ddlbenef2vilSelected").val(document.getElementById("VillageSelected").value);
                });
            }
        });
        document.getElementById("txtbenef2pincode").value = document.getElementById("Pincode").value;
        $("#BenfiAddress").hide();
    }
    else {
        document.getElementById("txtbenef2addcareof").value = "";
        document.getElementById("txtbenef2build").value = "";
        document.getElementById("txtbenef2street").value = "";
        document.getElementById("txtbenef2local").value = "";
        document.getElementById("txtbenef2land").value = "";
        document.getElementById("ddlbenef2disSelected").value = "";
        $("#ddlbenefsubdisSelected").empty();
        $("#ddlbenef2vilSelected").empty();
        document.getElementById("txtbenef2pincode").value = "";
        $("#BenfiAddress").show();
    }
}

function AddEducation() {

    var txt_qualification = $('#txt_qualification').val();
    var txt_board = $('#txt_board').val();
    var txt_startyr = $('#txt_startyr').val();
    var txt_endyr = $('#txt_endyr').val();
    var txt_insti = $("#txt_insti").val();

    if (txt_qualification == null || txt_qualification == "") {
        alert("Enter Qualification!");
    }
    else if (txt_board == null || txt_board == "") {
        alert("Enter Board/university !");
    }
    else if (txt_startyr == null || txt_startyr == "") {
        alert("Enter Start Year !");
    }
    else if (txt_endyr == null || txt_endyr == "") {
        alert("Enter End Year !");
    }
    else if (txt_insti == null || txt_insti == "") {
        alert("Enter Name & Address of Institute !");
    }
    else if (txt_startyr > txt_endyr) {
        alert("Start Year Must Be Less than or Equal to End Year !");
    }
    else {

        var postdata = {
            txt_qualification: txt_qualification,
            txt_board: txt_board,
            txt_startyr: txt_startyr,
            txt_endyr: txt_endyr,
            txt_insti: txt_insti
        };

        $.ajax({
            type: 'POST',
            url: '/Service/CasteCertificate/Insert_DataSBCA',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                if (data.length == 0) {
                    $('#EducationTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#EducationTable').empty();
                        document.getElementById("txt_qualification").value = "";
                        document.getElementById("txt_board").value = "";
                        document.getElementById("txt_startyr").value = "";
                        document.getElementById("txt_endyr").value = "";
                        document.getElementById("txt_insti").value = "";
                    }
                    else {
                        $('#EducationTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Qualification</th><th>Board/university</th><th>Start Year</th><th>End Year</th><th>Name & Address of Institute</th><th>Remove</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.txt_qualification +
                                '</td>' +
                                '<td>' +
                                val.txt_board +
                                '</td>' +
                                '<td>' +
                                val.txt_startyr +
                                '</td>' +
                                '<td>' +
                                val.txt_endyr +
                                '</td>' +
                                '<td>' +
                                val.txt_insti +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteEducation('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#EducationTable').append(temptable);
                        document.getElementById("txt_qualification").value = "";
                        document.getElementById("txt_board").value = "";
                        document.getElementById("txt_startyr").value = "";
                        document.getElementById("txt_endyr").value = "";
                        document.getElementById("txt_insti").value = "";
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
        url: "/Service/CasteCertificate/Delete_DataSBCA",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            if (data.length == 0) {
                $('#EducationTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#EducationTable').empty();
                    document.getElementById("txt_qualification").value = "";
                    document.getElementById("txt_board").value = "";
                    document.getElementById("txt_startyr").value = "";
                    document.getElementById("txt_endyr").value = "";
                    document.getElementById("txt_insti").value = "";
                }
                else {
                    $('#EducationTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Qualification</th><th>Board/university</th><th>Start Year</th><th>End Year</th><th>Name & Address of Institute</th><th>Remove</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.txt_qualification +
                            '</td>' +
                            '<td>' +
                            val.txt_board +
                            '</td>' +
                            '<td>' +
                            val.txt_startyr +
                            '</td>' +
                            '<td>' +
                            val.txt_endyr +
                            '</td>' +
                            '<td>' +
                            val.txt_insti +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteEducation('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#EducationTable').append(temptable);
                    document.getElementById("txt_qualification").value = "";
                    document.getElementById("txt_board").value = "";
                    document.getElementById("txt_startyr").value = "";
                    document.getElementById("txt_endyr").value = "";
                    document.getElementById("txt_insti").value = "";
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function ToggleTextBoxbenefits(add) {
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("txt_benefit").value = "";
        $("#benefit").show();
    }
    else {
        document.getElementById("txt_benefit").value = "";
        $("#benefit").hide();
    }
}

function ToggleTextBoxappliedbefore(add) {
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("txt_applicationplace").value = "";
        document.getElementById("txt_appdate").value = "";
        $("#Detailsapplication").show();
    }
    else {
        document.getElementById("txt_applicationplace").value = "";
        document.getElementById("txt_appdate").value = "";
        $("#Detailsapplication").hide();
    }
}

function ToggleTextBoxcertificategiven(add) {
    var value = add.split('__')[1]
    if (value == "Istrue") {
        document.getElementById("txt_applicationplace").value = "";
        document.getElementById("txt_appdate").value = "";
        $("#Detailscertificate").show();
        $("#Detailscertificate1").show();
    }
    else {
        document.getElementById("txt_applicationplace").value = "";
        document.getElementById("txt_appdate").value = "";
        $("#Detailscertificate").hide();
        $("#Detailscertificate1").hide();
    }
}

function CalculateAgeCaste() {

    var date1 = new Date();
    var dob = $("#DateofbirthCaste").val();
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
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#Dateofbirth").val('');
            $("#Dateofbirth").focus();

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
            $("#Dateofbirth").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Age').prop('readonly', false);
            $("#Dateofbirth").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

// Education Year
$(document).ready(function () {
    $("#txt_startyr").change(function () {
        var year = $("#txt_startyr").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("txt_startyr").value = "";
                $("#txt_startyr").focus();
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("txt_startyr").value = "";
                $("#txt_startyr").focus();
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("txt_startyr").value = "";
                $("#txt_startyr").focus();
                return false;
            }
            return true;
        }
    });
});

$(document).ready(function () {
    $("#txt_endyr").change(function () {
        var year = $("#txt_endyr").val();
        var text = /^[0-9]+$/;
        if (year != 0) {
            if ((year != "") && (!text.test(year))) {

                alert("Please Enter Numeric Values Only");
                document.getElementById("txt_endyr").value = "";
                $("#txt_endyr").focus();
                return false;
            }

            if (year.length != 4) {
                alert("Year is not proper. Please check");
                document.getElementById("txt_endyr").value = "";
                $("#txt_endyr").focus();
                return false;
            }
            var current_year = new Date().getFullYear();
            if ((year < 1920) || (year > current_year)) {
                alert("Year should be in range 1920 to current year");
                document.getElementById("txt_endyr").value = "";
                $("#txt_endyr").focus();
                return false;
            }
            if (year < $("#txt_startyr").val()) {
                alert("Year should be greater than Start Year");
                document.getElementById("txt_endyr").value = "";
                $("#txt_endyr").focus();
                return false;
            }
            return true;
        }
    });
});

$("#SalutationSelected").change(function () {
    var SalutationId = $("#SalutationSelected").find("option:selected").val();
    if (SalutationId == "1333" || SalutationId == "1334" || SalutationId == "1343" || SalutationId == "1345") {
        $("#GenderSelected").val('1162');
        $("#GenderSelected option[value='1160']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    } else if (SalutationId == "1328" || SalutationId == "1332" || SalutationId == "1340") {
        $("#GenderSelected").val('1160');
        $("#GenderSelected option[value='1162']").attr("disabled", "disabled");
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
    } else {
        $("#GenderSelected").val('');
        $("#GenderSelected option[value='1160']").removeAttr("disabled");
        $("#GenderSelected option[value='1162']").removeAttr("disabled");
    }

});