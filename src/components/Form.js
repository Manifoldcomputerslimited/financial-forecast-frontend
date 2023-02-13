import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsFetching } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white active:bg-red-600 text-xs font-bold px-8 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style={{ transition: "all .15s ease" }}
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
                      onClick={() => setShowModal(false)}
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
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="relative px-4 flex-auto ">
                      <div className="relative w-14/14 grid gap-4  grid-cols-2 ">
                        <div>
                          <label className="block text-gray-700  ">Name:</label>
                        
                          <div className=" ">
                            <select className="w-full px-6 py-3  rounded-lg  bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none">
                              <option value="fruit"></option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700  ">Type:</label>
                          <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none "
                            type="text"
                            name="type"
                            placeholder="Type"
                            {...register("Type")}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700">Number:</label>
                          <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            type="text"
                            name="number"
                            placeholder="Number"
                            {...register("Number")}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700">Bank:</label>
                          <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            type="text"
                            name="bank"
                            placeholder="Bank"
                            {...register("Bank")}
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">
                            Currency:
                          </label>
                          <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            type="text"
                            name="currency"
                            placeholder="Currency"
                            {...register("Currency")}
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700">Amount:</label>
                          <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-grey-200 focus:bg-white focus:outline-none"
                            type="text"
                            name="amount"
                            placeholder="Amount"
                            {...register("Amount")}
                          />
                        </div>
                       
                        </div>
                        <div className="flex items-center justify-center p-3 mt-4 rounded-b ">
                          <button
                            className="inline-flex  justify-center py-2 px-4 border  border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-1"
                            type="save"
                          >
                            save
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
export default Form;
