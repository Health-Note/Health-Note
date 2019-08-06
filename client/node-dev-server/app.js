const express = require("express");
const app = express();

app.get("/getData", (req, res) => {
    res.json({
        members: [{
            phoneNum: "01020777538",
            startTime: "20190806",
            endTime: "20190806"
        },{
            phoneNum: "01094325615",
            startTime: "20190806",
            endTime: "20190806"
        },{
            phoneNum: "01097045552",
            startTime: "20190806",
            endTime: "20190806"
        }]
    })
})

app.listen(8080, () => {
    console.log("client-dev-server (express) started")
})