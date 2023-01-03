import axios from "axios";
export async function login({ userName, password }) {
  return await axios
    .post(
      "http://dev.mediatation.tokyo/api/auth/getToken",
      {
        username: userName,
        password: password,
      },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("response", response?.data);
      return response?.data;
    })
    .catch((error) => {
      console.log(error);
      console.log("Wrong username or password");
    });
}
