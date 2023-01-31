
import axios from "axios";

// THIS FUNCTION IS TO GET AND SET TOKENS
export function authHeader() {
  // return authorization header with basic auth credentials
  let user = localStorage.getItem("dataToken");
  
  if (user) {
    return { headers: { Authorization: `Bearer ${user}` } };
    // return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}
// **************************************

export const get = async (url) => {
  const response = await axios
    .get(url, authHeader())
    .then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          return res.data.data;
        }
      } else {
        return null;
      }
      // return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

export const remove = async (url, data) => {
  const response = await axios
    .delete(url, data, authHeader())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
};

// export const patch = async (url, data) => {
//   const response = await axios
//     .patch(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
//   return response;
// };

export const patch = async (url, data) => {
  return await axios
    .patch(url, data, authHeader())
    .then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          return res.data.data.list ? res.data.data.list : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      // return err?.response?.data;
    });
};

export const post = async (url, data) => {
  return await axios
    .post(url, data, authHeader())
    .then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          return res.data.data.list ? res.data.data : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.error(err);
      return err.response.data;
    });
};

export const put = async (url, data) => {
  return await axios
    .put(url, data, authHeader())
    .then((res) => {
      if (res.status === 200) {
        if (res.data.success) {
          return res.data.data.list ? res.data.data.list : res.data;
        } else {
          return [];
        }
      } else {
        return [];
      }
    })
    .catch((err) => {
      return err.response.data;
    });
};
