import { createContext, useReducer, type ReactNode } from 'react'
import type { project } from '../../index.types';

type projectContextProviderProps = {
    children : ReactNode,
}

type reduceProps = {
    projects : project[],
    isLoading : boolean,
}

type projectContextProps = {
    projects : project[],
    isLoading : boolean,
    dispatch : (action :{ type : 'fetchProjectsRequest' | 'fetchProjectsFailure' | 'fetchProjectsSuccess' | 'postProjectSuccess', payload : project []}) => void,
}
export const ProjectContext = createContext<projectContextProps>({
    projects : [],
    isLoading : false,
    dispatch : () => {},
});

const reduce = (prevState : reduceProps,action : { type : 'fetchProjectsRequest' | 'fetchProjectsFailure' | 'fetchProjectsSuccess' | 'postProjectSuccess', payload : project []}) => {
    switch(action.type) {
        case 'fetchProjectsRequest' :
            return {
                ...prevState,
                isLoading : true
            }
        case 'fetchProjectsSuccess' :
            return {
                ...prevState,
                isLoading : false,
                projects : action.payload,
            }
        case 'fetchProjectsFailure' :
            return {
                ...prevState,
                isLoading : false,
            }
        case 'postProjectSuccess' :
            return {
                ...prevState,
                projects : [...prevState.projects,...action.payload],
            }
        default : 
            return prevState;
    }
}

const ProjectProvider = ({children} : projectContextProviderProps) => {
    const [{projects,isLoading},dispatch] = useReducer(reduce,{projects : [],isLoading : false});
    return (
        <ProjectContext.Provider value = {{projects, isLoading, dispatch}}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider
