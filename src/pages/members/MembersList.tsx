import { useContext, useEffect } from "react"
import MemberCard from "./MemberCard"
import { MemberContext } from "../../context/members/Index"
import { loadMembers } from "../../context/members/actions"
const MembersList = () => {
    const {members,isLoading,dispatch} = useContext(MemberContext);

    useEffect(() => {
        loadMembers(dispatch);
    },[])

    return (
        <div style = {{display : 'flex' , flexWrap : 'wrap', gap : '1rem',justifyContent : 'center'}}>
            { isLoading ? 
                <p>Loading...</p> : 
                members.length === 0 ? 
                    <p>looks like you don't have any members currently..</p> :
                    <>
                        {members.map((member) => {
                            return  <MemberCard key = {member.id} member={member} />
                        })}
                    </>
            }
        </div>
    )
}

export default MembersList
