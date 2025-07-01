import DefaultApi from '../api-client/src/api/DefaultApi';

const api = new DefaultApi();

export const useAuthApi = () => {
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      api.apiAuthLoginPost({ email, password }, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  const register = (first_name, last_name, email, password) => {
    return new Promise((resolve, reject) => {
      api.apiAuthRegisterPost(
        { first_name, last_name, email, password },
        (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

   const logout = (refreshToken) => {
    return new Promise((resolve, reject) => {
      api.apiAuthLogoutPost(refreshToken, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };



  return { login, register,logout,api};
};
