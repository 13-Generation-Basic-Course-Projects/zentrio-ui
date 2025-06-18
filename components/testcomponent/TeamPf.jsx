import Image from "next/image";
import Link from "next/link";

export default function TeamProfile() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="grid grid-cols-4 gap-4 text-white text-sm text-center font-bold leading-6 max-w-5xl">
        {/* Ny Fong - Large circular profile */}
        <div className="box-content h-[374px] border-4 rounded-full bg-black overflow-hidden group row-span-3 relative">
          <Image
            src="/placeholder.svg?height=374&width=374"
            alt="Ny Fong"
            width={374}
            height={374}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
            <div className="flex flex-col items-center space-y-2 justify-between">
              <p className="text-lg font-semibold">Ny Fong</p>
              <div className="flex flex-row space-x-1">
                <SocialIcon
                  href="https://www.facebook.com/profile"
                  type="facebook"
                />
                <SocialIcon href="https://t.me/username" type="telegram" />
                <SocialIcon href="https://github.com/username" type="github" />
              </div>
            </div>
          </div>
        </div>

        {/* Seam Chiminh - Medium circular profile */}
        <div className="flex flex-col space-y-8 justify-center items-center col-span-2">
          <div className="relative box-content w-[200px] h-[200px] rounded-full overflow-hidden group mr-8 bg-indigo-300">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Seam Chiminh"
              width={200}
              height={200}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
              <div className="flex flex-col items-center space-y-2 justify-between">
                <p className="text-lg font-semibold">Seam Chiminh</p>
                <div className="flex flex-row space-x-1">
                  <SocialIcon
                    href="https://www.facebook.com/profile"
                    type="facebook"
                  />
                  <SocialIcon href="https://t.me/username" type="telegram" />
                  <SocialIcon
                    href="https://github.com/username"
                    type="github"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hoeum Senghun - Oval profile */}
          <div className="relative box-content w-[251px] h-[120px] rounded-full  overflow-hidden group  bg-pink-300">
            <Image
              src="/placeholder.svg?height=120&width=251"
              alt="Hoeum Senghun"
              width={251}
              height={120}
              className="w-full h-full bg-pink-300 object-cover transition-transform duration-300 group-hover:scale-110 bg-black"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6 ">
              <div className="flex flex-col items-center space-y-2 justify-between">
                <p className="text-lg font-semibold">Hoeum Senghun</p>
                <div className="flex flex-row space-x-1">
                  <SocialIcon
                    href="https://www.facebook.com/profile"
                    type="facebook"
                  />
                  <SocialIcon href="https://t.me/username" type="telegram" />
                  <SocialIcon
                    href="https://github.com/username"
                    type="github"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fanau - Custom rounded profile */}
        <div className="relative box-content w-[180px] h-[220px] rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] rounded-br-[50px] overflow-hidden group">
          <Image
            src="/placeholder.svg?height=220&width=180"
            alt="Fanau"
            width={180}
            height={220}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] p-6">
            <div className="flex flex-col items-center space-y-2 justify-between ml-10">
              <p className="text-lg font-semibold">Fanau</p>
              <div className="flex flex-row space-x-1">
                <SocialIcon
                  href="https://www.facebook.com/profile"
                  type="facebook"
                />
                <SocialIcon href="https://t.me/username" type="telegram" />
                <SocialIcon href="https://github.com/username" type="github" />
              </div>
            </div>
          </div>
        </div>

        {/* Chann Theara and Lim Rosskan - Two small circular profiles */}
        <div className="flex flex-row col-span-2 space-x-2 justify-center items-center">
          <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
            <Image
              src="/placeholder.svg?height=150&width=161"
              alt="Chann Theara"
              width={161}
              height={150}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
              <div className="flex flex-col items-center space-y-2 justify-between">
                <p className="text-lg font-semibold">Chann Theara</p>
                <div className="flex flex-row space-x-1">
                  <SocialIcon
                    href="https://www.facebook.com/profile"
                    type="facebook"
                  />
                  <SocialIcon href="https://t.me/username" type="telegram" />
                  <SocialIcon
                    href="https://github.com/username"
                    type="github"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
            <Image
              src="/placeholder.svg?height=150&width=161"
              alt="Lim Rosskan"
              width={161}
              height={150}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
              <div className="flex flex-col items-center space-y-2 justify-between">
                <p className="text-lg font-semibold">Lim Rosskan</p>
                <div className="flex flex-row space-x-1">
                  <SocialIcon
                    href="https://www.facebook.com/profile"
                    type="facebook"
                  />
                  <SocialIcon href="https://t.me/username" type="telegram" />
                  <SocialIcon
                    href="https://github.com/username"
                    type="github"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mony Visa - Circular profile */}
        <div className="relative box-content w-full h-[374px] rounded-full overflow-hidden group">
          <Image
            src="/placeholder.svg?height=374&width=374"
            alt="Mony Visa"
            width={374}
            height={374}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
            <div className="flex flex-col items-center space-y-2 justify-between">
              <p className="text-lg font-semibold">Mony Visa</p>
              <div className="flex flex-row space-x-1">
                <SocialIcon
                  href="https://www.facebook.com/profile"
                  type="facebook"
                />
                <SocialIcon href="https://t.me/username" type="telegram" />
                <SocialIcon href="https://github.com/username" type="github" />
              </div>
            </div>
          </div>
        </div>

        {/* Leang Chhengleap - Small circular profile */}
        <div className="relative box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
          <Image
            src="/placeholder.svg?height=150&width=161"
            alt="Leang Chhengleap"
            width={161}
            height={150}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full rounded-br-none p-6">
            <div className="flex flex-col items-center space-y-2 justify-between">
              <p className="text-lg font-semibold">Leang Chhengleap</p>
              <div className="flex flex-row space-x-1">
                <SocialIcon
                  href="https://www.facebook.com/profile"
                  type="facebook"
                />
                <SocialIcon href="https://t.me/username" type="telegram" />
                <SocialIcon href="https://github.com/username" type="github" />
              </div>
            </div>
          </div>
        </div>

        {/* Davit - Oval profile */}
        <div className="relative box-content w-[280px] h-[165px] rounded-full overflow-hidden group">
          <Image
            src="/placeholder.svg?height=165&width=280"
            alt="Davit"
            width={280}
            height={165}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full p-6">
            <div className="flex flex-col items-center space-y-2 justify-between">
              <p className="text-lg font-semibold">Davit</p>
              <div className="flex flex-row space-x-1">
                <SocialIcon
                  href="https://www.facebook.com/profile"
                  type="facebook"
                />
                <SocialIcon href="https://t.me/username" type="telegram" />
                <SocialIcon href="https://github.com/username" type="github" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable component for social media icons
