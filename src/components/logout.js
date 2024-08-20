import { GoogleLogin } from "@react-oauth/google";

const clientid =
  "912276168470-bh6cdra6n1gtfalhv8jvhtvl5d66ctac.apps.googleusercontent.com";

function Logout() {
  const onSuccess = (res) => {
    console.log("Log out successfull!");
  };
  return (
    <div id="signInButton">
      <GoogleLogout
        clientid={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
