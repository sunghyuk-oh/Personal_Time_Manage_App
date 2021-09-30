import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actCreators'
import TaskDetails from './TaskDetails'
import './History.css'

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

    const allYrMonths = props.yearMonth.map((date, index) => {
        return (
            <button className="yrMonBtn" onClick={()=>sortByMonth(date.year, date.month)}>{date.month}</button>
        )
    })

    const allTasks = props.everyTask.map((task, index) => {
        return (
            <section key={index} className="dateDetails">
                <div className="eachDate" onClick={() => showHideTasks(index)}>
                    <h4>{task.month} {task.numday}, {task.day}</h4>
                </div>
                <div className="eachDetails">
                    {showTasks && <TaskDetails year={task.year} month={task.month} numDay={task.numday} day={task.day} />}
                </div>
            </section>
        )
    })

    return (
        <main className="history-main">
            <article className="sidebar">
                <h2>2021</h2>
                <div className="months">{allYrMonths}</div>
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