
class ProductManager {
    constructor(){
        let products=[];
        this.products = products;
    }


    addProduct(title, description, price, thumbnail,stock){
        let idCreated=this.products.length + 1;
        let product=[
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

    }


    getProducts(){
        let result;
        if(this.products.length === 0){
            result= "No hay productos";
        }else{
            result= this.products;
        }
        return result;
    }


    getProductsById(id){
        let result;
        this.products.forEach(objeto => {
            Object.values(objeto).forEach(item =>{
                const { code } = item;
                if(id === code)result=[...objeto]
                
            })
        })
        if(result=== undefined) result="NOT FOUND";
        return result;
    }


}

const productManager1 = new ProductManager();
console.log(productManager1.getProducts());
productManager1.addProduct("Jetta 2019", 
                           "Jetta 2019 confortline con quemacocos",
                           250000,
                           "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2019-PT-Mex/jetta.jpg;maxWidth=1200",
                           1);

productManager1.addProduct("CRV 2019", 
                           "CRV 2019 con asientos de piel",
                           250000,
                           "https://parentesis.com/imagesPosts/CR-V-2019-2.jpg",
                           3);
console.log(productManager1.getProducts());
console.log(productManager1.getProductsById(1));