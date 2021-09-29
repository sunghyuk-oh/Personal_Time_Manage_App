import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actCreators'
import TaskDetails from './TaskDetails'

function History(props) {
    const [showTasks, setShowTasks] = useState(false)

    useEffect(() => {
        props.onDisplayYearMonth()
        props.onDisplayAll()
    }, [])

    const showHideTasks = (index) => {
        if (!showTasks) {
            setShowTasks(true)
        } else {
            setShowTasks(false)
        }
    }

    const sortByMonth = (year, month) => {
        props.onSortByMonth(year, month)
    }

    const allTasks = props.everyTask.map((task, index) => {
        return (
            <section key={index} className="eachDate">
                <div>
                    <h4>{task.month} {task.numday}, {task.day}</h4>
                    <button onClick={() => showHideTasks(index)}>Show Details</button>
                </div>
                <div>
                    {showTasks && <TaskDetails year={task.year} month={task.month} numDay={task.numday} day={task.day} />}
                </div>
            </section>
        )
    })

    const allYrMonths = props.yearMonth.map((date, index) => {
        return (
            <div key={index}>
                <ul>
                    <li><button onClick={()=>sortByMonth(date.year, date.month)}>{date.month}</button></li>
                </ul>
            </div>
        )
    })

    return (
        <main className="history-main">
            <article className="sidebar">
                <h2>2021</h2>
                {allYrMonths}
            </article>
            <article className="taskByDate">
                {allTasks}
            </article>
            
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        everyTask: state.tasks,
        yearMonth: state.yearMonth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDisplayAll: () => dispatch(actionCreator.displayAllTasks()),
        onDisplayYearMonth: () => dispatch(actionCreator.displayYearMonth()),
        onSortByMonth: (year, month) => dispatch(actionCreator.sortDisplayByMonth(year, month))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(History)