$(document).ready(function () {
    $('#update-skin').on('click', function (evt) {
        $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            url: "./updateskin",
            data: "skin=" + $("#new-skin").val(),
            beforeSend: function (datos) {
                $('#update-skin').attr('disabled', 'true');
                $('#send').html('<i class="fa fa-spinner fa-spin fa-fw"></i> Actualizando..');
            },
            success: function (datos) {
                console.log(datos);
                $('#update-skin').removeAttr('disabled');
                $('#send').html('<i class="fa fa-check"></i> Actualizar');
                $('.answerstyle').html(datos.answer);
            },
            error: function (datos) {
                $('#update-skin').removeAttr('disabled');
                $('#send').html('<i class="fa fa-warning"></i> Actualizar');
                $('.answerstyle').html('<code>' + datos.responseText + '</code>');
                console.log(datos);
            }
        });
    });
    $('.change-skin').on('click', function (evt) {
        var dataskin = $(this).attr('data-skin')
        var boxskin = $(this).attr('box-skin')
        evt.preventDefault();
        // console.log(boxskin);
        $("body").removeClass();
        $("body").addClass(dataskin);
        $("body").addClass('sidebar-mini');
        $("#new-skin").val(dataskin);
    });
    $('#change-psw').on('submit', function (evt) {
        evt.preventDefault();
        ruta = "./changepass"
        data = $(this).serialize()
        $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            url: ruta,
            data: data,
            beforeSend: function (datos) {
                $('.send').attr('disabled', 'true');
                $('.send').html('<i class="fa fa-spinner fa-spin fa-fw"></i> Cambiando..');
            },
            success: function (datos) {
                $('.send').html('Cambiar');
                if (datos.success) {
                    $('.help').removeClass('text-danger');
                    $('.help').addClass('text-success');
                } else {
                    $('.help').addClass('text-danger');
                    $('.help').removeClass('text-success');
                }
                $('.help').html(datos.answer);
            },
            error: function (datos) {
                $('.send').html('Cambiar');
                console.log("Error");
                console.log(datos);
            }
        });
    });
    $('.pass').keyup(function () {
        // console.log($('.password').val());
        // console.log($('.re-password').val());
        if ($('.password').val() != '' && $('.password').val().length > 5) {
            if ($('.password').val() == $('.re-password').val()) {
                $('.help').removeClass('text-danger');
                $('.help').addClass('text-success');
                $('.re-icon-pass').css('color', '#3c763d');
                $('.help').html('Contraseñas coinciden');
                $('.re-icon-pass').removeClass('glyphicon-lock');
                $('.re-icon-pass').removeClass('glyphicon-remove');
                $('.re-icon-pass').addClass('glyphicon-ok');

                $('.send').removeAttr('disabled');
            } else {
                $('.help').removeClass('text-success');
                $('.help').addClass('text-danger');
                $('.re-icon-pass').css('color', '#a94442');
                $('.help').html('Contraseñas no coinciden');
                $('.re-icon-pass').removeClass('glyphicon-lock');
                $('.re-icon-pass').removeClass('glyphicon-ok');
                $('.re-icon-pass').addClass('glyphicon-remove');
                $('.send').attr('disabled', 'true');
            }
        } else {
            $('.help').removeClass('text-success');
            $('.help').addClass('text-danger');
            $('.help').html('Contraseña de 5 caracteres o mas');
            $('send').attr('disabled', 'true');
        }
    });
});
function test() {
    var ruta = './api/' + $('#urlapi').val();
    var username = $('#userapi').val();
    var password = $('#passwordapi').val();
    var datos = $('#datosapi').val();
    $('.answer').html('Cargando...');
    $.ajax({
        async: true,
        type: "POST",
        // dataType: "json",
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password),
        },
        url: ruta,
        data: datos,
        error: function (data) {
            // console.log('error');
            // console.log(data);
            $('.answer').html(data.responseText);
        },
        success: function (data) {
            // console.log('success');
            // console.log(data);
            $('.answer').html(data);
        },
    });
}
function accessapi(change) {
    if (change) {
        var ruta = "./accessapi/newpw";
    } else {
        var ruta = "./accessapi";
    }
    $.ajax({
        async: true,
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        url: ruta,
        data: "s=2",
        success: function (datos) {
            if (datos.success) {
                $('#usapi').html(datos.answer.user);
                $('#pwapi').html(datos.answer.password);
            } else {
                alert(datos.answer);
            }
        }
    });
}
$(document).ready(function () {
    accessapi();
    // console.log($("#test-api"));
    // console.log($("#test-api")[0]);
    var prevsrc = $('#chng-profile').attr('src');;

    $("#test-api").on("submit", function () {

        var tempm = $('#datosapi').val().split("&");
        $('.temp-camp').html('');
        for (i in tempm) {
            var temp = tempm[i].split('=');
            if (temp[0] == 'access_token') {
                temp[1] += '==';
            }
            var html = '<input type="hidden" class="form-control" value="' + temp[1] + '" name="' + temp[0] + '" placeholder="' + temp[0] + '">';
            $('.temp-camp').append(html);
        }
        var ruta = './api/' + $('#urlapi').val();
        var username = $('#userapi').val();
        var password = $('#passwordapi').val();
        var formData = new FormData($("#test-api")[0]);
        console.log(formData);
        $('.answer').html('Cargando...');
        $.ajax({
            url: ruta,
            type: "POST",
            dataType: "html",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password),
            },
            data: formData,
            contentType: false,
            processData: false,
            error: function (data) {
                console.log('error');
                console.log(data);
                $('.answer').html(data.responseText);
            },
            success: function (data) {
                console.log('success');
                console.log(data);
                $('.answer').html(data);
            },
        });
        return false;
    });
});
function justNumbers(e) {
    var keynum = window.event ? window.event.keyCode : e.which;
    if ((keynum == 8) || (keynum == 46))
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}
function clearjQueryCache() {
    for (var x in jQuery.cache) {
        delete jQuery.cache[x];
    }
}
function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.my-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$('#chng-fa-clo').click(function () {
    $('.my-img').attr('src', prevsrc);
    $("#chng-fa-clo").css('display', 'none');
    $("#chng-fa-sav").css('display', 'none');
});

