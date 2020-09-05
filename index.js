const express = require('express')
const cors = require('cors')

const app = express();

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