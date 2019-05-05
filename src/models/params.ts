export class EndpointParams {
    public requiredStrings: string[] = [];
    public requiredBooleans: string[] = [];
    public requiredNumbers: string[] = [];
    public optionalBooleans: string[] = [];
    public optionalNumbers: string[] = [];

    public constructor(
        fields?: {
            requiredStrings?: string[],
            requiredBooleans?: string[],
            requiredNumbers?: string[],
            optionalBooleans?: string[],
            optionalNumbers?: string[],
    }) {
        if (fields) {
            this.requiredStrings = fields.requiredStrings || this.requiredStrings;       
            this.requiredBooleans = fields.requiredBooleans || this.requiredBooleans;        
            this.requiredNumbers = fields.requiredNumbers || this.requiredNumbers;
            this.optionalBooleans = fields.optionalBooleans || this.optionalBooleans;        
            this.optionalNumbers = fields.optionalNumbers || this.optionalNumbers;       
        }
    }
}