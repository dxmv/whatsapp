/*
  Reducer for current chat opened
*/

// INITIAL STATE
interface IChatActive{
  active:number
}
const initialState:IChatActive={
  active:-1
};

// ACTION

interface ISetActive{
  type:"SET_ACTIVE",
  payload:number 
}

export const SET_ACTIVE=(active:number):ISetActive=>{
  return{
    type:"SET_ACTIVE",
    payload:active
  };
};

type Action=ISetActive


const chatReducer=(state=initialState,action:Action):IChatActive=>{
  switch(action.type){
    case "SET_ACTIVE":
      return {
        ...state,
        active:action.payload
      }
    default:
      return state
  }
};

export default chatReducer;