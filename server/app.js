require('dotenv').config()

const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const cors = require('cors')

const db = pgp(process.env.DATABASE)
app.use(cors())
app.use(express.json())

app.get('/api/tasks', (req, res) => {
    db.any('SELECT year, month, numDay, day FROM tasks GROUP BY year, month, numDay, day ORDER BY numDay')
    .then(tasks => {
        res.json(tasks)
    })
    .catch(e => console.error(e))  
})

app.get('/api/detailedTasks/:year/:month/:day', (req, res) => {
    const { year, month, day } = req.params
    
    db.any("SELECT task_title, task_duration FROM tasks WHERE year = $1 AND month = $2 AND numday = $3", [year, month, day])
    .then(tasks => {
        res.json(tasks)
    })
    .catch(e => console.error(e))
})

app.get('/api/year-month', (req, res) => {
    db.any('SELECT DISTINCT year, month FROM tasks WHERE year = 2021')
    .then(yrMon => {
        res.json(yrMon)
    })
    .catch(e => console.error(e))
})

app.get('/api/sort/:year/:month', (req, res) => {
    const { year, month } = req.params

    db.any('SELECT year, month, numDay, day FROM tasks WHERE year=$1 AND month=$2 GROUP BY year, month, numDay, day ORDER BY numDay', [year, month])
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

app.listen(process.env.PORT, () => console.log('Server is running...'))
