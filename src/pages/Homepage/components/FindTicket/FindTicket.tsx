import Select from 'react-select';
import Button from '../../../../components/Button';
import { Calendar, MapPin, X } from 'react-feather';
import { ForwardedRef, createElement, forwardRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { CustomInputProps } from './types';
import {
  FaAngleDown,
  FaChild,
  FaMinus,
  FaPerson,
  FaPlus,
} from 'react-icons/fa6';

const FindTicket = () => {
  // state
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [showInputPassenger, setShowInputPassenger] = useState<boolean>(false);
  const [adult, setAdult] = useState<number>(1);
  const [child, setChild] = useState<number>(0);

  const addAdult = () => {
    setAdult(adult + 1);
  };
  const minAdult = () => {
    if (adult > 1) {
      setAdult(adult - 1);
    }
  };
  const addChild = () => {
    setChild(child + 1);
  };
  const minChild = () => {
    if (child > 0) {
      setChild(child - 1);
    }
  };
  // forwardRef
  const CustomInput = forwardRef(
    (
      { value, onClick }: CustomInputProps,
      ref: ForwardedRef<HTMLButtonElement>
    ) => (
      <button className="w-full text-white" onClick={onClick} ref={ref}>
        {value ? value : 'Return Date'}
      </button>
    )
  );
  return (
    <section className="relative z-[1]">
      <div className="bg-[url('https://i.ibb.co/p04HSxH/image-1.png')] bg-cover bg-center">
        <div className="bg-black bg-opacity-50">
          <div className="pl-20 pr-20 md:pr-0 pt-28 lg:pt-48 pb-20">
            <h1 className="text-white font-bold text-5xl">
              WeFly - Limitless Travel Solutions
            </h1>
            <p className="text-white mt-3">
              Discover travel convenience at your fingertips.
            </p>
            <p className="text-white">
              Book tickets and track flights with the WeFly website.
            </p>

            <div className="mt-20 flex w-full md:w-3/4">
              <div className="w-1/2">
                <Button>One Way / Round Trip</Button>
                <Button
                  variant="tertiary"
                  className="bg-white text-black md:w-[200px] mt-3 md:mt-0 md:ml-3"
                >
                  Multi City
                </Button>
              </div>
              <div className="w-1/2 ">
                <div className="w-3/5">
                  <Button
                    className="bg-transparent border-white border text-sm px-5 py-2.5 text-center inline-flex items-center w-full"
                    onClick={() => setShowInputPassenger(!showInputPassenger)}
                  >
                    {adult} Adult, {child} Child &nbsp;{' '}
                    <FaAngleDown
                      className={`ml-auto transition-transform ${
                        showInputPassenger ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                  <div className="relative w-full">
                    <div
                      className={`z-10 bg-white rounded-lg shadow absolute top-2 right-0 left-0 w-full  ${
                        showInputPassenger ? 'opacity-100' : 'opacity-0'
                      } transition-all duration-200 ease-in`}
                    >
                      <div className="text-gray-500 flex justify-between py-2 px-3 items-center">
                        <h4 className="font-semibold text-lg">
                          No. of Passengers
                        </h4>
                        <X
                          className="cursor-pointer"
                          onClick={() =>
                            setShowInputPassenger(!showInputPassenger)
                          }
                        />
                      </div>
                      {/* adult */}
                      <div className="pr-2 pb-2">
                        <div className="flex items-center">
                          <FaPerson
                            size={25}
                            className="w-1/6 text-primary-blue"
                          />
                          <div className="w-2/6">
                            <p className="font-semibold">Adult</p>
                            <p className="text-xs text-slate-400">
                              (age 12 and over)
                            </p>
                          </div>
                          <div className="flex items-stretch w-1/2 justify-evenly">
                            <button
                              className="bg-blue-50 rounded px-4"
                              onClick={minAdult}
                            >
                              <FaMinus className="text-primary-blue" />
                            </button>
                            <p className=" py-2 px-4 border-b-2 w-12">
                              {adult}
                            </p>
                            <button
                              className="bg-blue-50 rounded px-4"
                              onClick={addAdult}
                            >
                              <FaPlus className="text-primary-blue" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* child */}
                      <div className="pr-2 pb-2 mt-2">
                        <div className="flex items-center">
                          <FaChild
                            size={20}
                            className="w-1/6 text-primary-blue"
                          />
                          <div className="w-2/6">
                            <p className="font-semibold">Child</p>
                            <p className="text-xs text-slate-400">
                              (age 2 - 11)
                            </p>
                          </div>
                          <div className="flex items-stretch w-1/2 justify-evenly">
                            <button
                              className="bg-blue-50 rounded px-4"
                              onClick={minChild}
                            >
                              <FaMinus className="text-primary-blue" />
                            </button>
                            <p className=" py-2 px-4 border-b-2 w-12">
                              {child}
                            </p>
                            <button
                              className="bg-blue-50 rounded px-4"
                              onClick={addChild}
                            >
                              <FaPlus className="text-primary-blue" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* button done */}
                      <div className="text-center pb-2 mt-2">
                        <Button
                          className="mx-auto"
                          onClick={() =>
                            setShowInputPassenger(!showInputPassenger)
                          }
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="mb-4 md:mb-0">
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    From:
                  </label>
                  <div className="flex items-center border-b border-white mr-2 ">
                    <MapPin className="text-white mr-2" />
                    <Select
                      className="w-full"
                      placeholder="Where are you now?"
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                        indicatorsContainer: () => ({ display: 'none' }),
                        control: () => ({
                          border: 'none',
                        }),
                        placeholder: (base) => ({ ...base, color: 'white' }),
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    To:
                  </label>
                  <div className="flex items-center border-b border-white">
                    <MapPin className="text-white mr-2" />
                    <Select
                      className="w-full"
                      placeholder="Where are you now?"
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                        indicatorsContainer: () => ({ display: 'none' }),
                        control: () => ({
                          border: 'none',
                        }),
                        placeholder: (base) => ({ ...base, color: 'white' }),
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* departure */}
              <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                <div className="mb-4 md:mb-0">
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    Departure Date:
                  </label>
                  <div className="flex items-center border-b border-white mr-2 pb-2">
                    <Calendar className="text-white mr-2" />
                    <div className=" w-full">
                      <DatePicker
                        minDate={new Date()}
                        className="w-full"
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        customInput={createElement(CustomInput)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-left text-white text-sm font-semibold pb-2">
                    Return Date:
                  </label>
                  <div className="flex items-center border-b border-white pb-2">
                    <Calendar className="text-white mr-2" />
                    <DatePicker
                      minDate={new Date()}
                      className="w-full"
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      customInput={createElement(CustomInput)}
                    />
                  </div>
                </div>
              </div>
              {/* button cari tiket */}
              <div className="mt-6 flex justify-end">
                <Button className=" rounded-full shadow-xl ">
                  Search Your Flight
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindTicket;
