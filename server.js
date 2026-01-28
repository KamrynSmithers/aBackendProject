require('dotenv').config()
const express = require('express')
const app = express ()
const port = 3000 
const dbConnect = require('./config/database.js')
// routes 
const userRoutes = require('./routes/api/userRoutes');
const projectRoutes = require('./routes/api/projectRoutes');
const taskRoutes = require('./routes/api/taskRoutes');


dbConnect()

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Task Management API',
    version: '1.0.0'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', taskRoutes);  
app.use('/api/tasks', taskRoutes);     


app.listen(port, () => {
    console.log( `Server is running at http://localhost:${port}`)
})