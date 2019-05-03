import { Response } from 'express';

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