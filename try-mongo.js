try
{
    var mongoose = require('mongoose');
    var db = mongoose.connect('mongodb://localhost/test');

    var userSchema = new mongoose.Schema({name: String, age: Number});
    var User = mongoose.model('User', userSchema);

    console.log(User.find({name: 'Vasya'}));
    console.log('finished');
}
catch (err)
{
    console.log(err.message);
}
