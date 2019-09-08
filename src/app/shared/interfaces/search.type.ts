export interface WercsExtract {
  Id: number;
  PDFName: string;
  Language: string;
  SpecificationID: string;
  GENVARIANT: string;
  ProductName: string;
  ChemicalName: string;
  CommonName: string;
  TradeName: string;

  CasNumber: string;

  CommercialNames: string;

  CMR: string;

  PublishDate: Date | string | null;

  ActiveVersion: boolean;

  IUPAC: string;

  INCODE: string;

  EHSVersionNo: string;

  FMCBusiness: string;

  FileFormat: string;

  ValidityArea: string;

  ValidityAreaDescription: string;

  LegacySpecID: string;

  LegacySDSID: string;

  RevisionDate: Date | string | null;

  WercsRevisionNo: number | null;

  WercsSubFormat: string;

  AuthorizedPortal: string;

  Path: string;
}

export interface WercsExtractSearchModel extends WercsExtract {
    RevisionDateFilter: RevisionDate;
    PublishDateFilter: PublishedDate;
  }

  export interface RevisionDate {
    FilterType: string;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    LastRevisionDays: number | null;
  }

  export interface PublishedDate {
    FilterType: string;
    StartDate: Date | string | null;
    EndDate: Date | string | null;
    LastPublishDays: number;
  }

