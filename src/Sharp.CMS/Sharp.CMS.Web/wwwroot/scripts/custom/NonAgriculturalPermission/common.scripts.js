
$(document).ready(function () {
    $("#assessedagri").hide();
    $("#assessedna").hide();
    $("#assessednaland").hide();


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

});

$(document).ready(function () {
    $('input[type=radio][class=RailwayStationValueYN]:checked').change(function () {
        if ($('input[type=radio][class=RailwayStationValueYN]').val() == 'हो' || $('input[type=radio][class=AirportValueYN]').val() == 'हो' || $('input[type=radio][class=JailValueYN]').val() == 'हो'
            || $('input[type=radio][class=PublicOfficeValueYN]').val() == 'हो' || $('input[type=radio][class=CemeteryValueYN]').val() == 'हो') {
            alert($('input[type=radio][class=RailwayStationValueYN]:checked').val()+"inside if");
            //$(input ['id = LandProposedValue']).show();
        }
        else if ($('input[type=radio][class=RailwayStationValueYN]').val() == 'नाही' && $('input[type=radio][class=AirportValueYN]').val() == 'नाही' && $('input[type=radio][class=JailValueYN]').val() == 'नाही'
            && $('input[type=radio][class=PublicOfficeValueYN]').val() == 'नाही' && $('input[type=radio][class=CemeteryValueYN]').val() == 'नाही') {
            //$('input[type=label][id=LandProposedValue]').hide();
            alert("Inside else if");
            //$(input ['id = LandProposedValue']).hide();
        }
        else {}
    });
    //$('input[type=radio][id=AirportValue]').change(function () {
    //    if ($('input[type=radio][id=RailwayStationValue]').val() == 'हो' || $('input[type=radio][id=AirportValue]').val() == 'हो' || $('input[type=radio][id=JailValue]').val() == 'हो'
    //        || $('input[type=radio][id=PublicOfficeValue]').val() == 'हो' || $('input[type=radio][id=CemeteryValue]').val() == 'हो') {
    //        $('input[type=label][id=LandProposedValue]').show();
    //        $('input [id = LandProposedValue]').show();
    //    }
    //    else if ($('input[type=radio][id=RailwayStationValue]').val() == 'नाही' && $('input[type=radio][id=AirportValue]').val() == 'नाही' && $('input[type=radio][id=JailValue]').val() == 'नाही'
    //        && $('input[type=radio][id=PublicOfficeValue]').val() == 'नाही' && $('input[type=radio][id=CemeteryValue]').val() == 'नाही') {
    //        $('input [id = LandProposedValue]').hide();
    //    }
    //    else {}
    //});
    //$('input[type=radio][id=JailValue]').change(function () {
    //    if ($('input[type=radio][id=RailwayStationValue]').val() == 'हो' || $('input[type=radio][id=AirportValue]').val() == 'हो' || $('input[type=radio][id=JailValue]').val() == 'हो'
    //        || $('input[type=radio][id=PublicOfficeValue]').val() == 'हो' || $('input[type=radio][id=CemeteryValue]').val() == 'हो') {
    //        $('input[type=label][id=LandProposedValue]').show();
    //        $("#LandProposedValue").show();
    //    }
    //    else {
    //        $("#LandProposedValue").hide();
    //    }
    //});
    //$('input[type=radio][id=PublicOfficeValue]').change(function () {
    //    if ($('input[type=radio][id=RailwayStationValue]').val() == 'हो' || $('input[type=radio][id=AirportValue]').val() == 'हो' || $('input[type=radio][id=JailValue]').val() == 'हो'
    //        || $('input[type=radio][id=PublicOfficeValue]').val() == 'हो' || $('input[type=radio][id=CemeteryValue]').val() == 'हो') {
    //        $('input[type=label][id=LandProposedValue]').show();
    //        $("#LandProposedValue").show();
    //    }
    //    else {
    //        $("#LandProposedValue").hide();
    //    }
    //});
    //$('input[type=radio][id=CemeteryValue]').change(function () {
    //    if ($('input[type=radio][id=RailwayStationValue]').val() == 'हो' || $('input[type=radio][id=AirportValue]').val() == 'हो' || $('input[type=radio][id=JailValue]').val() == 'हो'
    //        || $('input[type=radio][id=PublicOfficeValue]').val() == 'हो' || $('input[type=radio][id=CemeteryValue]').val() == 'हो') {
    //        $('input[type=label][id=LandProposedValue]').show();
    //        $("#LandProposedValue").show();
    //    }
    //    else {
    //        $("#LandProposedValue").hide();
    //    }
    //});
});

