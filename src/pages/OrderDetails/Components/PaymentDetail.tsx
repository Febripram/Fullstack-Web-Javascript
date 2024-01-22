import { useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Accordion from '../../../utils/Accordion';
const PaymentDetail = () => {
  const [virtualAccount, setVirtualAccount] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const copyVA = () => {
    navigator.clipboard.writeText(virtualAccount).then(toastCopied);
  };

  const copyPrice = () => {
    navigator.clipboard.writeText(price).then(toastCopied);
  };

  const toastCopied = () => {
    toast.info('Copied!', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  const atmTransfer = () => {
    return (
      <ul className="text-neutral-08 list-disc pl-4 text-xs marker:text-neutral-08">
        <li>Visit the nearest [Bank Name] ATM.</li>
        <li>Insert your [Bank Name] ATM card.</li>
        <li>Select your preferred language.</li>
        <li>Enter your 6-digit ATM PIN.</li>
        <li>Choose "Other Transactions" &gt; "Transfer".</li>
        <li>Enter the destination account number with the specified code.</li>
        <li>Input the amount to be transferred.</li>
        <li>
          Confirm the transaction and enter a reference number if required.
        </li>
        <li>Select the account type (Savings or Current Account).</li>
        <li>Wait for the proof of transfer from the ATM machine.</li>
      </ul>
    );
  };

  const internetBankingTransfer = () => {
    return (
      <ul className='className="text-neutral-08 list-disc pl-4 text-xs marker:text-neutral-08'>
        <li>Log in to your [Bank Name] Internet Banking account.</li>
        <li>Navigate to the "Transfer" or "Fund Transfer" section.</li>
        <li>Select the recipient's account or add a new payee if needed.</li>
        <li>Enter the transfer amount.</li>
        <li>
          Choose the type of transfer (within the same bank or to another bank).
        </li>
        <li>Verify the transaction details and confirm.</li>
        <li>Input any additional security codes or OTPs if prompted.</li>
        <li>Complete the transaction.</li>
      </ul>
    );
  };
  // testing only
  useEffect(() => {
    setVirtualAccount('1130 2130 9876 1321');
    setPrice('1.150.000');
  }, []);

  return (
    <div>
      <div className="border border-neutral-06 flex items-center justify-between p-4 rounded-lg">
        <p>Complete the payment in time :</p>
        <div className="bg-primary-darkBlue text-center px-8 text-white rounded">
          59:45
        </div>
      </div>

      <h1 className="font-semibold mt-4">Transfer To</h1>
      <div className="border border-neutral-06 flex items-center justify-between p-4 rounded-lg mt-2">
        <p className="font-semibold">{virtualAccount}</p>
        <FaRegCopy
          className="text-primary-blue text-2xl cursor-pointer"
          onClick={copyVA}
        />
      </div>
      <h1 className="font-semibold mt-4">Total Payment</h1>
      <div className="border border-neutral-06 flex items-center justify-between p-4 rounded-lg mt-2">
        <p className="font-semibold">{price}</p>
        <FaRegCopy
          className="text-primary-blue text-2xl cursor-pointer"
          onClick={copyPrice}
        />
      </div>

      <h1 className="font-semibold mt-4">How to Pay</h1>
      <Accordion title="Atm Transfer" content={atmTransfer()} />
      <Accordion
        title="Transfer via Internet Banking"
        content={internetBankingTransfer()}
      />
      <ToastContainer />
    </div>
  );
};

export default PaymentDetail;
