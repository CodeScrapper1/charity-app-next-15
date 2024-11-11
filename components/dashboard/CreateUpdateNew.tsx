import React, { ChangeEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { uploadFile } from "@/actions/uploadfile";
import { createNews } from "@/actions/news";

const CreateUpdateNew = ({ trigger, title, item }: any) => {
  const [image, setImage] = useState<string>(item?.image || "");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // submit news
  const handleNews = async (formData: FormData) => {
    const res = await createNews(formData, image, item?.id);
    if (res?.success) {
      toast.success(res.message);
      onClose();
    } else toast.error(res.error);
  };

  // upload image
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const upload = await uploadFile(file);
      if (upload.secure_url) {
        setImage(upload.secure_url);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("File upload failed");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("File upload failed");
    }
  };
  return (
    <>
      <Button onPress={onOpen} className="px-0 !min-w-0 bg-transparent h-9">
        {trigger}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <form action={handleNews}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="Title"
                    placeholder="Enter the title"
                    name="title"
                    defaultValue={item?.description}
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter a description"
                    minRows={4}
                    variant="bordered"
                    name="description"
                    defaultValue={item?.description}
                  />

                  {!image ? (
                    <div className="flex justify-center items-center border-amber-900 border-[1px] h-20 w-20 text-amber-900 cursor-pointer">
                      <label htmlFor="picture" className="cursor-pointer">
                        <Upload />
                        <input
                          id="picture"
                          className="hidden"
                          type="file"
                          onChange={handleUpload}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="relative flex items-center h-20 w-20">
                      <img
                        src={image}
                        className="h-full w-full rounded-lg bg-cover"
                        alt=""
                      />
                      <X
                        onClick={() => setImage("")}
                        size={17}
                        className="absolute -right-2 -top-2 bg-amber-900 text-white rounded-full p-1"
                      />
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUpdateNew;
