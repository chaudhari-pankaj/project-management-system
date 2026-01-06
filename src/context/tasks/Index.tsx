import { createContext, useReducer, type ReactNode } from "react"

const initialState = {
    isLoading : false,
    isError : false,
    errorMessage : '',
}

const reducer = (prevState : typeof initialState ,action : {type : 'create_task_request' | 'create_task_success' | 'create_task_failure', payload : string}) => {
    switch(action.type) {
        case 'create_task_request' : 
            return {
                ...prevState,
                isLoading : true,
            }
        case 'create_task_success' :
            return {
                ...prevState,
                isLoading : false,
            }
        case 'create_task_failure' :
            return {
                isLoading :false,
                isError : true,
                errorMessage : action.payload,
            }
        default : 
            return prevState;
    }
}

type taskContextType = {
    isLoading : boolean,
    isError : boolean,
    errorMessage : string,
    dispatch : React.ActionDispatch<[action: {
        type: "create_task_request" | "create_task_success" | "create_task_failure";
        payload: string;
    }]>
}
export const TaskContext = createContext<taskContextType>({...initialState,dispatch : () => {}});

const TaskProvider = ({children} : {children : ReactNode}) => {
    const [{isLoading,isError,errorMessage},dispatch] = useReducer(reducer,initialState);
  return (
    <TaskContext.Provider value = {{isLoading,isError,errorMessage,dispatch}}>
        {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider
