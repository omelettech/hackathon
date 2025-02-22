import "./NavToLoginButton.css";

export type NavToLoginButtonProps = {
  text: string;
  onPress: () => void;
};

function NavToLoginButton({ text, onPress}: NavToLoginButtonProps) {
  return (
    <button 
      onClick={onPress} 
      className={`nav-to-login-button`}
    >
      {text}
    </button>
  );
}

export default NavToLoginButton;
