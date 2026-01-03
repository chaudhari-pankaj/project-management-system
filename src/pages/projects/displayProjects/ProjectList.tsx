import { useContext, useEffect} from 'react'
import { ProjectContext } from '../../../context/projects/Index'
import { loadProjects } from '../../../context/projects/actions'
import ProjectCard from './projectCard/Index'
       
const ProjectList = () => {
    const {projects,isLoading,dispatch} = useContext(ProjectContext);
    
    useEffect(() => {
        loadProjects(dispatch);
    },[])

    return (
        <div style = {{display : 'flex', flexWrap : 'wrap', gap : '1rem', justifyContent : 'center', padding : '5px'}}>
            {   isLoading ? 
                <p>Loading.. </p> : 
                projects.length === 0 ? 
                    <p>looks like you don't have any projects currently.. </p> :
                    <>
                        {projects.map((project) => {
                            return <ProjectCard key = {project.id} project = {project} />
                        })}
                    </>
            }
        </div>

    )
}

export default ProjectList
