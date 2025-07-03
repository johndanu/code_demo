# AuthApi.DefaultApi

All URIs are relative to *http://localhost:5000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthLoginPost**](DefaultApi.md#apiAuthLoginPost) | **POST** /api/auth/login | User login
[**apiAuthLogoutPost**](DefaultApi.md#apiAuthLogoutPost) | **POST** /api/auth/logout | User logout
[**apiAuthRegisterPost**](DefaultApi.md#apiAuthRegisterPost) | **POST** /api/auth/register | User registration
[**tableOfContentsGet**](DefaultApi.md#tableOfContentsGet) | **GET** /table-of-contents/ | Get Table of Contents
[**tableOfContentsTasksIdGet**](DefaultApi.md#tableOfContentsTasksIdGet) | **GET** /table-of-contents/tasks/{id} | Get Task by ID
[**tableOfContentsTasksTaskIdPost**](DefaultApi.md#tableOfContentsTasksTaskIdPost) | **POST** /table-of-contents/tasks/{taskId} | Set Task Status



## apiAuthLoginPost

> ApiAuthLoginPost200Response apiAuthLoginPost(apiAuthLoginPostRequest)

User login

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.DefaultApi();
let apiAuthLoginPostRequest = new AuthApi.ApiAuthLoginPostRequest(); // ApiAuthLoginPostRequest | 
apiInstance.apiAuthLoginPost(apiAuthLoginPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiAuthLoginPostRequest** | [**ApiAuthLoginPostRequest**](ApiAuthLoginPostRequest.md)|  | 

### Return type

[**ApiAuthLoginPost200Response**](ApiAuthLoginPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthLogoutPost

> ApiAuthLogoutPost200Response apiAuthLogoutPost(xRefreshToken)

User logout

Logs out the user by invalidating the refresh token.

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.DefaultApi();
let xRefreshToken = "xRefreshToken_example"; // String | Refresh token used for logout
apiInstance.apiAuthLogoutPost(xRefreshToken, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **xRefreshToken** | **String**| Refresh token used for logout | 

### Return type

[**ApiAuthLogoutPost200Response**](ApiAuthLogoutPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAuthRegisterPost

> ApiAuthRegisterPost201Response apiAuthRegisterPost(apiAuthRegisterPostRequest)

User registration

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.DefaultApi();
let apiAuthRegisterPostRequest = new AuthApi.ApiAuthRegisterPostRequest(); // ApiAuthRegisterPostRequest | 
apiInstance.apiAuthRegisterPost(apiAuthRegisterPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiAuthRegisterPostRequest** | [**ApiAuthRegisterPostRequest**](ApiAuthRegisterPostRequest.md)|  | 

### Return type

[**ApiAuthRegisterPost201Response**](ApiAuthRegisterPost201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## tableOfContentsGet

> [TableOfContentsGet200ResponseInner] tableOfContentsGet(opts)

Get Table of Contents

Returns the table of contents for the API documentation.

### Example

```javascript
import AuthApi from 'auth_api';

let apiInstance = new AuthApi.DefaultApi();
let opts = {
  'id': 56 // Number | Optional content ID to filter the table of contents
};
apiInstance.tableOfContentsGet(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| Optional content ID to filter the table of contents | [optional] 

### Return type

[**[TableOfContentsGet200ResponseInner]**](TableOfContentsGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## tableOfContentsTasksIdGet

> TableOfContentsTasksIdGet200Response tableOfContentsTasksIdGet(id)

Get Task by ID

Returns the task details for a given task ID, including only the initial test case. 

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure API key authorization: RefreshTokenHeader
let RefreshTokenHeader = defaultClient.authentications['RefreshTokenHeader'];
RefreshTokenHeader.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//RefreshTokenHeader.apiKeyPrefix = 'Token';
// Configure API key authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerAuth.apiKeyPrefix = 'Token';

let apiInstance = new AuthApi.DefaultApi();
let id = 56; // Number | The ID of the task to retrieve
apiInstance.tableOfContentsTasksIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**| The ID of the task to retrieve | 

### Return type

[**TableOfContentsTasksIdGet200Response**](TableOfContentsTasksIdGet200Response.md)

### Authorization

[RefreshTokenHeader](../README.md#RefreshTokenHeader), [BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## tableOfContentsTasksTaskIdPost

> TableOfContentsTasksTaskIdPost200Response tableOfContentsTasksTaskIdPost(taskId, tableOfContentsTasksTaskIdPostRequest)

Set Task Status

Sets the status of a task for the authenticated user. 

### Example

```javascript
import AuthApi from 'auth_api';
let defaultClient = AuthApi.ApiClient.instance;
// Configure API key authorization: RefreshTokenHeader
let RefreshTokenHeader = defaultClient.authentications['RefreshTokenHeader'];
RefreshTokenHeader.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//RefreshTokenHeader.apiKeyPrefix = 'Token';
// Configure API key authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//BearerAuth.apiKeyPrefix = 'Token';

let apiInstance = new AuthApi.DefaultApi();
let taskId = 56; // Number | The ID of the task to update status for
let tableOfContentsTasksTaskIdPostRequest = new AuthApi.TableOfContentsTasksTaskIdPostRequest(); // TableOfContentsTasksTaskIdPostRequest | 
apiInstance.tableOfContentsTasksTaskIdPost(taskId, tableOfContentsTasksTaskIdPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **taskId** | **Number**| The ID of the task to update status for | 
 **tableOfContentsTasksTaskIdPostRequest** | [**TableOfContentsTasksTaskIdPostRequest**](TableOfContentsTasksTaskIdPostRequest.md)|  | 

### Return type

[**TableOfContentsTasksTaskIdPost200Response**](TableOfContentsTasksTaskIdPost200Response.md)

### Authorization

[RefreshTokenHeader](../README.md#RefreshTokenHeader), [BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

