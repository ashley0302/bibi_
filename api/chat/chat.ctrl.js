const ChatModel = require("../../models/chat.js");
const UserModel = require('../../models/user.js');
//const mongoose = require("mongoose");
let frome = '';
const create = (req, res) => {
    const {
        to,
        from,
        message,
    } = req.body;
    UserModel.findOne({
        "email": from,
    }, (err, result) => {
        if (err) return res.status(500).send("등록 오류 발생");
        if (!to || !message) return res.status(400).send("필수값 미입력");
        ChatModel.create({
            to,
            message,
            from: result.name,
        }, (errs, results) => {
            if (errs) return res.status(500).send("등록 오류 발생");
            //res.json(results);
            UserModel.findOne({
                to
            }, (errss, data) => {
                if (errss) return res.status(500).send('sdsd');
            });
            res.status(201).json(results);
        });

    })
    //console.log(frome)

};

const list = (req, res) => {
    const {
        user
    } = req.body;


    ChatModel.find({
        "to": user
    }, (err, result) => {
        if (err) return res.status(500);
        res.json(result);
    })

    /*ChatModel.find((err, result) => {
            if (err) return res.status(500); // Internal server error
            // res.json(result);
            res.render("chat/list", {
                result: result
            });
        })
        .limit(limit)
        .sort({
            created: -1
        });*/
};

const remove = (req, res) => {
    const id = req.params.id;
    ChatModel.findByIdAndRemove(id, (err, result) => {
        if (err) return res.status(500).send("삭제 오류가 발생했습니다.");
        if (!result) res.status(404).send("해당하는 정보가 없습니다.");
        res.json(result);
    });
};


module.exports = {
    create,
    list,
    remove
};