import { Response } from 'express';
import { HandleQueryParams } from './index'
import { 
    ArgumentError,
    ArgumentNullError 
} from '../models';

describe("Method HandleQueryParams:", () => {
    let req: any = {};
    let endpointParams: {
        requiredStrings?: string[],
        requiredBooleans?: string[],
        requiredNumbers?: string[],
        optionalBooleans?: string[],
        optionalNumbers?: string[],
    };
    let test: any;

    beforeEach(() => {
        req.query = {};
        endpointParams = {};
    });

    describe("When requiredStrParams", () => {
        beforeEach(() => {
            endpointParams.requiredStrings = ['req-str-param'];
            test = () => { 
                return HandleQueryParams(
                    req,
                    endpointParams);
            }
        });
        describe("are not present in query", () => {    
            it("should throw ArgumentNullError", () => {
               expect(() => { test() }).toThrow(new ArgumentNullError('req-str-param'));
            });
        });
    
        describe("are present in query", () => {
            beforeEach(() => {
                req.query['req-str-param'] = 'string-param';
            });
            
            it("should not throw ArgumentNullError", () => {
               expect(() => { test() }).not.toThrow(new ArgumentNullError('req-str-param'));
            });
    
            it("should return param object correctly", () => {
                var resp = test();
                expect(resp).toEqual({ 'req-str-param': 'string-param' });
             });
        });
    });

    describe("When requiredBoolParams", () => {
        beforeEach(() => {
            test = () => {
                endpointParams.requiredBooleans = ['req-bool-param'];
                return HandleQueryParams(
                    req,
                    endpointParams);
            }
        });

        describe("are not present in query", () => {
            it("should throw ArgumentNullError", () => {
                expect(() => { test() }).toThrow(new ArgumentNullError('req-bool-param'));
            });
        });

        describe("are present in query", () => {
            describe("is valid boolean: 'true'", () => {
                beforeEach(() => {
                    req.query['req-bool-param'] = 'true';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-bool-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-bool-param': true });
                });
            });

            describe("is valid boolean: 'false'", () => {
                beforeEach(() => {
                    req.query['req-bool-param'] = 'false';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-bool-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-bool-param': false });
                });
            });

            describe("is invalid boolean", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['req-bool-param'] = 'non-boolean';
                    expect(() => { test() }).toThrow(new ArgumentError('req-bool-param', 'Is not a boolean'));
                });
            });
        });
    });

    describe("When requiredIntParams", () => {
        beforeEach(() => {
            test = () => { 
                endpointParams.requiredNumbers = ['req-num-param'];
                return HandleQueryParams(
                    req,
                    endpointParams);
            }
        });

        describe("are not present in query", () => {
            it("should throw ArgumentNullError", () => {
                expect(() => { test() }).toThrow(new ArgumentNullError('req-num-param'));
            });
        });

        describe("are present in query", () => {
            describe("is valid non-decimal int", () => {
                beforeEach(() => {
                    req.query['req-num-param'] = '10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-num-param': 10 });
                });
            });

            describe("is valid decimal int", () => {
                beforeEach(() => {
                    req.query['req-num-param'] = '10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-num-param': 10.123 });
                });
            });

            describe("is valid negative non-decimal int", () => {
                beforeEach(() => {
                    req.query['req-num-param'] = '-10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-num-param': -10 });
                });
            });

            describe("is valid negative decimal int", () => {
                beforeEach(() => {
                    req.query['req-num-param'] = '-10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-num-param': -10.123 });
                });
            });

            describe("is invalid int", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['req-num-param'] = 'non-int';
                    expect(() => { test() }).toThrow(new ArgumentError('req-num-param', 'Is not a number'));
                });
            });
        });
    });

    describe("When optionalBoolParams", () => {
        beforeEach(() => {
            test = () => {
                endpointParams.optionalBooleans = ['opt-bool-param'];
                return HandleQueryParams(
                    req,
                    endpointParams);
            }
        });

        describe("are not present in query", () => {
            it("should not throw ArgumentNullError", () => {
                expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-bool-param'));
            });
        });

        describe("are present in query", () => {
            describe("is valid boolean: 'true'", () => {
                beforeEach(() => {
                    req.query['opt-bool-param'] = 'true';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-bool-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-bool-param': true });
                });
            });

            describe("is valid boolean: 'false'", () => {
                beforeEach(() => {
                    req.query['opt-bool-param'] = 'false';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-bool-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-bool-param': false });
                });
            });

            describe("is invalid boolean", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['opt-bool-param'] = 'non-boolean';
                    expect(() => { test() }).toThrow(new ArgumentError('opt-bool-param', 'Is not a boolean'));
                });
            });
        });
    });

    describe("When optionalIntParams", () => {  
        beforeEach(() => {
            test = () => {
                endpointParams.optionalNumbers = ['opt-num-param'];
                return HandleQueryParams(
                    req,
                    endpointParams);
            }
        });

        describe("are not present in query", () => {
            it("should not throw ArgumentNullError", () => {
                expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-num-param'));
            });
        });

        describe("are present in query", () => {
            describe("is valid non-decimal int", () => {
                beforeEach(() => {
                    req.query['opt-num-param'] = '10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-num-param': 10 });
                });
            });

            describe("is valid decimal int", () => {
                beforeEach(() => {
                    req.query['opt-num-param'] = '10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-num-param': 10.123 });
                });
            });

            describe("is valid negative non-decimal int", () => {
                beforeEach(() => {
                    req.query['opt-num-param'] = '-10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-num-param': -10 });
                });
            });

            describe("is valid negative decimal int", () => {
                beforeEach(() => {
                    req.query['opt-num-param'] = '-10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-num-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-num-param': -10.123 });
                });
            });

            describe("is invalid int", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['opt-num-param'] = 'non-int';
                    expect(() => { test() }).toThrow(new ArgumentError('opt-num-param', 'Is not a number'));
                });
            });
        });
    });
});