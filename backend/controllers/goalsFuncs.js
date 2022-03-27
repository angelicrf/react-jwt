const asyncHandler = require("express-async-handler");

const getGoalsFunc = asyncHandler(async (req, res) => {
    res.status(200).json({
        'success' : true,
        msg: 'get data'
        })
});
const postGoalsFunc = asyncHandler(async (request, response) => {
   console.log(request.body.name)
    if(request.body.name){
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
    if(request.params.id != null){
        response.status(200).json({
        'success' : true,
        msg : `delete data ${request.params.id}`
        })
   }else{
    response.status(400);
    throw Error("No Deleted Data");
}
});

const putGoalsFunc = asyncHandler( async(request, response) => {
    response.status(200);
    throw Error("No Updated Data");
    
});
module.exports = {
    getGoalsFunc,
    deleteGoalsFunc,
    postGoalsFunc,
    putGoalsFunc
}