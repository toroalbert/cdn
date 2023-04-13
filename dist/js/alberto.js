$(document).ready(function() {
    $('#update-skin').on('click', function(evt) {
        $.ajax({
            async: true,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            url: "./updateskin",
            data: "skin=" + $("#new-skin").val(),
            beforeSend: function(datos) {
                $('#update-skin').attr('disabled', 'true');
                $('#send').html('<i class="fa fa-spinner fa-spin fa-fw"></i> Actualizando..');
            },
            success: function(datos) {
                // console.log(datos);
                $('#update-skin').removeAttr('disabled');
                $('#send').html('<i class="fa fa-check"></i> Actualizar');
                $('.answerstyle').html(datos.answer);
            },
            error: function(datos) {
                $('#update-skin').removeAttr('disabled');
                $('#send').html('<i class="fa fa-warning"></i> Actualizar');
                $('.answerstyle').html('<code>' + datos.responseText + '</code>');
                // console.log(datos);
            }
        });
    });
    $('.change-skin').on('click', function(evt) {
        var dataskin = $(this).attr('data-skin')
        var boxskin = $(this).attr('box-skin')
        evt.preventDefault();
        $("body").removeClass();
        $("body").addClass(dataskin);
        $("body").addClass('sidebar-mini');
        $("#new-skin").val(dataskin);
    });
    $('#change-psw').on('submit', function(evt) {
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
            beforeSend: function(datos) {
                $('.send').attr('disabled', 'true');
                $('.send').html('<i class="fa fa-spinner fa-spin fa-fw"></i> Cambiando..');
            },
            success: function(datos) {
                $('.send').html('Cambiar');
                if (datos.success) {
                    $('.help').removeClass('text-danger');
                    $('.help').addClass('text-success');
                } else {
                    $('.help').addClass('text-danger');
                    $('.help').removeClass('text-success');
                }
                $('.send').removeAttr('disabled');
                $('.help').html(datos.answer);
            },
            error: function(datos) {
                $('.send').removeAttr('disabled');
                $('.send').html('Cambiar');
                $('.help').addClass('text-danger');
                $('.help').removeClass('text-success');
                $('.help').html("Error al cambiar de contraseña, intente mas tarde!");
            }
        });
    });
    $('.pass').keyup(function() {
        if ($('.last-password').val() != '' && $('.password').val().length > 5) {
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
        } else {
            $('.help').removeClass('text-success');
            $('.help').addClass('text-danger');
            $('.help').html('Debe ingresar COntraseña Actual');
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
        dataType: "html",
        contentType: "application/x-www-form-urlencoded",
        headers: {
            "Authorization": "Basic " + btoa(username + ":" + password),
        },
        url: ruta,
        data: datos,
        error: function(data) {
            // console.log('error');
            // console.log(data);
            $('.answer').html(data.responseText);
        },
        success: function(data) {
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
        success: function(datos) {
            if (datos.success) {
                $('#usapi').html(datos.answer.user);
                $('#pwapi').html(datos.answer.password);
            } else {
                alert(datos.answer);
            }
        }
    });
}
$(document).ready(function() {
    $('#sendapi').click(function() {
        $('#collapseTwo').removeClass('in');
        $('#collapseThree').addClass('in');
    });
    accessapi();
    $("#test-api").on("submit", function() {
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
        // console.log(formData);
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
            error: function(data) {
                // console.log('error');
                // console.log(data);
                $('.answer').html(data.responseText);
            },
            success: function(data) {
                // console.log('success');
                // console.log(data);
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
        reader.onload = function(e) {
            $('.my-img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$('#chng-fa-clo').click(function() {
    $('.my-img').attr('src', $('#chng-profile').attr('nowsrc'));
    $("#chng-fa-clo").css('display', 'none');
    $("#chng-fa-sav").css('display', 'none');
});

$("#chang-img").on("change", function() {
    mostrarImagen(this);
    $("#chng-fa-clo").css('display', 'block');
    $("#chng-fa-sav").css('display', 'block');
});
$('#chng-fa-cam').click(function() {
    $("#chang-img").click();
});

$('.main-sidebar').on('click', '.addmenu', function() {
    window.location = $(this).attr('href');
})
$('#chng-fa-sav').click(function() {
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
        success: function(datos) {
            // console.log(datos);
            if (!datos) {
                $('.my-img').attr('src', $('#chng-profile').attr('nowsrc'));
            }
            $("#chng-fa-sav").removeClass('fa-spinner');
            $("#chng-fa-sav").addClass('fa-save');
            $("#chng-fa-sav").attr('data-original-title', 'Guardar Imagen"');
            $("#chng-fa-clo").css('display', 'none');
            $("#chng-fa-sav").css('display', 'none');
        }
    });
});
$(function() {
    $(".sortable").sortable();
    $(".sortable").disableSelection();

    $(".selectable").selectable();

    var availableTags = [
        "authentication ",
        "login ",
        "camp/alias_de_menu ",
    ];
    $("#urlapi").autocomplete({
        source: availableTags
    });

    $(".select2").select2();
    $(".select2-container").css('width', '100%');

    $('.slimscroll').slimScroll();
    $('.scroll').slimScroll({
        height: 40
    });
    $('[name="alias"]').keyup(function(key) {
        if (key.keyCode == 32) {
            $(this).val($(this).val().replace(' ', '-'));
        }
    });
    $('[name="alias"]').keypress(function(key) {
        if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
            &&
            (key.charCode < 65 || key.charCode > 90) //letras minusculas
            &&
            (key.charCode != 32) //espacio
            &&
            (key.charCode != 45) //guion
        )
            return false;
    });
    $("[data-inputmask]").inputmask("dd/mm/yyyy", {
        placeholder: "dd/mm/aaaa"
    });
    $("[data-inputtime]").inputmask("h:s t", {
        placeholder: "hh:mm -m"
    });
    $("[data-inputdatetime]").inputmask("datetime12", {
        placeholder: "dd/mm/aaaa hh:mm xm"
    });
    $("[data-mask]").inputmask();
    $('[intlTelInput]').intlTelInput({
        nationalMode: false,
        numberType: "MOBILE",
        preferredCountries: ['ve'],
        // utilsScript: "<?= $this->url ?>/plugins/intlTelInput/libphonenumber/build/utils.js"
    });
    $('[title]').tooltip();
    $(".fancybox").fancybox({
        maxWidth: '85%',
        maxHeight: '85%',
        fitToView: false,
        width: '85%',
        height: '85%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    $('.callout-close').click(function() {
        $('.callout-content').slideUp();
    });
    $("textarea").addClass('textarea');
    $("#answer").removeClass('textarea');
    $("[colorpicker]").colorpicker();
    $('[timepicker]').timepicker();
    // $("textarea").froalaEditor({
    //     language: 'es',
    //     height: 100,
    // })
});
$('body').on('click', '.comments-press', function() {
    $('.comments-' + $(this).attr('comments')).addClass('comments-show');
});

function menufilter() {
    // Declare variables
    // var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    if ($('#filter').val()) {
        $('#filter-result').css('display', "block");
        $('#filter-result').html('');
        $('#filter-result').append($('#mainmenu').html());
        // $('#filter-result .pull-right').remove();
        $('#mainmenu > li > ul').each(function(e) {
            $('#filter-result').append($(this).html());
        });
        $('#filter-result > li > ul').remove();
        // $('#filter-result [href="#"]:parent(1)').remove();
        $('#filter-result [href="#"]').parent().remove();
        // $('#filter-result').append($('#mainmenu > li > ul').html());
        $('#mainmenu').css('display', "none");
    } else {
        $('#filter-result').css('display', "none");
        $('#mainmenu').css('display', "block");
    }
    ul = document.getElementById("filter-result");
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

var doc = new jsPDF();

$('body').on('click', '#cmd', function() {
    genPDF();

    // doc.fromHTML($('#mainpdf').html(), 15, 15, {
    //     'width': 800,
    //     'elementHandlers': specialElementHandlers
    // });
    // doc.save('sample-file.pdf');
});

function genPDF() {
    html2canvas($('#mainpdf'), {
        onrendered: function(canvas) {
            var img = canvas.toDataURL("image/jpeg");
            // var doc = new jsPDF();
            // console.log(canvas);
            // console.log(img);
            $('#test').html(canvas);
            // $('#test').html('<img src="' + img + '" alt="Canvas img"></img>');
            // window.open(img);

            // console.log('Ancho: ' + canvas.width + ' Alto: ' + canvas.height);
            doc.addImage(img, 'JPEG', 15, 15, 160, 160);
            var specialElementHandlers = {
                // '#editor': function (element, renderer) {
                //     return true;
                // }
            };
            // doc.fromHTML($('#mainpdf').html(), 15, 15, {
            //     'width': 170,
            //     'elementHandlers': specialElementHandlers
            // });
            doc.save('test.pdf');
        }
    });
}

function copyToClipboard(elemento) {
    // $(this).append('copidao');
    var $temp = $("<input>")
    $("body").append($temp);
    $temp.val($(elemento).text()).select();
    document.execCommand("copy");
    $temp.remove();
}
// $('body').on('click', '.my-profile', function () {
//     window.location.href = "./profile";
// })