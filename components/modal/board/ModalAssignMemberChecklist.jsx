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
import { assignLeaderAction } from "@/action/board.action";
import { toast } from "react-toastify";
import Image from "next/image";
import { preventImage } from "@/constant/preventimage";

// Define schema for form validation
const assignLeaderSchema = z.object({
  userId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      "Please select a valid leader"
    ),
});

const preventPf = preventImage.noProfile;

export function ModalAssignMemberToCheckLisk({
  allMemberInBoard,
  taskId,
  currentLeader,
  onLeaderAssigned,
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
    resolver: zodResolver(assignLeaderSchema),
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

      const result = await assignLeaderAction(taskId, data.userId);
      console.log("result assignLd", result);
      if (result.success) {
        toast.success("Leader assigned successfully!");
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
          toast.error(result.error || "Failed to assign leader");
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

  console.log("data member", allMemberInBoard);

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent p-0 m-0 border-none shadow-none min-w-0 h-auto max-w-none w-full flex items-center justify-start gap-2 hover:bg-gray-100"
        radius="none"
        disableRipple={true}
        disableAnimation
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 0 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
          />
        </svg>
        {currentLeader ? (
          <div className="flex items-center gap-2">
            <img
              src={currentLeader.profileImage || preventPf}
              alt={currentLeader.username || "Leader"}
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
            <p>{currentLeader.username || "Unknown"}</p>
          </div>
        ) : (
          <p>Assign Leader</p>
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Assign Leader
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-title">
                      Select Leader <span className="text-progress-red">*</span>
                    </label>
                    <Select
                      {...register("userId")}
                      placeholder="Select a leader"
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
                    >
                      {allMemberInBoard.map((member) => (
                        <SelectItem
                          key={member.userId}
                          value={member.userId}
                          className="flex items-center gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={member.profileImage || preventPf}
                              alt={member.username}
                              width={24}
                              height={24}
                              className="rounded-full object-cover"
                            />
                            {member.username}
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
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
