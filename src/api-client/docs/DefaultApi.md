# AuthApi.DefaultApi

All URIs are relative to *http://localhost:5000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthLoginPost**](DefaultApi.md#apiAuthLoginPost) | **POST** /api/auth/login | User login
[**apiAuthLogoutPost**](DefaultApi.md#apiAuthLogoutPost) | **POST** /api/auth/logout | User logout
[**apiAuthRegisterPost**](DefaultApi.md#apiAuthRegisterPost) | **POST** /api/auth/register | User registration



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

