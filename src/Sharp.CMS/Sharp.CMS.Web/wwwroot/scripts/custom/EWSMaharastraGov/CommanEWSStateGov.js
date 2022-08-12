
$(document).ready(function () {
    $("#BenfiAddress").hide(); $("#MIgrantDistAddress").hide();

    $("#ddl_ApplicantDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddl_ApplicantDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddl_ApplicantTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddl_ApplicantTalukaSelected").append(optionhtml);
                    });
            }
        });
    });

    $("#ddl_ApplicantTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddl_ApplicantTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddl_ApplicantVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddl_ApplicantVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddl_BenDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddl_BenDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddl_BenTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddl_BenTalukaSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#ddl_BenTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddl_BenTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddl_BenVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddl_BenVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddl_BenFatherDistrictSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddl_BenFatherDistrictSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddl_BenFatherTalukaSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddl_BenFatherTalukaSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#ddl_BenFatherTalukaSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddl_BenFatherTalukaSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddl_BenFatherVillageSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddl_BenFatherVillageSelected").append(optionhtml);
                });
            }
        });

    });

    $("#ddlland_distSelected").change(function () {
        var requestTalukaModel = { Districtcode: $("#ddlland_distSelected").val() };

        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetTaluka",
            dataType: "json",
            data: requestTalukaModel,

            success: function (data) {
                $("#ddlland_subdistSelected").empty();
                $.each(data,
                    function (i) {
                        var optionhtml = '<option value="' + data[i].SubDistrictcode + '">' + data[i].SubDistrictname + '</option>';
                        $("#ddlland_subdistSelected").append(optionhtml);
                    });
            }
        });
    });
    $("#ddlland_subdistSelected").change(function () {
        var requestVillageModel = { SubDistrictcode: $("#ddlland_subdistSelected").val() };
        $.ajax({
            type: "POST",
            url: "/Service/CommonDropdown/GetVillage",
            data: requestVillageModel,

            success: function (data) {
                $("#ddlland_villSelected").empty();
                $.each(data, function (i) {

                    var optionhtml = '<option value="' + data[i].Villagecode + '">' + data[i].Villagename + '</option>';
                    $("#ddlland_villSelected").append(optionhtml);
                });
            }
        });

    });

    $("#txt_ApplicantDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2010", onSelect: function (dateText) {
            CalculateAge();
        }
    });

    $("#txt_RelationDOB,#txtFromDate,#txtToDate,#txt_BenFatherDOB").datepicker({
        maxDate: 0, changeYear: true, changeMonth: true, dateFormat: 'dd/mm/yy', yearRange: "1930:2010", onSelect: function (dateText) {
        }
    });
});

function CalculateAge() {

    var date1 = new Date();
    var dob = $("#txt_ApplicantDOB").val();
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
            $("#txt_ApplicantDOB").val('');
            $("#txt_ApplicantDOB").focus();

            $("#txt_ApplicantAg").val('');
            $("#txt_ApplicantAg").focus();

            return false;
        }

        if (d[2] < nd.getFullYear()) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#txt_ApplicantDOB").val('');
            $("#txt_ApplicantDOB").focus();

            $("#txt_ApplicantAg").val('');
            $("#txt_ApplicantAg").focus();
            return false;
        }

        if (age < 18) {
            alert('तुम्ही पात्र नाही. वय 18 वर्षांपेक्षा जास्त असले पाहिजे.');
            $("#txt_ApplicantDOB").val('');
            $("#txt_ApplicantDOB").focus();

            $("#txt_ApplicantAg").val('');
            $("#txt_ApplicantAg").focus();
            return false;
        }

        if (allMonths > 1500) {
            alert('वय १२५ पेक्षा कमी असावे.');
            $("#txt_ApplicantDOB").val('');
            $("#txt_ApplicantDOB").focus();

            $("#txt_ApplicantAg").val('');
            return false;
        }
        else {
            $("#txt_ApplicantAg").val(age);
            $('#txt_ApplicantAg').prop('readonly', true);

            return true;
        }
    }
    else {
        if (localStorage.getItem('my-lstore') == '1') {
            $('#txt_ApplicantAg').prop('readonly', true);
            $("#txt_ApplicantDOB").val('');
            alert("Invalid Date. Please enter correct date format (dd/mm/yyyy)!");
        }
        else {
            $('#txt_ApplicantAg').prop('readonly', false);
            $("#txt_ApplicantDOB").val('');
            alert("अवैध दिनांक. कृपया दिनांक (dd/mm/yyyy) मध्ये लिहा.");
        }
        return false;
    }
}

