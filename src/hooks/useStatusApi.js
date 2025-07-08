import DefaultApi from '../api-client/src/api/DefaultApi';

const api = new DefaultApi();

export const useStatusApi = () => {
//   const getTaskStatus = (taskId) => {
//     return new Promise((resolve, reject) => {
//       api.apiTaskStatusGet(taskId, (error, data, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//   };

  const updateTaskStatus = (taskId, status) => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    api.apiClient.authentications['BearerAuth'].apiKey = `bearer ${accessToken}`;
    api.apiClient.authentications['RefreshTokenHeader'].apiKey = refreshToken;
    return new Promise((resolve, reject) => {
      const requestBody = {
        status: status, // must match TableOfContentsTasksTaskIdPostRequest schema
      };

      api.tableOfContentsTasksTaskIdPost(taskId, requestBody, (error, data, response) => {
        if (error) {
            console.error("Error updating task status:", error);
          reject(error);
        } else {
            console.log("Task status updated successfully:", data);
          resolve(data);
        }
      });
    });
  };

  return { updateTaskStatus };
}