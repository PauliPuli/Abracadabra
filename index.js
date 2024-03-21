const express = require ("express");
const app = express();
const PORT= 3005;
const usuarios= [
        "Juan", 
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
      ];

//1. Crear un servidor con Express en el puerto 3000. (2 Puntos)
app.listen(3005,()=>{
    console.log(`El servidor está inicializando en el puerto http://localhost:${PORT}`)

})
app.get('/', (req, res)=>{
    res.send('¡Bienvenido al servidor de Abracadabra!✨')
})
//2. Definir la carpeta “assets” como carpeta pública del servidor. (1 Punto)
app.use(express.static('assets'));

//3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios. (2 Puntos) 
app.get('/abracadabra/usuarios', (req,res)=>{
    res.json(usuarios)
})

//4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor.  En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario devolver la imagen “who.jpeg”. (2 Puntos) 


app.use("/abracadabra/juego/:usuario",(req, res, next)=>{
    const usuario = req.params.usuario;
    const validar = usuarios.map((u) => u.toLowerCase()).includes(usuario.toLowerCase());
        if (validar) {
            next()
        }else {
            res.sendFile(__dirname + '/assets/img/who.jpeg')
        }
        }) ;
app.get("/abracadabra/juego/:usuario", (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


//5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. 
app.get("/abracadabra/conejo/:n", (req, res)=>{
const numero = Math.floor(Math.random()*(5-1))+1;
const n = +req.params.n;
if (n==numero){
    res.sendFile(__dirname + '/assets/img/conejito.jpg');
} else {
    res.sendFile(__dirname + '/assets/img/voldemort.jpg');
}    
})

//6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor. (1 Punto) 
app.get("*", (req,res)=>{
    res.send(`<center><br><h1>❌ Lo sentimos, esta página no existe 😢</h1><h3>Intenta con otra ruta</h3><h4>Mientras tanto, mira al gatito 😸 ⬇</h4><br><iframe width="560" height="315" src="https://www.youtube.com/embed/X8avbciUP3c?si=LAw5fp4SGkVgcFaT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>`)
})