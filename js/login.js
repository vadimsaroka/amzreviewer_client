import axios from "axios";

const loginBtn = document.querySelector("#login");

loginBtn.addEventListener("click", e => {
    e.preventDefault();
    console.log(e);
    // try {
    //   const res = await axios({
    //     method: 'POST',
    //     url: '/api/v1/users/login',
    //     data: {
    //       email,
    //       password
    //     }
    //   });
  
    //   if (res.data.status === 'success') {
    //     showAlert('success', 'Logged in successfully!');
    //     window.setTimeout(() => {
    //       location.assign('/');
    //     }, 1500);
    //   }
    // } catch (err) {
    //   showAlert('error', err.response.data.message);
    // }
})

export const login = async (email, password) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/login',
        data: {
          email,
          password
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };