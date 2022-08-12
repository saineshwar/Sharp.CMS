$(document).ready(function () {
    $("#OneYear").hide(); $("#ThreeYear").hide();

    $("#FarmDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#FarmDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#FarmTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#FarmTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#FarmTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#FarmTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#Village").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#Village").append(optionhtml);
                });
            }
        });

    });

    $("#DateofbirthI").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2010", onSelect: function (dateText) {
            CalculateAge();
        }
    });


});

function AddFamilyMember() {
    debugger;

    var FamilyMemberRelation = $("#FamilyMemberRelation option:selected").text();
    var FamilyMemberName = $('#FamilyMemberName').val();
    var FamilyMemberAge = $('#FamilyMemberAge').val();
    var FamilyMemberOccupation = $("#FamilyMemberOccupation option:selected").text();
    var FamilyIncome = $('#FamilyIncome').val();


    if (FamilyMemberName == null || FamilyMemberName == "") {
        alert("Enter FamilyMemberName!");
    }
    else if (FamilyMemberAge == null || FamilyMemberAge == "") {
        alert("Enter FamilyMemberAge  !");
    }


    else {

        var postdata = {
            FamilyMemberRelation: FamilyMemberRelation,
            FamilyMemberName: FamilyMemberName,
            FamilyMemberAge: FamilyMemberAge,
            FamilyMemberOccupation: FamilyMemberOccupation,
            FamilyIncome: FamilyIncome

        };

        $.ajax({
            type: 'POST',
            url: '/Service/NCLIncome/Insert_Data',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FamilyTable').empty();
                    }
                    else {
                        $('#FamilyTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>कुटुंबातील सदस्याचे नाते</th><th>कुटुंबातील सदस्याचे नाव</th><th>कुटुंबातील सदस्याचे वय</th><th>कुटुंबातील सदस्याचा व्यवसाय</th><th>कुटुंबातील सदस्याचे उत्पन्न</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberRelation +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberName +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberAge +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberOccupation +
                                '</td>' +
                                '<td>' +
                                val.FamilyIncome +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FamilyTable').append(temptable);
                        document.getElementById("FamilyMemberRelation").value = "";
                        document.getElementById("FamilyMemberName").value = "";
                        document.getElementById("FamilyMemberAge").value = "";
                        document.getElementById("FamilyMemberOccupation").value = "";
                        document.getElementById("FamilyIncome").value = "";

                    }
                }


            }
        });
    }
}

function deleteFamilyMember(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NCLIncome/Delete_Data",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FamilyTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                else {
                    $('#FamilyTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>FamilyMemberRelation</th><th>FamilyMemberName</th><th>FamilyMemberAge</th><th>FamilyMemberOccupation</th><th>FamilyIncome</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberRelation +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberName +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberAge +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberOccupation +
                            '</td>' +
                            '<td>' +
                            val.FamilyIncome +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FamilyTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

}

function AddFarmDetails() {

    debugger;
    var Appaccount_name = $('#Appaccount_name').val();
    var AppFarmingAcre = $('#AppFarmingAcre').val();
    var Appfarmingarea = $('#Appfarmingarea option:selected').text();
    var Appfarmingdetails = $('#Appfarmingdetails').val();
    var Village = $("#Village option:selected").text();
    var VillageCode = $("#Village option:selected").val();


    if (Appaccount_name == null || Appaccount_name == "") {
        alert("Enter Appaccount_name!");
    }
    else if (AppFarmingAcre == null || AppFarmingAcre == "") {
        alert("Enter AppFarmingAcre  !");
    }
    else if (Appfarmingarea == null || Appfarmingarea == "") {
        alert("Enter Appfarmingarea !");
    }
    else if (Appfarmingdetails == null || Appfarmingdetails == "") {
        alert("Enter Appfarmingdetails  !");
    }
    else if (Village == null || Village == "") {
        alert("Enter Village !");
    }

    else {

        var postdata = {
            Appaccount_name: Appaccount_name,
            AppFarmingAcre: AppFarmingAcre,
            Appfarmingarea: Appfarmingarea,
            Appfarmingdetails: Appfarmingdetails,
            Village: Village,
            VillageCode: VillageCode
        };

        $.ajax({
            type: 'POST',
            url: '/Service/NCLIncome/Insert_FarmData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FarmTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FarmTable').empty();
                    }
                    else {
                        $('#FarmTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>खातेधारकाचे नाव</th><th>शेतीचे एकूण क्षेत्र</th><th>क्षेत्र</th><th>शेतीचे विवरण</th><th>गाव</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.Appaccount_name +
                                '</td>' +
                                '<td>' +
                                val.AppFarmingAcre +
                                '</td>' +
                                '<td>' +
                                val.Appfarmingarea +
                                '</td>' +
                                '<td>' +
                                val.Appfarmingdetails +
                                '</td>' +
                                '<td>' +
                                val.Village +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFarm('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FarmTable').append(temptable);
                        document.getElementById("Appaccount_name").value = "";
                        document.getElementById("AppFarmingAcre").value = "";
                        document.getElementById("Appfarmingarea").value = "";
                        document.getElementById("Appfarmingdetails").value = "";
                        document.getElementById("Village").value = "";

                    }
                }


            }
        });
    }

}

