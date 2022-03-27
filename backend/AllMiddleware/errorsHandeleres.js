const errorHandeler = (err, request, response, next) => {
    const statusCode = response.statusCode ? response.statusCode : 500;
    response.status (statusCode);
    response.json({
    msg : err.message,
    errStack : process.env.NODE_ENV === "production" ? null :  err.stack
    });
    console.log(process.env.NODE_ENV);
}
module.exports = {errorHandeler};