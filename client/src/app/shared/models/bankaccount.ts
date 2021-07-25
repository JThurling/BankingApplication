export interface Bankaccount {
  fullName:      string;
  accountType:   string;
  accountNumber: number;
  sortCode:      string;
  addressLine1:  string;
  city:          string;
  postalCode:    string;
  currencyCode:  string;
  balance:       number;
  filesList:     FilesList[];
  id:            string;
}

export interface FilesList {
  fileReferences: string;
  id:             string;
}
