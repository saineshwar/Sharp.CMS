$(document).ready(function () {


    $("#CulturalProgramDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#CulturalProgramDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#CulturalProgramTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#CulturalProgramTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#CulturalProgramTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#CulturalProgramTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#CulturalProgramVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#CulturalProgramVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#DistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#DistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#TalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#TalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#TalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#TalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#VillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#VillageSelected").append(optionhtml);
                });
            }
        });

    });


    var currentYear = new Date().getFullYear();
    $("#Dateofbirth").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:currentYear", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#ProgramEndDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:currentYear", onSelect: function (dateText) {
            CalculateAge();
        }
    });
    $("#ProgramStartDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:currentYear", onSelect: function (dateText) {

        }
    });
    $("#ProgramDate").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:currentYear", onSelect: function (dateText) {

        }
    });
  
});

function DetailsOfTicketSales() {
    debugger;

    var TicketClass = $("#TicketClass").val();
    var TicketAvailability = $("#TicketAvailability").val();
    var TicketRupees = $("#TicketRupees").val();
  

    if (TicketClass == null || TicketClass == "") {
        alert("Enter TicketClass!");
    }
    else if (TicketAvailability == null || TicketAvailability == "") {
        alert("Enter TicketAvailability !");
    }
    else if (TicketRupees == null || TicketRupees == "") {
        alert("Enter TicketRupees  !");
    }
  

    else {

        var postdata = {
            TicketClass: TicketClass,
            TicketAvailability: TicketAvailability,
            TicketRupees :TicketRupees

        };

        $.ajax({
            type: 'POST',
            url: '/Service/SocialProgrammingCertificate/Insert_TicketSaleDetails',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#DetailsOfTicketTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#DetailsOfTicketTable').empty();
                    }
                    else {
                        $('#DetailsOfTicketTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>वर्गाचा प्रकार</th><th>आसनांची संख्या</th><th>दर/आसन</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.TicketClass +
                                '</td>' +
                                '<td>' +
                                val.TicketAvailability +
                                '</td>' +
                                '<td>' +
                                val.TicketRupees +
                                '</td>' +
                              
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteDetailsOfTicketSales('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#DetailsOfTicketTable').append(temptable);
                        document.getElementById("TicketClass").value = "";
                        document.getElementById("TicketAvailability").value = "";
                        document.getElementById("TicketRupees").value = "";
                    }
                }


            }
        });
    }
}

function deleteDetailsOfTicketSales(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/SocialProgrammingCertificate/Delete_TicketSaleDetails",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#DetailsOfTicketTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#DetailsOfTicketTable').empty();
                }
                else {
                    $('#DetailsOfTicketTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>वर्गाचा प्रकार</th><th>आसनांची संख्या</th><th>दर/आसन</th><th>हटवा</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.TicketClass +
                            '</td>' +
                            '<td>' +
                            val.TicketAvailability +
                            '</td>' +
                            '<td>' +
                            val.TicketRupees +
                            '</td>' +

                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteDetailsOfTicketSales('" + val.SrNo + "');> नोंद हटवा</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });




                       

                    temptable += "</table>";
                    $('#DetailsOfTicketTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

}

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#Dateofbirth").val();
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

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
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








