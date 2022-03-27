const asyncHandler = require("express-async-handler");
const AllGoals = require("../Models/goalsSchema");

const getGoalsFunc = asyncHandler(async (req, res) => {
    const getData = await AllGoals.find()
    res.status(200).json({
        'success' : true,
        msg: 'get data',
        getData
        })
});
const postGoalsFunc = asyncHandler(async (request, response) => {
   console.log(request.body.name)
    if(request.body.name){
        const postData = await AllGoals.create({
            name: request.body.name
        })
        response.status(200).json({
        'success' : true,
        msg : `post data ${request.body.name}`
        })}
    else{
        response.status(400);
        throw Error("No Post Data");
    }
});
const deleteGoalsFunc = asyncHandler(async(request, response) => {
    const getDataById = await AllGoals.findById(request.params.id);
  
    if(!getDataById){
        response.status(400);
        throw Error("No Deleted Data");
   }else{   
    const deleteData = await AllGoals.deleteOne({ "_id" : request.params.id}); 
    response.status(200).json(deleteData); 
}
});

const putGoalsFunc = asyncHandler( async(request, response) => {
    const getDataById = await AllGoals.findById(request.params.id);
  
    if(!getDataById.id ){
        response.status(400);
        throw Error("no such a data");
    }
   
    const updatedData = await AllGoals.findByIdAndUpdate(request.params.id, request.body, {new: true});
    response.status(200).json(updatedData);
});
module.exports = {
    getGoalsFunc,
    deleteGoalsFunc,
    postGoalsFunc,
    putGoalsFunc
}