function deleteFarm(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NCLIncome/Delete_DataFarm",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FarmTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FarmTable').empty();
                }
                else {
                    $('#FarmTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Appaccount_name</th><th>AppFarmingAcre</th><th>Appfarmingarea</th><th>Appfarmingdetails</th><th>Village</th><th>Delete</th></tr></thead>'; var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.Appaccount_name +
                            '</td>' +
                            '<td>' +
                            val.AppFarmingAcre +
                            '</td>' +
                            '<td>' +
                            val.Appfarmingarea +
                            '</td>' +
                            '<td>' +
                            val.Appfarmingdetails +
                            '</td>' +
                            '<td>' +
                            val.Village +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFarm('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FarmTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}



function CalculateIncomeForOneYear() {
    debugger;
    var Income1 = parseInt(document.getElementById("DataInfo1").value);
    if (isNaN(Income1)) {

        Income1 = 0;
    }

    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income2 = parseInt(document.getElementById("DataInfo2").value);
    if (isNaN(Income2)) {
        Income2 = 0;
    }
    if (Income2 < 0) {
        Income2 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3 = parseInt(document.getElementById("DataInfo3").value);
    if (isNaN(Income3)) {
        Income3 = 0;
    }
    if (Income3 < 0) {
        Income3 = 0;
        alert("Income should be greater  than 0")

    }

    var Income4 = parseInt(document.getElementById("DataInfo4").value);
    if (isNaN(Income4)) {
        Income4 = 0;
    }
    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income5 = parseInt(document.getElementById("DataInfo5").value);
    if (isNaN(Income5)) {
        Income5 = 0;
    }
    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income6 = parseInt(document.getElementById("DataInfo6").value);
    if (isNaN(Income6)) {
        Income6 = 0;
    }
    if (Income6 < 0) {
        Income6 = 0;
        alert("Income should be greater  than 0")

    }

    var Income7 = parseInt(document.getElementById("DataInfo7").value);
    if (isNaN(Income7)) {
        Income7 = 0;
    }
    if (Income7 < 0) {
        Income7 = 0;
        alert("Income should be greater  than 0")

    }


    var Income8 = parseInt(document.getElementById("DataInfo8").value);
    if (isNaN(Income8)) {
        Income8 = 0;
    }
    if (Income8 < 0) {
        Income8 = 0;
        alert("Income should be greater  than 0")

    }

    var Income9 = parseInt(document.getElementById("DataInfo9").value);
    if (isNaN(Income9)) {
        Income9 = 0;
    }
    if (Income9 < 0) {
        Income9 = 0;
        alert("Income should be greater  than 0")

    }

    var Income10 = parseInt(document.getElementById("DataInfo10").value);
    if (isNaN(Income10)) {
        Income10 = 0;
    }
    if (Income10 < 0) {
        Income10 = 0;
        alert("Income should be greater  than 0")

    }
    var Total;
    Total = Income1 + Income2 + Income3 + Income4 + Income5 + Income6 + Income7 + Income8 + Income9 + Income10;
    $("#Total").val(Total);
    if (Total != null || Total != "" || isNaN(Total) == false) {
        var TotalInWords = convertNumberToWords(Total);
        $("#TotalInWords").val(TotalInWords);
    }

}

function CalculateIncomeForThreeYearFirstRow() {
    debugger;
    var Income311 = parseInt(document.getElementById("DataInfo311").value);
    if (isNaN(Income311)) {
        Income311 = 0;
    }
    if (Income311 < 0) {
        Income311 = 0;
        alert("Income should be greater  than 0")

    }
    var Income312 = parseInt(document.getElementById("DataInfo312").value);
    if (isNaN(Income312)) {
        Income312 = 0;
    }
    if (Income312 < 0) {
        Income312 = 0;
        alert("Income should be greater  than 0")

    }

    var Income313 = parseInt(document.getElementById("DataInfo313").value);
    if (isNaN(Income313)) {
        Income313 = 0;
    }
    if (Income313 < 0) {
        Income313 = 0;
        alert("Income should be greater  than 0")

    }

    var Income314 = parseInt(document.getElementById("DataInfo314").value);
    if (isNaN(Income314)) {
        Income314 = 0;
    }
    if (Income314 < 0) {
        Income314 = 0;
        alert("Income should be greater  than 0")

    }

    var Income315 = parseInt(document.getElementById("DataInfo315").value);
    if (isNaN(Income315)) {
        Income315 = 0;
    }
    if (Income315 < 0) {
        Income315 = 0;
        alert("Income should be greater  than 0")

    }


    var Income316 = parseInt(document.getElementById("DataInfo316").value);
    if (isNaN(Income316)) {
        Income316 = 0;
    }
    if (Income316 < 0) {
        Income316 = 0;
        alert("Income should be greater  than 0")

    }

    var Income317 = parseInt(document.getElementById("DataInfo317").value);
    if (isNaN(Income317)) {
        Income317 = 0;
    }
    if (Income317 < 0) {
        Income317 = 0;
        alert("Income should be greater  than 0")

    }


    var Income318 = parseInt(document.getElementById("DataInfo318").value);
    if (isNaN(Income318)) {
        Income318 = 0;
    }
    if (Income318 < 0) {
        Income318 = 0;
        alert("Income should be greater  than 0")

    }

    var Income319 = parseInt(document.getElementById("DataInfo319").value);
    if (isNaN(Income319)) {
        Income319 = 0;
    }
    if (Income319 < 0) {
        Income319 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3110 = parseInt(document.getElementById("DataInfo3110").value);
    if (isNaN(Income3110)) {
        Income3110 = 0;
    }
    if (Income3110 < 0) {
        Income3110 = 0;
        alert("Income should be greater  than 0")

    }

    var Total;
    Total = Income311 + Income312 + Income313 + Income314 + Income315 + Income316 + Income317 + Income318 + Income319 + Income3110;
    $("#Total31").val(Total);
    if (Total != null && Total != "" && isNaN(Total) == false) {
        var TotalInWords = convertNumberToWords(Total);
        $("#TotalInWords31").val(TotalInWords);
    }


}

function CalculateIncomeForThreeYearSecondRow() {
    debugger;
    var Income321 = parseInt(document.getElementById("DataInfo321").value);
    if (isNaN(Income321)) {
        Income321 = 0;
    }
    if (Income321 < 0) {
        Income321 = 0;
        alert("Income should be greater  than 0")

    }

    var Income322 = parseInt(document.getElementById("DataInfo322").value);
    if (isNaN(Income322)) {
        Income322 = 0;
    }
    if (Income322 < 0) {
        Income322 = 0;
        alert("Income should be greater  than 0")

    }

    var Income323 = parseInt(document.getElementById("DataInfo323").value);
    if (isNaN(Income323)) {
        Income323 = 0;
    }
    if (Income323 < 0) {
        Income323 = 0;
        alert("Income should be greater  than 0")

    }

    var Income324 = parseInt(document.getElementById("DataInfo324").value);
    if (isNaN(Income324)) {
        Income324 = 0;
    }
    if (Income324 < 0) {
        Income324 = 0;
        alert("Income should be greater  than 0")

    }

    var Income325 = parseInt(document.getElementById("DataInfo325").value);
    if (isNaN(Income325)) {
        Income325 = 0;
    }
    if (Income325 < 0) {
        Income325 = 0;
        alert("Income should be greater  than 0")

    }

    var Income326 = parseInt(document.getElementById("DataInfo326").value);
    if (isNaN(Income326)) {
        Income326 = 0;
    }
    if (Income326 < 0) {
        Income326 = 0;
        alert("Income should be greater  than 0")

    }

    var Income327 = parseInt(document.getElementById("DataInfo327").value);
    if (isNaN(Income327)) {
        Income327 = 0;
    }
    if (Income327 < 0) {
        Income327 = 0;
        alert("Income should be greater  than 0")

    }


    var Income328 = parseInt(document.getElementById("DataInfo328").value);
    if (isNaN(Income328)) {
        Income328 = 0;
    }
    if (Income328 < 0) {
        Income328 = 0;
        alert("Income should be greater  than 0")

    }

    var Income329 = parseInt(document.getElementById("DataInfo329").value);
    if (isNaN(Income329)) {
        Income329 = 0;
    }
    if (Income329 < 0) {
        Income329 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3210 = parseInt(document.getElementById("DataInfo3210").value);
    if (isNaN(Income3210)) {
        Income3210 = 0;
    }
    if (Income3210 < 0) {
        Income3210 = 0;
        alert("Income should be greater  than 0")

    }

    var Total32;
    Total32 = Income321 + Income322 + Income323 + Income324 + Income325 + Income326 + Income327 + Income328 + Income329 + Income3210;
    $("#Total32").val(Total32);
    if (Total32 != null && Total32 != "" && isNaN(Total32) == false) {
        var TotalInWords = convertNumberToWords(Total32);
        $("#TotalInWords32").val(TotalInWords);
    }

}

function CalculateIncomeForThreeYearThirdRow() {
    debugger;
    var Income331 = parseInt(document.getElementById("DataInfo331").value);
    if (isNaN(Income331)) {
        Income331 = 0;
    }
    if (Income331 < 0) {
        Income331 = 0;
        alert("Income should be greater  than 0")

    }
    var Income332 = parseInt(document.getElementById("DataInfo332").value);
    if (isNaN(Income332)) {
        Income332 = 0;
    }
    if (Income332 < 0) {
        Income332 = 0;
        alert("Income should be greater  than 0")

    }

    var Income333 = parseInt(document.getElementById("DataInfo333").value);
    if (isNaN(Income333)) {
        Income333 = 0;
    }
    if (Income333 < 0) {
        Income333 = 0;
        alert("Income should be greater  than 0")

    }

    var Income334 = parseInt(document.getElementById("DataInfo334").value);
    if (isNaN(Income334)) {
        Income334 = 0;
    }
    if (Income334 < 0) {
        Income334 = 0;
        alert("Income should be greater  than 0")

    }

    var Income335 = parseInt(document.getElementById("DataInfo335").value);
    if (isNaN(Income335)) {
        Income335 = 0;
    }
    if (Income335 < 0) {
        Income335 = 0;
        alert("Income should be greater  than 0")

    }

    var Income336 = parseInt(document.getElementById("DataInfo336").value);
    if (isNaN(Income336)) {
        Income336 = 0;
    }
    if (Income336 < 0) {
        Income336 = 0;
        alert("Income should be greater  than 0")

    }


    var Income337 = parseInt(document.getElementById("DataInfo337").value);
    if (isNaN(Income337)) {
        Income337 = 0;
    }
    if (Income337 < 0) {
        Income337 = 0;
        alert("Income should be greater  than 0")

    }


    var Income338 = parseInt(document.getElementById("DataInfo338").value);
    if (isNaN(Income338)) {
        Income338 = 0;
    }
    if (Income338 < 0) {
        Income338 = 0;
        alert("Income should be greater  than 0")

    }

    var Income339 = parseInt(document.getElementById("DataInfo339").value);
    if (isNaN(Income339)) {
        Income339 = 0;
    }
    if (Income339 < 0) {
        Income339 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3310 = parseInt(document.getElementById("DataInfo3310").value);
    if (isNaN(Income3310)) {
        Income3310 = 0;
    }
    if (Income3310 < 0) {
        Income3310 = 0;
        alert("Income should be greater  than 0")

    }
    var Total33;
    Total33 = Income331 + Income332 + Income333 + Income334 + Income335 + Income336 + Income337 + Income338 + Income339 + Income3310;
    $("#Total33").val(Total33);
    if (Total33 != null && Total33 != "" && isNaN(Total33) == false) {
        var TotalInWords = convertNumberToWords(Total33);
        $("#TotalInWords33").val(TotalInWords);
    }

}

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#DateofbirthI").val();
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
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

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
            $("#DateofbirthI").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Age').prop('readonly', false);
            $("#DateofbirthI").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function ValidatePAN() {
    debugger;

    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    //value is tested using a Regular Expression.
    if (regex.test($("#PanCard").val())) {

        return true;
    }
    else {
        alert("Pancard is incorrect")
    }


}

function SelectYear() {
    var value = document.getElementById("year").value;
    if (value == "1686") {
        $('#OneYear').show();
        $('#ThreeYear').hide();
    }
    else {
        $('#OneYear').hide();
        $('#ThreeYear').show();
    }
}



$(document).ready(function () {
    $("#OneYear").hide(); $("#ThreeYear").hide();

    $("#FarmDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#FarmDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#FarmTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#FarmTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#FarmTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#FarmTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#Village").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#Village").append(optionhtml);
                });
            }
        });

    });

    $("#DateofbirthI").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2010", onSelect: function (dateText) {
            CalculateAge();
        }
    });


});

