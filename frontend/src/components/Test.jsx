import axios from 'axios';
import Logout from './Logout';
const Test = () => {
  return (
    <div onClick={() => {Logout();}}>Test</div>
  )
}

export default Test