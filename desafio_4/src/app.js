import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import { productManager1 } from './routes/views.router.js';

const app=express();
const PORT=8080;


console.log(__dirname);

//Preparar la configuración del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Uso de vista de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname + "/views");
app.set("view engine", 'handlebars');


//Carpeta public
app.use(express.static(__dirname+'/public'));


const httpServer = app.listen(PORT, ()=>{
    console.log("Servidor escuchando por el puerto: " + PORT);
});


//Declaramos el Router
app.use('/', viewsRouter);


const socketServer = new Server(httpServer);

//Abrimos el canal de comunicación
socketServer.on('connection', socket=>{
    console.log("Nuevo cliente conectado");



    //escuchamos al ciente
    socket.on("producto", data=>{
        app.post('/productos', async(req,res) =>{
            const crearProducto= await productManager1.addProduct(data.title,data.description,data.price,data.thumbnail,data.stock);
        
            /* if(!producto.title  || !producto.description || !producto.price || !producto.thumbnail || !producto.stock || !producto.status || !producto.category){
                return res.status(400).send({status: "Error", msg: "Valores incompletos, revisar nuevamente"});
            } */
            res.send({status: "success" , msg: "Se agrego un usuario nuevo exitosamente"});
        })
    });
});
