import { useContext } from "react";
import { Link, Outlet, useParams } from "react-router-dom"
import { ProjectContext } from "../../context/projects/Index";

const ProjectDetails = () => {
    const {projectID} = useParams();
    const {projects} = useContext(ProjectContext);

    const filtered_projects = (projects.filter((project) =>  {
        if(project.id === Number(projectID))
            return true;
        return false;
    }));
    
    if(filtered_projects.length) {
        const project = filtered_projects[0];
        return (
            <>
                <h2>project details</h2>
                <li>project_id : {project.id}</li>
                <li>project_name : {project.name}</li>
                <li>project_organization : {project.organisation_id}</li>
                <Link to = 'tasks/newtask'>
                    <button>add a task</button>
                </Link>
                <Outlet />
            </>
        )
    }
    else {
        return (
            <>project not found</>
        )
    }
}

export default ProjectDetails
