import { useContext } from "react"
import type { member } from "../../index.types"
import { TrashIcon } from "lucide-react"
import { MemberContext } from "../../context/members/Index"
import { deleteMember } from "../../context/members/actions"

type memberCardProps = {
    member : member,
}
const MemberCard = ({member} : memberCardProps) => {
  const {dispatch} = useContext(MemberContext);

  return (
    <div style = {{listStyle : 'none', padding : '2px', border : '2px solid black', width : '15rem',position : 'relative'}}>
      <TrashIcon onClick={() => {deleteMember(dispatch,member)}} size = {15} style = {{position : 'absolute', top : '5px', right : '5px'}}/>
      <li>id : {member.id}</li>
      <li>name : {member.name}</li>
      <li>email-id : {member.email}</li>
    </div>
  )
}

export default MemberCard
