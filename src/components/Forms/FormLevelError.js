import React from 'react';
import { Link } from 'react-router-dom';

const FormLevelError = (props) => {
  switch (props.status) {
    case 409:
      return (
        <label className="error error--form-level">
          הפרטים שהזנת נמצאו במערכותינו
          {" "}
          <Link to="/login">
            הכנס מכאן
          </Link>
        </label>
      );
    default:
      return null;
  }
}

export default FormLevelError;