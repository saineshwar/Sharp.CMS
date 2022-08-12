
$('#CatName').blur(function () 
{
    if ($("#CatName").val() !== "") 
    {
        var url = "/Manage/ManageCategory/CheckCategoryName";
        $.getJSON(url, { categoryname: $("#CatName").val() }, function (data) {
            if (data) {
                alert('Category already Exists');
                $("#CatName").val('');
            }
        });
    }
});

$('#CatNameMarathi').blur(function () {
    if ($("#CatNameMarathi").val() !== "") {
        var url = "/Manage/ManageCategory/CheckCategoryName";
        $.getJSON(url, { categoryname: $("#CatNameMarathi").val() }, function (data) {
            if (data) {
                alert('Category Name Marathi already Exists');
                $("#CatNameMarathi").val('');
            }
        });
    }
});