let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    { 'id': 5835512115, 'name': 'Mr.Woramet', 'surname': 'Prompen', 'Major': 'CoE', 'GPA': 2.51},
    { 'id': 5835512000, 'name': 'Mr./MissXXXX', 'surname': 'XXXX', 'Major': 'CoE', 'GPA': 3.33}
];

router.route('/students')
        .get((req, res) => res.json(students))

        .post( (req,res) => {
            let student = {}
            student.id = students[students.length-1].id+1
            student.name = req.body.name
            student.surname = req.body.surname
            student.Major = req.body.Major
            student.GPA = req.body.GPA
            students.push(student)            
            res.json( {message: 'Student created!'} )
        })

router.route('/students/:student_id')
        .get((req,res) => {
            let id = req.params.student_id
            let index = students.findIndex( student => (student.id === +id) )
            res.json(students[index])
        })

        .put ( (req,res) => {                               // Update a bear
            let id = req.params.student_id
            let index = students.findIndex( student => (student.id === +id) )
            students[index].id = req.body.id;   
            students[index].name = req.body.name;   
            students[index].surname = req.body.surname; 
            students[index].Major = req.body.Major;   
            students[index].GPA = req.body.GPA;   
            res.json({ message: 'Student Updated!' + req.params.student_id});
        })
     
        .delete ( (req,res) => {                   // Delete a bear
            let id = req.params.student_id
            let index = students.findIndex( student => student.id === +id  )
            students.splice(index,1) 
            res.json({ message: 'Student Deleted: ' + req.params.student_id});
        })
     

app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(80, () => { console.log('server is running') })