const Dashboard = () => {
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString? userString : '');
  return (
    <>
        <h1>Dashboard</h1>
        <ul>username : {user.name}</ul>
        <ul>email : {user.email}</ul>
    </>
  )
}

export default Dashboard
