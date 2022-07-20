const ErrorModel =  require('./models/ErrorModel');
const StudentRoute =  require('./routes/StudentRoute');

const express =  require('express');
const bodyParser =  require('body-parser')
const mongoose =  require('mongoose')


const app = express();
app.use(bodyParser.json())

/*
==============================================
CORS
==============================================
*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next()
})


/*
==============================================
ROUTE handlers
==============================================
*/

app.use('/api/StudentRoute', StudentRoute)

/*
==============================================
Error handling 
Type: 404 error response
==============================================
*/
app.use((req, res, next) => {
    const error = new ErrorModel("Could not find this route.",404)
    throw error
})


/*
==============================================
Error handling 
Type: server error 
==============================================
*/
 app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code|| 500)
    res.json({message: error.message || "An unknown error occurred"})
 })



mongoose.connect( "mongodb+srv://Students:Students123@students.pjmsm.mongodb.net/?retryWrites=true&w=majority",
).
then(app.listen(process.env.PORT || 5050, ()=>{
    console.log('listening on port 5050 and connected to server')
})).catch(err => console.log("could not connect to server"))





