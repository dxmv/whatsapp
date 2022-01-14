import {IUserModel} from "../types";

// Initial State
interface IUserState{
  user:IUserModel|null
}

const initialState:IUserState={
  user:null
}

// Actions

interface ISetUserAction{
  type:"SET_USER",
  payload:IUserModel
}

interface IDeleteUserAction{
  type:"DELETE_USER",
}

export const SET_USER=(user:IUserModel):ISetUserAction=>{
  return{
    type:"SET_USER",
    payload:user
  };
};


export const DELETE_USER=():IDeleteUserAction=>{
  return{
    type:"DELETE_USER"
  }
};

type Action=ISetUserAction|IDeleteUserAction;

// Reducer function
const userReducer=(state=initialState,action:Action)=>{
  switch(action.type){
    case "SET_USER":
      return {
        ...state,
        user:{...action.payload}
      };
    case "DELETE_USER":
      return{
        ...state,
        user:null
      };
    default:
      return state;
  }
}

export default userReducer;