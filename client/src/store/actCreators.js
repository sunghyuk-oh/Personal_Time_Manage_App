import * as actionTypes from '../store/actTypes'

export const displayAllTasks = () => {
    return (dispatch) => {
        fetch('https://boiling-bastion-18822.herokuapp.com/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            dispatch({ type: actionTypes.DISPLAY, payload: tasks })
        })
    }
}

export const displayDetailedTasks = (year, month, day) => {
    return (dispatch) => {
        fetch(`https://boiling-bastion-18822.herokuapp.com/api/detailedTasks/${year}/${month}/${day}`)
        .then(response => response.json())
        .then(detailedTasks => {
            dispatch({ type: actionTypes.DETAILS, payload: detailedTasks})
        })
    }
}

export const displayYearMonth = () => {
    return (dispatch) => {
        fetch('https://boiling-bastion-18822.herokuapp.com/api/year-month')
        .then(response => response.json())
        .then(yearMonth => {
            dispatch({ type: actionTypes.YEAR_MONTH, payload: yearMonth})
        })
    }
}

export const sortDisplayByMonth = (year, month) => {
    return (dispatch) => {
        fetch(`https://boiling-bastion-18822.herokuapp.com/api/sort/${year}/${month}`)
        .then(response => response.json())
        .then(sortedTask => {
            dispatch({ type: actionTypes.SORT_BY_MONTH, payload: sortedTask })        
        })
    }
}