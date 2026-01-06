import { API_ENDPOINT } from "../../config/constants";

type taskInput = {
    name : string,
    description : string,
    state : 'pending' | 'done',
    assignee : number,
    dueDate : string,
}

export const addTask = async (
    dispatch :  React.ActionDispatch<[action: {
                    type: "create_task_request" | "create_task_success" | "create_task_failure";
                    payload: string;
                }]>,
    projectId : number,
    task : taskInput,
) => {
    dispatch({type : 'create_task_request', payload : ''});
    try {
        const response = await fetch(`${API_ENDPOINT}/projects/${projectId}/tasks`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`,
            },
            body : JSON.stringify({...task}),
        });
        
        if(response.ok) {
            dispatch({type : 'create_task_success', payload : ''});
            console.log("task added successfully");
        }
        else { 
            throw new Error("failed to create new task");
        }
    }
    catch(error) {
        console.log(error);
        dispatch({type : 'create_task_failure', payload : 'unable to create task'});
    }
}