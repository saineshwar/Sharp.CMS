

$(document).ready(function () {
    $("#OtherAttachmentDocumentInfo").hide();
    $("#divOtherDocument").hide();

    $("#Attachmentname").val($(this).find("option:selected").text());

    var otherDoc = $("#AttachmentId").find("option:selected").text();

    if (otherDoc == 'Other' || otherDoc == 'इतर') {
        $("#OtherAttachmentDocumentInfo").show();
        $("#divOtherDocument").show();
    }
    else {
        $("#OtherAttachmentDocumentInfo").hide();
        $("#OtherAttachmentDocumentInfo").val('');
        $("#divOtherDocument").hide();
    }

    bindDocument();

    $("#AttachmentId").on("change", function () {
        $("#Attachmentname").val($(this).find("option:selected").text());

        var otherDoc = $("#AttachmentId").find("option:selected").text();

        if (otherDoc == 'Other' || otherDoc == 'इतर') {
            $("#OtherAttachmentDocumentInfo").show();
            $("#divOtherDocument").show();
        }
        else {
            $("#OtherAttachmentDocumentInfo").hide();
            $("#OtherAttachmentDocumentInfo").val('');
            $("#divOtherDocument").hide();
        }
    });
});

function bindDocument() {

    var requestdocument = { "ApplicationId": $("#ApplicationId").val(), "ServiceId": $("#ServiceId").val() };
    $.ajax({
        type: 'POST',
        data: requestdocument,
        url: '/Service/ScrutinyDocument/GetUploadedDocuments',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data.length == 0) {
                    $('#documentTable').empty();
                }
                else {
                    $('#documentTable').empty();
                    var temptable = '<table class="table table-bordered info"><thead> <tr> <th>Sr.no</th> <th>Uploaded Document Name</th> <th>Document Name</th> <th>Download</th> <th>Delete</th> </tr></thead>';
                    var keycounter = 1;
                    $.each(data, function (key, val) {
                        var currentlocalhost = window.location.origin;
                        var downloadlink = "location.href='" + currentlocalhost + "/Service/ScrutinyDocument/DownloadDocument?attachedDocumentId=" + val.AttachedDocumentId + "&applicationId=" + val.ApplicationId + "'";
                        temptable += '<tr> <td>' +
                            keycounter +
                            '</td>' +
                            '<td>' +
                            val.UploadedFileName +
                            '</td>' +
                            '<td>' +
                            val.AttachmentName +
                            '</td>' +
                            '<td>' +
                            '<a class="btn btn-info btn-xs" href="javascript:void(0)" onclick=' + downloadlink + '>  <i class="fas fa-download"></i> Download </a>' +
                            '</td>' +
                            '<td>' +
                            "<a class='btn btn-danger btn-xs' href='javascript:void(0)' onclick=deleteDocument('" + val.AttachedDocumentId + "','" + val.ApplicationId + "');> <i class='fas fa-trash'></i> Delete </a>" +
                            '</td>' +
                            '</tr>';
                        keycounter = keycounter + 1;
                    });
                    temptable += "</table>";
                    $('#documentTable').append(temptable);
                }
                
            }
        },
        error: function () {
            alert("Error loading data! Please try again.");
        }
    });
}

function deleteDocument(tempattachedDocumentId, tempapplicationId)
{
    var requestModel = { AttachedDocumentId: tempattachedDocumentId, ApplicationId: tempapplicationId };
    $("#divLoading").css("display", "block");
    $.confirm({
        title: 'Confirmation!',
        content: 'Do you want to Delete Document ?',
        type: 'red',
        typeAnimated: true,
        buttons: {
            confirm: {
                text: 'Delete',
                btnClass: 'btn-red',
                action: function () {

                    $.ajax({
                        type: "POST",
                        url: "/Service/ScrutinyDocument/DeleteDocument",
                        data: requestModel,
                        success: function (data) {
                            if (data == "success") {
                                $.alert('Document Delete Successfully!');
                                window.location.reload();
                            }
                        },
                        error: function () {
                            alert("Error loading data! Please try again.");
                            $("#divLoading").css("display", "none");
                        }
                    });



                }
            },
            close: function () {
            }
        }
    });


}
function ValidateDocument() {
   
}

