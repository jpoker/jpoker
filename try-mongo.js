function db_err()
{
    console.log('connection error!');
}

function db_open()
{
    var userSchema = new mongoose.Schema({name: String, age: Number});
    var User = mongoose.model('User', userSchema);

    var vasya = new User({name: 'Vasya', age: 25});
    vasya.save(function (err, record) {
        if (err !== null)
            console.log('error saving an entry: ' + err);
        else
            console.log('saved with id ' + record._id);
    });

    User.find({name: 'Vasya'}, function (err, records) {
        if (records === null)
            console.log('nothing found');
        else {
            if (records.length === 1)
                console.log('Vasya\'s age is ', records[0].age);
            else
                console.log(records);
        }
    });

    User.remove({name: 'Vasya'}, function (err) {
        if (err !== null)
            console.log('cleaned-up');
        mongoose.disconnect();
    });
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
