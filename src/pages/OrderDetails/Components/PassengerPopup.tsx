import React, { useContext, useEffect, useState } from 'react';
import {
  GenderType,
  OrderDetailContext,
  PassengerInput,
  PassengerPopProp,
  orderDetailContextType,
} from './types';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import { AiOutlineLeft } from 'react-icons/ai';
import { Passenger } from '../../ProfileLayout/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { datesOption, yearsOption } from '../../Register/data';
import { monthsOption } from '../../MyAccount/data';

const today = new Date();
const PassengerPopup = ({
  passenger,
  className,
  isClose,
}: PassengerPopProp) => {
  const [isgender, setIsGender] = useState<GenderType | undefined>('Mr');
  const genders = ['Mr', 'Mrs', 'Miss'];

  const handleGenderChange = (selectedGender: GenderType) => {
    setIsGender(selectedGender);
  };
  const handleShowPopUp = async (e: any) => {
    if (e.target.id === 'passenger-popup') {
      isClose();
    }
    return;
  };

  // hook form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PassengerInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      nationality: '',
    },
  });

  // function
  const getAllDatesInMonth = (year: number, month: string): void => {
    const monthConverted =
      new Date(Date.parse(month + ' 1, 2012')).getMonth() + 1;
    const endDate = new Date(year, monthConverted, 0).getDate();

    datesOption.length = 0;
    for (let i = 1; i <= endDate; i++) {
      datesOption.push({ value: String(i), label: String(i) });
    }
  };

  useEffect(() => {
    setValue('year', {
      value: today.getFullYear(),
      label: today.getFullYear(),
    });
    setValue('month', {
      value: monthsOption[today.getMonth()].value,
      label: monthsOption[today.getMonth()].value,
    });

    getAllDatesInMonth(
      today.getFullYear(),
      monthsOption[today.getMonth()].value
    );

    setValue('day', { label: '1', value: '1' });
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'month' || name === 'year') {
        if (value.year?.value && value.month?.value) {
          getAllDatesInMonth(value.year?.value, value.month?.value);
          setValue('day', { label: '1', value: '1' });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const formatDate = (day: string, month: string, year: number): string => {
    const date = new Date(`${month} ${day}, ${year}`);
    const yyyy = date.getFullYear();
    let mm: string = (date.getMonth() + 1).toString(); // Months start at 0!
    let dd: string = date.getDate().toString();

    if (Number(dd) < 10) dd = '0' + dd;
    if (Number(mm) < 10) mm = '0' + mm;

    const formattedDate = dd + '-' + mm + '-' + yyyy;
    return formattedDate;
  };

  const handleSave: SubmitHandler<PassengerInput> = (data) => {
    if (passenger) {
      const dateOfBirth = formatDate(
        data.day.value,
        data.month.value,
        data.year.value
      );
      const updatedPassenger: Passenger = {
        ...passenger,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: isgender,
        nationality: data.nationality,
        dateOfBirth,
      };
      savePassenger(updatedPassenger);
      isClose();
    }
  };

  const { savePassenger } = useContext(
    OrderDetailContext
  ) as orderDetailContextType;

  useEffect(() => {
    if (passenger) {
      setValue(
        'firstName',
        passenger.firstName === 'Please insert this passenger information!'
          ? ''
          : passenger.firstName
      );
      setValue('lastName', passenger.lastName ? passenger.lastName : '');
      setValue(
        'nationality',
        passenger.nationality ? passenger.nationality : ''
      );
      setIsGender(passenger.gender);
    }
  }, [passenger]);
  return (
    <div
      id="passenger-popup"
      className={`passenger-popup z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      onClick={handleShowPopUp}
    >
      <div className="bg-white px-[74px] rounded-[4px] w-[46%] max-w-[664px] pb-4 min-h-[200px]">
        <div className="top-poup py-4 grid w-full items-center">
          <AiOutlineLeft
            className="absolute  text-2xl cursor-pointer"
            onClick={isClose}
          />
          <h1 className="font-bold text-3xl justify-self-center">
            Passenger Details
          </h1>
        </div>
        <hr />
        <p className="font-semibold mt-5 text-md">Passenger Info</p>
        <div className="w-full mt-3">
          <div>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  children="First Name"
                  label="First Name"
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your First Name"
                  className="w-full "
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  children="Last Name"
                  label="Last Name"
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your Last Name"
                  className="w-full "
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="nationality"
              render={({ field: { name, onChange, value } }) => (
                <FormInput
                  type="text"
                  children="Nationality"
                  label="Last Name"
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your Nationality"
                  className="w-full "
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="Date of Birth"
              className="block text-left text-black text-sm font-semibold pb-3"
            >
              Date of Birth
            </label>
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="col-span-1">
                <Controller
                  name="day"
                  control={control}
                  render={({ field: { name, onChange, value } }) => (
                    <Select
                      name={name}
                      id="day"
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                      value={value}
                      options={datesOption}
                      onChange={onChange}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                            : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                      }}
                    />
                  )}
                  rules={{ required: true }}
                />
                {errors.day?.type === 'required' && (
                  <p className="-mt-5 text-right text-secondary-danger text-sm font-semibold">
                    Date is required
                  </p>
                )}
              </div>

              <div className="col-span-1 xl:col-span-2">
                <Controller
                  name="month"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      name={name}
                      id="month"
                      defaultValue={monthsOption[today.getMonth()]}
                      options={monthsOption}
                      onChange={onChange}
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                            : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                      }}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  name="year"
                  control={control}
                  render={({ field: { name, onChange } }) => (
                    <Select
                      name={name}
                      id="year"
                      defaultValue={yearsOption[0]}
                      options={yearsOption}
                      onChange={onChange}
                      styles={{
                        indicatorSeparator: () => ({ display: 'none' }),
                      }}
                      classNames={{
                        control: (state) =>
                          state.isFocused
                            ? 'bg-white !shadow !border !rounded-xl py-1 w-full border-primary-blue transition'
                            : 'bg-white !shadow !border !rounded-xl py-1 w-full',
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <p className="relative font-normal text-md text-gray-400 top-[-16px]">
            *Corresponds to ID card
          </p>

          <div className="radio-button flex justify-between pb-4">
            {genders.map((genderOption) => (
              <React.Fragment key={genderOption}>
                <div className="flex gap-x-2 text-md font-semibold">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={isgender === genderOption}
                    onChange={() =>
                      handleGenderChange(genderOption as GenderType)
                    }
                  />
                  {genderOption}
                </div>
              </React.Fragment>
            ))}
          </div>

          <Button
            disabled={false}
            className="w-full"
            variant="primary"
            size="md"
            id="save"
            onClick={handleSubmit(handleSave)}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PassengerPopup;
