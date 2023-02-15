import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getOverdrafts, deleteOverdraft } from '../redux/slices/zoho';

const Delete = (props) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDeleteOverdraft = async () => {
    await dispatch(deleteOverdraft({ accountId: props.overdraft.accountId }));
    setShowDeleteModal(false);

    await dispatch(getOverdrafts());
  };

  return (
    <>
      {showDeleteModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                {/* <form className='space-y-6 py-6' onSubmit={handleSubmit(onSubmit)}> */}
                <div className="relative px-8 flex-auto">
                  <div className="relative w-12/12">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Are you sure you want to delete Overdraft?
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 mt-5 rounded-b">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-1 mr-2"
                    type="submit"
                  >
                    No
                  </button>
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                    type="submit"
                    onClick={onDeleteOverdraft}
                  >
                    Yes
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div className="has-tooltip" onClick={() => setShowDeleteModal(true)}>
        <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-red-500 -mt-8">
          delete overdraft{' '}
        </span>
        <FontAwesomeIcon
          icon={faTrashAlt}
          style={{ fontSize: 17, color: 'red' }}
        />
      </div>
    </>
  );
};
export default Delete;
