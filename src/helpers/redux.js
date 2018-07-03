import identity from 'lodash/identity'

export const makeApiCallAction = (ACTION_NAME, asyncAction) => dispatch => {
  dispatch({
    type: `${ACTION_NAME}_START`
  })

  return asyncAction
    .then(response => {
      dispatch({
        type: `${ACTION_NAME}_COMPLETE`,
        payload: response
      })

      return response
    })
    .catch(err => {
      dispatch({
        type: `${ACTION_NAME}_FAILURE`,
        payload: err
      })
    })
}

export const createResource = ({
  name,
  selector = identity,
  initialData,
  subReducer
}) => {
  const initState = {
    isLoading: false,
    status: null,
    error: null,
    data: initialData
  }

  return (state = initState, action) => {
    const { type, payload, error } = action

    switch (type) {
      case `${name}_START`:
        return Object.assign({}, state, {
          status: null,
          isLoading: true,
          data: initialData
        })

      case `${name}_COMPLETE`:
        return Object.assign({}, state, {
          isLoading: false,
          status: 'success',
          data: selector(payload)
        })

      case `${name}_FAILURE`:
        return Object.assign({}, state, {
          status: null,
          isLoading: false,
          error: error,
          data: initialData
        })
      default:
        return subReducer ? subReducer(state, action) : state
    }
  }
}
