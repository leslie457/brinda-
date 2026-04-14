const express = require('express');
const coursesRoutes = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/courses', coursesRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: "Route introuvable. Vérifiez l'URL et réessayez."
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Une erreur serveur est survenue.'
  });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
