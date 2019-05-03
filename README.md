# Controlli
A layer for your express controllers that handle responses and query parameters for you.

## Sections
- [Install](#install)  
- [ErrorModels](#models)  
- [HandleResponse()](#response)  
- [HandleParams()](#params)  
- [License](#license)  

### <a name="install"></a> Install
```console
npm i controlli
npm install @types/controlli // If using this npm module in typescript
```

### <a name="models"></a> Error Models
Controlli introduces some models to help with error and response handling.
- ArgumentNullError
- ArgumentError
- NotFoundError

You are able to throw these errors at any point in the code.
As long as they are not caught in your code, Controlli will handle an error response for you.

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

### <a name="params"></a> HandleParams
HandleParams is a function to help handle your controller query params. Express has your query params come in as strings, this function will transform them into their type'd counter part. 

Ex: "10" => 10, "true" => true

If your params are meant to be booleans or ints and are not, it will throw the associated [Error](#models).

**BONUS:** If you are using Controlli's HandleResponse() with this, the error response will all be handled by itself, no need to you to be involved.

~~~~
public exampleControllerEndpoint(req: Request, res: Response) {
    HandleResponse(res, new Promise((resolve, reject) => {
        let params = HandleQueryParams(
            req,   // Controller Request
            [],    // Required query params: string
            [],    // Required query params: boolean
            [],    // Required query params: number
            [],    // Optional query params: boolean
            []     // Optional query params: number
        );
        
        // Controller logic/Service call/etc...
        
        resolve('Sucess');
    }));
}
~~~~

**Example**
~~~~
// req.query = { 'reqStr': 'fake-string', 'reqBool': 'true', 'reqInt': '10' }
let params = HandleQueryParams(
     req,
     ['reqStr'],
     ['reqBool'],
     ['reqInt'],
     ['optBool'],
     ['optInt'],
);

/**
params = {
    reqStr: 'fake-string',
    reqBool: true,
    reqInt: 10
} 
* optBool and optInt will be here if present in req.query
*/
~~~~

## <a name="license"></a> License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
