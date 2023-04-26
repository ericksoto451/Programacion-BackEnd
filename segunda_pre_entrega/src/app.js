import express from 'express';
//import _dirname from './utils.js';
import mongoose from 'mongoose';

import productsModel from './models/products.model.js';

const app= express();

//Preparamos la configuración del servidor para recibir objetos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const connectMongoDB = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/products?retryWrites=true&w=majority');
        console.log("Conectado con exito a MongoDB usando Mongoose.");
        //Imprime productos que tengan un stock mayor a 0
        let products = await productsModel.paginate({stock: {$gt : 0}}, {limit: 3, page:1})
/* 
        let response = await productsModel.insertMany(
            [
                {
                    "title":"Jetta 2019","description":"Jetta 2019 confortline con quemacocos","price":250000,"thumbnail":"https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2019-PT-Mex/jetta.jpg;maxWidth=1200","code":1,"stock":1
                },
                {
                    "title":"CRV 2019","description":"CRV 2019 con asientos de piel","price":500000,"thumbnail":"https://parentesis.com/imagesPosts/CR-V-2019-2.jpg","code":2,"stock":3
                },
                {
                    "title":"Mercedes 2019","description":"Mercedes 2019 con asientos de piel de rinoceronte","price":700000,"thumbnail":"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mercedes-clase-a-2023-03-1664966037.jpg?crop=0.7795414462081128xw:1xh;center,top&resize=1200:*","code":3,"stock":2
                },
                {
                    "title":"Ferrari 2016","description":"Ferrari 2016 convertible","price":3000000,"thumbnail":"https://cnnespanol.cnn.com/wp-content/uploads/2017/08/170823122601-ferrari-portofino-side-780x439.jpg?quality=90&strip=all","code":4,"stock":7
                },
                {
                    "title":"Vento 2020","description":"Vento 2020 con quemacocos","price":180000,"thumbnail":"https://www.autobahn.com.mx/images/Autobahn/A1253/20220317_141238.jpg","code":5,"stock":5
                },
            ]
        );
        console.log(response); */

        /* //Mostramos todos los productos de la Base de datos
        let products = await productsModel.find();
        console.log(products); */



        /* //Obtenemos el dato de si los productos tienen o no stock
        products = await productsModel.aggregate([
            {
                $project: {_id: "$title", isThereStock: {$cond: {if: {$eq: ["$stock", 0]}, then: false,else:true}}}
            },


        ]); */

        /* //Obtenemos el dato de stock de los productos pero de forma ordenada
        products = await productsModel.aggregate([
            {
                $project: {_id: "$title", stock: "$stock"}
            },
            {
                $sort: {stock: -1}
            }


        ]); */

        console.log(products);
    } catch (error) {
        console.error("No se pudo conectar a la DB usando Mongoose " +  error);
        process.exit();
    }
}

connectMongoDB();


const SERVER_PORT=8080;
app.listen(SERVER_PORT, () =>{
    console.log("Servidor escuchado en el puerto: " + SERVER_PORT);
})