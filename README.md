# Controlli
A handler layer for Express API controllers. Helping out with response/error and param handling.

## Sections
- [Install](#install)
- [Usage](#usage)
  - [HandleResponse()](#response)  
  - [HandleParams()](#params)
  - [Error Models](#err-models)  
- [Example Project Using Controlli](#example)  
- [License](#license)  

## <a name="install"></a> Install
```console
npm i controlli
```
## <a name="usage"></a> Usage

### <a name="response"></a> HandleResponse
HandleResponse is a wrapper function to toss in your controller logic and subsequent service/repository/data provider/etc logic into.
It handle sending back correct responses and their status codes.

By using the models stated in the secion above, or just a generic JS error, the responses sent from your api will follow:
- resolve(data) => statusCode: 200, { data: data }
- throw ArgumentNullError => statusCode: 400, { err: <error.toString>, data: null }
- throw ArgumentError => statusCode: 400, { err: <error.toString>, data: null }
- throw NotFoundError => statusCode: 404, { err: <error.toString>, data: null }
- throw Error => statusCode: 500, { err: <error.toString>, data: null }

~~~~
public exampleControllerEndpoint(req: Request, res: Response) {
    HandleResponse(res, new Promise((resolve, reject) => {
     
        // Controller logic/Service call/etc...
        
        // throw Errors if needed
        // OR
        // resolve('data to return in response');
    }));
}
~~~~

### <a name="params"></a> HandleQueryParams
HandleQueryParams is a function to help handle your controller query params. Express has your query params come in as strings, this function will transform them into their type'd counter part. 

Ex: "10" => 10, "true" => true

If your params are expected to be booleans or numbers and are not, it will throw the associated [Error](#errmodels).

**BONUS:** If you are using Controlli's HandleResponse() with this functionality, the error response will all be handled by itself, no need for you to be involved.

~~~~
// NOTE: Written in Typescript
public exampleControllerEndpoint(req: Request, res: Response) {
    HandleResponse(res, new Promise((resolve, reject) => {
        // EndpointParams object constructor takes object with nullable properties
        // Go ahead and set whatever you are expecting from the request query params
        let params = HandleQueryParams(
            req,   // Controller Request
            new EndpointParams({
                requiredStrings?: string[],
                requiredBooleans?: string[],
                requiredNumbers?: string[],
                optionalBooleans?: string[],
                optionalNumbers?: string[],
            })
        );
        
        // Controller logic/Service call/etc...
        
        resolve('Sucess');
    }));
}
~~~~

**Example**
~~~~
// req.query = { 'reqStr': 'fake-string', 'reqBool': 'true', 'reqNum': '10' }
let params = HandleQueryParams(
     req,
     new EndpointParams({
        requiredStrings: ['reqStr'],
        requiredBooleans: ['reqBool'],
        requiredNumbers: ['reqNum'],
        optionalBooleans: ['optBool'],
        optionalNumbers: ['optNum'],
    })
);

console.log(params);
/**
params = {
    reqStr: 'fake-string',
    reqBool: true,
    reqInt: 10
} 
* optBool and optInt will be here if present in req.query
*/
~~~~

### <a name="err-models"></a> Error Models
Controlli introduces some models to help with error and response handling.
- ArgumentNullError
- ArgumentError
- NotFoundError

You are able to throw these errors at any point in the code.
As long as they are not caught in your code, Controlli will handle an error response for you.

## <a name="example"></a> Example Project Using Controlli
I setup a starter Typescript Express API project that uses Controlli's functionality.

Check it out here: https://github.com/lukegeiken4/express-typescript-starter

## <a name="license"></a> License
 
The MIT License (MIT)

Copyright (c) 2019 Luke Geiken

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
