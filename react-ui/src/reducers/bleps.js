//Bleps Reducer

const blepsReducerDefaultState = [];

export default (state = blepsReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_BLEP':
            return [
                ...state,
                action.blep
            ];
        case 'REQUEST_BLEPS':
            return [
                
            ]
        default:
            return state;
    }
};