const {
    Router
} = require("express");
const router = Router();
const ctrl = require("./user.ctrl");

router.post("/signup", ctrl.signup); //회원가입
router.post("/login", ctrl.login);
//router.get('/logout', ctrl.logout);
module.exports = router;