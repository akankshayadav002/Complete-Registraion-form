const express = require('express');
const app = express();
const mongoose = require('mongoose')
const connectDb = require('./utils/dbConn')
const expressEjsLayouts=require('express-ejs-layouts')


require('dotenv/config')

//middleware
const errorHandler = require('./middlewares/errorHandler.js');

//routes
const userRoute = require('./routes/userRoute');

//Body parser
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Db connection
connectDb(process.env.MONGO_URI || 'mongodb://localhost:27017')

app.use('/api/user', userRoute);

//error handler
app.use((err, req, res, next) => {
    console.log("ErrorHandler: Error ",err.stack)
});



app.use('/',userRoute)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})