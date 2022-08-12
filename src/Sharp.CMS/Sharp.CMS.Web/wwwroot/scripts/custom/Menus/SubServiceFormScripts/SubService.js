
$('#ServiceName').blur(function () 
{
    if ($("#ServiceName").val() !== "")
    {
        var url = "/Manage/ManageService/CheckServiceName";
        $.getJSON(url, { servicename: $("#ServiceName").val(), catId: $("#CatId").val() }, function (data) {
            if (data) {
                alert('ServiceName already Exists');
                $("#ServiceName").val('');
            }
        });
    }
});

$('#ServiceNameMarathi').blur(function () {
    if ($("#ServiceNameMarathi").val() !== "") {
        var url = "/Manage/ManageService/CheckServiceName";
        $.getJSON(url, { servicename: $("#ServiceNameMarathi").val(), catId: $("#CatId").val() }, function (data) {
            if (data) {
                alert('Service Name Marathi already Exists');
                $("#ServiceNameMarathi").val('');
            }
        });
    }
});

$('#CatId').change(function ()
{
    if ($("#CatId").val() !== "")
    {
        var url = "/Manage/ManageSubService/GetServiceList";
        $.getJSON(url, { catId: $("#CatId").val() }, function (data)
        {
            if (data) {
                $("#ServiceId").empty();
               
                $.each(data, function (index, optionData) {
                    $("#ServiceId").append("<option text='" + optionData.Text + "' value='" + optionData.Value + "'>" + optionData.Text + "</option>");
                });
            }
        });
    }
});

