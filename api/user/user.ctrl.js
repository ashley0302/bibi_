const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user");
//const localStorage = require("node-localstorage");

const signup = (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    if (!name || !email)
        return res.status(400).send("필수 값이 입력되지 않았습니다.");

    UserModel.findOne({
            email
        },
        (err, result) => {
            if (err) return res.status(500).send("회원가입시 오류가 발생했습니다.");
            if (result) return res.status(409).send("이미 사용중인 이메일입니다.");

            //회원가입
            // bcrypt : 단방향 해시 함수
            const saltRounds = 10; //salt 자릿수
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) return res.status(500).send("암호화 시 오류가 발생했습니다.");

                const user = new UserModel({
                    name,
                    email,
                    password: hash
                });
                user.save((err, result) => {
                    if (err)
                        return res.status(500).send("회원 가입시 오류가 발생했습니다.");
                    res.status(201).json(result);
                });
            });
        }
    );
};
const login = (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password)
        return res.status(400).send("필수값이 입력되지 않았습니다.");
    UserModel.findOne({
            email
        },
        (err, user) => {
            if (err) res.status(500).send("사용자 조회 시 오류가 발생했습니다.");
            if (!user) res.status(404).send("가입되지 않은 아이디입니다.");

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return res.status(500).send("로그인시 오류가 발생했습니다.");

                if (!isMatch)
                    return res.status(500).send("비밀번호가 일치하지 않습니다");

                // 비밀번호 검증 성공 => signed 토큰 발급 (JWT)
                const token = jwt.sign(user._id.toHexString(), "secretKey");
                UserModel.findByIdAndUpdate(
                    user._id, {
                        token
                    },
                    (err, result) => {
                        if (err)
                            return res.status(500).send("로그인시 오류가 발생했습니다.");
                        // 토큰 저장: cookie, local storage
                        res.cookie("token", token, {
                            httpOnly: true
                        });
                        res.json(result);
                    }
                );
            });
        }
    );
};


module.exports = {
    signup,
    login,

};