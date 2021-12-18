const express = require('express');
const cors = require('cors')
const app = express();
const { connect } = require('mongoose')
const { dbname, dbpass, PORT, stripeKey, success_url, cancel_url } = require('./config.json');
const stripe = require('stripe')(stripeKey)
const path = require('path')

const { createFood, addToCart, getCart } = require('./controllers/FoodController')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

connect(`mongodb+srv://David:${dbpass}@cluster0.ol6zl.mongodb.net/${dbname}?retryWrites=true&w=majority`, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    // dbName: 'starwars'
});
app.post('/api/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: Object.values(req.body).map(item => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item
                        },
                        unit_amount: 1999,
                    },
                    quantity: 1,
                }
            }),
            success_url,
            cancel_url

        })
        return res.status(200).json({ url: session.url })
    }
    catch (err) {
        throw new Error(err)
    }
})
app.get('/api/cart', getCart, (req, res) => {
    return res.status(200).json({ ...res.locals.cart })
})

app.post('/api/cart', addToCart, (req, res) => {
    return res.status(200).json({ ...res.locals.cart })
})
app.post('/api', createFood, (req, res) => {
    return res.status(200).json({ ...res.locals.createdFood })
})
app.get('/cancel', (req, res) => {
    return res.sendFile(path.join(__dirname, '/cancel.html'))
})
app.get('/success', (req, res) => {
    return res.sendFile(path.join(__dirname, '/success.html'))
})
app.use((req, res) => {
    return res.sendStatus(404)
})

app.use((err, req, res, next) => {
    return res.status(err.status ?? 500).send(err.message ?? 'Internal Server Error')
})
app.listen(PORT, () => console.log('Listening on port', PORT));