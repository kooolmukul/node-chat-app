var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Task = require('../models/task');
var User = require('../models/user');

router.get('/', function (req, res, next) {
    Task.find()
        .exec(function (err, resMessage) {
            if (err) {
                return res.status(500).json({
                    title: 'An Error : Messsage Could not fetch !!',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Message Fetched Successfully!!',
                obj: resMessage
            });

        });
});


// router.use('/', function (req, res, next) {
//     jwt.verify(req.query.token, 'secret', function (err, decoded) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not Authenticated',
//                 error: err
//             });
//         }
//         next();
//     });

// })

router.post('/', function (req, res, next) {
    var task = new Task({
        taskName: req.body.taskName,
        description: req.body.description,
        startTime : req.body.startTime,
        endTime : req.body.endTime

    });
    task.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(201).json({
            task: 'Saved Task',
            obj: result
        });
    });
});



// router.delete('/:id', function (req, res, next) {
//     var decoded = jwt.decode(req.query.token);
//     Message.findById(req.params.id, function (err, msg) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An Error Occured',
//                 error: err
//             });
//         }
//         if (!msg) {
//             return res.status(500).json({
//                 title: 'Error',
//                 error: {
//                     message: 'Message Not found !!'
//                 }
//             })
//         }
//         if (msg.user != decoded.user._id) {
//             return res.status(401).json({
//                 title: 'Not Autheticated',
//                 error: {
//                     message: 'User not Match !!'
//                 }
//             });
//         }
//         msg.remove({
//             _id: req.params.id
//         }, function (err, result) {

//             if (err) {
//                 return res.status(500).json({
//                     title: 'An Error Occured',
//                     error: err
//                 });
//             }
//             res.status(200).json({
//                 message: 'Message Deleted Successfully!!',
//                 obj: result
//             });

//         })
//     })
// })

// router.patch('/:id', function (req, res, next) {
//     var decoded = jwt.decode(req.query.token);
//     Message.findById(req.params.id, function (err, msg) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An Error Occured !!',
//                 error: err
//             });
//         }
//         if (!msg) {
//             return res.status(500).json({
//                 title: 'No Message Found !!',
//                 error: {
//                     message: 'Message Not found !!'
//                 }
//             })
//         }

//         if (msg.user != decoded.user._id) {
//             return res.status(401).json({
//                 title: 'Not Autheticated !!',
//                 error: {
//                     message: 'User not Match !!'
//                 }
//             });
//         }
//         msg.content = req.body.content;
//         msg.save(function (err, result) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An Error Occured !!',
//                     error: err
//                 });
//             }
//             res.status(200).json({
//                 message: 'Message Updated Successfully!!',
//                 obj: result
//             });
//         });

//     });
// });

module.exports = router;