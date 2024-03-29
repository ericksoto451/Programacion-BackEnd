 
const dirNameAsync="./filesDesafio2";
const path="./callbackDesafio2.txt";

class ProductManager {
    constructor(dirNameAsync,path){
        let products=[];
        this.products = products;
        this.dirName=dirNameAsync;
        this.path=path;

        const crearArchivo = async () =>{
            //await fs.promises.mkdir(this.dirName, {recursive: true}); 
            await fs.promises.writeFile(this.path, "[]");

        }
        crearArchivo();
    }


   async addProduct(title, description, price, thumbnail,stock){

        if(!fs.existsSync(this.path)){
            throw Error("El archivo no existe, por eso no es posible agregar ningún producto");
        }else{
            try{
                let idCreated = this.products.length + 1;
                let product = [
                    {
                        title: title,
                        description: description,
                        price: price,
                        thumbnail: thumbnail,
                        code: idCreated,
                        stock: stock
                    }
                ];

                this.products.push(product);
                let jsonString = await fs.promises.readFile(this.path, "utf-8");
                const parseoString = JSON.parse(jsonString);
                parseoString.push(product);


                await fs.promises.writeFile(this.path, JSON.stringify(parseoString));
            
            }catch(e){
                Error(e);
            }
            
        }
    }


    getProducts = async() =>{
        if(!fs.existsSync(this.path)){
            throw Error("Los productos no se pueden leer porque no existe el archivo");
        }else{
            let result;
            let jsonString= await fs.promises.readFile(this.path,"utf-8");
            const parseoString = JSON.parse(jsonString);
            if (Object.entries(parseoString).length === 0){
                result="No hay productos en el archivo";
            }else{
                result=parseoString;
            }
            return result;

        }

        
    }


    async getProductsById(id){
        if(!fs.existsSync(this.path)){
            throw Error("El producto no se puede leer porque no existe el archivo");
        }else{
            let result;
            let jsonString= await fs.promises.readFile(this.path,"utf-8");
            let contenidoObj=JSON.parse(jsonString);
            console.log(contenidoObj);
            contenidoObj.forEach(objeto => {
                Object.values(objeto).forEach(item =>{
                    const { code } = item;
                    if(id === code) result=[...objeto]
                    
                })
            })
            if(result=== undefined) result="NOT FOUND";
            return result;
        }
        
    }


}

const productManager1 = new ProductManager(dirNameAsync,path);
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
imprimirSolicitudes();

