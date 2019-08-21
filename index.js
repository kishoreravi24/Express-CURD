var express = require('express');
var fs = require('fs');
var app =express();
var port = 3000;
app.use(express.json());//middleware
/* Example of Post and Get method
app.get('/',(req,res)=>{
    res
        .status(200)
        .json({
            message:"kishore Ravi",
            Framework:"Express"
        });
})
app.post('/',(req,res)=>{
    res
        .status(200)
        .send("Response from Post method");
})*/
const tours=JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status:"success",
        result:tours.length,
        data:{
            tours
        }
    })
})
app.post('/api/v2/tours',(req,res)=>{
    const newId=tours[tours.length-1].id+1;
    const newTour =Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`,JSON.stringify(tours));
    res
    .status(200)
    .json({
        status:"success",
        tour:newTour
    })
    console.log("Data");
})
//POSTING a number to search the JSON id
app.get('/api/v3/tours/:id',(req,res)=>{
    if(req.params.id>=tours.length)
    {
        return res
        .status(404)
        .send("Not found");
    }
    const tour=tours.find((el)=> el.id==req.params.id)
    res
    .status(200)
    .json({
        status:"success",
        tour
    })
})
app.patch('/api/v4/tour/:id',(req,res)=>{
    if(Number(req.params.id)>=tours.length)
    {
        res
            .status(404)
            .send("Not Found!");
    }
    var to_update_tour_details=tours.find((el)=>el.id==req.params.id);
    to_update_tour_details.duration=Number(to_update_tour_details.duration)+1;
    var duration=to_update_tour_details.duration;
    res
    .status(200)
    .json({
        status:"success",
        data:{
            to_update_tour_details
        }
    })
})
//Delete
app.delete('/api/v5/tour/:id',(req,res)=>{
    if(req.params.id>=tours.length)
    {
        res
        .status(404)
        .send("Not Found!");
    }
    var to_delete=tours.find((el)=>el.id==req.params.id)
    to_delete=null;
    console.log(to_delete);
    res
    .status(200)
    .json({
        status:"success",
        data:{
            to_delete
        }
    })
});
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});