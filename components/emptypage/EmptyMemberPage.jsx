import Image from "next/image";
import Filter from "@/assets/emptyMemberPage/filter.png";
import { Button } from "@heroui/react";
import BigUserInvite from "@/assets/emptyMemberPage/bigUserInvite.png";

export function EmptyMemberPage() {
  return <>
    {/* Header */}
    <div>
        <p className="text-h1 font-semibold">
            Members
        </p>
    </div>

    {/* Filter-Search and Invite */}
    <div className="flex justify-between pt-[2%]">
        {/* Filter-Search */}
        <div className="flex">
            {/* Filter */}
            <div className="flex gap-[8px] items-center content-center border-[1px] w-[92px] h-[50px] border-stroke px-[12px] rounded-l-[16px]">
                <Image
                    src={Filter}
                    alt="Filter"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                />
                <p className="text-body font-medium text-[#A0AEC0]">
                    All
                </p>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.5L8 9.5L11 6.5" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Search */}
            <div>
                <div className="flex items-center gap-[10px] w-[508px] h-[50px] px-3 py-[6px] rounded-r-[16px] border border-l-0 border-stroke">
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.47182 10.5117C7.58254 11.2526 6.46508 11.6938 5.25147 11.6938C2.35116 11.6938 0 9.17398 0 6.06564C0 2.9573 2.35116 0.4375 5.25147 0.4375C8.15177 0.4375 10.5029 2.9573 10.5029 6.06564C10.5029 7.36618 10.0913 8.56369 9.40013 9.51672L12.0575 12.3612C12.314 12.6358 12.3142 13.0812 12.058 13.3561C11.8018 13.6311 11.3862 13.6313 11.1297 13.3567L8.47182 10.5117ZM9.19006 6.06564C9.19006 8.39689 7.42669 10.2867 5.25147 10.2867C3.07624 10.2867 1.31287 8.39689 1.31287 6.06564C1.31287 3.73439 3.07624 1.84454 5.25147 1.84454C7.42669 1.84454 9.19006 3.73439 9.19006 6.06564Z" fill="#A0AEC0"/>
                    </svg>
                    <svg width="2" height="20" viewBox="0 0 2 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.15909 0.613636V19.75H0.278409V0.613636H1.15909Z" fill="#A0AEC0"/>
                    </svg>
                    <input 
                        type="text"
                        placeholder="Search"
                        className="text-sm placeholder:text-sm placeholder:text-[#A0AEC0] text-[#A0AEC0] outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Invite */}
        <div>
            <Button color="success" className="w-[109px] h-[48px] bg-white border-[#E2E8F0] border-1 flex gap-[8px] items-center justify-center rounded-[8px]">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[20px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                </span>
                <p className="text-body-sm">
                    Invite
                </p>
            </Button>
        </div>
    </div>
    {/* bigIcon-title desc */}
    <div className="w-full h-screen flex justify-center items-center">
        <div className="relative h-fit w-fit flex flex-col items-center">
            <Image
                src={BigUserInvite}
                alt="Invite Members"
                className="w-[516px] h-[361px]"
            />
            <p className="font-semibold text-h2 text-center text-[#143A47] py-3">No Members Yet</p>
            <p className="font-normal text-h4 text-[#143A47] opacity-50">No Members Yet – Invite or add new members to get started!</p>
        </div>
    </div>
  </>
}