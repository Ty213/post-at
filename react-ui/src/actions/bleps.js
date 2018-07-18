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

//GET_ALL_BLEPS
export const getBleps = () => ({
    type: 'GET_ALL_BLEPS'
});