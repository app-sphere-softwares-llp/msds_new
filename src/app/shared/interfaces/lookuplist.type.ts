export interface LookUpList {
    FMCBusiness: LookUpObject[];
    Languages:  LookUpObject[];
    Formats:  LookUpObject[];
    SubFormats: LookUpObject[];

}

interface LookUpObject {
    text: string;
    value: string;
}

