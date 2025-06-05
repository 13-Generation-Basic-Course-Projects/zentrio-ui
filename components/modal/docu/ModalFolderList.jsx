import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IconFolder } from "../../icon/everyicon";
import { CardFile } from "../../card/CardDoc";
import { documentData } from "@/data/docu/documentData";
export default function ModalFolderList({ title, href }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const data = documentData;
  return (
    <>
      <Button
        disableRipple
        onPress={onOpen}
        className="max-h-none h-fit bg-transperent"
      >
        <div className="overflow-visible py-10  flex flex-col items-center space-y-2 ">
          <IconFolder />

          <p className="truncate text-base font-extrabold text-title/80 text-center px-2">
            {title}
          </p>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={"4xl"}
        scrollBehavior="inside" // or "outside" or remove it entirely
        classNames={{
          base: "overflow-hidden", // Prevent modal scroll
          backdrop: "overflow-hidden", // Prevent background scroll (just in case)
          wrapper: "overflow-hidden", // Wrapper scroll block
          body: "overflow-hidden", // Stop body content scroll
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-hidden pb-[250px] p-2">
                  {data
                    .filter((el) => el.status === "public")
                    .map((el, i) => {
                      if (el.category === "Folder" || el.type === "folder") {
                        return "";
                      } else {
                        return (
                          <CardFile
                            key={i}
                            title={el.title}
                            status={el.status}
                            date={el.date}
                            type={el.type}
                          />
                        );
                      }
                    })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
