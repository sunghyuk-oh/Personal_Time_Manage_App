import { connect } from 'react-redux'

function TaskDetails(props) {

    const formatTime = (duration) => {
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
    
    const details = props.taskDetails.map((task, index) => {
        return (
            <li key={index}>
                <h5>{task.task_title}</h5>
                <h5>{formatTime(task.task_duration)}</h5>
            </li>
        )
    })

    return (
        <div>
            <ul>{details}</ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskDetails: state.detailedTasks
    }
}

export default connect(mapStateToProps)(TaskDetails)