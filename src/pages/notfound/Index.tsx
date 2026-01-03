import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h2>page not found</h2>
      <Link to = '/home'>
        <button>return to home</button>
      </Link>
    </>
  )
}

export default NotFound
