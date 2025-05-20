import React from "react";
import Image from "next/image";
import notification from "../../assets/notification.png";
import Link from "next/link";
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
                <Link href="/login">
                  <div className="overflow-hidden rounded-full border border-gray-300 shadow-inner dark:border-gray-600">
                    <span className="sr-only">Toggle dashboard menu</span>

                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzyLc8LMQIrviNz6u2EP3TtPRZZt3OlhrhHA&s"
                      alt=""
                      className="size-10 object-cover"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
