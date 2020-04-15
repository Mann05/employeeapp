const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const employee = require('./router/employeeRouter');
const mongoURL ="mongodb+srv://mann:Akki0505@statusliy-rletz.mongodb.net/test?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect(
    mongoURL,
    {useNewUrlParser:true,useUnifiedTopology:true
    //   server: {
    //     // sets how many times to try reconnecting
    //     reconnectTries: Number.MAX_VALUE,
    //     // sets the delay between every retry (milliseconds)
    //     reconnectInterval: 1000
    //   }
    }
  );
mongoose.connection.on('connected',()=>{
    console.log('connection Established.');
});
mongoose.connection.on('error',(e)=>{
    console.log('Error :'+e);
});
mongoose.connection.on('disconnected',()=>{
    console.log('disconnection Established.');
});

app.use('/employee',employee);
app.get('/',(req,res)=>{
    res.send("Ollla");
});

app.listen(3000,()=>{
    console.log('Server Running on 3000');
});