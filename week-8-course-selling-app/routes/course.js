const express = require('express');
const { purchaseModel, courseModel } = require('../db');
const courseRoute = express.Router();
const { userMiddleware } = require('../middlewares/user');

courseRoute.post('/purchase', userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId

    const course = await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message: "Course purchased"
    })

})

courseRoute.get('/preview', async (req, res) => {
    const course = await courseModel.find({})

    res.json({
        course
    })
})

module.exports = {
    courseRoute
}
