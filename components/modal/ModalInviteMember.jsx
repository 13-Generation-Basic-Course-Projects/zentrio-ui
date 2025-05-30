"use client";
import React from "react";
import member from "@/assets/memberSideBar.png";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  Input,
} from "@heroui/react";
import mailIcon from "@/assets/mail.png";
import { Select, SelectItem } from "@heroui/react";

export const roles = [
  { key: "team leader", label: "Team Leader" },
  { key: "member", label: "Member" },
];

export const members = [
  { id: 1, name: "Rosskan", role: "Member", color: "bg-progress-blue" },
  { id: 2, name: "Visa", role: "Member", color: "bg-progress-orange" },
  { id: 3, name: "ChhengLeap", role: "Member", color: "bg-progress-green" },
  { id: 4, name: "Fong", role: "Team Leader", color: "bg-progress-green" },
  { id: 5, name: "Senghun", role: "Member", color: "bg-progress-green" },
];

export default function ModalInviteMember() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[8px] shadow-sm hover:bg-gray-100 h-[50px] "
        // className="bg-transparent h-[340px]  "
        fullWidth="true "
      >
        <Image src={member} alt="Member Icon" className="w-4 h-4" />
        Invite
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className="max-h-[750px]  overflow-y-auto scrollbar-hidden"
      >
        <ModalContent className="py-5 px-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex gap-x-4 items-center border-b-3 pb-4 border-stroke">
                  <div className="flex items-center justify-center p-5 rounded-xl bg-slate-blue">
                    <Image src={mailIcon} width={30} height={27} alt="Email" />
                  </div>
                  <div>
                    <h2 className="text-h4 text-title mb-1">Member</h2>
                    <p className="text-body-sm text-description">
                      Invite team members to collaborate
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="overflow-hidden text-title">
                <form action="" className="space-y-2">
                  <div className="text-h6 ">Adding Member</div>
                  <div className="flex items-center gap-x-4">
                    <div className="grid grid-cols-[60%_40%] border border-gray-300 rounded-small px-4 py-2 bg-white w-full focus-within:ring-2 focus-within:ring-primary transition-all hover:bg-white">
                  <Input
                        isRequired
                        errorMessage="Please input a valid email"
                        name="email"
                        placeholder="Enter email"
                        type="email"
                        variant="ghost"
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper:
                            "flex-1 p-0 border-none shadow-none bg-transparent hover:bg-transparent",
                          input: "text-black bg-transparent px-2 py-1",
                        }}
                        className="flex-1"
                      />

                      <Select
                        key={"inside"}
                        placeholder="Select role"
                       
                        popoverProps={{
                          className: "w-[200px] shadow-none !bg-transparent",
                        }}
                      >
                        {roles.map((role) => (
                          <SelectItem
                            key={role.key}
                          >
                            {role.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Button
                      className="bg-slate-blue px-8 py-6 text-btn text-primary"
                      color="primary"
                      variant="bordered"
                      size="lg"
                      radius="md"
                    >
                      Invite
                    </Button>
                  </div>
                </form>
                <div className="space-y-2 mb-5">
                  <div className="text-h6 text-title">Existing Member</div>
                  <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[260px] overflow-y-auto pr-2 scrollbar-hidden">
                    {members.map((member) => (
                      <li
                        key={member.id}
                        className="flex justify-between items-center gap-4 px-2 py-3 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${member.color}`}
                          >
                            D
                          </div>
                          <div>
                            <p className="font-medium">Zentrio UI Design</p>
                            <p className="text-body-sm text-description">
                              Role: {member.role}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-caption text-description">
                            {member.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <div className="text-h6 text-title">New Member</div>
                  <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-hidden">
                    {members.map((member) => (
                      <li
                        key={member.id}
                        className="flex justify-between items-center gap-4 px-2 py-3 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${member.color}`}
                          >
                            D
                          </div>
                          <div>
                            <p className="font-medium">Zentrio UI Design</p>
                            <p className="text-body-sm text-description">
                              Role: {member.role}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-caption text-description">
                            {member.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}