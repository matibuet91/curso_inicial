// alert('Hola mundo')
// document.addEventListener('DOMContentLoaded', function () {
//     //accediento al nodo por id
//     var elemento = document.getElementById("porId");
//     elemento.innerHTML = 'Elemento por id'

//     //accediento al nodo por nombre
//     var parrafo = document.getElementsByTagName("span");
//     parrafo[0].innerHTML = 'Elemento por etiqueta'

//     //accediento al nodo por clase
//     var nombre = document.getElementsByName("porNombre");
//     nombre[0].innerHTML = 'Elemento por nombre'

//     //accediento al nodo por etiqueta
//     var clase = document.getElementsByClassName("porClase");
//     clase[0].innerHTML = 'Elemento por Clase'

//     // createElement
//     var elementNode = document.createElement('p');
//     // createTextNode
//     var textNode = document.createTextNode('Saludos');

//     elementNode.appendChild(textNode);
//     document.body.appendChild(elementNode);

//     var padre = document.getElementById("top");
//     var hijo = document.getElementById("eliminar");
//     padre.removeChild(hijo);
// }, false);

//ESTOS SERAN NUESTROS DATOS.
var productos = ["Antivirus", "Grafica", "Disco duro", "Ordenador", "Bolso portatil", "Portatil", "Memoria RAM", "Router Linux", "Sintonizadora TV"];
var imgGrandes = ["imagenes/productos/1.jpg", "imagenes/productos/2.jpg", "imagenes/productos/3.jpg", "imagenes/productos/4.jpg", "imagenes/productos/5.jpg", "imagenes/productos/6.jpg", "imagenes/productos/7.jpg", "imagenes/productos/8.jpg", "imagenes/productos/9.jpg"];
var imgPeque = ["imagenes/productos/1m.jpg", "imagenes/productos/2m.jpg", "imagenes/productos/3m.jpg", "imagenes/productos/4m.jpg", "imagenes/productos/5m.jpg", "imagenes/productos/6m.jpg", "imagenes/productos/7m.jpg", "imagenes/productos/8m.jpg", "imagenes/productos/9m.jpg"];
var precios = [33, 169, 36, 360, 11, 540, 21, 66, 25];
var stock = [5, 2, 8, 3, 10, 4, 3, 1, 2];
var precioTransporte = [6, 12, 20, "gratis"];
var IVA = 0.21;
var uniUser;
function validaLasUnidades(){
    alert('ejecuto funcion');
    let todoBien = true;
    uniUser = document.getElementsByName('uniUser');

    for (let i = 0; i < productos.length; i++) {
        if(uniUser[i].value == "" || uniUser[i].value < 0 || uniUser[i].value > stock[i] ){
            todoBien = false;
            uniUser[i].className= "uniMal";

            document.getElementById('todo').className= "todoNo";
            $('#todo').addClass('todoNo');
            document.getElementById('menu').className="menuNo";
            document.getElementById('divZonaCompra').className="divZonaComprarNo";
            document.getElementById("divTotal").className = "divsNo";
            document.getElementById("divDatos").className = "divsNo";
            document.getElementById("divPago").className = "divsNo";

            document.getElementById('botonDatos').disabled= true;

            return;
        }
        else{
            todoBien= true;
            uniUser[i].className = "uniBien";
            calculaElTotal();
        }
    }    
}
function calculaElTotal(){
    //Añade el encabezado de la tabla
    document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';

    let carroTotal =0;
    let numProductos =0;
    for (let i = 0; i < productos.length; i++) {
        let tablaTotal = document.getElementById('tablaTotal').innerHTML;
        let preTotal = 0;
        if (uniUser[i].value !=0){
            numProductos++;

            document.getElementById("todo").className = "todoSi";
            document.getElementById("menu").className = "menuSi";
            document.getElementById('divZonaCompra').className="divZonaCompraSi";
            document.getElementById("divTotal").className = "divsSi";
	        document.getElementById("divDatos").className = "divsNo";
        	document.getElementById("divPago").className = "divsNo";

            document.getElementById('botonDatos').disabled= false;

            preTotal = precios[i] * uniUser[i].value;
            carroTotal = carroTotal + preTotal;

            document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td>' +productos[i]+ '</td><td>' +uniUser[i].value+ '</td><td>' +precios[i]+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
        }
    }

    //precio del transporte
    var precioTransporteAPagar;
    if (numProductos <=2){
        precioTransporteAPagar = precioTransporte[0];
    }
    else if (numProductos <=3){
        precioTransporteAPagar = precioTransporte[1];
    }
    else if (numProductos <=4){
        precioTransporteAPagar = precioTransporte[2];
    }
    else if (numProductos >=5){
        precioTransporteAPagar = precioTransporte[3];
    }

    //incorporamos el precio al monto total
    var totalTransporte = precioTransporteAPagar;
    if(totalTransporte == 'gratis'){
        var totalIVA = (carroTotal * IVA);
        var totalAPagar = carroTotal + totalIVA;
    }
    else{
        var totalIVA = ((carroTotal + totalTransporte) * IVA);
        var totalAPagar = carroTotal + totalTransporte + totalIVA;
    }
    
    //limitar a 2 los decimales a mostrar del IVA
    totalIVA = totalIVA*100;
    totalIVA = Math.floor(totalIVA);
    totalIVA = totalIVA/100;

    //limitar a 2 los decimales del total a pagar
    totalAPagar = totalAPagar*100;
    totalAPagar = Math.floor(totalAPagar);
    totalAPagar = totalAPagar*100;

    tablaTotal = document.getElementById('tablaTotal').innerHTML;
    document.getElementById('tablaTotal').innerHTML = tablaTotal +
    '<tr><td></td><td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' +totalTransporte+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +totalIVA+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +totalAPagar+ ' $</b></td></tr>';

}
function pideDatos(){
    document.getElementById('divTotal').className = 'divsNo';
    document.getElementById('divDatos').className = 'divsSi';
    document.getElementById('divPago').className = 'divsNO';
    document.getElementById('botonPago').disabled = false;
}
function validaDatosPersonales(){
    var todoBien = true;

    //nombre
    var vNombre = document.getElementById('nombre').value;
    if(vNombre ==null || vNombre.length==0 || !isNaN(vNombre)){
        todoBien =false;
        document.getElementById('nombre').className = 'textMal';
    }
    else{
        document.getElementById('nombre').className = 'textBien';
    }

    //Fecha de nacimiento DIA:
    var vFechaNacimientoDia = document.getElementById("fechaNacimientoDia").selectedIndex;
    if( vFechaNacimientoDia == null || vFechaNacimientoDia == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoDia").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoDia").className = "textBien";
    }

    //Fecha de nacimiento MES:
    var vFechaNacimientoMes = document.getElementById("fechaNacimientoMes").selectedIndex;
    if( vFechaNacimientoMes == null || vFechaNacimientoMes == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoMes").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoMes").className = "textBien";
    }

    //Fecha de nacimiento AÑO:
    var vFechaNacimientoAnio = document.getElementById("fechaNacimientoAnio").selectedIndex;
    if( vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0 ) {
        todoBien=false;
        document.getElementById("fechaNacimientoAnio").className = "textMal";
    }
    else{
        document.getElementById("fechaNacimientoAnio").className = "textBien";
    }

    //Telefono:
    var vMovil = document.getElementById("movil").value;
    if( !(/^\d{9}$/.test(vMovil))  ) {
        todoBien=false;
        document.getElementById("movil").className = "textMal";
    }
    else{
        document.getElementById("movil").className = "textBien";
    }


    //email:
    var vEmail1 = document.getElementById("email1").value;
    var vEmail2 = document.getElementById("email2").value;

    //email 1
    if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1)) ) {
        todoBien=false;
        document.getElementById("email1").className = "textMal";
    }
    else{
        document.getElementById("email1").className = "textBien";
    }

    //email 2
    if( !(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2)) ) {
        todoBien=false;
        document.getElementById("email2").className = "textMal";
    }
    else{
        document.getElementById("email2").className = "textBien";
    }

    //Comparacion email 1 y 2
    if (vEmail1 != vEmail2){
        todoBien=false;
        document.getElementById("email2").className = "textMal";
    }

    //Nombre Via(calle):
    var vViaNombre = document.getElementById("viaNombre").value;
    if( vViaNombre == null || vViaNombre.length == 0) {
        todoBien=false;
        document.getElementById("viaNombre").className = "textMal";
    }
    else{
        document.getElementById("viaNombre").className = "textBien";
    }	
    
    //Via Numero:	
    var vViaNumero = document.getElementById("viaNumero").value;
    if( vViaNumero=="" || isNaN(vViaNumero) ) {
        todoBien=false;
        document.getElementById("viaNumero").className = "textMal";
    }	
    else{
        document.getElementById("viaNumero").className = "textBien";
    }

    //Localidad:
    var vLocalidad = document.getElementById("localidad").value;
    if( vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
        todoBien=false;
        document.getElementById("localidad").className = "textMal";
    }
    else{
        document.getElementById("localidad").className = "textBien";
    }
  
    //Codigo Postal:	
    var vCodigoPostal = document.getElementById("codigoPostal").value;
    if( vCodigoPostal.length > 5 || vCodigoPostal=="" || isNaN(vCodigoPostal) ) {
        todoBien=false;
        document.getElementById("codigoPostal").className = "textMal";
    }
    else{
        document.getElementById("codigoPostal").className = "textBien";
    }

    //Provincia:
    var vProvincia = document.getElementById("provincia").selectedIndex;
    if( vProvincia == null || vProvincia == 0 ) {
        todoBien=false;
        document.getElementById("provincia").className = "textMal";
    }
    else{
        document.getElementById("provincia").className = "textBien";
    }

    //if(todoBien == true){
    if(todoBien){
        pideDatosPago();
    }
    else{
        document.getElementById('botonConfirmar').disabled = true;
    }
}
function pideDatosPago(){
    document.getElementById('divTotal').className = 'divsNo';
    document.getElementById('divDatos').className = 'divsNo';
    document.getElementById('divPago').className = 'divsSI';
    document.getElementById('botonConfirmar').disabled = false;
}
function validaDatosPago(){
    var todoBien = true;

    //titular de cuenta
    var vTitular = document.getElementById('titular').value;
    if(vTitular == null || vTitular.length == 0 ||/^\s+$/.test(vTitular) || !isNaN(vTitular)){
        todoBien = false;
        document.getElementById('titular').className='textMal';
    }
    else{
        document.getElementById('titular').className='textBien';
    }

    ////Tipo de tarjeta:
    var vTarjetas = document.getElementsByName("tarjetas");
    var seleccionado = false;
    for(var i=0; i<vTarjetas.length; i++) {
        if(vTarjetas[i].checked == true) {
            seleccionado = true;
            //break;
        }
    }

    //estas dos condiciones son iguales, ambas preguntan por true
    //if(!seleccionado == true) {
    if(!seleccionado) {
        todoBien=false;
        document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
    }
    else{
        document.getElementById("alertTipoDeTarjeta").className = "";
    }	

    //Numero de tarjeta:	
    var vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
    if( vNumeroTarjeta.length!=16 || vNumeroTarjeta=="" || isNaN(vNumeroTarjeta) ) {
        todoBien=false;
        document.getElementById("numeroTarjeta").className = "textMal";
    }	
    else{
        document.getElementById("numeroTarjeta").className = "textBien";
    }
    
    //CVC de la tarjeta:	
    var vCvcTarjeta = document.getElementById("cvcTarjeta").value;
    if( vCvcTarjeta.length!=3 || vCvcTarjeta=="" || isNaN(vCvcTarjeta) ) {
        todoBien=false;
        document.getElementById("cvcTarjeta").className = "textMal";
    }	
    else{
        document.getElementById("cvcTarjeta").className = "textBien";
    }

    //Fecha de tarjeta MES:
    var vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
    if( vMesTarjeta == null || vMesTarjeta == 0 ) {
        todoBien=false;
        document.getElementById("mesTarjeta").className = "textMal";
    }
    else{
        document.getElementById("mesTarjeta").className = "textBien";
    }	

    //Fecha de tarjeta AÑO:
    var vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
    if( vAnioTarjeta == null || vAnioTarjeta == 0 ) {
        todoBien=false;
        document.getElementById("anioTarjeta").className = "textMal";
    }
    else{
        document.getElementById("anioTarjeta").className = "textBien";
    }

    if(todoBien){
        validaDatosPagoYEnviaCarro();
    }

}
function validaDatosPagoYEnviaCarro(){
    alert('Gracias por su compra, en 24 horas tendra su pedido \nAhora sera redirigido a la pagina de inicio.');
    window.location.reload();
}
function fechaNacimientoAnio(anio){
    for(let i=anio; i>=(anio-100); i--){
        document.getElementById('fechaNacimientoAnio').innerHTML = 
        document.getElementById('fechaNacimientoAnio').innerHTML + '<option value="'+ i + '">' + i + '</option>';
    }
}
document.addEventListener('DOMContentLoaded', function () {

    // var persona = 
    // {
    //     nombre: "Matias",
    //     edad: 31,
    //     altura: 1.80,
    //     soltero: true,
    //     fechaNacimiento: '01/06/1991'
    // };

    // var unObjetoVacio ={};

    // console.log(persona.nombre);

    // console.log('Objeto vacio', unObjetoVacio);

    // unObjetoVacio = {
    //     nuevoValor: 10
    // }

    // console.log('objeto lleno', unObjetoVacio);

    // var diasMes ={
    //     enero: 31,
    //     febrero: 28,
    //     marzo: 31,
    //     abril: 30,
    //     mayo: 31
    // }

    // //bucle de un objeto
    // for(let item in diasMes){
    //     console.log('Dias del mes ' + item + ': ' + diasMes[item]);
    // }

    //objeto dentro de un objeto
//    var persona2 = {
//       estudios:{
//         js:true,
//         html:true,
//         java:false,
//         fechaEstudio:'01/01/2015',
//         segundo:{
//             otroDato:'undatomas'
//         },
//         array: ['valor1','valor2','valor3', 'valor4'],
//         arrayDeObjetos:[
//             {
//                 valor1: 10,
//                 valor2: 15,
//                 valor3: 30
//             },
//             {
//                 valor4: 50,
//                 valor5: 60,
//                 valor6: 70
//             }
//         ]
//       }
//     }
//     console.log('Array',persona2.estudios.arrayDeObjetos.valor4);

//     console.log('persona2',persona2.estudios.arrayDeObjetos[1].valor4);
      

    // var _productos =
    // [
    //     {
    //         nombre:'Antivirus',
    //         precio:100,
    //         sucursales: [
    //             {
    //                 nombre:'Fravega',
    //                 direccion: 'Mitre 154'
    //             },
    //             {
    //                 nombre:'Musimundo',
    //                 direccion: 'Arenales 100'
    //             }
    //         ]
    //     },
    //     {
    //         nombre:'Notebook',
    //         precio:90100,
    //         sucursales: [
    //             {
    //                 nombre:'Fravega',
    //                 direccion: 'Mitre 154'
    //             }
    //         ]
    //     },
    //     {
    //         nombre:'Bolso',
    //         precio:5000,
    //         sucursales:[{}]
    //     }
    // ]
    // console.log(_productos);
    // var r =  {
    //     ServiceName:'Antivirus',
    //     precio:100,
    //     sucursales: [
    //         {
    //             nombre:'Fravega',
    //             direccion: 'Mitre 154'
    //         },
    //         {
    //             nombre:'Musimundo',
    //             direccion: 'Arenales 100'
    //         }
    //     ]
    // }

    // console.log(r.ServiceName)

    //Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
    var DIVS = document.getElementsByName("DIVS");
    for (let i = 0; i < productos.length; i++) {
        DIVS[i].innerHTML = '<a id="imgG'+i+
        '" href="' +imgGrandes[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +imgPeque[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +productos[i]+ '</span>: <span id="pre'+i+'">' +precios[i]+ '$</span></b></div><div class="stock">Hay en stock <span id="uni'+i+'">' +stock[i]+ '</span> unidades,<br/>¿Cuantas quiere?: <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';  
    }

    var fecha = new Date();
    var anio = fecha.getFullYear();

    fechaNacimientoAnio(anio);

    // console.log('jQuery', $('#fechaNacimientoDia').html());
    // console.log('JS',document.getElementById('fechaNacimientoDia').innerHTML);

    for (let i = 1; i <= 31; i++) {
        $('#fechaNacimientoDia').html( $('#fechaNacimientoDia').html() + '<option value="' + i + '">' + i + '</option>');
        // document.getElementById('fechaNacimientoDia').innerHTML = document.getElementById('fechaNacimientoDia').innerHTML +
        //'<option value="' + i + '">' + i + '</option>';
    }


    for (let i = 1; i <= 12; i++) {
        document.getElementById('mesTarjeta').innerHTML =
        document.getElementById('mesTarjeta').innerHTML +
        '<option value="' + i + '">' + i + '</option>';
    }

    for (let i = anio; i<=(anio+21); i++) {
        document.getElementById('anioTarjeta').innerHTML =
        document.getElementById('anioTarjeta').innerHTML +
        '<option value="' + i + '">' + i + '</option>';
    }

})




function buscarProductos(){
    var xhr = new XMLHttpRequest()
    //configurada la llamada ajax con la url de productos
    xhr.open("GET","https://run.mocky.io/v3/af7220c5-c0dc-45c2-afa0-295aa958d012");
    xhr.send();

    xhr.addEventListener("load",function(){        
        if (xhr.status == 200) {
            console.log('Productos:', xhr.response);
        }
        else if (xhr.status == 201) {
            console.log('Productos:', xhr.response);
        }
        else{

        }
    })
}

function traerMeses(){
    var xhr = new XMLHttpRequest()
    //configurada la llamada ajax con la url de meses
    // xhr.open("GET","https://run.mocky.io/v3/aae68136-bfc4-4411-b8b1-fa06a413def5");

    //esta es una llamada que da error
    xhr.open("GET","https://run.mocky.io/v3/bf6dd6e2-672c-4094-95fc-9b2021314c98");
    xhr.send()

    xhr.addEventListener("load",function(){
        if (xhr.status == 200) {
            console.log('Meses:', xhr.response);
        }
        else{            
            console.log(xhr.response)
        }
    })
    
}

function traerDatos(){
    var llamada = 
    $.get("https://www.charlesbabbage.edu.ar/course/view.php?id=7",
    {
        status:"inactive",
        gender:"male",
        id:379
    }
    ).done(
        function(resp){
            console.log('todo ok', resp)
            resp.forEach(element => {
                console.log('Este es el mes:', element.mes)
            });            
        }
    ).fail(
        function(err){
            console.log('mensaje: ', err.responseJSON.mesagge)
            console.log('el status fue de: ', err.status)
            alert(err.responseJSON.mesagge)
        }
    )    
}

function traerDatosAjaxGet(){
    let name = 'Carlos'
    $.ajax(
        {
            url: "https://gorest.co.in/public/v2/users?name=" + name,
            method:'GET',
            headers: {'Authorization': 'Bearer 95451378e16db59d76be37069523fb715e46f5853e9968340a5e1a2ef164da2b'}
        }
    ).done(
        function(resp){
            console.log('todo ok', resp)
            resp.forEach(element => {
                console.log('Este es el mes:', element.mes)
            });            
        }
    ).fail(
        function(err){
            console.log('mensaje: ', err.responseJSON.mesagge)
            console.log('el status fue de: ', err.status)
            alert(err.responseJSON.mesagge)
        }
    ).always(function( xhr, status ) {
        alert( "The request is complete!" );
    });    
}

function crearUsuarioAjax(){
    $.ajax(
        {
            url: "https://gorest.co.in/public/v2/users",
            method:'POST',
            data: {
                name: "Juan Carlos",
                email: "juan_carlos@gmail.com",
                gender: "male",
                status: "inactive"
            },
            headers: {'Authorization': 'Bearer 95451378e16db59d76be37069523fb715e46f5853e9968340a5e1a2ef164da2b'},
            contentType: "application/json"
        }
    ).done(
        function(resp){
            console.log('todo ok', resp)       
        }
    ).fail(
        function(err){
            console.log('mensaje: ', err.responseJSON.mesagge)
            console.log('el status fue de: ', err.status)
            alert(err.responseJSON.mesagge)
        }
    ).always(function( xhr, status ) {
        alert( "La llamada se ejecuto correctamete!" );
    });    
}

function actualizarUsuarioAjax(){
    $.ajax(
        {
            url: "https://gorest.co.in/public/v2/users/2555",
            method:'PUT',
            data: {
                name: "Juan Carlos",
                email: "juan_carlos@gmail.com",
                gender: "male",
                status: "inactive"
            },
            headers: {'Authorization': 'Bearer 95451378e16db59d76be37069523fb715e46f5853e9968340a5e1a2ef164da2b'}
        }
    ).done(
        function(resp){
            console.log('todo ok', resp)       
        }
    ).fail(
        function(err){
            console.log('mensaje: ', err.responseJSON.mesagge)
            console.log('el status fue de: ', err.status)
            alert(err.responseJSON.mesagge)
        }
    ).always(function( xhr, status ) {
        alert( "La llamada se ejecuto correctamete!" );
    });    
}

function deleteUsuarioAjax(){
    $.ajax(
        {
            url: "https://gorest.co.in/public/v2/users/2562",
            method:'DELETE',
            headers: {'Authorization': 'Bearer 95451378e16db59d76be37069523fb715e46f5853e9968340a5e1a2ef164da2b'}
        }
    ).done(
        function(resp){
            console.log('todo ok', resp)       
        }
    ).fail(
        function(err){
            console.log('mensaje: ', err.responseJSON.mesagge)
            console.log('el status fue de: ', err.status)
            alert(err.responseJSON.mesagge)
        }
    ).always(function( xhr, status ) {
        alert( "La llamada se ejecuto correctamete!" );
    });    
}

function mensajeHola(){
    console.log("Hola Mundo con retraso!");
}

function llamadaEnCola(){
    var xhr = new XMLHttpRequest()
    xhr.open("get","https://jsonplaceholder.typicode.com/users")
    xhr.addEventListener("load",function(){
        if (xhr.status == 200) {
            var usuarios = JSON.parse(xhr.response) //Parseamos el string que nos devuelve la API primero
            var xhr_posts = new XMLHttpRequest()
            xhr_posts.open("get","https://jsonplaceholder.typicode.com/posts?userId="+usuarios[0].id)
            xhr_posts.addEventListener("load",function(){
                if (xhr_posts.status == 200) {
                    var posts = JSON.parse(xhr_posts.response)
                    var xhr_comment = new XMLHttpRequest()
                    xhr_comment.open("get", "https://jsonplaceholder.typicode.com/comments?postId="+posts[0].id)
                    xhr_comment.addEventListener("load",function(){
                        if (xhr_comment.status == 200) {
                            /*Piramid of DOOM*/ var comments = JSON.parse(xhr_comment.response)
                            console.log(comments)
                        }
                    })
                    xhr_comment.send()
                }
            })
            xhr_posts.send()
        }
    })
    xhr.send();
}

function getUsuarios(){
    let miPrimeraPromise = 
    
    new Promise((resolve, reject) => {
        $.get('https://jsonplaceholder.typicode.com/users').done( function(resp) {
            resolve(resp);
        }).fail ( function() {
            reject('Ocurrio un error')
        })
    });

    miPrimeraPromise
    .then(function (val){
        // console.log('Lista usuarios:', val);
        val.forEach(element => {
            getPosts(element.id)
        });
        // getPosts(val[0].id)
    }).catch (function (error){
        console.log('mensaje error', error);
    })
}

function getPosts(idUsuario){
    let resp =  new Promise((resolve, reject) => {
        $.get('https://jsonplaceholder.typicode.com/posts',
        {
            userId: idUsuario
        }
        ).done( function(resp) {
            resolve(resp);
        }).fail ( function() {
            reject('Ocurrio un error')
        })
    });

    resp.then(function(resp) {
        // console.log('Lista de Posts', resp);
        resp.forEach(element => {
            getComentarios(element.id);
        });
        // getComentarios(resp[4].id);
    })
}

function getComentarios(idPost){
    let resp =  new Promise((resolve, reject) => {
        $.get('https://jsonplaceholder.typicode.com/comments',
        {
            postId: idPost
        }
        ).done( function(resp) {
            resolve(resp);
        }).fail ( function() {
            reject('Ocurrio un error')
        })
    });

    resp.then(function(val) {
        // console.log('Lista de comentarios', val);

        // for (let index = 0; index < 1000; index++) {
        //     console.log('contador',index);        
        // }
    })
}

$(document).ready(function(){

    // traerDatosAjaxGet();

    // var nombre = sessionStorage.getItem('Datos');
    // console.log('mis datos: ', JSON.parse( nombre));

    getUsuarios();

    // var myObj = {
    //     name:'Algo',
    //     especie: 'otro'
    // };


    // myObj.name = ''

    // setTimeout( function() { 
    //     mensajeHola()
    // },  0);
    // console.log("Sorpresa!");
    

    // let datosString = JSON.stringify(
    //    [ 
    //     {
    //         name: "Juan Carlos",
    //         email: "juan_carlos@gmail.com",
    //         gender: "male",
    //         status: "inactive"
    //     },
    //     {
    //         name: "Juan Carlos 2",
    //         email: "juan_carlos@gmail.com",
    //         gender: "male",
    //         status: "inactive"
    //     }
    //     ]
    // )

    // console.log( 'Objeto convertido a string', datosString);

    // let datosObjeto = {
    //     name: "Juan Carlos",
    //     email: "juan_carlos@gmail.com",
    //     gender: "male",
    //     status: "inactive"
    // }
    // console.log( 'Objeto', datosObjeto.name);

    // traerDatos();

    // buscarProductos();
    // traerMeses();

    // xhr.addEventListener("readystatechange",function(){
    //     console.log('ReadyState:', xhr.readyState)
    // })

    // traerMesesjQuery('Matias');
    // traerDatosAjaxGet();

    // crearUsuarioAjax();
    // traerDatosAjaxGet();

    // actualizarUsuarioAjax();

    // deleteUsuarioAjax();

    // traerDatos();

    // alert("HTML: " + $("#test").html());
    // alert("Text: " + $("#test").text());
    // alert("Value: " + $("#test2").val());

    // $('#propCheck').click(function(){
    //     console.log($(this).val());
    //     console.log($(this).prop('checked'));
    // });

    // //código jQuery adicional
    // console.log('Cargo correctamente');

    // //selector por elemento
    // document.getElementsByTagName('button');
    // $("button");

    // //selector por id
    // document.getElementById('div4').hide();
    // $('#div4');

    // //selector por class
    // document.getElementsByClassName('ocultarBotones');
    // $('.ocultarBotones');

    // $("button").click(function(){
    //     $("p").hide();
    //     $("#div4").hide();
    //     $('#div4').show();
    //     $('.ocultarBotones').hide();
    // });

    // $('#div4').click(function(){
    //     console.log('hizo click en el div');
    // });

    // $('#div4').mouseenter(function(){
    //     console.log('paso el mouse por arriba');
    // });

    // $('#div4').mouseleave(function(){
    //     console.log('quito el mouse');
    // });

    // //estos 2 son exactamente los mismos
    // $('.ocultarBotones').click(
    //     function(){
    //         console.log('Hizo click en la clase');
    //     }
    // );

    // $(".ocultarBotones").on("click", function(){
    //     console.log('Hizo click en la clase');
    // });
    
    // $(".ocultarBotones").on("mouseleave", function(){
    //     console.log('Hizo mouseleave en la clase');
    // });
    
    // $("#botonPrueba").click(mostrarMensaje());

    // function mostrarMensaje(){
    //     alert('hizo click');
    // }

    $('#indexHtml').click(function(event){
        alert('Deteniendo la funcion original');
        event.preventDefault();
    })

    $('#botonTotal').click( (event)=>  { validaLasUnidades(); }
        // function()
        // {
        //   validaLasUnidades()
        // }
    );

    $('#inputKeyUp').keyup(function(event){
        if(event.key =="Enter"){
            let valorIngresado = $(this).val();
            document.getElementById('#inputKeyUp').value = 'texto nuevo';
            document.getElementById('#inputKeyUp').innerHTML;
            $(this).val('Esto es una prueba');
            $(this).html();
        }
    })


    $("#botonPrueba").on(        
        {
            mouseenter: ()=>{
                $(this).css("background-color", "lightgray");
            }, 
            mouseleave: function(){
                $(this).css("background-color", "lightblue");
            }, 
            click: function(){
                $(this).css("background-color", "yellow");
                var elemt = $('.intro');
                //preguntar si esta visible
                var estado = elemt.is(':visible');
                //preguntar si esta oculto
                //var estado = elemt.is(':hidden');
                //estos son iguales
                //if(!estado)
                if(estado == true)
                    elemt.hide();
                else
                    elemt.show();

                //habilitar con jquery                
                $('#myInput').prop('disabled',false);
                //deshabilitar con jquery
                document.getElementById('botonDatos').disabled= true;
                $('#myInput').prop('disabled',true);
            } 
        }
    
    );

    $('#botonPruebaJquery').on({
        mouseover: function() {
            $(this).addClass('prueba-jquery');
        },
        mouseout: function(){
            $(this).removeClass('prueba-jquery');
        },
        click: function(){
            let estado = $('#propCheck').prop('checked');
            if(estado){
                $('#propCheck').prop('checked',false);
                $('#propCheck').prop('disabled',false);
            }
            else{
                $('#propCheck').prop('checked',true);
                $('#propCheck').prop('disabled',true);
            }
        }
    })
    
});
