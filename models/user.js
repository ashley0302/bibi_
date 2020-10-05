const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: Number,
        default: 0, //일반 사용자 :0, 관리자 : 1
    },
    token: {
        type: String,

    },

});

// 모델명s -> 컬렉션이 만들어짐
module.exports = mongoose.model("user", UserSchema); //("music", MusicSchema, "musics") 이렇게 세번째 인자로 컬렉션 명 설정가능