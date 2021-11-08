import { useRef, useContext, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(true);
  const showHandler = () => {
    setShow(!show);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBLJKLT2mWwCy3Gq58NnBWY30GEGyVsA5A",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        showHandler();
      } else {
        return res.json().then((data) => {
          if (data && data.error && data.error.message) {
            setErrorMessage(data.error.message);
          }
        });
      }
    });
  };
  return (
    <div>
      {show && (
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              ref={newPasswordInputRef}
            />
            <p style={{ color: "red" }}> {errorMessage}</p>
          </div>
          <div className={classes.action}>
            <button>Change Password</button>
          </div>
        </form>
      )}
      {!show && <p>Password changed succesfully</p>}
    </div>
  );
};

export default ProfileForm;