function AddFamilyMember() {
    debugger;

    var FamilyMemberRelation = $("#FamilyMemberRelation option:selected").text();
    var FamilyMemberName = $('#FamilyMemberName').val();
    var FamilyMemberAge = $('#FamilyMemberAge').val();
    var FamilyMemberOccupation = $("#FamilyMemberOccupation option:selected").text();
    var FamilyIncome = $('#FamilyIncome').val();


    if (FamilyMemberName == null || FamilyMemberName == "") {
        alert("Enter FamilyMemberName!");
    }
    else if (FamilyMemberAge == null || FamilyMemberAge == "") {
        alert("Enter FamilyMemberAge  !");
    }


    else {

        var postdata = {
            FamilyMemberRelation: FamilyMemberRelation,
            FamilyMemberName: FamilyMemberName,
            FamilyMemberAge: FamilyMemberAge,
            FamilyMemberOccupation: FamilyMemberOccupation,
            FamilyIncome: FamilyIncome

        };

        $.ajax({
            type: 'POST',
            url: '/Service/NCLIncome/Insert_Data',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FamilyTable').empty();
                    }
                    else {
                        $('#FamilyTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र.</th><th>कुटुंबातील सदस्याचे नाते</th><th>कुटुंबातील सदस्याचे नाव</th><th>कुटुंबातील सदस्याचे वय</th><th>कुटुंबातील सदस्याचा व्यवसाय</th><th>कुटुंबातील सदस्याचे उत्पन्न</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberRelation +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberName +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberAge +
                                '</td>' +
                                '<td>' +
                                val.FamilyMemberOccupation +
                                '</td>' +
                                '<td>' +
                                val.FamilyIncome +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FamilyTable').append(temptable);
                        document.getElementById("FamilyMemberRelation").value = "";
                        document.getElementById("FamilyMemberName").value = "";
                        document.getElementById("FamilyMemberAge").value = "";
                        document.getElementById("FamilyMemberOccupation").value = "";
                        document.getElementById("FamilyIncome").value = "";

                    }
                }


            }
        });
    }
}

