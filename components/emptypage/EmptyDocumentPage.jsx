"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import HumenAtDocument from "@/assets/emptyDocumentPage/HumenAtDocument.png";
import GoogleSheetsIcon from "@/assets/emptyDocumentPage/GoogleSheetsIcon.png";
import GoogleDocsIcon from "@/assets/emptyDocumentPage/GoogleDocsIcon.png";
import GoogleDriveIcon from "@/assets/emptyDocumentPage/GoogleDriveIcon.png";
import GoogleSlideIcon from "@/assets/emptyDocumentPage/GoogleSlideIcon.png";
import GoogleIcon from "@/assets/emptyDocumentPage/GoogleIcon.png";
import NotAllowFolder from "@/assets/emptyDocumentPage/NotAllowFolder.png";
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function WelcomeDocumentPage() {
  return <>
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-h1 font-semibold">Document</p>
        <Button color="success" className="w-[96px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]">
            <p className="text-body-sm text-white">
                Sign in
            </p>
        </Button>
      </div>

      {/* Title */}
      <div className="flex justify-center pt-[5%]">
          <p className="text-[32px] font-bold text-title absolute">Take <span className="bg-gradient-to-r from-[#59BAD5] to-[#ABAAFF] bg-clip-text text-transparent">control</span> of your tasks and <span className="bg-gradient-to-r from-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">simplify</span> <br />your day.</p>
      </div>

      {/* Human Stand */}
      <Image 
        src={HumenAtDocument}
        alt="Humen at Document"
        className="w-[236px] h-[752px] absolute top-[15%] left-[42%] right-[58%]"
      />

      {/* Google Sheet */}
      <div className="absolute top-[115%] right-[10%]">
        <div className="relative">
          <div className="h-[40px] w-fit px-[15px] rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[90%] left-[-45%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Synchronized
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleSheetsIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Docs */}
      <div className="absolute top-[75%] left-[17%]">
        <div className="relative">
          <div className="h-[40px] w-[100px] rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[-15%] left-[-10%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Smart
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleDocsIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Slide */}
      <div className="absolute top-[55%] right-[10%]">
        <div className="relative">
          <div className="h-[40px] px-[15px] w-fit rounded-[10px] bg-slate-blue flex items-center justify-center absolute top-[-15%] left-[70%]">
            <p className="text-[24px] h-[40px] bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text w-fit text-transparent">
              Seamless
            </p>
          </div>
          <div className="w-[329px] h-[122px] rounded-[20px] bg-transparent shadow-md flex flex-col justify-center">
              <Image
                src={GoogleSlideIcon}
                alt="docs"
                className="w-[329px] h-[56px]"
              />
              <div className="pl-[18%]">
                <p className="text-body-sm font-normal text-title">Prepare detailed documents and<br /> collaborate in real-time.</p>
              </div>
          </div>
        </div>
      </div>

      {/* Google Drive */}
      <div className="absolute top-[103%] left-[32%]">
        <Image
          src={GoogleDriveIcon}
          alt="docs"
          className="w-[64px] h-[57px]"
        />
      </div>

      {/* Google Icon */}
      <div className="absolute right-[12%] top-[80%]">
        <Image
          src={GoogleIcon}
          alt="docs"
          className="size-[65px]"
        />
      </div>
    </div>
  </>
}

