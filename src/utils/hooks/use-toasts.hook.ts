import { useState } from 'react';

import IToast from 'types/Toast';

const useToasts = () => {
  const [toastsQueue, setToastsQueue] = useState<IToast[]>([]);

  const showToast = (text: string, type: IToast['type']) => {
    const newToast: IToast = { id: Date.now(), text, type };

    setToastsQueue([newToast, ...toastsQueue]);
  };

  const destroyToast = (id: number) => {
    setToastsQueue(toastsQueue.filter((toast) => toast.id !== id));
  };

  return { toastsQueue, showToast, destroyToast };
};

export default useToasts;
