import React from 'react';
import { Link } from 'react-router-dom';

const FormLevelError = (props) => {
  switch (props.status) {
    case 401:
      return (
        <label className="error error--form-level">
          אסימון לא חוקי או שפג תוקפו
        </label>
      );
    case 404:
      return (
        <label className="error error--form-level">
          resourse not found
        </label>
      );
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
      return (
        <label className="error error--form-level">
          בעיית חיבור
        </label>
      );
      // return null;
  }
}

export default FormLevelError;