const baseApiUrl = "https://homeiidentityapi.ewavetest.co.il/";

const HomeiAPI = {
  investorSignupRequestURL: baseApiUrl + 'api/Investor/_signup',
  borrowerSignupRequestURL: baseApiUrl + 'api/Borrower/_signup',

  emailConfirmationURL: baseApiUrl + "Account/email/_confirm/",

  setPasswordURL: baseApiUrl + "api/Account/password/_set",


  loginOtpRequestURL:  baseApiUrl + 'api/Token/otp/request',
  verifyPhoneURLLogin: baseApiUrl + "api/Token/otp",
  requestVerifyPhoneURL: baseApiUrl + "api/Token/otp/request",

  loginRequestURL: baseApiUrl + 'api/Token',
  resetPasswordRequestURL: baseApiUrl + "api/Account/password/reset/request",
  resetPasswordURL: baseApiUrl + "api/Account/password/_reset",

  verifyPhoneRequestURL: baseApiUrl + "api/Account/phone/verify/request",

  verifyPhoneURLSignup: baseApiUrl + "api/Account/phone/_confirm?code=",

  checkRoleURL: baseApiUrl + "api/Account/user/roles",

  recaptchaUserKey: "6LfNmbIUAAAAAFnesm75kCkE3igwU5Gu8j3eRCEK"
};

export default HomeiAPI;