export function EmptyDocumentPage() {
  const [isOpen, setIsOpen] = useState(false);

  return <>
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-h1 font-semibold">Document</p>
        <Button color="success" className="w-[139px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </span>
            <p className="text-body-sm text-white">
                Create
            </p>
        </Button>
      </div>

      {/* Filter-InputDate Search */}
      <div className="flex justify-between items-center pt-[2%]">
        {/* Filter-InputDate */}
        <div className="flex gap-[23px]">
          {/* InputDate */}
          {/* <div className="flex gap-[13px] items-center pr-[8px] pl-[10px] w-[144px] h-[30px] bg-white shadow-md rounded-[20px] cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6667 3.13363V1.55469M11.6667 3.13363V4.71258M11.6667 3.13363H7.66667M1 7.87048V14.9757C1 15.3945 1.1873 15.7961 1.5207 16.0922C1.8541 16.3883 2.30628 16.5547 2.77778 16.5547H15.2222C15.6937 16.5547 16.1459 16.3883 16.4793 16.0922C16.8127 15.7961 17 15.3945 17 14.9757V7.87048M1 7.87048H17M1 7.87048V4.71258C1 4.29382 1.1873 3.89221 1.5207 3.5961C1.8541 3.29999 2.30628 3.13363 2.77778 3.13363H4.55556M17 7.87048V4.71258C17 4.29382 16.8127 3.89221 16.4793 3.5961C16.1459 3.29999 15.6937 3.13363 15.2222 3.13363H14.7778M4.55556 1.55469V4.71258" stroke="#59BAD5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="font-normal text-[13px] text-[#000000]">20/05/2024</p>
          </div> */}
          <DatePicker />

          {/* Filter */}
          <div className="relative">
            {/* Filter */}
            <div onClick={()=>setIsOpen(!isOpen)} className="absolute z-10 flex justify-between gap-[13px] items-center pr-[9px] pl-[10px] w-[144px] h-[30px] bg-white shadow-small rounded-[20px] cursor-pointer ">
              <p className="font-normal text-[13px] text-[#000000]">Filter</p>
              <svg width="8" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.996 5.54563C3.9436 5.54635 3.89163 5.53464 3.84346 5.51124C3.79529 5.48784 3.75196 5.45327 3.71628 5.40976L0.11988 1.33367C-0.03996 1.15251 -0.03996 0.871716 0.11988 0.690557C0.27972 0.509398 0.527472 0.509398 0.687313 0.690557L4.004 4.44962L7.31269 0.699615C7.47253 0.518456 7.72028 0.518456 7.88012 0.699615C8.03996 0.880774 8.03996 1.16157 7.88012 1.34273L4.28372 5.41882C4.2038 5.5094 4.0999 5.55469 4.004 5.55469L3.996 5.54563Z" fill="black" fillOpacity="0.6"/>
              </svg>
            </div>

            {/* dropdown */}
            {isOpen ? <div className="absolute top-[40%] -z-0 left-0 w-[144px] h-fit bg-white border border-gray-200 rounded-xl shadow-sm">
              <ul className="p-2 pt-7">
                <li className="py-1 px-3 text-[13px] hover:bg-gray-100 cursor-pointer rounded-xl">Option 1</li>
                <li className="py-1 px-3 text-[13px] hover:bg-gray-100 cursor-pointer rounded-xl">Option 2</li>
                <li className="py-1 px-3 text-[13px] hover:bg-gray-100 cursor-pointer rounded-xl">Option 3</li>
              </ul>
            </div> : <span></span>}
          </div>
        </div>

        {/* Search */}
        <div>
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 left-2.5 text-slate-600">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
              </svg>
          
              <input
              className="w-[230px] h-[30px] bg-transparent placeholder:text-input-placeholder placeholder:text-gray-400 text-slate-700 text-sm border border-slate-200 rounded-2xl pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search files" 
              />

            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center pt-[13%]">
        <Image 
          src={NotAllowFolder}
          alt="Not Allow Folder"
          className="w-[458px] h-[341px]"
        />
        <p className="text-h2 text-title font-semibold">Ooops! It’s Empty</p>
        <p className="text-title opacity-50 text-h4">Looks like you don’t have anything in your document</p>
      </div>
    </div>
  </>
}

