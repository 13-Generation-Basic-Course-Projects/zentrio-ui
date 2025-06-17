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
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <Card className="w-[90%] max-w-5xl bg-white rounded-[30px] shadow-lg border-none">
              <CardContent className="p-0 flex flex-col md:flex-row">
                {/* Left Side - Customizable */}
                <div className="w-full md:w-1/2 border-gray-200">
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <div className="bg-primary w-full h-full rounded-[30px] rounded-tr-[80px] rounded-br-[80px] flex items-center justify-center">
                      <div className="text-white text-center space-y-2">
                        <h1 className="text-h2 font-semibold">Welcome!</h1>
                        <h1 className="text-h2 font-semibold">Zentrio Announcement</h1>
                      </div>
                    </div>
                  </div>
                </div>
      
                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-5 m-4">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-h4 font-semibold text-title">
                        Create Announcement
                      </h2>
                      <button
                        onClick={onClose}
                        className="text-title hover:text-primary p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
      
                    <div className="flex items-center space-x-4">
                      {boardMember
                        .filter((member) => member.roles?.includes("ROLE_MANAGER"))
                        .map((member) => (
                          <div
                            key={member.userId}
                            className="flex items-center space-x-3"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                              <img
                                src={member.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover drop-shadow-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-body-lg font-semibold text-title">
                                {member.username || member.name}
                              </div>
                              <div className="text-caption font-thin text-description">
                                {member.roles?.[0] || "No role"}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
      
                  {/* Form Content */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <div className="p-4 space-y-3">
                      <input
                        className="w-full border-none text-title outline-none text-lg font-semibold placeholder-gray-500 mb-2"
                        placeholder="Announcement title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <textarea
                        className="w-full resize-none border-none outline-none text-description placeholder-description min-h-auto"
                        placeholder="What would you like to announce?"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
      
                      {images.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {images.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-large"
                            >
                              <div className="flex items-center gap-2 min-w-0 max-w-full px-1">
                                <Image className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span className="truncate text-sm text-description min-w-0">
                                  {file.name}
                                </span>
                                <span className="text-xs text-description flex-shrink-0">
                                  ({(file.size / 1024).toFixed(1)} KB)
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="text-title hover:text-primary transition-colors text-lg"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
      
                      <div className="mt-4 flex items-center justify-between p-2 border border-gray-200 rounded-large">
                        <span className="text-xs font-medium text-description">
                          Add to your announcement
                        </span>
                        <div className="flex items-center space-x-2">
                          <label className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                            <Image className="w-5 h-5 text-primary" />
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}
                              multiple
                              accept="image/*"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
      
                    {/* Footer */}
                    <div className="p-4 border-t border-bgColor">
                      <div className="flex space-x-3">
                        <Button
                          type="button"
                          className="flex-1 bg-transparent hover:bg-gray-100 text-primary border border-gray-300"
                          radius="lg"
                          onPress={onClose}
                          isDisabled={loading}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className={`flex-1 font-semibold transition-all ${
                            title.trim() && description.trim()
                              ? "bg-primary hover:bg-primary text-white transform hover:scale-[1.02]"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                          radius="lg"
                          isDisabled={!title.trim() || !description.trim() || loading}
                          isLoading={loading}
                        >
                          {loading ? "Creating..." : "Create Announcement"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
      
            {/* Optional dropdown overlay */}
            {showPrivacyDropdown && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowPrivacyDropdown(false)}
              />
            )}
          </div>
    </>
  )
}
