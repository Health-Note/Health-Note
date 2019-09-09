const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../models/index");
const auth = require("../middleware/auth");

router.post("/setFixedSchedule", auth, async (req, res) => {
    const { start_time, day, member_id } = req.body;
    
    try {
        const newSchedule = await db.FixedSchedule.create({
            start_time,
            end_time: null,
            day, 
            member_id
        });

        console.log("newFixedSchedule", newSchedule);
        res.json(newSchedule);
    } catch (err) {
        console.log(err);
        res.status(500).send('server err');
    }
});

router.get("/getFixedSchedule", auth, (req, res) => {
    db.Member.findAll({
        include: [{
          model: db.FixedSchedule,
          required: false // left outer join (default)
         }]
      }).then(result => {
        console.log('fixedSchedules_left_join_result', result);
      });
});

module.exports = router;