function CalculateIncomeForOneYear(langid) {
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
    if (Income4 < 0) {
        Income4 = 0;
        alert("Income should be greater  than 0")

    }

    var Income5 = parseInt(document.getElementById("DataInfo5").value);
    if (isNaN(Income5)) {
        Income5 = 0;
    }
    if (Income5 < 0) {
        Income5 = 0;
        alert("Income should be greater  than 0")

    }

    var Total;
    Total = Income1 + Income2 + Income3 + Income4 + Income5;
    $("#Total").val(Total);
    if (Total != null && Total != "" && isNaN(Total) == false) {
        var TotalInWords = "";
        if (langid == 1)
        {
           TotalInWords = convertNumberToWords(Total);

        }
        else 
        {
            TotalInWords = convertNumberToWordsMR(Total);
        }
        $("#TotalInWords").val(TotalInWords);
    }

}

function convertNumberToWords(amount)
{
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

//marathi

var a = ['', 'एक', 'दोन', 'तीन', 'चार', 'पाच', 'सहा', 'सात', 'आठ', 'नऊ', 'दहा', 'अकरा', 'बारा', 'तेरा', 'चौदा', 'पंधरा', 'सोळा', 'सतरा', 'अठरा', 'एकोणीस', 'वीस', 'एकवीस', 'बावीस', 'तेवीस', 'चोवीस', 'पंचवीस', 'सव्वीस', 'सत्तावीस', 'अठ्ठावीस', 'एकोणतीस', 'तीस', 'एकतीस', 'बत्तीस', 'तेहतीस', 'चौतीस', 'पस्तीस', 'छत्तीस', 'सदतीस', 'अडतीस', 'एकोणचाळीस', 'चाळीस', 'एकेचाळीस', 'बेचाळीस', 'त्रेचाळीस', 'चव्वेचाळीस', 'पंचेचाळीस', 'सेहेचाळीस', 'सत्तेचाळीस', 'अठ्ठेचाळीस', 'एकोणपन्नास', 'पन्नास', 'एकावन्न', 'बावन्न', 'त्रेपन्न', 'चौपन्न', 'पंचावन्न', 'छपन्न', 'सत्तावन्न', 'अठ्ठावन्न', 'एकोणसाठ', 'साठ', 'एकसष्ट', 'बासष्ट', 'त्रेसष्ट', 'चौसष्ट', 'पासष्ट', 'सहासष्ट', 'सदुसष्ट', 'अडुसष्ट', 'एकोणसत्तर', 'सत्तर', 'एकाहत्तर', 'बाहत्तर', 'त्र्याहत्तर', 'चौ-याहत्तर', 'पंच्याहत्तर', 'शाहत्तर', 'सत्याहत्तर', 'अठ्ठ्याहत्तर', 'एकोणऐंशी', 'ऐंशी', 'एक्याऐंशी', 'ब्याऐंशी', 'त्र्याऐंशी', 'चौ-याऐंशी', 'पंच्याऐंशी', 'शहाऐंशी', 'सत्याऐंशी', 'अठ्ठ्याऐंशी', 'एकोणनव्वद', 'नव्वद', 'एक्याण्णव', 'ब्याण्णव', 'त्र्याण्णव', 'चौ-याण्णव', 'पंच्याण्णव', 'शहाण्णव', 'सत्याण्णव', 'अठ्ठ्याण्णव', 'नव्याण्णव', 'शंभर'];
var b = ['', 'वीस', 'तीस', 'चाळीस', 'पन्नास', 'साठ', 'सत्तर', 'ऐंशी', 'नव्वद'];

function convertNumberToWordsMR(amount) {
    var num = amount;
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'कोटी ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'लाख ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'हजार ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'शे ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';

    var aa = str;
    return str;
}

//end



function ToggleTextBoxmigAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#MIgrantDistAddress").show();
    }
    else {
        $("#MIgrantDistAddress").hide();
    }
}

function ToggleTextBoxPerAdd(add) {
    debugger;
    var value = add.split('__')[1]
    if (value == "Istrue") {
        $("#BenfiAddress").hide();
    }
    else {
        $("#BenfiAddress").show();
    }
}