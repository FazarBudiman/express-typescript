import App from "./App";
import Auth from "./controllers/Auth";
import Course from "./controllers/Course";
import Materi from "./controllers/Materi";
import Student from "./controllers/Student";

const port: number | String = 5432;
const app = new App().app;

const auth = new Auth()
app.route('/auth/login')
  .post(auth.Login)
app.route('/auth/register')
  .post(auth.register)

const course = new Course()
app.route('/course')
  .get(course.getCourse)
  .post(course.addCourse)
app.route('/course/:id')
  .delete(course.deleteCourse)

const materi = new Materi()
app.route('/materi')
  .get(materi.getMateri)
  .post(materi.addMateri)

const student = new Student()
app.route('/student')
  .get(student.getStudent)

app.listen(port, () => {
  console.log("Server started successfully as port: ", port);
});