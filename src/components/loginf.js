import { GoogleLogin } from "react-google-login";

const clientid =
  "912276168470-bh6cdra6n1gtfalhv8jvhtvl5d66ctac.apps.googleusercontent.com";

function Loginf() {
  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res - profileobj);
    const onFailure = (res) => {
      console.log("LOGIN FAILED! res: ", res);
      return (
        <div id="signInButton">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      );
    };
  };
}
