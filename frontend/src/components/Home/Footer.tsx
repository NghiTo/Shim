import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="mx-16 max-md:text-sm py-12 md:grid md:grid-cols-4 flex flex-col max-md:mx-6 border-b border-gray-300">
        <div className="w-1/2 h-full max-md:w-1/3 flex flex-col max-md:gap-8 mb-12">
          <img
            src="/src/assets/z6005140779869_f6c7fcbf20895c41056a882bae49e05d.jpg"
            alt="Logo"
            className="h-auto w-full object-cover"
          />
          <div className="w-full flex flex-row mt-auto items-center">
            <img
              src="/src/assets/64a3c543f0df3bde4580f844_Accessibility_Icon.webp"
              alt="Accessibility"
            />
            <p className="text-[#2475af] font-medium">
              Accessibility & Inclusion
            </p>
          </div>
        </div>
        <div className="font-normal text-xl flex flex-col gap-8">
          <Link
            to={""}
            className="hover:text-[#fe5f5c] transition-all duration-100 ease-in"
          >
            The Shim Blog
          </Link>
          <p>Teacher Resources</p>
          <p>State Test Prep</p>
          <p>Shim for Work</p>
          <p>Help Center</p>
          <p>Teacher Panel</p>
          <p>IQAPS</p>
          <p>AI Toolkit</p>
          <p>Accessibility and Inclusion</p>
          <p>Sitemap</p>
          <p>Terms of Service</p>
        </div>
        <div className="font-normal text-xl flex flex-col gap-8">
          <p>Worksheets</p>
          <p>Reseller program</p>
          <p>Privacy Policy</p>
          <p>Privacy Center</p>
          <p>Careers</p>
          <p>About Us</p>
        </div>
        <div className="flex flex-col gap-4 max-md:w-1/3 w-2/3 max-md:mt-12">
          <img
            src="/src/assets/62fa641a161d3a2982681d00_Google Play.svg"
            alt="Google play"
          />
          <img
            src="/src/assets/62fa6419161d3a1ad0681cbf_App Store.svg"
            alt="App store"
          />
        </div>
      </div>
      <div className="px-16 py-6 flex flex-row max-md:hidden">
        <div className="w-1/2 text-gray-500">
          <p>1. 2024 survey of 800+ teachers conducted by Shimnek</p>
          <p>2. Journal of Education and e-Learning Research (Source)</p>
          <p>
            3. International Online Journal of Education and Teaching (Source)
          </p>
        </div>
        <div className="w-1/2 flex flex-col items-end gap-4">
          <div className="flex flex-row gap-12">
            <img
              src="/src/assets/62fa6419161d3a49b9681ca7_Twitter Icon.svg"
              alt="Twitter"
            />
            <img
              src="/src/assets/62fa6419161d3a2ade681ca6_Facebook Icon.svg"
              alt="Facebook"
            />
            <img
              src="/src/assets/62fa6419161d3a69fc681c8d_Instagram Icon.svg"
              alt="Instagram"
            />
          </div>
          <p>2024 Shimnek Inc.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
