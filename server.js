const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')


require('express-async-errors')

 
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const ModulePreventionRoutes = require('./routes/modulePreventionRoutes');
const ModuleAdresseRoutes = require('./routes/moduleAdresseRoutes');
const { errorHandler } = require('./middleware/index')

// Middleware


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cors policy cross origin resource sharing
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Headers', '*') //'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization'
//     res.setHeader('Access-Control-Allow-Methods', '*')//'GET,POST,PUT,DELETE'
//     next()
// })


app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));
app.use(userRoutes)
app.use(authRoutes)
app.use(ModulePreventionRoutes)
app.use(ModuleAdresseRoutes)

app.use(errorHandler)


app.listen(3000,
    () => console.log('server started at 3000'))