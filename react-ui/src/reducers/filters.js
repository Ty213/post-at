const filtersReducerDefaultState = {
    sortBy: 'none'
};

export default (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
        case 'SORT_BY_LIKES':
            return {...state, sortBy: 'likes'}
        default:
            return state;
    }
}