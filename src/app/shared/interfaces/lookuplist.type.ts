export interface LookUpList {
    FMCBusiness: LookUpObject[];
    Languages:  LookUpObject[];
    Formats:  LookUpObject[];
    SubFormats: LookUpObject[];
    Locales: LookUpObject[];

}

export interface LookUpObject {
    text: string;
    value: string;
}

