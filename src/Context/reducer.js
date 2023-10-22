const reducer = (state, action) => {
    switch(action.type){
        case "GET_USER":
            const Data = action.payload
            console.log(Data, "from reducer")
            return {...state, ...Data}
    default:
        return state;
    }
}

export default reducer;

