require('dotenv').config()

const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const cors = require('cors')

const db = pgp(process.env.DATABASE)
app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
    db.any('SELECT * FROM tasks')
    .then(tasks => {
        res.json(tasks)
    })
    .catch(e => console.error(e))  
})

app.post('/api/add-task', (req, res) => {
    const { year, month, numDay, day, task_title, task_duration} = req.body

    db.none(`INSERT INTO tasks (year, month, numDay, day, task_title, task_duration) VALUES ($1, $2, $3, $4, $5, $6)`, [year, month, numDay, day, task_title, task_duration])
    .then(() => res.json({success: true, message: 'Successfully inserted.'}))
    .catch(e => console.error(e))
})

app.delete('/api/delete-task', (req, res) => {
    const { task_title } = req.body
    
    db.none('DELETE FROM tasks WHERE task_title = $1', [task_title])
    .then(() => res.json({success: true, message: 'Successfuly deleted'}))
    .catch(e => console.error(e))
})

app.listen(process.env.PORT, () => 'Server is running...')