export const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedTime, setSelectedTime] = useState({ hour: 12, minute: 0, period: 'PM' });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
    
    const days = [];

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }

    // Next month's leading days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }

    return days;
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleApply = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Select date';
    return selectedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="relative w-fit shadow-small rounded-full">
      {/* Date Input */}
      {/* <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-white"
      >
        <span className="text-gray-700">{formatSelectedDate()}</span>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div> */}

      <div className="flex gap-[13px] items-center pr-[8px] pl-[10px] w-[144px] h-[30px] bg-white shadow-sm rounded-[20px]">
        <svg onClick={() => setIsOpen(!isOpen)} className="cursor-pointer" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6667 3.13363V1.55469M11.6667 3.13363V4.71258M11.6667 3.13363H7.66667M1 7.87048V14.9757C1 15.3945 1.1873 15.7961 1.5207 16.0922C1.8541 16.3883 2.30628 16.5547 2.77778 16.5547H15.2222C15.6937 16.5547 16.1459 16.3883 16.4793 16.0922C16.8127 15.7961 17 15.3945 17 14.9757V7.87048M1 7.87048H17M1 7.87048V4.71258C1 4.29382 1.1873 3.89221 1.5207 3.5961C1.8541 3.29999 2.30628 3.13363 2.77778 3.13363H4.55556M17 7.87048V4.71258C17 4.29382 16.8127 3.89221 16.4793 3.5961C16.1459 3.29999 15.6937 3.13363 15.2222 3.13363H14.7778M4.55556 1.55469V4.71258" stroke="#59BAD5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="font-normal text-[13px] text-[#000000]">20/05/2024</p>
      </div>

      {/* Date Picker Modal */}
      {isOpen && (
        <div className="absolute top-[-170%] left-[-30%] mt-2 bg-white border border-gray-200 rounded-xl shadow-sm z-50 p-4 w-80 scale-[0.7]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {months[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {calendarDays.map((dayObj, index) => {
              const isSelected = selectedDate && 
                selectedDate.getDate() === dayObj.day && 
                selectedDate.getMonth() === currentMonth && 
                selectedDate.getFullYear() === currentYear &&
                dayObj.isCurrentMonth;
              
              const isToday = new Date().getDate() === dayObj.day &&
                new Date().getMonth() === currentMonth &&
                new Date().getFullYear() === currentYear &&
                dayObj.isCurrentMonth;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(dayObj.day, dayObj.isCurrentMonth)}
                  className={`
                    w-10 h-10 text-sm flex items-center justify-center transition-all
                    ${!dayObj.isCurrentMonth 
                      ? 'text-gray-300 hover:bg-gray-50 rounded-full' 
                      : isSelected
                        ? 'bg-primary text-white shadow-md rounded-full'
                        : isToday
                          ? 'bg-blue-100 text-primary font-semibold rounded-full'
                          : 'text-gray-700 hover:bg-blue-50 rounded-full'
                    }
                  `}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Time Picker */}
          <div className="flex items-center justify-center gap-2 mb-4 p-3 rounded-xl">
            <select
              value={selectedTime.hour}
              onChange={(e) => setSelectedTime({...selectedTime, hour: parseInt(e.target.value)})}
              className="px-3 bg-transparent py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <span className="text-gray-500">:</span>
            <select
              value={selectedTime.minute.toString().padStart(2, '0')}
              onChange={(e) => setSelectedTime({...selectedTime, minute: parseInt(e.target.value)})}
              className="px-3 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(60)].map((_, i) => (
                <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>
              ))}
            </select>
            <select
              value={selectedTime.period}
              onChange={(e) => setSelectedTime({...selectedTime, period: e.target.value})}
              className="px-3 py-2 bg-transparent border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors border rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-primary text-white hover:border-primary hover:text-primary hover:bg-white transition-colors border rounded-xl"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Selected Date Display */}
      {/* {selectedDate && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Selected: {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} at {selectedTime.hour}:{selectedTime.minute.toString().padStart(2, '0')} {selectedTime.period}
          </p>
        </div>
      )} */}
    </div>
  );
};
