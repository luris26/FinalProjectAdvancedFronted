import { useAuth } from "react-oidc-context";


export default function LogInOut() {
  const auth = useAuth();


  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="flex flex-col items-center">

        {auth.user && <h2 className="text-xl">Hello, {auth.user.profile.given_name}</h2>}
        <button
          onClick={() => void auth.removeUser()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => void auth.signinRedirect()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Log in 
      </button>
    </div>
  );
}