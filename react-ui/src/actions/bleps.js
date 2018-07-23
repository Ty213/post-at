import uuid from 'uuid';

//ADD_BLEP
export const addBlep = (
    {   title = '',
        content = '',
        likes = 0
    } = {}
) => ({
    type: 'ADD_BLEP',
    blep: {
        id: uuid(),
        title,
        content,
        likes
    }
});

//REQUEST_BLEPS
export const requestBleps = () => ({
    type: 'REQUEST_BLEPS'
});

//RECEICE_BLEPS
export const receiveBleps = (json) => ({
    type: 'RECEIVE_BLEPS',
    bleps: json.data
});


export function fetchBleps() {
    return dispatch => {
      dispatch(requestBleps())
      return fetch(`localhost:5000/api/-75.1667164,39.9551314`)
        .then(response => response.json())
        .then(json => dispatch(receiveBleps(json)))
    }
  }