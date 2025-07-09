"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { assignMemberToChecklistAction } from "@/action/board.action";
import { toast } from "react-toastify";
import Image from "next/image";
import { preventImage } from "@/constant/preventimage";

// Define schema for form validation
const assignMemberSchema = z.object({
  userId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Please select a valid member"
    ),
});

const preventPf = preventImage.noProfile;


export function ModalAssignMemberToCheckLisk({
  allMemberInBoard,
  taskId,
  currentLeader,
  onLeaderAssigned,
  leaderId,
  checklistId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(assignMemberSchema),
    defaultValues: {
      userId: currentLeader?.userId || "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Optimistic update
      const selectedMember = allMemberInBoard.find(
        (m) => m.userId === data.userId
      );
      if (onLeaderAssigned && selectedMember) {
        onLeaderAssigned({
          ...selectedMember,
          id: taskId,
        });
      }

      const result = await assignMemberToChecklistAction(
        checklistId,
        taskId,
        leaderId, // assignedBy (the leader who is assigning)
        data.userId // assignedTo (the selected member)
      );
      //  ("result assignmember", result);
      if (result.success) {
        toast.success("Member assigned successfully!");
        if (onLeaderAssigned && result.updatedTask) {
          onLeaderAssigned(result.updatedTask);
        }
        onOpenChange(false);
        reset();
      } else {
        // Revert optimistic update
        if (onLeaderAssigned) {
          onLeaderAssigned(
            currentLeader ? { ...currentLeader, id: taskId } : null
          );
        }
        if (result.error) {
          toast.error(result.error || "Failed to assign member");
        }
      }
    } catch (error) {
      // Revert optimistic update
      if (onLeaderAssigned) {
        onLeaderAssigned(
          currentLeader ? { ...currentLeader, id: taskId } : null
        );
      }
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  //  ("data member", allMemberInBoard);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent p-0 m-0 border-none shadow-none min-w-0 h-auto max-w-none w-8 h-8 rounded-full bg-primary flex items-center justify-center gap-2 hover:bg-gray-100"
        radius="none"
        disableRipple={true}
        disableAnimation
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
          />
        </svg>

        {currentLeader ? (
          <div className="flex items-center gap-2">
            <img
              src={currentLeader.profileImage || preventPf}
              alt={currentLeader.username || "Member"}
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
            <p>{currentLeader.username || "Unknown"}</p>
          </div>
        ) : (
          ""
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Assign Member
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-title">
                      Select Member <span className="text-progress-red">*</span>
                    </label>
                    {allMemberInBoard?.filter(
                      (member) =>
                        member.userId !== leaderId &&
                        !member.roles?.includes("ROLE_MANAGER")
                    ).length === 0 ? (
                      <p className="text-caption text-gray-500">
                        No eligible members available to assign.
                      </p>
                    ) : (
                      <Select
                        {...register("userId")}
                        placeholder="Select a member"
                        className={`border rounded-small text-caption ${
                          errors.userId
                            ? "border-progress-red"
                            : "border-gray-300"
                        }`}
                        onSelectionChange={(keys) => {
                          const userId = Array.from(keys)[0];
                          setValue("userId", userId);
                        }}
                        defaultSelectedKeys={
                          currentLeader?.userId ? [currentLeader.userId] : []
                        }
                        isInvalid={!!errors.userId}
                        errorMessage={errors.userId?.message}
                        renderValue={(items) => {
                          return items.map((item) => {
                            const member = allMemberInBoard.find(
                              (m) => m.userId === item.key
                            );
                            if (!member) return null;

                            return (
                              <div
                                key={item.key}
                                className="flex items-center gap-2"
                              >
                                <img
                                  src={member.profileImage || preventPf}
                                  alt={member.username}
                                  width={24}
                                  height={24}
                                  className="rounded-full object-cover"
                                />
                                <span>{member.username}</span>
                              </div>
                            );
                          });
                        }}
                      >
                        {allMemberInBoard
                          ?.filter(
                            (member) =>
                              member.userId !== leaderId &&
                              !member.roles?.includes("ROLE_MANAGER")
                          )
                          .map((member) => (
                            <SelectItem
                              key={member.userId}
                              value={member.userId}
                              textValue={member.username}
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={member.profileImage || preventPf}
                                  alt={member.username}
                                  width={24}
                                  height={24}
                                  className="rounded-full object-cover"
                                />
                                <span>{member.username}</span>
                              </div>
                            </SelectItem>
                          ))}
                      </Select>
                    )}
                    {errors.userId && (
                      <p className="text-progress-red text-caption">
                        {errors.userId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      className="bg-transparent border border-gray-300"
                      radius="full"
                      onPress={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      radius="full"
                      type="submit"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
