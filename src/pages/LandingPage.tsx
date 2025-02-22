import NavToLoginButton from "../components/NavToLoginButton"; 
import NavToSignUpButton from "../components/NavToSignUpButton"; 

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">SeeFruits</h1>
      <h3 className="text-lg text-gray-600 mb-6">We See the Fruit, not seafood</h3>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <NavToLoginButton 
          text="Login" 
          onPress={() => window.location.href = '/login'}
        />
        <NavToSignUpButton 
          text="Sign Up" 
          onPress={() => window.location.href = '/register'}
        />
      </div>
    </div>
  );
};

export default LandingPage;
