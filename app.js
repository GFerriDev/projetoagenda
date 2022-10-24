require('dotenv').config()

const express = require('express');
const app = express();
const routes = require('./routes')
const {firtsMiddleware, checkError, csrfMid} = require('./src/middlewares/middleware')
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true})
.then(()=> {
  app.emit('Pronto')
})
.catch(e => console.log(e))

const helmet = require('helmet')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const csurf = require('csurf')

app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/frontend', express.static('frontend'))

const sessionOptions = session({
  secret: 'avadakadabrajaguara',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});


app.use(sessionOptions)
app.use(flash());

app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(csurf())

// Middlewares
app.use(firtsMiddleware)
app.use(checkError)
app.use(csrfMid)

app.use(routes)

app.on('Pronto', () =>{
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
  });

});
