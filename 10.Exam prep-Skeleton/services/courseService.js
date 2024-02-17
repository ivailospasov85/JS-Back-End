const Course = require("../models/Course");
const User = require('../models/User')


exports.getAll = () => Course.find()

exports.getOne = (courseId) => Course.findById(courseId).populate('owner').populate('signUpList')

exports.signUp = async (courseId, userId) => {
    await Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } })
    await User.findByIdAndUpdate(userId, { $push: { signedUpCourses: courseId } })
    // const course = await Course.findById(courseId);
    // const user = await User.findById(userId);

    // if (!course || !user) {
    //     throw new Error('Course or user not found');
    // }

    // // Ако course и user са намерени успешно, продължавате с операциите
    // course.signUpList.push(userId);
    // user.signedUpCourses.push(courseId);

    // await course.save();
    // await user.save();

}

exports.create = async (userId, courseDate) => {
    const createdCourse = await Course.create({
        owner: userId,
        ...courseDate,
    })

    await User.findByIdAndUpdate(userId, { $push: { createdCourses: createdCourse._id } })

    return createdCourse
}


exports.delete = (courseId) => Course.findByIdAndDelete(courseId)