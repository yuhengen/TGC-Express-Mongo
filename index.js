// EXPRESS AND OTHER SETUP
const express = require('express');
const { setupExpressApp } = require('./setupExpress');
const { setupHBS } = require('./setupHBS.js')
const MongoUtil = require('./MongoUtil.js')
const ObjectId = require('mongodb').ObjectId

// load in environment variables
require('dotenv').config();

// create the app
const app = express();
setupExpressApp(app);
setupHBS();

async function main() {
    const MONGO_URL = process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, "tgc9_cico");

    const foodRoutes = require('./routes/foodRoutes')
    const userRoutes = require('./routes/userRoutes')
    app.use('/food', foodRoutes)
    app.use('/users', userRoutes)
}

main();

// LISTEN
app.listen(3000, () => {
    console.log("Express is running")

})