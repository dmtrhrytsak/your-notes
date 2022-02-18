import classNames from 'classnames';

import { IoMdClose } from 'react-icons/io';
import { MdBookmarkRemove, MdBookmarkAdded } from 'react-icons/md';

import { getFormattedDate } from '../../utils/helpers/date.helper';
import INote from 'types/Note';

type StickyNoteProps = {
  handleDelete: (id: string) => Promise<void>;
  handleSave: (id: string) => Promise<void>;
} & INote;

export const StickyNote: React.FC<StickyNoteProps> = ({
  id,
  title,
  body,
  saved,
  createdAt,
  handleDelete,
  handleSave,
}) => {
  const creationDate = getFormattedDate(createdAt);

  return (
    <article
      className={classNames(
        'relative p-10 pb-6 rounded-md transition-note duration-300',
        {
          'bg-[#bfffc3]': saved,
          'bg-[#ffc3c3]': !saved,
        }
      )}
    >
      <div className="mb-10">
        {/* <input
          type="text"
          placeholder="Your Title"
          className="w-full mb-3 bg-transparent text-3xl placeholder:text-[#cd9944] text-[#cd9944] outline-none"
        /> */}
        <h3
          className={classNames('w-9/12 mb-3 text-3xl text-[#c81300]', {
            'text-[#23a24d]': saved,
          })}
        >
          {title}
        </h3>

        <button
          className={classNames(
            'absolute right-5 top-5 p-2 rounded bg-[#f4a19d] hover:rounded-lg hover:bg-[#ff9a95] active:bg-[#ff9a95] transition-rounded duration-300',
            { 'bg-[#a1edac] hover:bg-[#95f3a3] active:bg-[#95f3a3]': saved }
          )}
          onClick={() => handleSave(id)}
        >
          {saved ? (
            <MdBookmarkAdded className="text-xl text-[#23a24d] hover:bg-[#95f3a3] active:bg-[#95f3a3] transition-rounded" />
          ) : (
            <MdBookmarkRemove className="text-xl text-[#c81300]" />
          )}
        </button>

        <button
          className={classNames(
            'absolute bottom-5 right-5 p-2 rounded bg-[#f4a19d] hover:rounded-lg hover:bg-[#ff9a95] active:bg-[#ff9a95] duration-300',
            {
              'bg-[#a1edac] hover:bg-[#95f3a3] active:bg-[#95f3a3]': saved,
            }
          )}
          onClick={() => handleDelete(id)}
        >
          <IoMdClose
            className={classNames('text-xl text-[#c81300]', {
              'text-[#23a24d]': saved,
            })}
          />
        </button>

        <span
          title="Creation Date"
          className={classNames(
            'inline-block p-1 rounded bg-[#f4a19d] text-[#c81300] text-sm font-semibold cursor-default',
            {
              'bg-[#a1edac] text-[#23a24d]': saved,
            }
          )}
        >
          <time>{creationDate}</time>
        </span>
      </div>

      {/* <textarea
        name=""
        placeholder="Write yout note..."
        className="w-full h-16 bg-transparent placeholder:text-[#cd9944] text-[#cd9944] outline-none"
      /> */}
      <p
        className={classNames('h-16 text-[#c81300]', {
          'text-[#23a24d]': saved,
        })}
      >
        {body}
      </p>
    </article>
  );
};

export default StickyNote;
