import { useForm, type SubmitErrorHandler, type SubmitHandler} from "react-hook-form"
import { addMember } from "../../context/members/actions";
import { useContext } from "react";
import { MemberContext } from "../../context/members/Index";

type newMemberFormProps = {
    setOnDisplay : React.Dispatch<React.SetStateAction<boolean>>,
}
type inputForm = {
    name :string,
    email : string,
    password : string,
}

const NewMemberForm = ({setOnDisplay} : newMemberFormProps) => {
    const {dispatch} = useContext(MemberContext);
    const {register,handleSubmit,formState : {errors},reset} = useForm<inputForm>();

    const onSubmit : SubmitHandler<inputForm> = (data : inputForm) => {
        addMember(dispatch,data);
        reset();
        setOnDisplay(false);
    }

    const onError: SubmitErrorHandler<inputForm> = (errors) => {
        console.log(errors);
    }
    
    return (
        <div style = {{
            position : 'fixed',
            height : '100vh',
            width : '100vw',
            backgroundColor : 'hsl(0,0%,10%,0.5)',
            top : 0,
            left : 0,
            zIndex : 1,
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
        }}>
            <div style = {{
                backgroundColor : 'hsl(0,0%,100%,1.0)',
                minWidth : '15rem',
                minHeight : '10rem',
                position : 'relative',
                padding : '10px',
            }}>
                <h3>add a member.</h3>
                <p style = {{
                    position : 'absolute',
                    top : '10px',
                    right : '10px',
                    margin : 0,
                    cursor : 'default'
                }}onClick={() => {setOnDisplay(false)}}>X</p>
                <form onSubmit={handleSubmit(onSubmit,onError)} style = {{display : 'flex', flexDirection : 'column'}}>
                    <label htmlFor="name">name</label>
                    {errors?.name ? <span style = {{color : 'hsl(0,100%,50%,1.0)'}}>{errors.name.message}</span> : null}
                    <input {...register('name', {required : 'this is a mandatory field'})}/>
                    <label htmlFor="email">email</label>
                    {errors?.email ? <span style = {{color : 'hsl(0,100%,50%,1.0)'}}>{errors.email.message}</span> : null}
                    <input {...register('email', {required : 'this is a mandatory field'})}/>
                    <label htmlFor="password">password</label>
                    {errors?.password ? <span style = {{color : 'hsl(0,100%,50%,1.0)'}}>{errors.password.message}</span> : null}
                    <input {...register('password', {required : 'this is a mandatory field'})}/>
                    <button type = 'submit'>add member</button>
                </form>
            </div>
        </div>
    )
}

export default NewMemberForm
