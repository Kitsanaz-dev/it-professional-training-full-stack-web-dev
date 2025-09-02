let course = [
    { "id": 1, "course-name": "Node.js" }
];

const getCourses = (req, res) => {
    try {
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching courses',
            error: error.message
        });
    }
}

const createCourse = (req, res) => {
    try {
        const { name } = req.body;
        const newCourse = { id: course.length + 1, "course-name": name };
        course.push(newCourse);
        res.status(201).json({
            message: `Course ${name} created successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating course',
            error: error.message
        });
    }
}

const updateCourse = (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        let courseToUpdate = course.find(c => c.id === parseInt(id));
        if (courseToUpdate) {
            courseToUpdate["course-name"] = name;
            res.status(200).json({
                message: `Course with id ${id} updated successfully`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: `Course with id ${id} not found`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating course',
            error: error.message
        });
    }
}

const deleteCourse = (req, res) => {
    try {
        const { id } = req.params;
        course = course.filter(c => c.id !== parseInt(id));
        res.status(200).json({
            message: `Course with id ${id} deleted successfully`,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting course',
            error: error.message
        });
    }
}

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}