import { Request } from 'express';
import { 
    ArgumentNullError,
    ArgumentError,
    EndpointParams
} from '../models';

/**
 * Handles the GET query parameters coming with the request
 * @param req Express request to handle
 * @param endpointParams Define what required and optional params are expected
 * @returns Query params transformed to their correct type
 */
export function HandleQueryParams(
    req: Request,
    endpointParams: EndpointParams): any
{
    var params: {} = req.query;

    // Check to make sure required params are present
    let requiredParams: string[] = [];
    requiredParams = requiredParams.concat(
        endpointParams.requiredStrings,
        endpointParams.requiredBooleans,
        endpointParams.requiredNumbers)
        .filter((item: any, i: any, arr: any) => item && !!arr && arr.indexOf(item) === i);

    for(let key in requiredParams)
    {
        var reqParam = requiredParams[key];
        if (!params.hasOwnProperty(reqParam)) {
            throw new ArgumentNullError(reqParam);
        }
    }

    // Check/Convert the required BOOL vals
    let boolParams: string[] = [];
    boolParams = boolParams.concat(
        endpointParams.requiredBooleans,
        endpointParams.optionalBooleans)
        .filter((item: any, i: any, arr: any) => item && !!arr && arr.indexOf(item) === i);
    boolParams = filterObject(params, boolParams);
    for (let boolParam in boolParams) {
        if (boolParams.hasOwnProperty(boolParam)) {
            // If value is not a boolean, its an error
            let val: string = (params as any)[boolParam];
            if (!(val === 'true' || val === 'false')) {
                throw new ArgumentError(boolParam, 'Is not a boolean');
            }
            // Set the params object key/value to boolean value
            (params as any)[boolParam] = (val === 'true');
        }
    }

    // Check/Convert the required INT vals
    let numParams: string[] = [];
    numParams = numParams.concat(
        endpointParams.requiredNumbers,
        endpointParams.optionalNumbers)
        .filter((item: any, i: any, arr: any) => item && !!arr && arr.indexOf(item) === i);
    numParams = filterObject(params, numParams);
    for (let numParam in numParams) {
        if (numParams.hasOwnProperty(numParam)) {
            // If value is not a number, its an error
            let val: string = (params as any)[numParam];
            let valNum = isNum(val) ? parseFloat(val) : -1;
            if (valNum === -1) {
                throw new ArgumentError(numParam, 'Is not a number');
            }
            
            // Set the params object key/value to number value
            (params as any)[numParam] = valNum;				
        }
    }
    
    return params;
}

/**
 * Returns object with only key/value pairing specified in params
 * @param obj object to filter
 * @param keysToKeep string array of object keys to keep
 */
function filterObject(obj: any, keysToKeep: string[]): any {
    return Object.keys(obj)
        .filter((key) => (keysToKeep.indexOf(key) > -1))
        .reduce((filteredObj: any, key: string) => {
            filteredObj[key] = obj[key];
            return filteredObj;
        }, {});
}

/**
 * Checks if string is a number
 * @param numStr string to check
 */
function isNum(numStr: string): boolean {
    return !isNaN(parseFloat(numStr));
}