$(document).ready(function () {
    $("#ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2021", onSelect: function (dateText) {
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

function AssessedAgri() {
    if (document.getElementById("chkAssessedAgriType").checked) {
        $("#assessedagri").show();
    }
    else {
        $("#assessedagri").hide();
    }
}

function AssessedNA() {
    if (document.getElementById("chkAssessedNAType").checked) {
        $("#assessedna").show();
    }
    else {
        $("#assessedna").hide();
    }
}

function AssessedNALand() {
    if (document.getElementById("chkAssessedNALandType").checked) {
        $("#assessednaland").show();
    }
    else {
        $("#assessednaland").hide();
    }
}

function AddLandDetails() {
    var District = $('#LandDistrictSelected').val();
    var DistrictName = $("#LandDistrictSelected option:selected").text();
    var Taluka = $('#LandTalukaSelected').val();
    var TalukaName = $("#LandTalukaSelected option:selected").text();
    var Village = $('#LandVillageSelected').val();
    var VillageName = $("#LandVillageSelected option:selected").text();
    var DivisionNo = $('#DivisionNo').val();
    var Area = $('#Area').val();
    var AreaUnit = $('#AreaUnitSelected').val();
    var AreaUnitText = $("#AreaUnitSelected option:selected").text();
    var Rent = $('#Rent').val();

    if (District == null || District == "") {
        alert("Choose District!");
    }
    else if (Taluka == null || Taluka == "") {
        alert("Choose Taluka !");
    }
    else if (Village == null || Village == "") {
        alert("Choose Village !");
    }
    else if (DivisionNo == null || DivisionNo == "") {
        alert("Enter Division No !");
    }
    else if (Area == null || Area == "") {
        alert("Enter Area !");
    }
    else if (AreaUnit == null || AreaUnit == "") {
        alert("Choose Unit of area !");
    }
    else if (Rent == null || Rent == "") {
        alert("Enter Rent !");
    }
    else {

        var postdata = {
            District: District,
            DistrictName: DistrictName,
            Taluka: Taluka,
            TalukaName: TalukaName,
            Village: Village,
            VillageName: VillageName,
            DivisionNo: DivisionNo,
            Area: Area,
            AreaUnit: AreaUnit,
            AreaUnitText: AreaUnitText,
            Rent: Rent
        };

        $.ajax({
            type: 'POST',
            url: '/Service/NonAgriculturalPermission/Insert_LandDetailsData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                if (data.length == 0) {
                    $('#LandDetailsTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#LandDetailsTable').empty();
                    }
                    else {
                        $('#LandDetailsTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>जिल्हा</th><th>तालुका</th><th>गाव</th><th>गट क्र.</th><th>क्षेत्र</th><th>भाडे</th><th>वगळा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.DistrictName +
                                '</td>' +
                                '<td>' +
                                val.TalukaName +
                                '</td>' +
                                '<td>' +
                                val.VillageName +
                                '</td>' +
                                '<td>' +
                                val.DivisionNo +
                                '</td>' +
                                '<td>' +
                                val.Area + val.AreaUnitText +
                                '</td>' +
                                '<td>' +
                                val.Rent +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteLandDetails('" + val.SrNo + "');> Delete Entery</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#LandDetailsTable').append(temptable);
                        document.getElementById("LandDistrictSelected").value = "";
                        document.getElementById("LandTalukaSelected").value = "";
                        document.getElementById("LandVillageSelected").value = "";
                        document.getElementById("DivisionNo").value = "";
                        document.getElementById("Area").value = "";
                        document.getElementById("AreaUnitSelected").value = "";
                        document.getElementById("Rent").value = "";
                    }
                }


            }
        });
    }
}

function deleteLandDetails(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NonAgriculturalPermission/Delete_LandDetailsData",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#LandDetailsTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#LandDetailsTable').empty();
                }
                else {
                    $('#LandDetailsTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>जिल्हा</th><th>तालुका</th><th>गाव</th><th>गट क्र.</th><th>क्षेत्र</th><th>भाडे</th><th>वगळा</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.DistrictName +
                            '</td>' +
                            '<td>' +
                            val.TalukaName +
                            '</td>' +
                            '<td>' +
                            val.VillageName +
                            '</td>' +
                            '<td>' +
                            val.DivisionNo +
                            '</td>' +
                            '<td>' +
                            val.Area + val.AreaUnitText +
                            '</td>' +
                            '<td>' +
                            val.Rent +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteLandDetails('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#LandDetailsTable').append(temptable);
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