import "./NavToSignUpButton.css";

export type NavToLoginButtonProps = {
  text: string;
  onPress: () => void;
};

function NavToLoginButton({ text, onPress}: NavToLoginButtonProps) {
  return (
    <button 
      onClick={onPress} 
      className={`nav-to-signup-button`}
    >
      {text}
    </button>
  );
}

export default NavToLoginButton;
