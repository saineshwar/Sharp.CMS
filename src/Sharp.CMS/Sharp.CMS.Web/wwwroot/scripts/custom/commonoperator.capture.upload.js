    $(document).ready(function() 
    {
        $("#divCapturePhoto").hide();
        $("#divUploadPhoto").hide();
        $("#btnsave").hide();
        $("#divcontinue").hide();


        $("input[type='radio']").on('change',
            function() {
                var selectedValue = $("input[name='PhotoType']:checked").val();
                if (selectedValue == "C") {
                    $("#divCapturePhoto").show();
                    $("#divUploadPhoto").hide();
                    $("#divcontinue").hide();
                    $('#imageprev').attr('src', '');

                    Webcam.set({
                        width: 320,
                        height: 240,
                        image_format: 'jpeg',
                        jpeg_quality: 90
                    });
                    Webcam.attach('#my_camera');
                }

                if (selectedValue == "U") {
                    $("#divUploadPhoto").show();
                    $("#divCapturePhoto").hide();
                    $("#UploadedPhotofile").val('');
                    $('#previewimage').attr('src', '');
                }
            });
    });

    function take_snapshot() 
    {
        Webcam.snap(function(dataUri) 
        {
            document.getElementById('results').innerHTML = '' +
                '<img id="imageprev" src="' +
                dataUri +
                '"/>';

            if (dataUri != null) {
                $("#btnsave").show();
            }
        });
    }

    function saveSnap() {
        var base64Image = document.getElementById("imageprev").src;
        var token = $('input[name="__RequestVerificationToken"]').val();

        if (base64Image != '') {
            var documentName = $("#UploadedPhotofile").val();
            $.ajax({
                url: '/Service/OperatorCapture/CapturePhoto',
                type: 'POST',
                data: { DataString: base64Image, __RequestVerificationToken: token, DocumentName: documentName, KioskId: $('#KioskId').val()},
                success: function (data)
                {
                    if (data.Result == "Success")
                    {
                        alert(data.Message);
                        $("#divcontinue").show();
                        return;
                    } else if (data.Result == "Error")
                    {
                        alert(data.Message);
                    }
                    else if (data.Result == "Already")
                    {
                        alert("Photograph Is Already Uploaded!");

                        $.dialog({
                            title: 'Payment',
                            content: '<h5>Make Payment For Filled Application</h5>' +
                                '<button type="button" class="btn btn-success">Click Here to do Payment</button>',
                            animation: 'scale',
                            closeIcon: false,
                            onOpen: function () {
                                this.$content.find('button').click(function () {
                                    window.location.href = data.Message;
                                });
                            }
                        });
                    }
                },
                error: function(r, s, e) 
                {
                    alert("Unexpected error:" + e);
                    console.log(r);
                    console.log(s);
                    console.log(e);
                }
            });
        }


    }

    function ValidateCapturedPhoto() {
        if ($('#results').attr('src') == '') 
        {
            alert('Photo Not Captured Try Again!');
            return false;
        } else 
        {
            saveSnap();
            return true;
        }
    }

    function CheckUploadPhotoforFace()
    {
        if ($("#UploadedPhotofile")[0].files.length === 0) {
            alert("No file selected.");
            return false;
        } else {
            var coords = $('#previewimage').faceDetection({
                complete: function(faces) {
                },
                error: function(img, code, message) {
                    return false;
                }
            });

            if (coords.length == 1) {
                $("#divcontinue").show();
                $("#btnContinue").show();
                alert('Face Detected');
                return true;
            } else {
                $("#divcontinue").hide();
                $("#btnContinue").hide();
                alert('Face Detection Failed. Please upload proper image.');
                return false;
            }
        }
    }

    function ContinueConfirm() {
        var userSelection = $("input[name='PhotoType']:checked").val();

        if (userSelection == 'U') {
            if ($("#UploadedPhotofile")[0].files.length === 0) {
                alert("No file selected.");
            } else {
                var token = $('input[name="__RequestVerificationToken"]').val();
                var fd = new FormData();
                fd.append('file', $('#UploadedPhotofile')[0].files[0]);
                fd.append("__RequestVerificationToken", token);
                fd.append("KioskId", $('#KioskId').val());
                $.ajax({
                    type: "POST",
                    url: '/Service/OperatorCapture/UploadPhoto',
                    contentType: false,
                    processData: false,
                    data: fd,
                    success: function (data) {
                        if (data.Result == "Success")
                        {
                            alert(data.Message);
                            window.location.href = data.Path;
                        }
                        else if (data.Result == "Error")
                        {
                            alert(data.Message);
                        }
                        else if (data.Result == "Already")
                        {
                            alert("Photograph Is Already Uploaded!");
                            window.location.href = data.Path;
                        }
                    },
                    error: function (xhr, status, p3, p4) {
                        var err = "Error " + " " + status + " " + p3 + " " + p4;
                        if (xhr.responseText && xhr.responseText[0] == "{")
                            err = JSON.parse(xhr.responseText).Message;
                        console.log(err);
                    }
                });
            }
        }
        else if (userSelection == 'C')
        {
            var token = $('input[name="__RequestVerificationToken"]').val();
            var fdata = new FormData();
            fdata.append("__RequestVerificationToken", token);
            fdata.append("KioskId", $('#KioskId').val());

            $.ajax({
                url: '/Service/OperatorCapture/ContinueUpload',
                type: 'POST',
                data: fdata,
                contentType: false,
                processData: false,
                success: function (data)
                {
                    if (data.Result == "Success")
                    {
                        alert(data.Message);
                        window.location.href = data.Path;
                    }
                    else if (data.Result == "Error")
                    {
                        alert(data.Message);
                    }
                },
                error: function (r, s, e) {
                    alert("Unexpected error:" + e);
                    console.log(r);
                    console.log(s);
                    console.log(e);
                }
            });

        }

    }