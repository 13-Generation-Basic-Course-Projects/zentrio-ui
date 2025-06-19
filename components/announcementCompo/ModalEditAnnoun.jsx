"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react"
import { useState } from "react"
import { updateAnnouncementByIdAction } from "@/action/announcement.action"

export default function ModalEditAnnoun({ title, announId, boardId, Announcement }) {


  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [titleState, setTitleState] = useState(Announcement?.title || "")
  const [description, setDescription] = useState(Announcement?.description || "")
  const [loading, setLoading] = useState(false)



  const handleUpdate = async () => {
    if (!titleState || !description) return

    setLoading(true)
    try {
      const res = await updateAnnouncementByIdAction(announId, description, titleState, boardId)
      onClose() // Close modal on success
    } catch (error) {
      console.error("Failed to update announcement", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent h-auto flex items-center cursor-pointer p-0 !border-0">
        <div className={`font-medium text-blue-500`}>{title}</div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="z-[1000]">
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }}
            >
              <ModalHeader className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">Edit Announcement</span>
                </div>
              </ModalHeader>

              <ModalBody className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                  value={titleState}
                  onChange={(e) => setTitleState(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg resize-none min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

              </ModalBody>

              <ModalFooter className="space-x-3">
                <Button
                  type="button"
                  className="bg-gray-100 text-gray-700 font-semibold"
                  variant="light"
                  onPress={onClose}
                  isDisabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`font-semibold ${
                    titleState && description
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  isDisabled={!titleState || !description || loading}
                  isLoading={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      
      
    </>
  )
}
