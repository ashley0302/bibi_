const {
    Router
} = require("express");
const router = Router();
const ctrl = require("./chat.ctrl");

router.post("/", ctrl.create);
router.post("/list", ctrl.list);
router.delete("/:id", ctrl.remove);

module.exports = router;