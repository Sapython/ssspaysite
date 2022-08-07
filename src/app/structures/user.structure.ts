export type UserData = {
  userId: string;
  name: string;
  email: string;
  dob: Date;
  phone?: string;
  photo: string;
  access: UserAccess;
  status: UserStatus;
  kycStatus: 'Pending' | 'Approved' | 'Rejected';
  aadhaarNo: string;
  panCardNo: string;
  gender: 'male' | 'female' | 'other' | 'unknown';
};

export type UserStatus = {
  isOnline: boolean;
  access: 'active' | 'inactive' | 'blocked' | 'deleted';
};
export type UserAccess = {
  access: 'admin' | 'guest' | 'agent' | 'supervisor';
};
