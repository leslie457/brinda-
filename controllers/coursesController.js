const courses = require('../data/courses');

const getAllCourses = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: courses
  });
};

const getCourseById = (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find(item => item.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: 'error',
      message: `Aucun cours trouvé avec l'identifiant ${courseId}.`
    });
  }

  res.status(200).json({
    status: 'success',
    data: course
  });
};

const createCourse = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Le champ "title" est requis et ne doit pas être vide.'
    });
  }

  const newCourse = {
    id: courses.length > 0 ? Math.max(...courses.map(item => item.id)) + 1 : 1,
    title: title.trim(),
    description: description ? String(description).trim() : ''
  };

  courses.push(newCourse);

  res.status(201).json({
    status: 'success',
    data: newCourse
  });
};

const updateCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const { title, description } = req.body;
  const course = courses.find(item => item.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: 'error',
      message: `Aucun cours trouvé avec l'identifiant ${courseId}.`
    });
  }

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Le champ "title" est requis et ne doit pas être vide.'
    });
  }

  course.title = title.trim();
  course.description = description ? String(description).trim() : course.description;

  res.status(200).json({
    status: 'success',
    data: course
  });
};

const deleteCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const index = courses.findIndex(item => item.id === courseId);

  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: `Aucun cours trouvé avec l'identifiant ${courseId}.`
    });
  }

  const deletedCourse = courses.splice(index, 1)[0];

  res.status(200).json({
    status: 'success',
    data: deletedCourse
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
