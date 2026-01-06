import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../../context/tasks/actions";
import { useContext } from "react";
import { TaskContext } from "../../context/tasks/Index";

type formInputs = {
    name : string,
    description : string,
    state : 'pending' | 'done',
    assignee : number,
    dueDate : string,
}

const NewTask = () => {
    const {dispatch} = useContext(TaskContext);
    const { register, handleSubmit, formState : { errors },reset}  = useForm<formInputs>();
    const navigate = useNavigate();
    const {projectID} = useParams();

    const onSubmit : SubmitHandler<formInputs> = (data) => {
        reset();
        addTask(dispatch,Number(projectID),data);
    }

    return (
        <div style = {{
            position : 'fixed', 
            top : 0,
            left : 0,
            backgroundColor : 'hsl(0,0%,0%,0.25)',
            height : '100vh',
            width : '100vw',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            zIndex : 1,
        }}>
            <div style={{
                position : 'relative',
                backgroundColor : 'hsl(0,0%,100%,1.0)',
                padding : '0.5rem',
            }}>
                <span onClick={() => {navigate(-1)}} style = {{
                    position : 'absolute',
                    top : '1rem',
                    right : '1rem',
                    fontWeight : 'bold',
                    fontSize : '1rem',
                }}>X</span>
                <h3>create a new task.</h3>
                <form onSubmit={handleSubmit(onSubmit)} style = {{
                    display : 'flex',
                    flexDirection : 'column',
                    width : '20rem',
                    gap : '0.25rem',
                }}>
                    <label htmlFor="name">name</label>
                    <span style = {{color : 'red'}}>{errors.name?.message}</span>
                    <input {...register("name", {required : "this is a mandatory field"})} />
                    <label htmlFor="description">description</label>
                    <span style = {{color : 'red'}}>{errors.description?.message}</span>
                    <input {...register("description", {required : "this is a mandatory field"})} />
                    <label htmlFor="state">state</label>
                    <span style = {{color : 'red'}}>{errors.state?.message}</span>
                    <select {...register('state',{required : "this is a mandatory field"})}>
                        <option value = 'pending'>pending</option>
                        <option value = 'done'>done</option>
                    </select>   
                    <label htmlFor="dueDate">dueDate</label>
                    <span style = {{color : 'red'}}>{errors.dueDate?.message}</span>
                    <input type="date" {...register("dueDate", {required : "this is a mandatory field"})} />
                    <label htmlFor="assignee">assignee</label>
                    <span style = {{color : 'red'}}>{errors.assignee?.message}</span>
                    <input {...register("assignee", {required : "this is a mandatory field"})} />
                    <button type = 'submit'>add</button>
                </form>
            </div>
        </div>
    )
}

export default NewTask
