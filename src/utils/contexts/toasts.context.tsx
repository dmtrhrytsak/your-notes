import { createContext, useContext } from 'react';

import useToasts from 'utils/hooks/use-toasts.hook';
import IToast from 'types/Toast';
import { Toasts } from 'components/UI';

type ToastsContextType = {
  toastsQueue: IToast[];
  showToast: (text: string, type: IToast['type']) => void;
  destroyToast: (id: number) => void;
};

const ToastsContext = createContext<ToastsContextType>({} as ToastsContextType);

type ToastsContextProviderProps = {
  children: React.ReactNode;
};

const ToastsContextProvider: React.FC<ToastsContextProviderProps> = ({
  children,
}) => {
  const { toastsQueue, showToast, destroyToast } = useToasts();

  return (
    <ToastsContext.Provider value={{ toastsQueue, showToast, destroyToast }}>
      {children}
      <Toasts />
    </ToastsContext.Provider>
  );
};

export const useToastsContext = () => useContext(ToastsContext);

export default ToastsContextProvider;
