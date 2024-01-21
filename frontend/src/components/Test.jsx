import axios from 'axios';
import Logout from '../global/Logout';
import Cookies from 'js-cookie';
const Test = () => {
  return (
    <div>Token: {Cookies.get('token')}</div>
  )
}

export default Test