$(document).ready(function () {
    var form = $("#frm");
    $("#frm").validate({
        rules: {
            AttachmentId:
            {
                required: true
            },
            Attachmentfile:
            {
                required: true
            }
        },
        messages: {
            AttachmentId: {
                required: "Please Select Document Type"
            },
            Attachmentfile: {
                required: "Please Attach Document"
            }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            // Add the `help-block` class to the error element text-danger field-validation-error
            error.addClass("text-danger field-validation-error");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".col-sm-5").addClass("has-success").removeClass("has-error");
        },
        submitHandler: function (form) {
            // do other things for a valid form


            $.confirm({
                title: 'Confirmation!',
                content: 'Do you want to Upload Document ?',
                type: 'green',
                buttons:
                {
                    confirm: function () {
                        UploadDocument();
                        return true;
                    },
                    cancel: function () {
                        $.alert('Canceled!');
                    }
                }
            });


        }
    });

});


function UploadDocument()
{
    $("#divLoading").css("display", "block");
    var formData = new FormData();
    var UploadDocs = document.getElementById("Attachmentfile").files[0];

    var token = $('input[name="__RequestVerificationToken"]').val();
    formData.append("__RequestVerificationToken", token);

    formData.append("AttachmentId", $("#AttachmentId").val());
    formData.append("attachmentfile", UploadDocs);
    formData.append("IsEdistrict", $("#IsEdistrict").val());
    formData.append("ServiceId", $("#ServiceId").val());
    formData.append("ApplicationId", $("#ApplicationId").val());
    formData.append("AttachmentDocumentInfo", $("#AttachmentDocumentInfo").val());
    formData.append("Pageinfo", $("#Pageinfo").val());

    $.ajax({
        type: "POST",
        url: '/Service/ScrutinyDocument/DocumentUpload',
        data: formData,
        headers: { 'x-l-token': 'xxxxx' },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {

            if (data.Result == "Success")
            {
                $("#divLoading").css("display", "none");
                $.confirm({
                    title: 'Message',
                    content: data.Message,
                    type: 'green',
                    typeAnimated: true,
                    buttons:
                    {
                        Ok: function () {
                            bindDocument();
                            $("#Attachmentfile").val('');
                            $("#AttachmentId").val('');
                            $("#AttachmentDocumentInfo").val("");
                        }
                    }
                });
            }
            else if (data.Result == "Error")
            {
                $("#divLoading").css("display", "none");
                $.alert(
                    {
                        title: 'Message!',
                        type: 'red',
                        content: data.Message
                    });

            }
            else if (data.Result == "InvalidRequest")
            {
                $("#divLoading").css("display", "none");

                $.confirm({
                    title: 'Message',
                    content: data.Message,
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        Ok: function () {
                            window.location.href = data.Path;
                        }
                    }
                });
            }
        }

    });

}

$(document).ready(function() {

    $("#btnContinue").click(function ()
    {
        SubmitDocuments();
    });

});

function SubmitDocuments()
{
    $("#divLoading").css("display", "block");
    var formData = new FormData();
    var token = $('input[name="__RequestVerificationToken"]').val();
    formData.append("__RequestVerificationToken", token);
    formData.append("IsEdistrict", $("#IsEdistrict").val());
    formData.append("ServiceId", $("#ServiceId").val());
    formData.append("ApplicationId", $("#ApplicationId").val());
    formData.append("Pageinfo", $("#Pageinfo").val());

    $.ajax({
        type: "POST",
        url: '/Service/ScrutinyDocument/SubmitDocument',
        data: formData,
        headers: { 'x-l-token': 'xxxxx' },
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (data) {

            if (data.Result == "Success")
            {
                $("#divLoading").css("display", "none");
                $.confirm({
                    title: 'Message',
                    content: data.Message,
                    type: 'green',
                    typeAnimated: true,
                    buttons:
                    {
                        Ok: function () {
                            window.location.href = data.Path;
                        }
                    }
                });
            }
            else if (data.Result == "Error") {
                $("#divLoading").css("display", "none");
                $.alert(
                    {
                        title: 'Message!',
                        type: 'red',
                        content: data.Message
                    });

            }
            else if (data.Result == "InvalidRequest") {
                $("#divLoading").css("display", "none");
                $.confirm({
                    title: 'Message',
                    content: data.Message,
                    type: 'green',
                    typeAnimated: true,
                    buttons: {
                        Ok: function () {
                            window.location.href = data.Path;
                        }
                    }
                });
            }
        }

    });
}

