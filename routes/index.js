var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Contact App'});
});

router.get('/contactlist', function (req, res, next) {
    db.contactlist.find(function (err, docs) {
        res.json(docs);
    });
});

router.post('/contactlist', function (req, res) {
    db.contactlist.insert(req.body, function (err, docs) {
        res.json(docs);
    });

});
router.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, docs) {
        res.json(docs);
    });
});

router.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs) {
        res.json(docs);
    });
});

router.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)}
        ,
        update: {
            $set: {name: req.body.name, email: req.body.email, number: req.body.number}
        },
        new : true
    }, function (err, docs) {
        res.json(docs);
    });
});


module.exports = router;
