import './App.css';
import { connect } from 'react-redux'
import { useState, useRef } from 'react'
import PieChart from './PieChart'

function App() {
  const [task, setTask] = useState('')
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [task_times, setTask_times] = useState([])
  const countRef = useRef(null)

  const handleTaskChange = (e) => {
    setTask(e.target.value)
  }

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    setIsPaused(false)
    clearInterval(countRef.current)
  }

  const handleResume = () => {
    setIsPaused(true)
    countRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(false)
    clearInterval(countRef.current)
    setTimer(0)
  }

  const finishTask = () => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    const now = new Date()
    const year = now.getFullYear()
    const numDay = now.getDate()
    const day = days[ now.getDay() ]
    const month = months[ now.getMonth() ]

    fetch('http://localhost:8080/api/add-task', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'year': year,
          'month': month,
          'numDay': numDay,
          'day': day,
          'task_title': task,
          'task_duration': timer
        })
    })
    .then(response => response.json())
    .then(result => {
      if(result.success) {
        console.log(result.message)
      }
    })

    setTask_times([
      ...task_times,
      {
        task: task,
        duration: timer
      }
    ])
    handleReset()
    setTask('')
  }

  const deleteTask = (e) => {
    const taskTitle = e.target.name
    setTask_times((task_times.filter(item => item.task !== taskTitle)))

    fetch('http://localhost:8080/api/delete-task', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "task_title": taskTitle
      })
    })
    .then(response => response.json()) 
    .then(result => {
      if(result.success) {
        console.log(result.message)
      }
    })
  }

  const clearAllTask = () => {
    setTask_times([])
  }
  
  const formatTime = () => {
    const seconds = `0${(timer % 60)}`.slice(-2)
    const initMinutes = `${Math.floor(timer / 60)}`
    const minutes = `0${initMinutes % 60}`.slice(-2)
    const hours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${hours} : ${minutes} : ${seconds}`
  }

  const formatTimeVersionTwo = (duration) => {
    const seconds = `${(duration % 60)}`.slice(-2)
    const initMinutes = `${Math.floor(duration / 60)}`
    const minutes = `${initMinutes % 60}`.slice(-2)
    const hours = `${Math.floor(duration / 3600)}`.slice(-2)

    if (hours === '0' & minutes === '0') {
      return `${seconds} sec`
    } else if (hours === '0' && minutes !== '0') {
      return `${minutes} min ${seconds} sec`
    } else {
      return `${hours} hr ${minutes} min ${seconds} sec`
    }
  }
  
  const taskTimeItems = task_times.map((taskTime, index) => {
    return ( 
      <li key={index}>
        <div>
          <h4>{taskTime.task}</h4>
          <p>{formatTimeVersionTwo(taskTime.duration)}</p>
        </div>
        <button name={taskTime.task} onClick={deleteTask}>Delete</button>
      </li>
    )
  })

  return (
    <main className="main-content">
      <article className="first">
        <h3>Task</h3>
        <section className='taskTitle'>
          <input type="text" value={task} placeholder="Enter the task" onChange={handleTaskChange} />
        </section>
        <h3>Stopwatch</h3>
        <section className='stopwatch'>
          <p>{formatTime()}</p> 
          <div className='buttons'>
            {
              !isActive && !isPaused ?
                <button onClick={handleStart}>Start</button>
                : (
                  isPaused ? <button onClick={handlePause}>Pause</button> :
                    <button onClick={handleResume}>Resume</button>
                )
            }
            <button onClick={handleReset} disabled={!isActive}>Reset</button>
            <button onClick={finishTask}>Finish</button>
          </div>
        </section>
      </article>
      <article className="second">
        <section className='taskDisplay'>
            <ul>
              {taskTimeItems}
              <button id='clearBtn' onClick={clearAllTask}>Clear All</button>
            </ul>
        </section>
      </article>
      <article className="third">
        <PieChart allTask={task_times} />
      </article>
    </main>
  );
}

export default connect()(App);
