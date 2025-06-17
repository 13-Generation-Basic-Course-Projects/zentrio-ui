"use client"

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@heroui/react"
import { useState } from "react"
import { X, ImageIcon } from "lucide-react"
import { updateAnnouncementByIdAction } from "@/action/announcement.action"

export default function ModalEditAnnoun({ icon, bgcolor, title, announId, boardId, Announcement }) {
  // max size 10 mb
  const MAX_SIZE_MB = 10

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [titleState, setTitleState] = useState(Announcement?.title || "")
  const [description, setDescription] = useState(Announcement?.description || "")
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files || [])
    for (const file of newFiles) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`"${file.name}" exceeds 10MB.`)
        return
      }
    }
    setImages((prev) => [...prev, ...newFiles])
    e.target.value = null
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

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
                  <div className={`w-8 h-8 rounded-full ${bgcolor} flex justify-center items-center`}>{icon}</div>
                  <span className="text-lg font-semibold">Edit Announcement</span>
                </div>
                {/* <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button> */}
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

                {images.length > 0 && (
                  <div className="space-y-2">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{file.name}</span>
                          <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center border p-3 rounded-lg">
                  <span className="text-sm text-gray-600">Add images</span>
                  <label className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <input type="file" className="hidden" onChange={handleImageChange} multiple accept="image/*" />
                  </label>
                </div>
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
