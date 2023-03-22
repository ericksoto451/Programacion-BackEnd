import express from 'express';
import ProductManager from './productManager.js';

const dirNameAsync="./filesDesafio3";
const path="./callback.txt";
const app=express();
const PORT =8080;

// Se prepara la configuración del servidor para trabajar con archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const productManager1 = new ProductManager(dirNameAsync,path);

// Saludos desde México
app.get('/saludo', (req, res) => {
    res.send("Hola a Profe, saludos desde México")
})


//APP LISTEN

app.listen(PORT, ()=>{
    console.log(`Server run on port ${PORT}`)
})

//Mostrar todos los productos

app.get('/productos', async(req,res) =>{
    res.send(await productManager1.getProducts());

})


//Mostrar producto por ID

app.get('/productos/:userID', async(req,res) =>{
    const producto= await productManager1.getProductsById(req.params.userID);
    res.send(producto);
})


//Metodo Post que agregará un nuevo producto
app.post('/productos', async(req,res) =>{
    let product = req.body;
    const crearProducto= await productManager1.addProduct(product.title,product.description,product.price,product.thumbnail,product.stock,product.status,product.category);

    /* if(!producto.title  || !producto.description || !producto.price || !producto.thumbnail || !producto.stock || !producto.status || !producto.category){
        return res.status(400).send({status: "Error", msg: "Valores incompletos, revisar nuevamente"});
    } */
    res.send({status: "success" , msg: "Se agrego un usuario nuevo exitosamente"});
})


//Metodo Put que modificará un producto existente
app.put('/productos/:pid', async(req,res) =>{
    let id=parseInt(req.params.pid);
    let product = req.body;
    const producto= await productManager1.modifyProduct(product.title,product.description,product.price,product.thumbnail,product.stock,product.status,product.category,id);

    /* if(!producto.title  || !producto.description || !producto.price || !producto.thumbnail || !producto.stock || !producto.status || !producto.category){
        return res.status(400).send({status: "Error", msg: "Valores incompletos, revisar nuevamente"});
    } */
    res.send(producto);
})





