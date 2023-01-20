import mongoose from 'mongoose';


const{Schema,model} = mongoose;
 const itemsSchema=new Schema({
   name:[String]
 });

const Item = mongoose.model("Item",itemsSchema);
export default Item;
