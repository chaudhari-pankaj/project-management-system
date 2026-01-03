import { API_ENDPOINT } from "../../config/constants";
import type { project } from "../../index.types";

type dispatchType = (action :{ type : 'fetchProjectsRequest' | 'fetchProjectsFailure' | 'fetchProjectsSuccess' | 'postProjectSuccess', payload : project []}) => void;

export const loadProjects = async(dispatch : dispatchType) => {
    try {
        dispatch({type : 'fetchProjectsRequest',payload : []});
        
        const response = await fetch(`${API_ENDPOINT}/projects`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`,                    
            }
        });
        if(response.ok) {
            dispatch({type : 'fetchProjectsSuccess', payload : await response.json()})
        }        
    }
    catch(error) {
        console.log(error);
        dispatch({type : 'fetchProjectsFailure',payload : []})
    }
}

export const addProject = async (dispatch : dispatchType,data : {name : string}) => {
     try {
        const response = await fetch(`${API_ENDPOINT}/projects`, {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        if(response.ok) {
            dispatch({type : 'postProjectSuccess', payload : [await response.json()]});
            console.log('project added successfully');
        }   
        else
            console.log('couldnt add the project..');
    }
    catch(error) {
        console.log(error);
    }
}