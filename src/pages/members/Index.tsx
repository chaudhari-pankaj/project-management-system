import { useState } from "react"
import MembersList from "./MembersList"
import NewMemberForm from "./NewMemberForm";

const Members = () => {
  const [onDisplay,setOnDisplay] = useState(false);
  return (
    <div style = {{padding : '5px'}}>
      <h1>members</h1>
      <MembersList />
      <button onClick={() => {setOnDisplay(true)}}>Add member</button>
      {onDisplay ? <NewMemberForm setOnDisplay={setOnDisplay}/> : null}
    </div>
  )
}

export default Members
