const router = require('express').Router();
const model = require('../Models/IndexModel')

router.get('/',(req,res)=>{
    model.Employee.find().then(data=>{return res.send(data)}).catch(e=>{return res.send(e)});
});
router.post('/save',(req,res)=>{
    console.log(req.body);
    const employee = new model.Employee({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        picture : req.body.picture,
        salary : req.body.salary,
        position : req.body.position
    });
    employee.save().then(data=>{
        console.log('data',data)
        return res.json({code:1,message : 'Saved Successfully'});
    }).catch(e=>{
        return res.json({code:0,message:e});
    });
});

router.post('/update',(req,res)=>{
    model.Employee.findByIdAndUpdate(req.body.id,{
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        picture : req.body.picture,
        salary : req.body.salary,
        position : req.body.position
    })
    .then(data=>{
        return res.send(data);
    })
    .catch(e=>{
        return res.send(e);
    });
});

router.post('/delete',(req,res)=>{
    console.log(req.body.id)
    model.Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data);
        return res.send(data);
    })
    .catch(e=>{
        return res.send(e);
    });
});

module.exports = router;