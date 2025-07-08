import DefaultApi from '../api-client/src/api/DefaultApi';

const api = new DefaultApi();

export const useSubmitApi = () => {
  const submitTask = (requestBody) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    api.apiClient.authentications['BearerAuth'].apiKey = `bearer ${accessToken}`;
    api.apiClient.authentications['RefreshTokenHeader'].apiKey = refreshToken;
    
    return new Promise((resolve, reject) => {
      api.submitPost(requestBody, (error, data, response) => {    
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  return { submitTask };
}