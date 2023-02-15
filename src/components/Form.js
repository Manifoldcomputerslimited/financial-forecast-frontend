import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBankAccounts } from '../redux/slices/forecast';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import { withAuth } from '../hoc/withAuth';
import { createOverdraft } from '../redux/slices/zoho';

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankName, setBankName] = useState('');
  const [currency, setCurrency] = useState('');
  const [balance, setBalance] = useState('');
  const [amount, setAmount] = useState('');
  const [enableButton, setEnableButton] = useState('');

  let isOverdraftIsLoading = useSelector(
    (state) => state.zoho.isOverdraftIsLoading
  );

  const isBankAccountsLoading = useSelector(
    (state) => state.forecast.isBankAccountsLoading
  );
  const bankAccounts = useSelector((state) => state.forecast.bankAccounts);

  const closeModalHandler = () => {
    setAccountId('');
    setAccountName('');
    setAccountType('');
    setBalance('');
    setSelectedValue('');
    setBankName('');
    setCurrency('');
    setAmount('');
    setShowModal(false);
  };

  const selectedValueHandler = (e) => {
    setEnableButton(false);
    setAmount('');

    let bankAccount = bankAccounts.filter(function (bankAccount) {
      return bankAccount.accountId == e.target.value;
    });

    if (bankAccount[0].balance < 0) {
      setEnableButton(true);
    }

    setAccountId(e.target.value);
    setAccountName(bankAccount[0].accountName);
    setBalance(bankAccount[0].balance);
    setSelectedValue(e.target.value);
    setAccountType(bankAccount[0].accountType);
    setBankName(bankAccount[0].bankName);
    setCurrency(bankAccount[0].currency);
  };

  const amountHandler = (e) => setAmount(e);

  const submitOverdraft = (e) => {
    e.preventDefault();
    let data = {
      accountId,
      accountName,
      accountType,
      bankName,
      currency,
      amount,
    };
    dispatch(createOverdraft({ data })).then((res) => {
      if (res.error) return;
      setAccountId('');
      setAccountName('');
      setAccountType('');
      setBalance('');
      setSelectedValue('');
      setBankName('');
      setCurrency('');
      setAmount('');
      setShowModal(false);
      navigate('/overdraft');
    });
  };

  useEffect(() => {
    dispatch(getBankAccounts());
  }, [dispatch]);

  return (
    <>
      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white active:bg-red-600 text-xs font-bold px-8 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: 'all .15s ease' }}
          >
            Add
          </button>
        </div>
        {showModal ? (
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
                    onSubmit={submitOverdraft}
                  >
                    <div className="relative px-4 flex-auto ">
                      <div className="relative w-14/14 grid gap-4  grid-cols-2 ">
                        <div>
                          <label className="block text-gray-700  ">Name:</label>

                          <div>
                            <select
                              className="w-full px-6 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                              value={selectedValue}
                              onChange={selectedValueHandler}
                            >
                              <option>Select an option</option>

                              {!isBankAccountsLoading
                                ? bankAccounts.map((bankAccount) => {
                                    return (
                                      <option
                                        key={bankAccount.accountId}
                                        value={bankAccount.accountId}
                                      >
                                        {bankAccount.accountName}
                                      </option>
                                    );
                                  })
                                : null}
                            </select>
                          </div>
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
                            value={accountType}
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
                            value={bankName}
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
                            value={currency}
                            disabled
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700">
                            Balance:
                          </label>
                          <CurrencyInput
                            intlConfig={{
                              locale: currency != 'USD' ? 'en-NG' : 'en-US',
                              currency: currency != 'USD' ? 'NGN' : 'USD',
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            id="balance"
                            name="balance"
                            value={balance}
                            decimalsLimit={2}
                            disabled={true}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700">
                            Loan Amount:
                          </label>
                          <CurrencyInput
                            intlConfig={{
                              locale: currency != 'USD' ? 'en-NG' : 'en-US',
                              currency: currency != 'USD' ? 'NGN' : 'USD',
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            id="loan"
                            name="loan"
                            placeholder="Please enter overdraft amount"
                            value={amount}
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
                          disabled={!enableButton || isOverdraftIsLoading}
                        >
                          {isOverdraftIsLoading ? 'loading...' : 'save'}
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
      </ul>
    </>
  );
};
export default withAuth(true)(Form);
