import DisplayCard from "../components/card";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-green-600 via-green-400/70 to-green-900 text-gray-100 px-6 relative pt-12 pb-6">
      
      {/* Logo + Tagline */}
      <div className="flex flex-col mb-10 text-center items-center">
        <div className="flex items-center gap-3">
          <img
            className="h-20 w-auto object-contain drop-shadow-md"
            src="/images/logo.png"
            alt="Haryali"
          />
          <h2 className="text-5xl font-extrabold tracking-wide text-white drop-shadow">
            Haryali
          </h2>
        </div>
        <h2 className="text-green-200 text-3xl sm:text-base mt-2 font-semibold italic">
          Clearing Fields, Greening Futures
        </h2>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 px-4">
        <DisplayCard Name={"Priyanshu Kumar"} Mail={"priyanshukumarpriyanshu69@gmail.com"} />
        <DisplayCard Name={"Bhavya Goyal"} Mail={".............."} />
        <DisplayCard Name={"Karan Gupta"} Mail={"guptakaran.port@gmail.com"} />
        <DisplayCard Name={"Varun Chauhan"} Mail={"varun.chauhan.workspace@gmail.com"} />
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-200/30 bg-green-900/40 backdrop-blur-md flex justify-center items-center py-4 rounded-md">
        <h4 className="text-xs sm:text-sm text-green-100/80">
          &copy; {new Date().getFullYear()} All rights reserved |{" "}
          <span className="font-semibold text-green-200">Haryali Pvt Ltd</span>
        </h4>
      </div>
    </footer>
  );
}
