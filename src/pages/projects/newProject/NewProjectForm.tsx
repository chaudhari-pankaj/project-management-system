import { useForm, type SubmitHandler, type SubmitErrorHandler } from "react-hook-form"
import { addProject } from "../../../context/projects/actions";
import { useContext } from "react";
import { ProjectContext } from "../../../context/projects/Index";

type formInput = {
    name : string,
}

const NewProjectForm = ({setOnDisplay} : {setOnDisplay : (arg : boolean) => void}) => {
    const {dispatch} = useContext(ProjectContext);

    const {register, handleSubmit,formState : { errors },reset} = useForm<formInput>();
    
    const onSubmit: SubmitHandler<formInput> = async(data) => {
        reset();
        //post the data to the api here..
        addProject(dispatch,data);
        setOnDisplay(false);
    }
    const onError : SubmitErrorHandler<formInput> = (errors) => {
        console.log(errors);
    }
    return (
        <div id = 'modal-container' style = {{
            position : 'fixed',
            top : 0,
            left : 0,
            backgroundColor : 'hsl(0,0%,0%,0.5)',
            height : '100vh',
            width : '100vw',
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            zIndex : 1,
        }}>
            <div id = 'modal' style = {{
                backgroundColor : 'hsl(0,0%,100%,1.0)',
                padding : '1rem',
                position : 'relative',
                }}>
                <h3>add a new project</h3>
                <h3 onClick={() => {setOnDisplay(false)}} style = {{
                    position : 'absolute',
                    top : '10px',
                    right : '10px',
                    cursor : 'default',
                }}>x</h3>
                <form onSubmit={handleSubmit(onSubmit, onError)} style = {{display : 'flex', flexDirection : 'column',width : '20rem'}}>
                    <label htmlFor="name">project name</label>
                    <span style = {{color : 'red'}}>{errors.name?.message}</span>
                    <input {...register("name",{required : 'this field is mandatory'})} />
                    <button type = 'submit'>Add Project</button>
                </form>
            </div>
        </div>
    )
}

export default NewProjectForm
