import fs from 'fs';
import { type } from 'os';


export default class CartManager {
    constructor(dirNameAsync,path){
        let carts=[];
        this.carts = carts;
        this.dirName=dirNameAsync;
        this.path=path;

        if(!fs.existsSync(this.path)){
            const crearArchivo = async () =>{
                //await fs.promises.mkdir(this.dirName, {recursive: true}); 
                await fs.promises.writeFile(this.path, "[]");
    
            }
            crearArchivo();
        }
        
        
    }


   async addCart(productos){

        if(!fs.existsSync(this.path)){
            throw Error("El archivo no existe, por eso no es posible agregar ningún producto");
        }else{
            try{
                let idCreated = this.products.length + 1;
                let cart = [
                    {
                        code: idCreated,
                        products:[productos]
                    }
                ];

                this.carts.push(cart);
                let jsonString = await fs.promises.readFile(this.path, "utf-8");
                const parseoString = JSON.parse(jsonString);
                parseoString.push(cart);


                await fs.promises.writeFile(this.path, JSON.stringify(parseoString));
            
            }catch(e){
                Error(e);
            }
            
        }
    }


    async modifyCart(title, description, price, thumbnail,stock,status,category,id){

        if(!fs.existsSync(this.path)){
            throw Error("El archivo no existe, por eso no es posible agregar ningún producto");
        }else{
            try{
                let result;
                let product = [
                    {
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: id,
                        stock: stock,
                        status: status,
                        category: category
                    }
                ];

                let jsonString = await fs.promises.readFile(this.path, "utf-8");
                const parseoString = JSON.parse(jsonString);
                this.products=parseoString;
                let productPosition= this.products.findIndex((u) => id);
                console.log(productPosition)
                if(productPosition < 0){
                    result=[{status:"info", error: "Usuario no encontrado"}];
                }else{
                    this.products[productPosition]=product;
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    result=[{status:"success", msg: "Usuario encontrado y modificado"}];
                }
                return result;
            
            }catch(e){
                Error(e);
            }
            
        }
    }

    async deleteCart(id){

        if(!fs.existsSync(this.path)){
            throw Error("El archivo no existe, por eso no es posible agregar ningún producto");
        }else{
            try{
                let result;

                let jsonString = await fs.promises.readFile(this.path, "utf-8");
                const parseoString = JSON.parse(jsonString);
                this.products=parseoString;
                let productPosition= this.products.findIndex((u) => id);
                console.log(productPosition)
                if(productPosition < 0){
                    result=[{status:"info", error: "Usuario no encontrado"}];
                }else{
                    this.products.splice(productPosition,1);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                    result=[{status:"success", msg: "Usuario encontrado y eliminado"}];
                }
                return result;
            
            }catch(e){
                Error(e);
            }
            
        }
    }


    async getCartById(id){
        if(!fs.existsSync(this.path)){
            throw Error("El producto no se puede leer porque no existe el archivo");
        }else{
            let result;
            let producto=[];
            let jsonString= await fs.promises.readFile(this.path,"utf-8");
            let parseoString = JSON.parse(jsonString);
            if (Object.entries(parseoString).length === 0){
                result=[{"message": "NO HAY PRODUCTOS"}];
            }else{
                parseoString.forEach(objeto => {
                    Object.values(objeto).forEach(item =>{
                        const { code } = item;
                        if(code == id) {
                            producto.push(objeto);
                        }
                    })
                })
                result=producto;
            }
            return result;
        }
        
    }


}

/* const productManager1 = new ProductManager(dirNameAsync,path);
const imprimirSolicitudes = async()=>{
    console.log(await productManager1.getProducts());
    await productManager1.addProduct("Jetta 2019", 
                           "Jetta 2019 confortline con quemacocos",
                           250000,
                           "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2019-PT-Mex/jetta.jpg;maxWidth=1200",
                           1);

    await productManager1.addProduct("CRV 2019", 
                           "CRV 2019 con asientos de piel",
                           250000,
                           "https://parentesis.com/imagesPosts/CR-V-2019-2.jpg",
                           3);
    console.log(await productManager1.getProducts());
    console.log(await productManager1.getProductsById(1));
}
imprimirSolicitudes(); */