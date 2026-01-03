import { createContext, useReducer, type ReactNode } from "react";
import type { member } from "../../index.types";

type membersProviderProps = {
    children : ReactNode,
}
type memberContextProps = {
    members : member[],
    isLoading : boolean,
    dispatch : React.ActionDispatch<[action: { type: 'fetchMembersSuccess' | 'fetchMembersRequest' | 'fetchMembersError' | 'postMemberSuccess' | 'deleteMemberSuccess',payload: member[] }]>
}

export const MemberContext = createContext<memberContextProps>({members : [],isLoading : false, dispatch : () => {}});

const reduce = (prevState : {members : member[], isLoading : boolean},action : {type: 'fetchMembersSuccess' | 'fetchMembersRequest' | 'fetchMembersError' | 'postMemberSuccess' | 'deleteMemberSuccess' , payload : member[]}) => {
    switch(action.type) {
        case 'fetchMembersRequest' :
            return {
                ...prevState,
                isLoading : true,
            }
        case 'fetchMembersSuccess' :
            return {
                isLoading : false,
                members : action.payload,
            }
        case 'fetchMembersError' : 
            return {
                ...prevState,
                isLoading : false,
            }
        case 'postMemberSuccess' : 
            return {
                ...prevState,
                members : [...prevState.members,...action.payload],
            }
        case 'deleteMemberSuccess' : {
            const currentMembers = prevState.members.filter((element) => {return element !== action.payload[0]});
            return {
                ...prevState,
                members : currentMembers,
            }
        }
        default :
            return prevState;
    }
}

const MembersProvider = ({children} : membersProviderProps) => {
    const [{members,isLoading},dispatch] = useReducer(reduce,{members : [],isLoading : false});
    return (
        <MemberContext.Provider value = {{members,isLoading,dispatch}}>
            {children}
        </MemberContext.Provider>
    )
}

export default MembersProvider

