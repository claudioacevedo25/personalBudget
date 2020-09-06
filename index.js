const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json()) 

app.use(express.json())
// ====================
// Setting
// ====================
app.set('port', process.env.PORT ||4000 )

// ====================
// ROUTES
// ====================
app.use('/budget', require('./src/routes/index.routes'));

app.use(cors());

app.listen(app.get('port'), () => {
    console.log(`Server runing on port `,app.get('port'));
})