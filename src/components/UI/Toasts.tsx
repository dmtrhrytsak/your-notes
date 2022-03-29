import ReactDOM from 'react-dom';

import { useToastsContext } from 'utils/contexts/toasts.context';
import { Toast } from '.';

const Toasts = () => {
  const { toastsQueue, destroyToast } = useToastsContext();

  return ReactDOM.createPortal(
    <div className="fixed bottom-10 right-4 flex flex-col gap-3">
      {toastsQueue.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          text={toast.text}
          type={toast.type}
          destroy={destroyToast}
        />
      ))}
    </div>,
    document.getElementById('toasts-root')!
  );
};

export default Toasts;
