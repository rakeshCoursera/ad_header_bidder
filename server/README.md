# Advertiser Header Bidder Restful APIs
Advertiser RESTful APIs with CPI(cost per impression).

## Requirements
1. Install a local MongoDB server or use vandor provided MongoDB instance.
2. Add your configuration in `config/config.js` file.

## Project Setup 
1. Clone the project repository from github
```
git clone https://github.com/rakeshCoursera/ad_header_bidder.git
```
2. Go to the project folder
```
cd ad_header_bidder/server
```
3. Run npm install to install all dependencies
```
npm install
```
4. Now run npm start
```
npm start
```
This will run the project while showing `Listening: http://localhost:3000` on console.

### For Development with Nodemon

```
npm run dev
```

# APIs 
## Advertiser APIs
### /api/v1/advertiser/
* *Description*: advertisement listing API
* *Method*: GET
* *Authorization*: Basic b64-encoded_admin_username:b64-encoded_admin_password 
* *Responses*: 
    * [200-Ok]
    ```
    {
		"ads": [
			{
				"isActive": true/false,
				"clickCount": "ad click count",
				"_id": "document id",
				"adName": "advertisement name",
				"company": "advertising company",
				"adImage": "image to be showcase(url or base64 string)",
				"cpi": "cost per impression",
				"startDate": "advertise start date to show",
				"endDate": "advertise end date to show",
				"createdBy": "username who created the advertise ",
				"createdAt": "date at which advertise is created",
				"__v": "version key of document"
			},
			{
				"isActive": true/false,
				"clickCount": "ad click count",
				"_id": "document id",
				"adName": "advertisement name",
				"company": "advertising company",
				"adImage": "image to be showcase(url or base64 string)",
				"cpi": "cost per impression",
				"startDate": "advertise start date to show",
				"endDate": "advertise end date to show",
				"createdBy": "username who created the advertise ",
				"createdAt": "date at which advertise is created",
				"__v": "version key of document"
			},
		]
	}
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/advertiser/<advertisement_id>
* *Description*: get details of an advertisement API
* *Method*: GET
* *Authorization*: Basic b64-encoded_admin_username:b64-encoded_admin_password 
* *Responses*: 
    * [200-Ok]
    ```
    {
		"ad":
		{
			"isActive": true/false,
			"clickCount": "ad click count",
			"_id": "document id",
			"adName": "advertisement name",
			"company": "advertising company",
			"adImage": "image to be showcase(url or base64 string)",
			"cpi": "cost per impression",
			"startDate": "advertise start date to show",
			"endDate": "advertise end date to show",
			"createdBy": "username who created the advertise ",
			"createdAt": "date at which advertise is created",
			"__v": "version key of document"
		},
			
	}
	```
	* [404-Not Found]
    ```
    {
     "message": "Provided advertisement id not found"
    }
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```


### /api/v1/advertiser/
* *Description*: Create an advertisement API
* *Method*: POST
* *Authorization*: Basic b64-encoded_admin_username:b64-encoded_admin_password 
* *Body(application/JSON)*: 
   ```
    {
        "adName": "advertisement name",
		"company": "advertising company",
		"adImage": "image to be showcase(url or base64 string)",
		"isActive": true/false,
		"cpi": "cost per impression",
		"startDate": "advertise start date to show",
		"endDate": "advertise end date to show",
		"createdBy": "username who created the advertise ",
    }
   ```
* *Responses*: 
    * [200-Ok]
    ```
    {
		"ad":
		{
			"isActive": true/false,
			"clickCount": "ad click count",
			"_id": "document id",
			"adName": "advertisement name",
			"company": "advertising company",
			"adImage": "image to be showcase(url or base64 string)",
			"cpi": "cost per impression",
			"startDate": "advertise start date to show",
			"endDate": "advertise end date to show",
			"createdBy": "username who created the advertise ",
			"createdAt": "date at which advertise is created",
			"__v": "version key of document"
		},
			
	}
	```
	* [409-Conflict]
    ```
    {
     "message": "Advertisement with same name already exists"
    }
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/advertiser/
* *Description*: update a already created advertisement API
* *Method*: PATCH
* *Authorization*: Basic b64-encoded_admin_username:b64-encoded_admin_password 
* *Body(application/JSON)*: 
   ```
    {
        "adId": "advertisement id",
		"isActive": true/false,
		"cpi": "cost per impression",
		"startDate": "advertise start date to show",
		"endDate": "advertise end date to show"
    }
   ```
* *Responses*: 
    * [200-Ok]
    ```
    {
		"ad":
		{
			"isActive": true/false,
			"clickCount": "ad click count",
			"_id": "document id",
			"adName": "advertisement name",
			"company": "advertising company",
			"adImage": "image to be showcase(url or base64 string)",
			"cpi": "cost per impression",
			"startDate": "advertise start date to show",
			"endDate": "advertise end date to show",
			"createdBy": "username who created the advertise ",
			"createdAt": "date at which advertise is created",
			"__v": "version key of document"
		},
			
	}
	```
	* [404-Not Found]
    ```
    {
     "message": "Provided advertisement id not found"
    }
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

### /api/v1/advertiser/conversions
* *Description*: update the click count for CPI for an advertisement
* *Method*: PATCH
* *Authorization*: Basic b64-encoded_admin_username:b64-encoded_admin_password 
* *Body(application/JSON)*: 
   ```
    {
        "adId": "advertisement id",
    }
   ```
* *Responses*: 
    * [200-Ok]
    ```
    {
		"ad":
		{
			"isActive": true/false,
			"clickCount": "ad click count",
			"_id": "document id",
			"adName": "advertisement name",
			"company": "advertising company",
			"adImage": "image to be showcase(url or base64 string)",
			"cpi": "cost per impression",
			"startDate": "advertise start date to show",
			"endDate": "advertise end date to show",
			"createdBy": "username who created the advertise ",
			"createdAt": "date at which advertise is created",
			"__v": "version key of document"
		},
			
	}
	```
	* [404-Not Found]
    ```
    {
     "message": "Provided advertisement id not found"
    }
    ```
    * [500-Internal Server Error]
    ```
    {
     "error": "error message"
    }
    ```

## Future Scope
1. Implement [Swagger UI](https://swagger.io/tools/swagger-ui/) for better visualization and interaction with the API’s.
2. In memory cache layering with Redis for increased throughput and lower latency.
