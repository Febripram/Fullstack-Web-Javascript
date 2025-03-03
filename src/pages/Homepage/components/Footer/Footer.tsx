const Footer = () => {
  return (
    <footer className="pt-16">
      <div className="container py-16 mx-auto ">
        <hr className="border-t border-t-black" />
        <ul className="flex justify-between my-4 px-4">
          <li className="font-semibold">Home</li>
          <li className="font-semibold">My Booking</li>
          <li className="font-semibold">About</li>
          <li className="font-semibold">Contact Us</li>
        </ul>
        <hr className="border-t-2 border-t-black" />
        <p className="mt-8 text-center">
          © 2024 WeFly - Making Travel Simple | Privacy Policy | Terms of
          Service
        </p>
      </div>
    </footer>
  );
};

export default Footer;
