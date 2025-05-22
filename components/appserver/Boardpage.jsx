import React from 'react'
import { Users, SquarePlus, Star } from 'lucide-react';
import {Button} from "@heroui/react";

export default function Boardpage() {
  return (
    <div className='flex flex-col h-full'>
        <div className="p-4">
        {/* <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" /> */}
        <BreadcrumbItem>Home</BreadcrumbItem>
        <div className="flex items-center justify-between">
          <h1 className="text-h3 font-semibold">Hikoko Design</h1>
          <div className="flex items-center gap-2">
            <Button className="w-full bg-primary text-white py-2 sm:py-3 px-4 text-sm sm:text-base max-w-none"  radius="lg" startContent={<SquarePlus />}>Create</Button>
            <Button className="w-full bg-white border-primary py-2 sm:py-3 px-4 text-sm sm:text-base max-w-none" variant="bordered" radius="lg" startContent={<Users />}>Invite</Button>
            <Button className='border-primary' isIconOnly aria-label="favorite" variant="bordered">
                <Star />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
