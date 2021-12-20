const { Food, Mod, Cart } = require('../models/db-models');

module.exports = {
  async getFood(req, res, next) {
    const { name } = req.body;
    const foundFood = await Food.findOne({ name });
    if (!foundFood) {
      return next({ status: 404, message: "Food not found." });
    }
    res.locals.food = foundFood;
    return next();
  },
  async createFood(req, res, next) {
    try {
      //sanitize
      const { name, description, price, category, picture = null/*, modifiers = null*/ } = req.body;
      const createdFood = await Food.create({ name, description, price: Number(price), category, picture/*, modifiers*/ });
      console.log(createdFood)
      res.locals.food = createdFood;
      return next();
    }
    catch (err) {
      return next({ status: 400, message: "Invalid parameters for creating food. " })
    }
  },
  async deleteFood(req, res, next) {
    const foodId = req.params.foodId;
    const { deletedCount } = await Food.deleteOne({ _id: foodId });
    if (deletedCount === 0) {
      return next({ status: 500, message: "Unable to delete food." })
    }
    return next();
  },

  async createMod(req, res, next) {
    try {
      //sanitize
      const { name, price } = req.body;
      const createdMod = await Mod.create({ name, price: Number(price) });
      res.locals.mod = createdMod;
      return next();
    }
    catch (err) {
      return next({ status: 400, message: "Invalid parameters for creating mod." })
    }
  },
  async addToCart(req, res, next) {
    const { name } = req.body;
    const foundFood = await Food.findOne({ name });
    if (!foundFood) {
      return next({ status: 404, message: "Food not found." });
    }
    const cart = await Cart.findOneAndUpdate({}, {
      $push: {
        items: foundFood
      }
    })
    res.locals.cart = cart;
    return next();
  },
  async getCart(req, res, next) {
    const [{ items }] = await Cart.find({});
    // console.log(cart[0])
    // console.log(items)
    const cartWithFoodNames = [];
    // setTimeout(() => console.log("World!"), 5000);
    for (let i = 0; i < items.length; i++) {
      const { name, price } = await Food.findById(items[i])
      // console.log(name, price)
      cartWithFoodNames.push({ name, price })
    }

    // const cartWithFoodNames = cart[0].items.reduce(async (acc, foodId, i) => {
    //   // console.log(await Food.findById(foodId))
    //   // console.log(await acc)
    //   const food = await Food.findById(foodId)
    //   console.log('food:',food)
    //   console.log(acc, i)
    //   acc.push(food.name)
    //   // await acc;
    //   return await acc
    // }, [])
    // console.log(cartWithFoodNames)
    res.locals.cart = cartWithFoodNames;
    return next();
  },
}