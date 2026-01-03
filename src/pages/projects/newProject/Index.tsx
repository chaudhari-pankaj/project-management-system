import { useState } from "react";
import NewProjectForm from "./NewProjectForm"

const NewProject = () => {
    const [onDisplay,setOnDisplay] = useState(false);
    
    return (
        <div style = {{display : 'flex', justifyContent : 'center'}}>
        <button onClick={() => {setOnDisplay(true)}}>newProject</button>
        { onDisplay ? <NewProjectForm setOnDisplay = {setOnDisplay}/> : null}
        </div>
    )
}

export default NewProject
