$(document).ready(function(){

    // ALERTA SIMPLE
    // swal("OK", "Los datos se guardaron correctamente", "success");

    //ALERT DE PREGUNTA
    // swal({
    //     title: "¿Desea eliminar el registro?",
    //     text: "Luego de eliminarlo el registro no se podra recuperar!",
    //     icon: "warning",
    //     buttons: true,
    //     darngerMode: true,
    //     closeOnClickOutside: false,
    //     closeOnEsc: false,
    // }).then(function(resp) {
    //     if(resp== true){
    //         swal("El registro se elimino correctamente",{
    //             icon: "success",
    //             timer: 3000,
    //             buttons:false
    //         })
    //     }
    // })

    //ALERT USANDO AJAX
    // swal({
    //     title: "¿Desea consultar los registro?",
    //     icon: "warning",
    //     buttons: true,
    //     darngerMode: true
    // }).then(function(resp){
    //    buscarUsuarios(resp);
    // })

    // var htmlElement = document.createElement('input');
    // htmlElement.type="number"

    // var htmlElement2 = document.createElement('input');
    // htmlElement2.type="text"

    // swal({
    //     content: [htmlElement, htmlElement2]
    // });

    // $.toast({
    //     beforeShow: function(){
    //         alert('Antes de toast')
    //     },
    //     heading: 'Information',
    //     text: 'Esto es un mensaje de prueba',
    //     icon: 'error',
    //     loader: false,
    //     position: 'bottom-center',
    //     textAlign: 'center',
    //     allowToastClose: false,
    //     stack: 4, //o con false para que no se puedan apilar
    //     hideAfter: 10000
    // });

    var myToast = $.toast({
        heading: 'Information',
        text: 'Here is some information that will be later on turned to an error',
        icon: 'info',
        hideAfter: false
    });
    
    // Update the toast after three seconds.
    setTimeout(function(){
        myToast.update(
            {
            heading: 'Error',
            text: 'Here is an information that changed to error',
            icon: 'error',
            hideAfter: false
        });
    }, 3000)
})

function buscarUsuarios(resp){
    if (resp){
        $.get('https://jsonplaceholder.typicode.com/users')
        .done( function(resp) {
            swal({
                text: "La informacion se obtuvo correctamente",
                icon: 'success'
            })
        }).fail(function (error){
            swal({
                title: "Ocurrio un error al traer los datos",
                icon: 'error',
                text: error.message
            })
        })
    } else
    {
        swal({
            text: "No se realizo la busqueda",
            icon: 'info'
        })
    }
}