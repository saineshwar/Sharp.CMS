﻿function ValidateFilename(value) {
    var file = getNameFromPath($(value).val());
    var extension = file.split('.');
    var tempregx = new RegExp(/^[A-Za-z0-9 ]+$/);
    if (!tempregx.test(extension[0])) {
        return false;
    }
    else {
        return true;
    }
}

function ValidateFileSize(fileid) {
    try {
        var fileSize = 0;
        fileSize = $(fileid)[0].files[0].size;
        fileSize = parseFloat(fileSize / 1024).toFixed(2);
        return fileSize;
    }
    catch (e) {
        $.alert("Error is :" + e);
    }
}

function getNameFromPath(strFilepath) {
    var objRe = new RegExp(/([^\/\\]+)$/);
    var strName = objRe.exec(strFilepath);

    if (strName == null) {
        return null;
    }
    else {
        return strName[0];
    }
}

function ValidateFile(value) {
    $("#_val1").text("");
    $("#loader").show();


    var file = getNameFromPath($(value).val());
    var extension = file.substr((file.lastIndexOf('.') + 1));
    if (value != "" && value != null) {
        var size = ValidateFileSize(value);
        var str = value.name;
        var res = str.split("_");
        var data = "_val" + res[1];

        if (Number(size) < 5 || Number(size) > 5120) {
            $("#loader").hide();
            $.alert({
                title: 'Alert!',
                content: 'The size of the uploaded documents must be between 5 KB and 5120 MB.!',
                type: 'red'
            });

            $("#" + value.name).val('');
      
        } else {
            var flag;
            if (file != null) {
                switch (extension) {
                case 'jpg':
                case 'png':
                case 'jpeg':
                case 'pdf':
                case 'xls':
                case 'xlsx':
                case 'zip':
                case '7z':
                        flag = true;
                        break;
                    default:
                        flag = false;
                }
            }
            if (flag === false) {
                str = value.name;
          
                $("#loader").hide();
                $.alert({
                    title: 'Alert!',
                    content: 'You can upload only jpg, png, jpeg, pdf, xls, xlsx, zip, 7z extension file',
                    type: 'red'
                });

                $("#" + value.name).val('');
           

                return false;
            }
            else if (ValidateFilename(value) === false) {
                str = value.name;
                $("#loader").hide();
                $.alert({
                    title: 'Alert!',
                    content: 'Uploaded File Cannot Contains Special Character in Name.',
                    type: 'red'
                });

                $("#" + value.name).val('');
            

                return false;
            }
            else if (ValidateFilename(value) === true)
            {
                $("#" + data).text("");
                $("#loader").hide();
                return true;
            }
        }
    }



    $("#loader").hide();

    return false;
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#previewimage')
                .attr('src', e.target.result)
                .width(180)
                .height(200);
        };

        reader.readAsDataURL(input.files[0]);

        $("#btnContinue").hide();
        $("#divcontinue").hide();
    }
}

function showimagepreview(input) {
    $("#btnContinue").hide();
    $("#divcontinue").hide();
    $("#previewimage").show();
    var image = new Image();
    $('#previewimage').attr('src', null);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#previewimage').attr('src', e.target.result);
            var img = new Image;
            img.onload = function () {
                var width = img.width;
                var height = img.height;
                var aspratio = parseInt(height) / parseInt(width);

                if (width < 160 || width > 200) {
                    $('#previewimage').attr('src', null);
                    $.alert('The width of the photograph should be 160 pixels.');
                }


            };

            img.src = reader.result;
            var imgsizee = input.files[0].size;
            var sizekb = imgsizee / 1024;
            if (sizekb < 5 || sizekb > 3000) {
                $('#previewimage').attr('src', null);
                $.alert('The size of the photograph should fall between 5KB to 20KB. Your Photo Size is ' + sizekb + 'kb.');

            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function ValidateDocumentFile(value) {
    $("#_val1").text("");
    $("#loader").show();


    var file = getNameFromPath($(value).val());
    var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
    if (value != "" && value != null) {
        var size = ValidateFileSize(value);
        var str = value.name;
        var res = str.split("_");
        var data = "_val" + res[1];

        if (Number(size) < 5) {
            $("#loader").hide();
            $.alert({
                title: 'Alert!',
                content: 'The size of the uploaded documents must be between 5 KB.',
                type: 'red'
            });

            $("#" + value.name).val('');
        }
        if (Number(size) > 5120) {
            $("#loader").hide();
            $.alert({
                title: 'Alert!',
                content: 'The size of the uploaded documents cannot be greater than 5 MB.',
                type: 'red'
            });
            $("#" + value.name).val('');
        }
        else {
            var flag;
            if (file != null) {
                switch (extension) {
                    case 'jpg':
                    case 'png':
                    case 'jpeg':
                    case 'pdf':
                    case 'xls':
                    case 'xlsx':
                    case 'zip':
                    case '7z':
                        flag = true;
                        break;
                    default:
                        flag = false;
                }
            }
            if (flag === false) {
                str = value.name;
                $("#loader").hide();
                $.alert({
                    title: 'Alert!',
                    content: 'You can upload only jpg ,png, jpeg ,pdf, zip extension file.',
                    type: 'red'
                });

                $("#" + value.name).val('');
               

                return false;
            }
            else if (ValidateFilename(value) === false) {
                str = value.name;
                $("#loader").hide();
                $.alert({
                    title: 'Alert!',
                    content: 'Uploaded File Cannot Contains Special Character in Name.',
                    type: 'red'
                });

                $("#" + value.name).val('');
               

                return false;
            }
            else if (ValidateFilename(value) === true) {
                $("#" + data).text("");
                $("#loader").hide();

                return true;
            }
        }
    }



    $("#loader").hide();

    return false;
}