import { Response } from 'express';

/**
 * Response/Error handler for your endpoint logic
 * @param res Express Response
 * @param operation Promise that handles data response when resolved
 * @returns Promise<boolean> if the response returns data or error response
 */
export function HandleResponse(
    res: Response,
    operation: Promise<any>): Promise<boolean> 
{
    let response: any = {
        data: null
    };

    return new Promise<boolean>((resolve, reject) => {
        operation
        .then((data: any) => {
            response.data = data;
            res.status(200).send(response);
            resolve(true);
        })
        .catch((err: any) => {
            response.err = err.toString();
            switch (err.name) {
                case 'ArgumentError':
                    res.status(400).send(response);
                    break;
                case 'ArgumentNullError':
                    res.status(400).send(response);
                    break;
                case 'NotFoundError':
                    res.status(404).send(response);
                    break;
                default:
                    res.status(500).send(response);
                    break;
            }
            resolve(false);
            return;
        });
    });
}