function deleteFamilyMember(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NCLIncome/Delete_Data",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FamilyTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FamilyTable').empty();
                }
                else {
                    $('#FamilyTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>FamilyMemberRelation</th><th>FamilyMemberName</th><th>FamilyMemberAge</th><th>FamilyMemberOccupation</th><th>FamilyIncome</th><th>Delete</th></tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberRelation +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberName +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberAge +
                            '</td>' +
                            '<td>' +
                            val.FamilyMemberOccupation +
                            '</td>' +
                            '<td>' +
                            val.FamilyIncome +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFamilyMember('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FamilyTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });

}

function AddFarmDetails() {

    debugger;
    var Appaccount_name = $('#Appaccount_name').val();
    var AppFarmingAcre = $('#AppFarmingAcre').val();
    var Appfarmingarea = $('#Appfarmingarea option:selected').text();
    var Appfarmingdetails = $('#Appfarmingdetails').val();
    var Village = $("#Village option:selected").text();
    var VillageCode = $("#Village option:selected").val();


    if (Appaccount_name == null || Appaccount_name == "") {
        alert("Enter Appaccount_name!");
    }
    else if (AppFarmingAcre == null || AppFarmingAcre == "") {
        alert("Enter AppFarmingAcre  !");
    }
    else if (Appfarmingarea == null || Appfarmingarea == "") {
        alert("Enter Appfarmingarea !");
    }
    else if (Appfarmingdetails == null || Appfarmingdetails == "") {
        alert("Enter Appfarmingdetails  !");
    }
    else if (Village == null || Village == "") {
        alert("Enter Village !");
    }

    else {

        var postdata = {
            Appaccount_name: Appaccount_name,
            AppFarmingAcre: AppFarmingAcre,
            Appfarmingarea: Appfarmingarea,
            Appfarmingdetails: Appfarmingdetails,
            Village: Village,
            VillageCode: VillageCode
        };

        $.ajax({
            type: 'POST',
            url: '/Service/NCLIncome/Insert_FarmData',
            dataType: 'json',
            data: postdata,
            success: function (data) {
                debugger;
                if (data.length == 0) {
                    $('#FarmTable').empty();
                }
                for (var i = 0; i < data.length; i++) {
                    if (data.length == 0) {
                        $('#FarmTable').empty();
                    }
                    else {
                        $('#FarmTable').empty();
                        var temptable = '<table class="table table-bordered info"><thead><tr><th>अ.क्र</th><th>खातेधारकाचे नाव</th><th>शेतीचे एकूण क्षेत्र</th><th>क्षेत्र</th><th>शेतीचे विवरण</th><th>गाव</th><th>हटवा</th></tr></thead>';
                        var keycounter = 1;
                        $.each(data, function (key, val) {
                            temptable += '<tr> <td>' +
                                keycounter +
                                '</td>' +
                                '<td>' +
                                val.Appaccount_name +
                                '</td>' +
                                '<td>' +
                                val.AppFarmingAcre +
                                '</td>' +
                                '<td>' +
                                val.Appfarmingarea +
                                '</td>' +
                                '<td>' +
                                val.Appfarmingdetails +
                                '</td>' +
                                '<td>' +
                                val.Village +
                                '</td>' +
                                '<td>' +
                                "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFarm('" + val.SrNo + "');> नोंद हटवा</a>" +
                                '</td>' +
                                '</tr>';
                            keycounter = keycounter + 1;
                        });
                        temptable += "</table>";
                        $('#FarmTable').append(temptable);
                        document.getElementById("Appaccount_name").value = "";
                        document.getElementById("AppFarmingAcre").value = "";
                        document.getElementById("Appfarmingarea").value = "";
                        document.getElementById("Appfarmingdetails").value = "";
                        document.getElementById("Village").value = "";

                    }
                }


            }
        });
    }

}

function deleteFarm(Number) {
    var requestModel = { SrNo: Number };
    $.ajax({
        type: "POST",
        url: "/Service/NCLIncome/Delete_DataFarm",
        dataType: 'json',
        data: requestModel,
        success: function (data) {
            debugger;
            if (data.length == 0) {
                $('#FarmTable').empty();
            }
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#FarmTable').empty();
                }
                else {
                    $('#FarmTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead><tr><th>Sr.no</th><th>Appaccount_name</th><th>AppFarmingAcre</th><th>Appfarmingarea</th><th>Appfarmingdetails</th><th>Village</th><th>Delete</th></tr></thead>'; var keycounter = 1;
                    $.each(data, function (key, val) {
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.Appaccount_name +
                            '</td>' +
                            '<td>' +
                            val.AppFarmingAcre +
                            '</td>' +
                            '<td>' +
                            val.Appfarmingarea +
                            '</td>' +
                            '<td>' +
                            val.Appfarmingdetails +
                            '</td>' +
                            '<td>' +
                            val.Village +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteFarm('" + val.SrNo + "');> Delete Entery</a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#FarmTable').append(temptable);
                }
            }


        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}



function CalculateIncomeForOneYear() {
    debugger;
    var Income1 = parseInt(document.getElementById("DataInfo1").value);
    if (isNaN(Income1)) {

        Income1 = 0;
    }

    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income2 = parseInt(document.getElementById("DataInfo2").value);
    if (isNaN(Income2)) {
        Income2 = 0;
    }
    if (Income2 < 0) {
        Income2 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3 = parseInt(document.getElementById("DataInfo3").value);
    if (isNaN(Income3)) {
        Income3 = 0;
    }
    if (Income3 < 0) {
        Income3 = 0;
        alert("Income should be greater  than 0")

    }

    var Income4 = parseInt(document.getElementById("DataInfo4").value);
    if (isNaN(Income4)) {
        Income4 = 0;
    }
    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income5 = parseInt(document.getElementById("DataInfo5").value);
    if (isNaN(Income5)) {
        Income5 = 0;
    }
    if (Income1 < 0) {
        Income1 = 0;
        alert("Income should be greater  than 0")

    }

    var Income6 = parseInt(document.getElementById("DataInfo6").value);
    if (isNaN(Income6)) {
        Income6 = 0;
    }
    if (Income6 < 0) {
        Income6 = 0;
        alert("Income should be greater  than 0")

    }

    var Income7 = parseInt(document.getElementById("DataInfo7").value);
    if (isNaN(Income7)) {
        Income7 = 0;
    }
    if (Income7 < 0) {
        Income7 = 0;
        alert("Income should be greater  than 0")

    }


    var Income8 = parseInt(document.getElementById("DataInfo8").value);
    if (isNaN(Income8)) {
        Income8 = 0;
    }
    if (Income8 < 0) {
        Income8 = 0;
        alert("Income should be greater  than 0")

    }

    var Income9 = parseInt(document.getElementById("DataInfo9").value);
    if (isNaN(Income9)) {
        Income9 = 0;
    }
    if (Income9 < 0) {
        Income9 = 0;
        alert("Income should be greater  than 0")

    }

    var Income10 = parseInt(document.getElementById("DataInfo10").value);
    if (isNaN(Income10)) {
        Income10 = 0;
    }
    if (Income10 < 0) {
        Income10 = 0;
        alert("Income should be greater  than 0")

    }
    var Total;
    Total = Income1 + Income2 + Income3 + Income4 + Income5 + Income6 + Income7 + Income8 + Income9 + Income10;
    $("#Total").val(Total);
    if (Total != null || Total != "" || isNaN(Total) == false) {
        var TotalInWords = convertNumberToWords(Total);
        $("#TotalInWords").val(TotalInWords);
    }

}

function CalculateIncomeForThreeYearFirstRow() {
    debugger;
    var Income311 = parseInt(document.getElementById("DataInfo311").value);
    if (isNaN(Income311)) {
        Income311 = 0;
    }
    if (Income311 < 0) {
        Income311 = 0;
        alert("Income should be greater  than 0")

    }
    var Income312 = parseInt(document.getElementById("DataInfo312").value);
    if (isNaN(Income312)) {
        Income312 = 0;
    }
    if (Income312 < 0) {
        Income312 = 0;
        alert("Income should be greater  than 0")

    }

    var Income313 = parseInt(document.getElementById("DataInfo313").value);
    if (isNaN(Income313)) {
        Income313 = 0;
    }
    if (Income313 < 0) {
        Income313 = 0;
        alert("Income should be greater  than 0")

    }

    var Income314 = parseInt(document.getElementById("DataInfo314").value);
    if (isNaN(Income314)) {
        Income314 = 0;
    }
    if (Income314 < 0) {
        Income314 = 0;
        alert("Income should be greater  than 0")

    }

    var Income315 = parseInt(document.getElementById("DataInfo315").value);
    if (isNaN(Income315)) {
        Income315 = 0;
    }
    if (Income315 < 0) {
        Income315 = 0;
        alert("Income should be greater  than 0")

    }


    var Income316 = parseInt(document.getElementById("DataInfo316").value);
    if (isNaN(Income316)) {
        Income316 = 0;
    }
    if (Income316 < 0) {
        Income316 = 0;
        alert("Income should be greater  than 0")

    }

    var Income317 = parseInt(document.getElementById("DataInfo317").value);
    if (isNaN(Income317)) {
        Income317 = 0;
    }
    if (Income317 < 0) {
        Income317 = 0;
        alert("Income should be greater  than 0")

    }


    var Income318 = parseInt(document.getElementById("DataInfo318").value);
    if (isNaN(Income318)) {
        Income318 = 0;
    }
    if (Income318 < 0) {
        Income318 = 0;
        alert("Income should be greater  than 0")

    }

    var Income319 = parseInt(document.getElementById("DataInfo319").value);
    if (isNaN(Income319)) {
        Income319 = 0;
    }
    if (Income319 < 0) {
        Income319 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3110 = parseInt(document.getElementById("DataInfo3110").value);
    if (isNaN(Income3110)) {
        Income3110 = 0;
    }
    if (Income3110 < 0) {
        Income3110 = 0;
        alert("Income should be greater  than 0")

    }

    var Total;
    Total = Income311 + Income312 + Income313 + Income314 + Income315 + Income316 + Income317 + Income318 + Income319 + Income3110;
    $("#Total31").val(Total);
    if (Total != null && Total != "" && isNaN(Total) == false) {
        var TotalInWords = convertNumberToWords(Total);
        $("#TotalInWords31").val(TotalInWords);
    }


}

function CalculateIncomeForThreeYearSecondRow() {
    debugger;
    var Income321 = parseInt(document.getElementById("DataInfo321").value);
    if (isNaN(Income321)) {
        Income321 = 0;
    }
    if (Income321 < 0) {
        Income321 = 0;
        alert("Income should be greater  than 0")

    }

    var Income322 = parseInt(document.getElementById("DataInfo322").value);
    if (isNaN(Income322)) {
        Income322 = 0;
    }
    if (Income322 < 0) {
        Income322 = 0;
        alert("Income should be greater  than 0")

    }

    var Income323 = parseInt(document.getElementById("DataInfo323").value);
    if (isNaN(Income323)) {
        Income323 = 0;
    }
    if (Income323 < 0) {
        Income323 = 0;
        alert("Income should be greater  than 0")

    }

    var Income324 = parseInt(document.getElementById("DataInfo324").value);
    if (isNaN(Income324)) {
        Income324 = 0;
    }
    if (Income324 < 0) {
        Income324 = 0;
        alert("Income should be greater  than 0")

    }

    var Income325 = parseInt(document.getElementById("DataInfo325").value);
    if (isNaN(Income325)) {
        Income325 = 0;
    }
    if (Income325 < 0) {
        Income325 = 0;
        alert("Income should be greater  than 0")

    }

    var Income326 = parseInt(document.getElementById("DataInfo326").value);
    if (isNaN(Income326)) {
        Income326 = 0;
    }
    if (Income326 < 0) {
        Income326 = 0;
        alert("Income should be greater  than 0")

    }

    var Income327 = parseInt(document.getElementById("DataInfo327").value);
    if (isNaN(Income327)) {
        Income327 = 0;
    }
    if (Income327 < 0) {
        Income327 = 0;
        alert("Income should be greater  than 0")

    }


    var Income328 = parseInt(document.getElementById("DataInfo328").value);
    if (isNaN(Income328)) {
        Income328 = 0;
    }
    if (Income328 < 0) {
        Income328 = 0;
        alert("Income should be greater  than 0")

    }

    var Income329 = parseInt(document.getElementById("DataInfo329").value);
    if (isNaN(Income329)) {
        Income329 = 0;
    }
    if (Income329 < 0) {
        Income329 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3210 = parseInt(document.getElementById("DataInfo3210").value);
    if (isNaN(Income3210)) {
        Income3210 = 0;
    }
    if (Income3210 < 0) {
        Income3210 = 0;
        alert("Income should be greater  than 0")

    }

    var Total32;
    Total32 = Income321 + Income322 + Income323 + Income324 + Income325 + Income326 + Income327 + Income328 + Income329 + Income3210;
    $("#Total32").val(Total32);
    if (Total32 != null && Total32 != "" && isNaN(Total32) == false) {
        var TotalInWords = convertNumberToWords(Total32);
        $("#TotalInWords32").val(TotalInWords);
    }

}

function CalculateIncomeForThreeYearThirdRow() {
    debugger;
    var Income331 = parseInt(document.getElementById("DataInfo331").value);
    if (isNaN(Income331)) {
        Income331 = 0;
    }
    if (Income331 < 0) {
        Income331 = 0;
        alert("Income should be greater  than 0")

    }
    var Income332 = parseInt(document.getElementById("DataInfo332").value);
    if (isNaN(Income332)) {
        Income332 = 0;
    }
    if (Income332 < 0) {
        Income332 = 0;
        alert("Income should be greater  than 0")

    }

    var Income333 = parseInt(document.getElementById("DataInfo333").value);
    if (isNaN(Income333)) {
        Income333 = 0;
    }
    if (Income333 < 0) {
        Income333 = 0;
        alert("Income should be greater  than 0")

    }

    var Income334 = parseInt(document.getElementById("DataInfo334").value);
    if (isNaN(Income334)) {
        Income334 = 0;
    }
    if (Income334 < 0) {
        Income334 = 0;
        alert("Income should be greater  than 0")

    }

    var Income335 = parseInt(document.getElementById("DataInfo335").value);
    if (isNaN(Income335)) {
        Income335 = 0;
    }
    if (Income335 < 0) {
        Income335 = 0;
        alert("Income should be greater  than 0")

    }

    var Income336 = parseInt(document.getElementById("DataInfo336").value);
    if (isNaN(Income336)) {
        Income336 = 0;
    }
    if (Income336 < 0) {
        Income336 = 0;
        alert("Income should be greater  than 0")

    }


    var Income337 = parseInt(document.getElementById("DataInfo337").value);
    if (isNaN(Income337)) {
        Income337 = 0;
    }
    if (Income337 < 0) {
        Income337 = 0;
        alert("Income should be greater  than 0")

    }


    var Income338 = parseInt(document.getElementById("DataInfo338").value);
    if (isNaN(Income338)) {
        Income338 = 0;
    }
    if (Income338 < 0) {
        Income338 = 0;
        alert("Income should be greater  than 0")

    }

    var Income339 = parseInt(document.getElementById("DataInfo339").value);
    if (isNaN(Income339)) {
        Income339 = 0;
    }
    if (Income339 < 0) {
        Income339 = 0;
        alert("Income should be greater  than 0")

    }

    var Income3310 = parseInt(document.getElementById("DataInfo3310").value);
    if (isNaN(Income3310)) {
        Income3310 = 0;
    }
    if (Income3310 < 0) {
        Income3310 = 0;
        alert("Income should be greater  than 0")

    }
    var Total33;
    Total33 = Income331 + Income332 + Income333 + Income334 + Income335 + Income336 + Income337 + Income338 + Income339 + Income3310;
    $("#Total33").val(Total33);
    if (Total33 != null && Total33 != "" && isNaN(Total33) == false) {
        var TotalInWords = convertNumberToWords(Total33);
        $("#TotalInWords33").val(TotalInWords);
    }

}

function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#DateofbirthI").val();
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
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय १८ वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

            $("#Age").val('');
            $("#Age").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#DateofbirthI").val('');
            $("#DateofbirthI").focus();

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
            $("#DateofbirthI").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#Age').prop('readonly', false);
            $("#DateofbirthI").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function ValidatePAN() {
    debugger;

    var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    //value is tested using a Regular Expression.
    if (regex.test($("#PanCard").val())) {

        return true;
    }
    else {
        alert("Pancard is incorrect")
    }


}

function SelectYear() {
    var value = document.getElementById("year").value;
    if (value == "1686") {
        $('#OneYear').show();
        $('#ThreeYear').hide();
    }
    else {
        $('#OneYear').hide();
        $('#ThreeYear').show();
    }
}



