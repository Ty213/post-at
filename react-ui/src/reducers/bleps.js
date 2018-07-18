//Bleps Reducer

const blepsReducerDefaultState = [];

export default (state = blepsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_BLEP':
            return [
                ...state,
                action.blep
            ];
        case 'GET_ALL_BLEPS':
            return [
                
            ]
        default:
            return state;
    }
};