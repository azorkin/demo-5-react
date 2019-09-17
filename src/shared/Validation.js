// Validation rules

const isRequired = (val) => !!(val && val.length);

const isValidDate = (val) => /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/.test(val);

const isValidEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val);

const isValidPassword = (val) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,12}$/.test(val);

const isConfirmedPassword = (val, confirmedVal) => (val === confirmedVal);

const isValidPhone = (val) => /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(val);

const isValidId = (val) => {
  var IDnum = String(val);

  // Validate correct input
  if ((IDnum.length > 9) || (IDnum.length < 5))
    return false;
  if (isNaN(IDnum))
    return false;

  // The number is too short - add leading 0000
  if (IDnum.length < 9) {
    while (IDnum.length < 9) {
      IDnum = '0' + IDnum;
    }
  }

  // CHECK THE ID NUMBER
  var mone = 0, incNum;
  for (var i = 0; i < 9; i++) {
    incNum = Number(IDnum.charAt(i));
    incNum *= (i % 2) + 1;
    if (incNum > 9)
      incNum -= 9;
    mone += incNum;
  }
  if (mone % 10 === 0)
    return true;
  else
    return false;
};

// const isValidCode = (val) => /^\d{4,6}$/.test(val);
const isValidCode = (val) => /^\d{6}$/.test(val);

const hasNumber = (val) => /\d/.test(val);
const hasLetter = (val) => /[a-z]/i.test(val);
const hasCapital = (val) => /[A-Z]/.test(val);


export { isRequired, isValidDate, isValidId, isValidEmail, isValidPassword, isConfirmedPassword, hasNumber, hasLetter, hasCapital, isValidCode, isValidPhone };