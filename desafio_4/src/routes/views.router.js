import express from 'express';
import ProductManager from '../productManager.js';

const router = express.Router();

let products=[];

const path="./src/datosDesafio4.txt";

export const productManager1 = new ProductManager(path);

router.get('/productos', async(req,res) =>{
    products=await productManager1.getProducts();
    res.render('home', {products});

})

router.get('/realtimeproducts', async(req,res) =>{
    //products=await productManager1.getProducts();
    res.render('realTimeProducts');

})
export default router;