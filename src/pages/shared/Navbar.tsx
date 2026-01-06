import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { Themecontext } from "../../context/theme/Index";

const Navbar = () => {
  
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/signin');
  }
  const {theme,setTheme} = useContext(Themecontext);
  
  const handleTheme = () => {
    setTheme((prevTheme) => {
      if(prevTheme === 'light')
        return 'dark'
      else 
        return 'light'
    })
  }

  let navColor = 'hsla(149, 60%, 20%, 1.00)';
  if(theme === 'light')
    navColor = 'hsla(149,60%,60%,1.00)';
  else
    navColor = 'hsla(149, 60%, 20%, 1.00)';

  return (
    <div id = 'navbar' style = {{backgroundColor : navColor, fontSize : '0.75rem', margin: '0 0 5px 0', padding : '0 10px 0 10px'}}>
      <nav style = {{display : 'flex', alignItems: 'center'}}>
        <h1>Todo Manager</h1>
        <NavLink to = 'dashboard'>DASHBOARD</NavLink>
        <NavLink to = 'projects'>PROJECTS</NavLink>
        <NavLink to = 'members'>MEMBERS</NavLink>
        <button onClick = {handleTheme} style = {{marginLeft : 'auto'}}>{theme ==='light' ? 'dark' : 'light'}</button>
        <button onClick = {handleLogout} style = {{marginLeft : '10px'}}>logout</button>
      </nav>
    </div>
  )
}

export default Navbar
