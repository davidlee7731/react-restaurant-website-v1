const { Schema, model } = require('mongoose')

//----------------------------
//Food Schema

const FoodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    picture: { type: String },
    modifiers: [{ type: Schema.Types.ObjectId, ref: 'Mod' }],
})
const Food = model('Food', FoodSchema);

//----------------------------
//Mod Schema

const ModSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
})
const Mod = model('Mod', ModSchema);

//----------------------------
//Cart Schema
const CartSchema = new Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
})
const Cart = model('Cart', CartSchema);


module.exports = { Food, Mod, Cart };