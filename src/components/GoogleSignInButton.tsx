import { signIn } from "next-auth/react";
import { ReactNode, FC } from "react";

interface GoogleSignInButtonProps {
    children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({children}) => {
    const loginWithGoogle = () => signIn('google');
    return (
        <button onClick={loginWithGoogle}>
            {children}
        </button>
    )
}

export default GoogleSignInButton