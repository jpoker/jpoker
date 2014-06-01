function db_err()
{
    console.log('connection error!');
}

function db_open()
{
    var userSchema = new mongoose.Schema({name: String, age: Number});
    var User = mongoose.model('User', userSchema);

    console.log(User.find({name: 'Vasya'}));
    console.log('finished');
}

try
{
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
    db.on('error', db_err);
    db.once('open', db_open);
}
catch (err)
{
    console.log(err.message);
}