function SocialIcon({ href, type }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-600 w-8 h-8"
      aria-label={`${type.charAt(0).toUpperCase() + type.slice(1)} Profile`}
    >
      {type === "facebook" && <FacebookIcon />}
      {type === "telegram" && <TelegramIcon />}
      {type === "github" && <GithubIcon />}
    </Link>
  );
}

// Social media icons components
function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 48 48"
    >
      <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
      <path
        fill="#fff"
        d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
      ></path>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 48 48"
    >
      <path
        fill="#29b6f6"
        d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"
      ></path>
      <path
        fill="#fff"
        d="M34,15l-3.7,19.1c0,0-0.2,0.9-1.2,0.9c-0.6,0-0.9-0.3-0.9-0.3L20,28l-4-2l-5.1-1.4c0,0-0.9-0.3-0.9-1	c0-0.6,0.9-0.9,0.9-0.9l21.3-8.5c0,0,0.7-0.2,1.1-0.2c0.3,0,0.6,0.1,0.6,0.5C34,14.8,34,15,34,15z"
      ></path>
      <path
        fill="#b0bec5"
        d="M23,30.5l-3.4,3.4c0,0-0.1,0.1-0.3,0.1c-0.1,0-0.1,0-0.2,0l1-6L23,30.5z"
      ></path>
      <path
        fill="#cfd8dc"
        d="M29.9,18.2c-0.2-0.2-0.5-0.3-0.7-0.1L16,26c0,0,2.1,5.9,2.4,6.9c0.3,1,0.6,1,0.6,1l1-6l9.8-9.1	C30,18.7,30.1,18.4,29.9,18.2z"
      ></path>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="30"
      height="30"
      viewBox="0 0 48 48"
    >
      <linearGradient
        id="rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1"
        x1="4"
        x2="44"
        y1="23.508"
        y2="23.508"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#4c4c4c"></stop>
        <stop offset="1" stopColor="#343434"></stop>
      </linearGradient>
      <path
        fill="url(#rL2wppHyxHVbobwndsT6Ca_AZOZNnY73haj_gr1)"
        d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36	C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"
      ></path>
      <path
        fill="#fff"
        d="M36.744,23.334c0-2.31-0.782-4.226-2.117-5.728c0.145-0.325,0.296-0.761,0.371-1.309	c0.172-1.25-0.031-2-0.203-2.734s-0.375-1.25-0.375-1.25s-0.922-0.094-1.703,0.172s-1.453,0.469-2.422,1.047	c-0.453,0.27-0.909,0.566-1.27,0.806C27.482,13.91,25.785,13.69,24,13.69c-1.801,0-3.513,0.221-5.067,0.652	c-0.362-0.241-0.821-0.539-1.277-0.811c-0.969-0.578-1.641-0.781-2.422-1.047s-1.703-0.172-1.703-0.172s-0.203,0.516-0.375,1.25	s-0.375,1.484-0.203,2.734c0.077,0.562,0.233,1.006,0.382,1.333c-1.31,1.493-2.078,3.397-2.078,5.704	c0,5.983,3.232,8.714,9.121,9.435c-0.687,0.726-1.148,1.656-1.303,2.691c-0.387,0.17-0.833,0.33-1.262,0.394	c-1.104,0.167-2.271,0-2.833-0.333s-1.229-1.083-1.729-1.813c-0.422-0.616-1.031-1.331-1.583-1.583	c-0.729-0.333-1.438-0.458-1.833-0.396c-0.396,0.063-0.583,0.354-0.5,0.563c0.083,0.208,0.479,0.521,0.896,0.75	c0.417,0.229,1.063,0.854,1.438,1.458c0.418,0.674,0.5,1.063,0.854,1.833c0.249,0.542,1.101,1.219,1.708,1.583	c0.521,0.313,1.562,0.491,2.688,0.542c0.389,0.018,1.308-0.096,2.083-0.206v3.75c0,0.639-0.585,1.125-1.191,1.013	C19.756,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.585,43.127,29,42.641,29,42.002v-5.804	c0-1.329-0.527-2.53-1.373-3.425C33.473,32.071,36.744,29.405,36.744,23.334z M11.239,32.727c-0.154-0.079-0.237-0.225-0.185-0.328	c0.052-0.103,0.22-0.122,0.374-0.043c0.154,0.079,0.237,0.225,0.185,0.328S11.393,32.806,11.239,32.727z M12.451,33.482	c-0.081,0.088-0.255,0.06-0.389-0.062s-0.177-0.293-0.096-0.381c0.081-0.088,0.255-0.06,0.389,0.062S12.532,33.394,12.451,33.482z M13.205,34.732c-0.102,0.072-0.275,0.005-0.386-0.15s-0.118-0.34-0.016-0.412s0.275-0.005,0.386,0.15	C13.299,34.475,13.307,34.66,13.205,34.732z M14.288,35.673c-0.069,0.112-0.265,0.117-0.437,0.012s-0.256-0.281-0.187-0.393	c0.069-0.112,0.265-0.117,0.437-0.012S14.357,35.561,14.288,35.673z M15.312,36.594c-0.213-0.026-0.371-0.159-0.353-0.297	c0.017-0.138,0.204-0.228,0.416-0.202c0.213,0.026,0.371,0.159,0.353,0.297C15.711,36.529,15.525,36.62,15.312,36.594z M16.963,36.833c-0.227-0.013-0.404-0.143-0.395-0.289c0.009-0.146,0.2-0.255,0.427-0.242c0.227,0.013,0.404,0.143,0.395,0.289	C17.381,36.738,17.19,36.846,16.963,36.833z M18.521,36.677c-0.242,0-0.438-0.126-0.438-0.281s0.196-0.281,0.438-0.281	c0.242,0,0.438,0.126,0.438,0.281S18.762,36.677,18.521,36.677z"
      ></path>
    </svg>
  );
}
