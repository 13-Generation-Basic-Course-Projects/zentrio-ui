"use client";
import React, { useState } from "react";
import member from "@/assets/memberSideBar.png";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import mailIcon from "@/assets/mail.png";
import { Select, SelectItem } from "@heroui/react";

// Form + Validation
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteMemberSchema } from "@/lib/schemas/invitememberSchema";
import { inviteMemberToBoardAction } from "@/action/board.action";

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

// Function to generate avatar color based on email
const getAvatarColor = (email) => {
  const colors = [
    "bg-progress-blue",
    "bg-progress-orange",
    "bg-progress-green",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const index = email.length % colors.length;
  return colors[index];
};

// Function to get first letter of email or name
const getInitial = (str) => {
  return str.charAt(0).toUpperCase();
};

export default function ModalInviteMember({
  boardId,
  allMemberInBoard,
  workspaceId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newMembers, setNewMembers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  // const boardId = "feb6d22e-b2d6-4105-b3ad-663c7148c337";
  console.log("+++log workspaceId", workspaceId);
  // Watch form values to determine button text and state
  const watchedEmail = watch("email");
  const watchedRole = watch("role");
  const isFormFilled = watchedEmail && watchedRole;

  const onSubmit = (data) => {
    setErrorMessage("");
    setSuccessMessage("");

    if (isFormFilled) {
      // Add to pending list
      const newMember = {
        id: Date.now(),
        email: data.email,
        role: data.role,
        color: getAvatarColor(data.email),
        name: data.email.split("@")[0],
      };
      setNewMembers((prev) => [...prev, newMember]);
      setSuccessMessage(`Added ${data.email} to pending invites`);
      reset({ email: "", role: "" });
    }
  };

  const sendAllInvites = async () => {
    if (newMembers.length === 0) return;

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const inviteData = newMembers.map((member) => ({
        email: member.email,
        roleName: member.role === "team leader" ? "ROLE_LEADER" : "ROLE_MEMBER",
      }));

      const result = await inviteMemberToBoardAction({
        boardId,
        workspaceId,
        data: inviteData,
      });
      if (result.success) {
        setSuccessMessage(`Sent ${newMembers.length} invites successfully`);
        setNewMembers([]);
      } else {
        setErrorMessage(result.error || "Failed to send invites");
      }
    } catch (error) {
      setErrorMessage("Error sending invites: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeNewMember = (id) => {
    setNewMembers((prev) => prev.filter((member) => member.id !== id));
  };
  console.log("log in invite memeber", allMemberInBoard);
  return (
    <div className="relative">
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[8px] shadow-sm hover:bg-gray-100 h-[50px] relative z-10"
        fullWidth
      >
        <Image src={member} alt="Member Icon" className="w-4 h-4" />
        Invite
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        placement="center"
        backdrop="blur"
        classNames={{
          backdrop: "z-50",
          wrapper: "z-50",
          base: "z-50",
        }}
        className="max-h-[750px] overflow-y-auto scrollbar-hidden"
        isDismissable={true}
        isKeyboardDismissDisabled={false}
      >
        <ModalContent className="py-5 px-4 relative z-60">
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <div className="text-h6">Adding Member</div>
                  <div className="flex items-start gap-x-4">
                    <div className="grid grid-cols-[60%_40%] border border-gray-300 rounded-small px-4 py-2 bg-white w-full focus-within:ring-2 focus-within:ring-primary transition-all hover:bg-white">
                      <div className="flex flex-col">
                        <Input
                          isRequired
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
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-danger text-sm mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <Controller
                          name="role"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              selectedKeys={field.value ? [field.value] : []}
                              onSelectionChange={(val) =>
                                field.onChange(Array.from(val)[0] || "")
                              }
                              placeholder="Select role"
                              isRequired
                              popoverProps={{
                                className:
                                  "w-[200px] shadow-none !bg-transparent z-70",
                              }}
                            >
                              {roles.map((role) => (
                                <SelectItem key={role.key}>
                                  {role.label}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.role && (
                          <p className="text-danger text-sm mt-1">
                            {errors.role.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      className="bg-slate-blue px-8 py-6 text-btn text-primary"
                      color="primary"
                      variant="bordered"
                      size="lg"
                      radius="md"
                      type={isFormFilled ? "submit" : "button"}
                      isLoading={isLoading}
                      isDisabled={
                        isLoading || (!isFormFilled && newMembers.length === 0)
                      }
                      onClick={
                        newMembers.length > 0 && !isFormFilled
                          ? sendAllInvites
                          : undefined
                      }
                    >
                      {newMembers.length > 0 && !isFormFilled
                        ? `Send All Invites (${newMembers.length})`
                        : isFormFilled
                        ? "Add to Pending"
                        : "Invite Member"}
                    </Button>
                  </div>
                  {errorMessage && (
                    <p className="text-danger text-sm mt-2">{errorMessage}</p>
                  )}
                  {successMessage && (
                    <p className="text-success text-sm mt-2">
                      {successMessage}
                    </p>
                  )}
                </form>

                {/* Existing Members */}
                <div className="space-y-2 mb-2">
                  <div className="text-h6 text-title">Existing Members</div>
                  <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[260px] overflow-y-auto pr-2 scrollbar-hidden">
                    {allMemberInBoard?.map((member, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center gap-4 px-2 py-3 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={member?.profileImage}
                            alt={member?.username}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{member?.username}</p>
                            <p className="text-body-sm text-description">
                              Roles: {member?.roles.join(", ")}
                            </p>
                          </div>
                        </div>
                        <p className="text-caption text-description">
                          {member.roles[0]}{" "}
                          {/* or display all roles if you want */}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pending Members */}
                {newMembers.length > 0 && (
                  <div className="space-y-2  h-[250px] overflow-y-auto scrollbar-hidden">
                    <div className="text-h6 text-title">
                      Pending Invites ({newMembers.length})
                    </div>
                    <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-hidden">
                      {newMembers.map((member) => (
                        <li
                          key={member.id}
                          className="flex justify-between items-center gap-4 px-2 py-3 rounded-xl bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${member.color}`}
                            >
                              {getInitial(member.email)}
                            </div>
                            <div>
                              <p className="font-medium">{member.email}</p>
                              <p className="text-body-sm text-description">
                                Role: {member.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-caption text-description">
                              {member.role}
                            </p>
                            <Button
                              size="sm"
                              variant="light"
                              color="danger"
                              onClick={() => removeNewMember(member.id)}
                              className="min-w-unit-8 w-8 h-8 p-0"
                            >
                              ×
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
