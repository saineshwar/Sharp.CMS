
$(document).ready(function () {

    $("#btnGenerateEOTP").click(function () {


        $.confirm({
            title: 'Message',
            content: "Do you Want to Generate Email Verification Token",
            type: 'green',
            typeAnimated: true,
            buttons: {
                Ok: function () {
                    $.ajax({
                        type: "POST",
                        url: "/Service/Onboarding/GenerateEmailVerificationToken",
                        dataType: "json",
                        success: function (data) {
                            if (data == "success") {
                                $.alert({
                                    title: 'Alert!',
                                    content: 'Email Verification Token Sent Successfully!',
                                });
                            }
                        }
                    });
                },
                Cancel: function () {
                    $.alert('Canceled!');
                }
            }
        });



    });

    $("#btnGenerateMOTP").click(function ()
    {
        $.confirm({
            title: 'Message',
            content: "Do you Want to Generate Mobile Verification Token",
            type: 'green',
            typeAnimated: true,
            buttons: {
                Ok: function ()
                {
                    $.ajax({
                        type: "POST",
                        url: "/Service/Onboarding/GenerateMobileVerificationToken",
                        dataType: "json",
                        success: function(data) {
                            if (data == "success") {
                                $.alert({
                                    title: 'Alert!',
                                    content: 'Mobile Token Sent Successfully!',
                                });

                            }
                        }
                    });
                },
                Cancel: function () {
                    $.alert('Canceled!');
                }
            }
        });
    });

    $("#btnValidateMOTP").click(function ()
    {
        $.confirm({
            title: 'Message',
            content: "Do you Want to Validate Mobile Verification Token",
            type: 'green',
            typeAnimated: true,
            buttons: {
                Ok: function ()
                {
                    var serializedForm = $("#frmMobile").serialize();
                    $.ajax({
                        type: "POST",
                        url: "/Service/Onboarding/VerifyMobile",
                        data: serializedForm,
                        success: function (data) {
                            if (data.Result == "Success") {
                                $.alert({
                                    title: 'Alert!',
                                    type: 'green',
                                    content: data.Message,
                                });
                                window.location.reload();
                            } else {
                                $.alert({
                                    title: 'Alert!',
                                    type: 'red',
                                    content: data.Message,
                                });
                            }
                        }
                    });
                },
                Cancel: function () {
                    $.alert('Canceled!');
                }
            }
        });



      
    });

    $("#btnValidateEOTP").click(function () {

        $.confirm({
            title: 'Message',
            content: "Do you Want to Validate Email Verification Token",
            type: 'green',
            typeAnimated: true,
            buttons: {
                Ok: function () {

                    var serializedForm = $("#frmEmail").serialize();

                    $.ajax({
                        type: "POST",
                        url: "/Service/Onboarding/VerifyEmail",
                        data: serializedForm,
                        success: function (data) {
                            if (data.Result == "Success") {
                                $.alert({
                                    title: 'Alert!',
                                    type: 'green',
                                    content: data.Message,
                                });
                                window.location.reload();
                            }
                            else {
                                $.alert({
                                    title: 'Alert!',
                                    type: 'red',
                                    content: data.Message,
                                });
                            }
                        }
                    });
                },
                Cancel: function () {
                    $.alert('Canceled!');
                }
            }
        });





    });

});
