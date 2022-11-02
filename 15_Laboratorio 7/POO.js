$(document).ready(function(){

    class Animales {
        constructor (v_name, v_especie){
            this.nombre = v_name
            this.especie = v_especie
        }

        canta() {

            return `${this.nombre} puede cantar`;
        }
    
        baila() {
            return `${this.nombre} puede bailar`;
        }

        contador(){
            return 10;
        }    
    }

    class Gatos extends Animales {
        constructor(name, especie, colorBigotes){
            super(name,especie),
            this.colorBigotes = colorBigotes
        }

        bigotes(){
            return `Tengo los bigotes de color ${this.colorBigotes}`;
        }
    }

    class Perros extends Animales {
        constructor(name, especie, edad){
            super(name, especie),
            this.edad = edad
        }

        cualEsMiEdad(){
            return 'Mi edad es de : ' + this.edad ;
        }
    }

    class Perrito extends Perros {
        constructor(name, especie, edad, colorCollar){
            super(name,especie,edad),
            this.colorCollar = colorCollar
        }

        cualEsMiCollar(){
            return this.name + ' tiene un collar de color ' + this.colorCollar
        }
    }

    // let bongo = new Animales('Bongo','Peludo');
    // let pepe = new Animales('otro', 'pelado');

    // console.log(bongo.baila());
    // console.log(bongo.canta());
    // console.log(pepe.canta());

    let ejemplo = new Gatos('Pepe','Peludo','Blancos');
    console.log(ejemplo);

    let miPerrito = new Perros('Hector','Buldog',15);
    console.log(miPerrito)

    let misPerritos = new Perrito('Anibal', 'algo', 20, 'Negro');
    console.log(misPerritos);

    $('#tblExample').DataTable({
        columns: [
            { title: 'id', name: "id", data:'id' ,searchable: false,  visible: false},
            { title: 'Nombre', name: "name", data:'name', searchable: false, width: '20' },
            { title: 'Cel.', name: "phone", data:'phone', searchable: true, width: '20' },
            { title: 'Nombre Usuario', name: "username", data:'username',searchable: false, width: '20' },
            { title: 'Sitio',  name: "website", data:'website', searchable: false, width: '20' },
            { title: 'Mail',  name: "email", data:'email', searchable: false, width: '120' }
        ],

        ajax: 
        // $.ajax({
        //     url: "https://jsonplaceholder.typicode.com/users",
        //     method:'GET'
        // }).done( function(data) {
        //     console.log(data);
        // }).fail(function (){
        //     console.log('Ocurrio un error');
        // } )
    });

})



