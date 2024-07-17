import React from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  Spinner,
} from "flowbite-react";
import { useState,useEffect } from "react";
import { FaEdit as EditIcon } from "react-icons/fa";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
const EditInventoryModel = ({inventories,id}) => {
  const [openModal, setOpenModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const inventory = inventories.find((inv) => inv.id === id);
    if (inventory) {
    //   setInventoryName(inventory.name);
    //   setInventoryDescription(inventory.description);
    }
  }, [id, inventories]);

  const { headers } = useAuth();
//   const handelUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await instance.post(
//         "update/category",
//         { id, categoryName, categoryDescription },
//         { headers }
//       );
//       if (res.data.update == true) {
//         setOpenModal(false);
//         getCategory();
//         console.log(res.data.message);
//       }
//       console.log(res.data.message);
//     } catch (error) {
//       console.error("Error update category:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <>
      <span onClick={() => setOpenModal(true)}>
        <EditIcon className="text-2xl text-blue-500" />
      </span>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Inevtory Stock</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form >
              <div className="lg:px-20">
                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="category_name_edit" value="Category Name" />
                  </div>
                  <TextInput
                    id="category_name_edit"
                    type="text"
                    placeholder="Enter your category name ....."
                    // value={categoryName}
                    // onChange={(e) => setCategoryName(e.target.value)}
                  />
                </div>

                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="category_description" value="Description" />
                  </div>
                  <Textarea
                    id="category_description"
                    placeholder="Description..."
                    rows={4}
                    // value={categoryDescription}
                    // onChange={(e) => setCategoryDescription(e.target.value)}
                  />
                </div>
                {loading == true ? (
                  <>
                    <Button type="submit" color="blue" className="w-full ">
                      <Spinner
                        color="info"
                        className="me-2"
                        aria-label="Info spinner example"
                      />
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit" color="blue" className="w-full">
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditInventoryModel;
