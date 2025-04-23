require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const port = process.env.PORT || 3001;
app.use(cors());
app.use(helmet());

if(process.env.NODE_ENV !== 'production'){

    app.use(morgan('tiny'));
}
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const handleError = require('./src/utils/errorHandler');

//Load Router
const assistantRouter = require('./src/router/assistantRouter')
const subscriptionRouter = require('./src/router/subscriptionRouter')

//Use Router

app.use('/v1/assistant', assistantRouter);
app.use('/v1/subscription', subscriptionRouter);


app.use("*", (req, res, next) => {
    const error = new Error("Resources not found")
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    handleError(error, res)
})


app.listen(port, () => {
    console.log(`API is running on http://127.0.0.1:${port}`);
})