$("#chang-img").on("change", function () {
    mostrarImagen(this);
    $("#chng-fa-clo").css('display', 'block');
    $("#chng-fa-sav").css('display', 'block');
});
$('#chng-fa-cam').click(function () {
    $("#chang-img").click();
});

$('.main-sidebar').on('click', '.addmenu', function () {
    window.location = $(this).attr('href');
})
$('#chng-fa-sav').click(function () {
    var formData = new FormData($("#chng-form")[0]);
    var ruta = "./imgprofile";
    $("#chng-fa-sav").removeClass('fa-save');
    $("#chng-fa-sav").addClass('fa-spinner');
    $("#chng-fa-sav").attr('data-original-title', 'Cargando..');
    $.ajax({
        url: ruta,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (datos) {
            console.log(datos);
            if (!datos) {
                $('.my-img').attr('src', prevsrc);
            }
            $("#chng-fa-sav").removeClass('fa-spinner');
            $("#chng-fa-sav").addClass('fa-save');
            $("#chng-fa-sav").attr('data-original-title', 'Guardar Imagen"');
            $("#chng-fa-clo").css('display', 'none');
            $("#chng-fa-sav").css('display', 'none');
        }
    });
});
$(function () {
    $(".select2").select2();
    $(".select2-container").css('width', '100%');

    $('.slimscroll').slimScroll();
    $('.scroll').slimScroll({
        height: 40
    });
    $('[name="alias"]').keyup(function (key) {
        if (key.keyCode == 32) {
            $(this).val($(this).val().replace(' ', '-'));
        }
    });
    $('[name="alias"]').keypress(function (key) {
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
            && (key.charCode < 65 || key.charCode > 90) //letras minusculas
            && (key.charCode != 32) //espacio
            && (key.charCode != 45) //guion 
        )
            return false;
    });
    //Initialize Select2 Elements
    // //Datemask dd/mm/yyyy
    // $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
    // //Datemask2 mm/dd/yyyy
    // $(".form-control").inputmask("mm/dd/yyyy", {"placeholder": "mm/dd/yyyy"});
    // //Money Euro
    $("[data-inputmask]").inputmask("dd/mm/yyyy", { placeholder: "dd/mm/aaaa" });
    $("[data-inputtime]").inputmask("h:s t", { placeholder: "hh:mm -m" });
    $("[data-inputdatetime]").inputmask("datetime12", { placeholder: "dd/mm/aaaa hh:mm xm" });
    $("[data-mask]").inputmask();
    // $('[data-toggle="tooltip"]').tooltip();
    $('[intlTelInput]').intlTelInput({
        //allowExtensions: true,
        //            autoFormat: true,
        //autoHideDialCode: false,
        //            autoPlaceholder: true,
        //defaultCountry: "auto",
        //                    ipinfoToken: "yolo",
        nationalMode: false,
        numberType: "MOBILE",
        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
        preferredCountries: ['ve'],
        utilsScript: "<?= $this->url ?>/plugins/intlTelInput/libphonenumber/build/utils.js"
    });
    $('[title]').tooltip();

    $(".fancybox").fancybox(
        {
            maxWidth: '85%',
            maxHeight: '85%',
            fitToView: false,
            width: '85%',
            height: '85%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none'
        }
    );
    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    $('.callout-close').click(function () {
        $('.callout-content').slideUp();
    });
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    // CKEDITOR.replace('editor1');
    //bootstrap WYSIHTML5 - text editor
    $("textarea").addClass('textarea');
    $("#answer").removeClass('textarea');
    // $("textarea").addClass('');
    // $(".textarea").wysihtml5();

    $("[colorpicker]").colorpicker();

    $('[timepicker]').timepicker();
    // $("textarea").summernote({
    // height: 150,   //set editable area's height
    // codemirror: { // codemirror options
    // theme: 'monokai'
    // }
    // });

    $("textarea").froalaEditor({
        // Set the language code.
        language: 'es',
        height: 100,
    })

});