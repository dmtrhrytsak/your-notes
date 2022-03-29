import { signOut, AuthError } from 'firebase/auth';
import { IoMdPower } from 'react-icons/io';

import { auth } from 'services/firebase.service';
import { useAuthContext } from 'utils/contexts/auth.context';
import { useToastsContext } from 'utils/contexts/toasts.context';

const ActionPanel = () => {
  const { user } = useAuthContext();
  const { showToast } = useToastsContext();

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;

      showToast(authError.message, 'error');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p>{user?.email}</p>

      <span className="group p-1 rounded-sm bg-black bg-opacity-5 cursor-pointer transition-colors hover:bg-red-600">
        <IoMdPower
          onClick={logOut}
          className="text-lg text-zinc-500 transition-colors group-hover:text-white"
        />
      </span>
    </div>
  );
};

export default ActionPanel;
