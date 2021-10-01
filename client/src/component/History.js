import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actCreators'
import TaskDetails from './TaskDetails'
import './History.css'

function History(props) {
    const [showTasks, setShowTasks] = useState(false)
    const [currentIndex, setcurrentIndex] = useState(-1)

    useEffect(() => {
        props.onDisplayYearMonth()
        props.onDisplayAllDate()
    }, [])

    const showHideTasks = (index, year, month, numday) => {
        setcurrentIndex(index)
        props.onDisplayDetails(year, month, numday)
        
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
            <button className="yrMonBtn" key={index} onClick={()=>sortByMonth(date.year, date.month)}>{date.month}</button>
        )
    })

    const allTasks = props.everyTask.map((task, index) => {
        return (
            <section className="dateDetails">
                <div className="eachDate" onClick={() => showHideTasks(index, task.year, task.month, task.numday)}>
                    <div>
                            <h4>{task.month} {task.numday}, {task.year}</h4>
                    </div>
                </div>
                <div className="eachDetails">
                {
                    currentIndex === index && showTasks ? 
                    (
                        <TaskDetails />
                    ) 
                    :null
                }
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
        onDisplayAllDate: () => dispatch(actionCreator.displayAllTasks()),
        onDisplayYearMonth: () => dispatch(actionCreator.displayYearMonth()),
        onSortByMonth: (year, month) => dispatch(actionCreator.sortDisplayByMonth(year, month)),
        onDisplayDetails: (year, month, day) => dispatch(actionCreator.displayDetailedTasks(year, month, day))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)