import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Student = () => {

    const [students, setStudents] = useState({})
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [surname, setsurName] = useState('')
    const [Major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const result = await axios.get(`http://localhost/api/students`)
        console.log(result.data)
        setStudents(result.data)
    }

    const addStudent = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            id,
            name,
            surname,
            Major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost/api/students/${id}`)
        console.log(result.data)
        setId(result.data.id)
        setName(result.data.name)
        setsurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
    }

    const updateStudent = async (id) => {
        const result = await axios.put(`http://localhost/api/students/${id}`, {
            id,
            name,
            surname,
            Major,
            GPA
        })

        console.log(result.data)
        setId(result.data.id)
        setName(result.data.name)
        setsurName(result.data.surname)
        setMajor(result.data.Major)
        setGPA(result.data.GPA)
        getStudents()
    }

    const deleteStudent = async (id) => {
        const result = await axios.delete(`http://localhost/api/students/${id}`)
        getStudents()
    }

    const printStudents = () => {
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <li key={index}>
                        {student.id} : {student.name} : {student.surname} : {student.Major} : {student.GPA} 
                        <button class="button" onClick={() => getStudent(student.id)}>Get</button> 
                        <button class="button" onClick={() => deleteStudent(student.id)}> Del </button> 
                        <button class="button" onClick={() => updateStudent(student.id)}> Update </button> 
                        <tr></tr>
                    </li>
                )
            })
        else {
            return (<h2> Nothing student </h2>)
        }
    }
    return (
        <div>
            <h2>Get Students</h2>
                {printStudents()}
            Students : {id},{name} , {surname} , {Major}, {GPA}

            <h2>Add Students</h2>
            ID : <input type="text" name="id" onChange={(e) => setId(e.target.value)} /><br />
            Name : <input type="text" name="name" onChange={(e) => setName(e.target.value)}/> <br />
            Surname : <input type="text" name="surname" onChange={(e) => setsurName(e.target.value)} /><br />
            Major : <input type="text" name="Major" onChange={(e) => setMajor(e.target.value)} /><br />
            GPA : <input type="number" name="GPA" onChange={(e) => setGPA(e.target.value)} /><br />

            <button class="btn btn-success" onClick={addStudent}>Add </button>

        </div>
    )
}

export default Student;