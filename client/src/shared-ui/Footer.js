export function Footer() {
  return (
    <footer className="w-full p-10 bg-neutral-900 bottom-0 left-0">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img src="/images/footer_logo.png" alt="logo-ct" className="w-10" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href=""
              className="transition-colors text-white font-semibold hover:text-blue-500 focus:text-blue-500"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href=""
              className="text-white font-semibold transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </a>
          </li>
          <li>
            <a
              href=""
              className="text-white font-semibold transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <p className="text-center text-white font-bold mt-10">
        &copy; 2024 LinguaKonnect
      </p>
    </footer>
  );
}
