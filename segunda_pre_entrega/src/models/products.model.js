import mongoose, { mongo } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const collectionName ='products';

const currentSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number
})

currentSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName,currentSchema);

export default productsModel;