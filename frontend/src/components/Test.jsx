import axios from 'axios';
const Test = () => {
  axios.get('http://localhost:8000/api/user/warehouses/')
    .then(function (response) {
      console.log(response.data);
      // Cookies.remove('token');
    })
    .catch(function (error) {
      console.log(error);
      alert(error.response.data.error);
    });
  return (
    <div>Test</div>
  )
}

export default Test