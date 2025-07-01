import { get } from 'superagent';
import DefaultApi from '../api-client/src/api/DefaultApi';

const api = new DefaultApi();

export const useContentApi = () => {
  const getContent = (contentId) => {
    return new Promise((resolve, reject) => {
      api.apiContentGet(contentId, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  const getTaskById = (taskId) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    console.log("Access Token:", accessToken);
    
    // Set tokens on the api client for authentication
    api.apiClient.authentications['BearerAuth'].apiKey = `bearer ${accessToken}`;
    api.apiClient.authentications['RefreshTokenHeader'].apiKey = refreshToken;
    console.log("Authorization:", api.apiClient.authentications['BearerAuth']);

    return new Promise((resolve, reject) => {
      api.tableOfContentsTasksIdGet(taskId, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };


  const getAllcontents = () => {
  return new Promise((resolve, reject) => {
    api.tableOfContentsGet((error, data, response) => {
      if (error) {
        reject(error);
      } else {
        console.log("Data fetched successfully:", data);
        resolve(data);
      }
    });
  });
};


  const createContent = (contentData) => {
    return new Promise((resolve, reject) => {
      api.apiContentPost(contentData, (error, data, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  return { getContent, getAllcontents, createContent,getTaskById };
}