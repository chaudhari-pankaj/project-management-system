import { API_ENDPOINT } from "../../config/constants";
import type { member } from "../../index.types";

type dispatchType = React.ActionDispatch<[action: {type: 'fetchMembersSuccess' | 'fetchMembersRequest' | 'fetchMembersError'| 'postMemberSuccess' | 'deleteMemberSuccess', payload: member[]}]>;

export const loadMembers = async (dispatch : dispatchType) => {
    dispatch({type : 'fetchMembersRequest', payload : []});
    try{
        const response = await fetch(`${API_ENDPOINT}/users`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`,
            }
        });
        
        if(response.ok) {
            dispatch({type : 'fetchMembersSuccess', payload : await response.json()})
        }
        else {
            console.log('api error in fetching the members');
        }
    }
    catch(error) {
        dispatch({type :'fetchMembersError' ,payload : []})
        console.log(error);
    }
}

type addMemberDataProps = {
    name : string,
    email : string,
    password : string,
}
export const addMember = async (dispatch : dispatchType,data :addMemberDataProps) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/users`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`,
            },
            body : JSON.stringify(data),
        })
        
        if(response.ok) {
            dispatch({type : 'postMemberSuccess', payload : [(await response.json()).user]})
            console.log('member added successfully');
        }
        else
            console.log('api error during addition of member');
    }
    catch(error) {
        console.log(error);
    }
}

export const deleteMember = async (dispatch : dispatchType, member : member) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/users/${member.id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('authToken')}`,
            }
        })
        if(response.ok)
            dispatch({type : 'deleteMemberSuccess', payload : [member]})
        else
            console.log('api error on deleting the member')
    }
    catch(error) {
        console.log(error);
    }
}