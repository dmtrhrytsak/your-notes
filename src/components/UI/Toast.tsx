import { useEffect } from 'react';
import classNames from 'classnames';
import { BiError } from 'react-icons/bi';

import IToast from 'types/Toast';

type ToastProps = {
  duration?: number;
  destroy: (id: number) => void;
} & IToast;

const Toast: React.FC<ToastProps> = ({
  id,
  text,
  destroy,
  type,
  duration = 4000,
}) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      destroy(id);
    }, duration);

    return () => clearTimeout(timeoutID);
  }, [id, destroy, duration]);

  return (
    <div
      className={classNames(
        'flex items-center gap-1 px-4 py-3 rounded-sm border-[1px] bg-white',
        { 'border-red-600': type === 'error' },
        { 'border-green-600': type === 'success' }
      )}
    >
      <p className="text-sm font-bold lg:text-base">{text}</p>
      {type === 'error' && (
        <BiError className="text-sm font-bold text-red-600 lg:text-base" />
      )}
    </div>
  );
};

export default Toast;
