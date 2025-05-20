import React from "react";
import Image from "next/image";
import notification from "../../assets/notification.png";
export default function NavbarAutherized() {
  return (
    <div className="w-full">
      <header className="w-full bg-bgColor">
        <div className="  px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-end">
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Image
                      src={notification}
                      className="size-4"
                      alt="notification"
                    />
                  </li>
                </ul>
              </nav>

              <div className="relative hidden md:block">
                <button
                  type="button"
                  className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600"
                >
                  <span className="sr-only">Toggle dashboard menu</span>

                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="size-10 object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
