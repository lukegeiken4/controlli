import { Response } from 'express';
import { 
    HandleResponse
} from './index'
import { ArgumentError, ArgumentNullError, NotFoundError } from '..';

describe("Method HandleResponse: ", () => {
    let res: any = {};
    beforeEach(() => {
        res.status = jasmine.createSpy('status').and.returnValue(res);
        res.send = jasmine.createSpy('send').and.returnValue(res);
    });

    describe("When Promise given is resolved", () => {
        let data: any;
        let handlePromise: Promise<boolean>;
        beforeEach(() => {
            data = ['test-data'];
            handlePromise = HandleResponse(res, new Promise((resolve, reject) => {
                resolve(data);
            }));
        });

        it("should call res.status once", () => {
            handlePromise
            .then((arg) => {
                expect(res.status).toHaveBeenCalledTimes(1);
            });
        });
        
        it("should call res.send once", () => {
            handlePromise
            .then((arg) => {
                expect(res.status).toHaveBeenCalledTimes(1);
            });
        });

        it("should call res.status with code 200", () => {
            handlePromise
            .then((arg) => {
                expect(res.status).toHaveBeenCalledWith(200);
            });
        });
    
        it("should call res.send with data given in resolver", () => {
            handlePromise
            .then((arg) => {
                expect(res.send).toHaveBeenCalledWith({ 'data': data });
            });
        });

        it("should resolve the returned promise with true", () => {
            handlePromise
            .then((arg) => {
                expect(arg).toBeTruthy();
            });
        });
    });

    describe("When error throw is: ", () => {
        describe("ArgumentError", () => {
            let err: ArgumentError;
            let handlePromise: Promise<boolean>;
            beforeEach(() => {
                err = new ArgumentError('test-arg', 'test-message');
                handlePromise = HandleResponse(res, new Promise((resolve, reject) => {
                    throw err;
                }));
            });

            it("should call res.status once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });
            
            it("should call res.send once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });

            it("should call res.status with code 400", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledWith(400);
                });
            });
        
            it("should call res.send with err property set and null data", () => {
                handlePromise
                .then((arg) => {
                    expect(res.send).toHaveBeenCalledWith({ 
                        'data': null,
                        'err': err.toString() 
                    });
                });
            });

            it("should resolve the returned promise with false", () => {
                handlePromise
                .then((arg) => {
                    expect(arg).toBeFalsy();
                });
            });
        });

        describe("ArgumentNullError", () => {
            let err: ArgumentNullError;
            let handlePromise: Promise<boolean>;
            beforeEach(() => {
                err = new ArgumentNullError('test-arg');
                handlePromise = HandleResponse(res, new Promise((resolve, reject) => {
                    throw err;
                }));
            });

            it("should call res.status once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });
            
            it("should call res.send once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });

            it("should call res.status with code 400", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledWith(400);
                });
            });
        
            it("should call res.send with err property set and null data", () => {
                handlePromise
                .then((arg) => {
                    expect(res.send).toHaveBeenCalledWith({ 
                        'data': null,
                        'err': err.toString() 
                    });
                });
            });

            it("should resolve the returned promise with false", () => {
                handlePromise
                .then((arg) => {
                    expect(arg).toBeFalsy();
                });
            });
        });

        describe("NotFoundError", () => {
            let err: NotFoundError;
            let handlePromise: Promise<boolean>;
            beforeEach(() => {
                err = new NotFoundError('test-type');
                handlePromise = HandleResponse(res, new Promise((resolve, reject) => {
                    throw err;
                }));
            });

            it("should call res.status once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });
            
            it("should call res.send once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });

            it("should call res.status with code 404", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledWith(404);
                });
            });
        
            it("should call res.send with err property set and null data", () => {
                handlePromise
                .then((arg) => {
                    expect(res.send).toHaveBeenCalledWith({ 
                        'data': null,
                        'err': err.toString() 
                    });
                });
            });

            it("should resolve the returned promise with false", () => {
                handlePromise
                .then((arg) => {
                    expect(arg).toBeFalsy();
                });
            });
        });

        describe("Error", () => {
            let err: Error;
            let handlePromise: Promise<boolean>;
            beforeEach(() => {
                err = new Error('test-general-error');
                handlePromise = HandleResponse(res, new Promise((resolve, reject) => {
                    throw err;
                }));
            });

            it("should call res.status once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });
            
            it("should call res.send once", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledTimes(1);
                });
            });

            it("should call res.status with code 500", () => {
                handlePromise
                .then((arg) => {
                    expect(res.status).toHaveBeenCalledWith(500);
                });
            });
        
            it("should call res.send with err property set and null data", () => {
                handlePromise
                .then((arg) => {
                    expect(res.send).toHaveBeenCalledWith({ 
                        'data': null,
                        'err': err.toString() 
                    });
                });
            });

            it("should resolve the returned promise with false", () => {
                handlePromise
                .then((arg) => {
                    expect(arg).toBeFalsy();
                });
            });
        });
    });
});