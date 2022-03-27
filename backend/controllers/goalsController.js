const express = require("express");
const router = express.Router();


router.get('/', (request, response) => {
    response.status(200).json({
    'success' : true,
    msg: 'get data from controller'
    })
}) 
router.post('/', (request, response) => {
    response.status(200).json({
    'success' : true,
    msg : 'post data from controller'
    })

}) 
router.delete('/:id', (request, response) => {
    response.status(200).json({
    'success' : true,
    msg : `delete data ${request.params.id} from controller`
    })

}) 
router.put('/:id', (request, response) => {
    response.status(200).json({
    'success' : true,
    msg : `modified data ${request.params.id} from controller`
    })

}) 

module.exports = router;