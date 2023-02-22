import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { withAuth } from '../hoc/withAuth';
import CurrencyInput from 'react-currency-input-field';
import { updateOverdraft, getOverdrafts } from '../redux/slices/zoho';
import { getUsers } from '../redux/slices/user';
import {
  resynApplication,
} from '../redux/slices/forecast';

const Edit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAmount, setEditedAmount] = useState(false);
  const [amount, setAmount] = useState('');
  const [enableButton, setEnableButton] = useState('');

  let isOverdraftLoading = useSelector(
    (state) => state.zoho.isOverdraftLoading
  );

  const closeModalHandler = () => {
    setShowEditModal(false);
  };

  const submitEditOverdraft = async (e) => {
    e.preventDefault();

    let accountId = props.overdraft.accountId;

    let data = {
      accountId,
      amount,
    };
    dispatch(updateOverdraft({ data })).then(async (res) => {
      if (res.error) return;

      setAmount('');
      setShowEditModal(false);
      navigate('/overdraft');
      await dispatch(getOverdrafts());
      await dispatch(getUsers());
      await dispatch(resynApplication());
    });
  };

  const amountHandler = (e) => {
    setEditedAmount(true);
    setEnableButton(true);
    setAmount(e);
  };

  return (
    <>
      <div className="has-tooltip" onClick={() => setShowEditModal(true)}>
        <span className="tooltip rounded shadow-lg p-2 bg-gray-100 text-red-700 -mt-8">
          edit overdraft
        </span>
        <FontAwesomeIcon
          icon={faPencil}
          style={{ fontSize: 17, color: 'red' }}
        />
      </div>
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-around mt-5 rounded-t">
                  <div className="flex-initial w-64 justify-center">
                    <h3 className="text-red-700 font-medium text-lg mb-1">
                      Overdraft
                    </h3>
                  </div>
                  <button
                    onClick={closeModalHandler}
                    type="button"
                    className=" rounded-md p-1 inline-flex items-center justify-center text-red-400 hover:text-red-500 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                  >
                    <span className="sr-only">close menu</span>
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form
                  className="space-y-6 py-6 auto"
                  onSubmit={submitEditOverdraft}
                >
                  <div className="relative px-4 flex-auto ">
                    <div className="relative w-14/14 grid gap-4  grid-cols-2 ">
                      <div>
                        <label className="block text-gray-700">
                          Account Name:
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                          type="text"
                          name="account-type"
                          placeholder="Account Type"
                          value={props.overdraft.accountName}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700">
                          Account ID:
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                          type="text"
                          name="account-type"
                          placeholder="Account Type"
                          value={props.overdraft.accountId}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700">
                          Account Type:
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                          type="text"
                          name="account-type"
                          placeholder="Account Type"
                          value={props.overdraft.accountType}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700  ">
                          Bank Name:
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none "
                          type="text"
                          name="bank-name"
                          value={props.overdraft.bankName}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700  ">
                          Currency:
                        </label>
                        <input
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none "
                          type="text"
                          name="currency"
                          value={props.overdraft.currency}
                          disabled
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700">
                          Loan Amount:
                        </label>
                        <CurrencyInput
                          intlConfig={{
                            locale:
                              props.overdraft.currency != 'USD'
                                ? 'en-NG'
                                : 'en-US',
                            currency:
                              props.overdraft.currency != 'USD' ? 'NGN' : 'USD',
                          }}
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                          id="loan"
                          name="loan"
                          placeholder="Please enter overdraft amount"
                          value={editedAmount ? amount : props.overdraft.amount}
                          decimalsLimit={2}
                          onValueChange={amountHandler}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-3 mt-4 rounded-b ">
                      <button
                        className={`inline-flex  justify-center py-2 px-4 border  border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2  mb-1  ${
                          enableButton
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                            : 'bg-red-200 rounded focus:outline-none disabled:opacity-75'
                        } `}
                        type="save"
                        disabled={!enableButton || isOverdraftLoading}
                      >
                        {isOverdraftLoading ? 'loading...' : 'save'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default withAuth(true)(Edit);
