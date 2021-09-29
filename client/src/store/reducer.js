import * as actionTypes from '../store/actTypes'

const initialState = {
    tasks: [],
    detailedTasks: [],
    yearMonth: []
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.DISPLAY:
            return {
                ...state,
                tasks: action.payload
            }
        case actionTypes.DETAILS:
            return {
                ...state,
                detailedTasks: action.payload
            }
        case actionTypes.YEAR_MONTH:
            return {
                ...state,
                yearMonth: action.payload
            }
        case actionTypes.SORT_BY_MONTH:
            return {
                ...state,
                tasks: action.payload
            }
        default:
            return state
    }
}

export default reducer
