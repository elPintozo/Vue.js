Vue.component('cmp_urls',{
    template:'<div class="div_cmp_urls"><h2>Hola!, soy el: {{name}}</h2><p>Texto de prueba</p></div>',
    data(){
        return{
            name:'componente 1',
        }
    }
});
Vue.component('cmp_smartphone',{
    template:`
    <div class="div_cmp_urls">
        <h2>Hola!, soy el: {{name}}</h2>
        <ul v-for="(obj, index) in objeto">
            <li>{{index}} - {{obj.bateria}}</li>
        </ul>
    </div>`,
    props:['objeto'],
    data(){
        return{
            name:'componente 2',
        }
    },
    mounted(){
        console.log(this.objeto);
    }
});
Vue.component('cmp_otro',{
    props:['objeto'],
    data(){
        return{
            name:'componente 3',
        }
    }
});
Vue.component('cmp_padre',{
    template:`
        <div class="div_cmp_padre">
            <h1>Componente padre</h1>
            <div>
                <cmp_hijo></cmp_hijo>
            </div>
        </div>
    `
});

Vue.component('cmp_hijo',{
    template:`<h2>Componente hijo</h2>`
});

Vue.filter('capitalize_custom', (value) => value[0].toUpperCase()+value.slice(1));

new Vue({
    el:'#app',
    data:{
        urls:[
        {nombre:'Google',url:'https://www.google.cl',prioridad:'Alta'},
        {nombre:'Youtube',url:'https://www.youtube.com',prioridad:'Media'},
        {nombre:'Vicius Game',url:'https://www.viciusgamer.com',prioridad:'Baja'}],
        mostrar: true,
        mensaje:'Hola Mundo',
        input_1:'Nombre',
        nombre_desarrollador:'Ricardo',
        apellido_desarrollador:'Ramírez',
        nota:3,
        nueva_pelicula:null,
        peliculas: ['Pelicula 1','Pelicula 2','Pelicula 3','Pelicula 4','Pelicula 5','Pelicula 6'],
        smartphone:{procesador:'Qualcomm',pantalla:'6,4', ram:'3gb', almacenamiento:'64gb',marca:'Xiaomi',bateria:'4400ma'},
        //variable_comentada:'algo',
        imagenes:'http://www.programwitherik.com/content/images/2017/01/87ow.png',
        tac_pelicula:''
    },
    methods:{
        set_mostrar:function(){
            this.mostrar = !this.mostrar
        },
        add_movie(){
            this.peliculas.unshift(this.nueva_pelicula)
            this.nueva_pelicula = null
        },
        remove_movie:function(index){
            this.peliculas.splice(index,1);
        }
    },
    computed:{
        peliculas_ordenadas(){
            return this.peliculas.sort();
        },
        ordenar_peliculas(){

        },
        nombre_mas_apellido(){
            return this.nombre_desarrollador +' '+this.apellido_desarrollador+' - Nota obtenida: '+this.nota;
        },
        buscar_peliculas(){
            return this.peliculas.filter((pelicula) => pelicula.includes(this.tac_pelicula));
        }
    }
});
const vue2 = new Vue({
        el:'#app_2',
        data:{
            div_1:true,
            div_2:true,
            div_3:false,
            div_4:false,
            div_5:false,
            mensaje:'Hola desde la 2° instancia de Vue.js',
            empleados:[],
            externos:[],
            tac_empleado:'',
            smartphones:[{procesador:'Qualcomm',pantalla:'6,4', ram:'3gb', almacenamiento:'64gb',marca:'Xiaomi',bateria:'4400ma'},
                     {procesador:'Qualcomm',pantalla:'6,4', ram:'4gb', almacenamiento:'128gb',marca:'Xiaomi',bateria:'5300ma'},
                     {procesador:'Qualcomm',pantalla:'5,9', ram:'6gb', almacenamiento:'64gb',marca:'Xiaomi',bateria:'3500ma'}],
            cmp_elegido:'cmp_urls'
        },
        mounted(){
            axios.get(url_global).then( (respuesta) => {
                console.log('Respuesta 1');
                var pre_string = JSON.stringify(eval('('+respuesta.data['empleados']+')'));
                var pre_json =JSON.parse(pre_string);
                this.empleados = pre_json;
            }),
            axios.get('https://jsonplaceholder.typicode.com/posts').then( (respuesta_2) => {
                this.externos = respuesta_2.data;
                console.log(typeof(respuesta_2.data));
            });
        },
        methods:{
            buscar_empleado(){
                return this.empleados.filter((empleado) => empleado.fields['nombre'].includes(this.tac_empleado));
            }
        }
});