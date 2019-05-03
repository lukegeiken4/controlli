import { Response } from 'express';
import { 
    HandleQueryParams
} from './index'
import { ArgumentError, ArgumentNullError, NotFoundError } from '..';

describe("Method HandleQueryParams:", () => {
    let req: any = {};
    let test: any;

    beforeEach(() => {
        req.query = {};
    });

    describe("When requiredStrParams", () => {
        describe("are not present in query", () => {
            beforeEach(() => {
                test = () => { 
                    HandleQueryParams(
                        req,
                        ['req-str-param'],
                        [],
                        []);
                }
            });
    
            it("should throw ArgumentNullError", () => {
               expect(() => { test() }).toThrow(new ArgumentNullError('req-str-param'));
            });
        });
    
        describe("are present in query", () => {
            beforeEach(() => {
                req.query['req-str-param'] = 'string-param';
                test = () => { 
                    return HandleQueryParams(
                        req,
                        ['req-str-param'],
                        [],
                        []);
                }
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
        describe("are not present in query", () => {
            beforeEach(() => {
                test = () => { 
                    HandleQueryParams(
                        req,
                        [],
                        ['req-bool-param'],
                        []);
                }
            });

            it("should throw ArgumentNullError", () => {
            expect(() => { test() }).toThrow(new ArgumentNullError('req-bool-param'));
            });
        });

        describe("are present in query", () => {
            beforeEach(() => {
                test = () => { 
                    return HandleQueryParams(
                        req,
                        [],
                        ['req-bool-param'],
                        []);
                }
            });

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
        describe("are not present in query", () => {
            beforeEach(() => {
                test = () => { 
                    HandleQueryParams(
                        req,
                        [],
                        [],
                        ['req-int-param']);
                }
            });

            it("should throw ArgumentNullError", () => {
            expect(() => { test() }).toThrow(new ArgumentNullError('req-int-param'));
            });
        });

        describe("are present in query", () => {
            beforeEach(() => {
                req.query['req-int-param'] = '10';
                test = () => { 
                    return HandleQueryParams(
                        req,
                        [],
                        [],
                        ['req-int-param']);
                }
            });

            describe("is valid non-decimal int", () => {
                beforeEach(() => {
                    req.query['req-int-param'] = '10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-int-param': 10 });
                });
            });

            describe("is valid decimal int", () => {
                beforeEach(() => {
                    req.query['req-int-param'] = '10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-int-param': 10.123 });
                });
            });

            describe("is valid negative non-decimal int", () => {
                beforeEach(() => {
                    req.query['req-int-param'] = '-10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-int-param': -10 });
                });
            });

            describe("is valid negative decimal int", () => {
                beforeEach(() => {
                    req.query['req-int-param'] = '-10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('req-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'req-int-param': -10.123 });
                });
            });

            describe("is invalid int", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['req-int-param'] = 'non-int';
                    expect(() => { test() }).toThrow(new ArgumentError('req-int-param', 'Is not a number'));
                });
            });
        });
    });

    describe("When optionalBoolParams", () => {
        describe("are not present in query", () => {
            beforeEach(() => {
                test = () => { 
                    HandleQueryParams(
                        req,
                        [],
                        [],
                        [],
                        ['opt-bool-param']);
                }
            });

            it("should not throw ArgumentNullError", () => {
                expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-bool-param'));
            });
        });

        describe("are present in query", () => {
            beforeEach(() => {
                test = () => { 
                    return HandleQueryParams(
                        req,
                        [],
                        [],
                        [],
                        ['opt-bool-param']);
                }
            });

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
        describe("are not present in query", () => {
            beforeEach(() => {
                test = () => { 
                    HandleQueryParams(
                        req,
                        [],
                        [],
                        [],
                        [],
                        ['opt-int-param']);
                }
            });

            it("should not throw ArgumentNullError", () => {
                expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-int-param'));
            });
        });

        describe("are present in query", () => {
            beforeEach(() => {
                test = () => { 
                    return HandleQueryParams(
                        req,
                        [],
                        [],
                        [],
                        [],
                        ['opt-int-param']);
                }
            });

            describe("is valid non-decimal int", () => {
                beforeEach(() => {
                    req.query['opt-int-param'] = '10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-int-param': 10 });
                });
            });

            describe("is valid decimal int", () => {
                beforeEach(() => {
                    req.query['opt-int-param'] = '10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-int-param': 10.123 });
                });
            });

            describe("is valid negative non-decimal int", () => {
                beforeEach(() => {
                    req.query['opt-int-param'] = '-10';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-int-param': -10 });
                });
            });

            describe("is valid negative decimal int", () => {
                beforeEach(() => {
                    req.query['opt-int-param'] = '-10.123';
                });

                it("should not throw ArgumentNullError", () => {
                    expect(() => { test() }).not.toThrow(new ArgumentNullError('opt-int-param'));
                });

                it("should return param object correctly", () => {
                    var resp = test();
                    expect(resp).toEqual({ 'opt-int-param': -10.123 });
                });
            });

            describe("is invalid int", () => {
                it("should throw ArgumentNullError", () => {
                    req.query['opt-int-param'] = 'non-int';
                    expect(() => { test() }).toThrow(new ArgumentError('opt-int-param', 'Is not a number'));
                });
            });
        });
    });
});