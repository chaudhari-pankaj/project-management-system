import { Link } from "react-router-dom"
import type { project } from "../../../../index.types"

type projectCardProps = {
    project : project,
    key : number,
}
const ProjectCard = ({project} : projectCardProps ) => {
  return (
    <div style = {{display : 'flex', flexDirection : 'column',border : '2px solid black', listStyle : 'none', padding : '2px',width : '20rem'}}>
      <Link to = {`${project.id}`}>project_id : {project.id}</Link>
      <li>project_name : {project.name}</li>
    </div>
  )
}

export default ProjectCard
