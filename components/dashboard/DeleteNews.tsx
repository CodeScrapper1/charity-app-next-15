import { deleteNews } from "@/actions/news";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";

const DeleteNews = ({
  trigger,
  title,
  id,
}: {
  trigger: any;
  title: string;
  id: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = async () => {
    const response = await deleteNews(id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.error);
    }
  };
  return (
    <>
      {" "}
      <Button onPress={onOpen} className="px-0 !min-w-0 bg-transparent h-9">
        {trigger}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="px-5 py-2 max-w-3xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <p className="ml-6">Do you want to delete this news?</p>
          <div className="flex justify-end mb-2">
            <Button
              color="danger"
              type="submit"
              onPress={handleDelete}
              className="w-20"
            >
              Submit
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteNews;
