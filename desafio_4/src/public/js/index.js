const socket=io();  
let producto={
    tittle: "Jetta 2019", 
    description: "Jetta 2019 confortline con quemacocos",
    price: 250000,
    thumbnail: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2019-PT-Mex/jetta.jpg;maxWidth=1200",
    stock: 1
};
socket.emit("producto",producto)