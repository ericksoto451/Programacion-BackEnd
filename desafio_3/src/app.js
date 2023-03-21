import express from 'express';
import ProductManager from '../productManager.js';

const dirNameAsync="./filesDesafio3";
const path="./callbackDesafio3.txt";
const app=express();
const PORT =8080;


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


//limitar cantidad de productos

app.get('/productos/limit/:limit', async(req,res) =>{
    res.send( await productManager1.getProductsByLimit(req.params.limit));
})






