export interface ILicense {
  id?: number;
  user_id: number;
  license_type_id: number;
  date?: string;
  due_date?: string;
  expire?: boolean;
}

export interface ILicenseType {
  id: number;
  name: string;
  description: string;
  date_time: string;
}
