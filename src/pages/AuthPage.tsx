import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAdditionalUserInfo,
  User,
} from 'firebase/auth';
import { AuthError } from 'firebase/auth';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';

import { db, auth } from 'services/firebase.service';
import { useToastsContext } from 'utils/contexts/toasts.context';
import authErrors from 'utils/contstants/authErrors.constant';

const AuthPage = () => {
  const [authInfo, setAuthInfo] = useState({ email: '', password: '' });
  const { showToast } = useToastsContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAuthInfo({ ...authInfo, [name]: value });
  };

  const createNewUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        authInfo.email,
        authInfo.password
      );

      const { isNewUser } = getAdditionalUserInfo(userCredential)!;

      if (!isNewUser) {
        return showToast('User already exists!', 'error');
      }

      await saveUser(userCredential.user);
    } catch (error) {
      console.log((error as AuthError).code);
      const authErrorMessage =
        authErrors[(error as AuthError).code] || 'Failed to create a new user.';

      showToast(authErrorMessage, 'error');
    }
  };

  const saveUser = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);

    try {
      await setDoc(userRef, { email: user.email });
    } catch (error) {
      console.warn(error);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, authInfo.email, authInfo.password);
    } catch (error) {
      const authErrorMessage =
        authErrors['auth/' + (error as AuthError).code] || 'Failed to log in.';

      showToast(authErrorMessage, 'error');
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-4/5">
        <div className="block bg-gray-100 h-8 w-full border-[1px] rounded-sm rounded-br-none rounded-bl-none border-gray-200"></div>

        <div className="relative p-5 border-[1px] border-t-0 rounded-tr-none rounded-tl-none border-gray-200 rounded-sm bg-white">
          <div className="flex flex-col gap-3 mb-6">
            <label htmlFor="email" className="flex flex-col gap-1">
              <span>Email</span>

              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onChange={handleChange}
                  className="w-full p-2 border-[1px] border-gray-200 rounded-sm outline-none focus:border-gray-600"
                />
                <HiOutlineMail className="absolute right-2 text-gray-600" />
              </div>
            </label>

            <label htmlFor="password" className="flex flex-col gap-1">
              <span>Password</span>

              <div className="relative flex items-center">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                  className="w-full p-2 border-[1px] border-gray-200 rounded-sm outline-none focus:border-gray-600"
                />
                <RiLockPasswordLine className="absolute right-2 text-gray-600" />
              </div>
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={logIn}
              className="px-3 py-1 rounded-sm bg-blue-500 text-white font-semibold transition-[background] hover:bg-opacity-90 active:bg-opacity-90"
            >
              Log In
            </button>

            <button
              onClick={createNewUser}
              className="px-3 py-1 rounded-sm bg-white text-blue-500 border-[1px] border-blue-500 transition-[background] hover:bg-blue-50 active:bg-blue-50"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
