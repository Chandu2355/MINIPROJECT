module.exports = {

    mongoConnectionString : "mongodb+srv://ALS1:ayyagari@cluster0.5w4v1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    webPort : process.env.PORT || 3000,
    session_secret : process.env.SESSION_SECRET || 'ayyagari'
}