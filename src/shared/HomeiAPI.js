const baseApiUrl = "https://homeiidentityapi.ewavetest.co.il/";

const HomeiAPI = {
  investorSignupRequestURL: baseApiUrl + 'api/Investor/_signup',
  borrowerSignupRequestURL: baseApiUrl + 'api/Borrower/_signup',

  setPasswordURL: baseApiUrl + "api/Account/password/_set",


  loginOtpRequestURL:  baseApiUrl + 'api/Token/otp/request',
  verifyPhoneURLLogin: baseApiUrl + "api/Token/otp",
  requestVerifyPhoneURL: baseApiUrl + "api/Token/otp/request",

  loginRequestURL: baseApiUrl + 'api/token',
  resetPasswordURL: baseApiUrl + "api/Account/password/reset/request",

  verifyPhoneRequestURL: baseApiUrl + "api/Account/phone/verify/request",

  verifyPhoneURLSignup: baseApiUrl + "api/Account/phone/_confirm?code=",

  checkRoleURL: baseApiUrl + "api/Account/user/roles"
};

export default HomeiAPI;