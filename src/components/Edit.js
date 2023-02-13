import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Edit = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <>
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative px-8 flex-auto">
                  <div className="relative w-12/12">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Are you sure you want to edit
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-5 rounded-b">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-1 mr-2"
                    type="submit"
                  >
                    No
                  </button>
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                    type="submit"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="has-tooltip" onClick={() => setShowEditModal(true)}>
        <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-red-700 -mt-8">
          edit overdraft
        </span>
        <FontAwesomeIcon
          icon={faPencil}
          style={{ fontSize: 17, color: "red" }}
        />
      </div>
    </>
  );
};
export default Edit;
