export interface AuthResponse<T = User> {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly userDetails: T;
}

export interface RegisterUserResponse {
  readonly verificationToken: string;
  readonly verificationTokenExpires: string;
}

export interface VerifyVerificationCodeRequest {
  readonly verificationCode: number;
  readonly userEligibleForVerification: {
    readonly encrytedVerificationToken: string;
  };
}

export interface RegisterUserDTO {
  readonly email: string;
  readonly password: string;
}

export interface GoogleSignInDTO {
  readonly token: string;
}

export interface User {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly isGoogle: boolean;
  readonly role: RoleType;
  readonly lastLogin?: Date;
}

export enum RoleType {
  STANDARD = 0,
  BUSINESS = 1,
}

export enum AccountType {
  business = 'business-account',
  individual = 'individual-account',
}
