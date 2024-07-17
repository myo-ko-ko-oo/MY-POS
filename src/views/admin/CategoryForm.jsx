import React, { useState } from "react";
import { Button, Label, TextInput, Textarea, Spinner } from "flowbite-react";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useNavigate } from "react-router";
const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { headers } = useAuth();

  //create category
  const handelCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post(
        "/create/category",
        { categoryName, categoryDescription },
        { headers }
      );

      if (res.data.create == true) {
        setMessage(res.data.message);
        setCategoryName("");
        setCategoryDescription("");
        navigate(`/admin/category?message=${res.data.message}`);
      } else {
        setError(res.data);
      }
    } catch (e) {
      if (e.response.status === 422) {
        setError(e.response.data.errors);
        console.log(e.response);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handelCreateCategory}>
        <div className="text-center mb-3">
          <h1>Create New Category</h1>
        </div>
        <div className="lg:px-20">
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="category_name" value="Category Name" />
            </div>
            <TextInput
              id="category_name"
              type="text"
              placeholder="Enter your category name ....."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <span className="text-red-600 font-semibold">
                  {error.categoryName}
                </span>
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="mb-2 block">
              <Label htmlFor="category_description" value="Description" />
            </div>
            <Textarea
              id="category_description"
              placeholder="Description..."
              rows={4}
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
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
    </>
  );
};

export default CategoryForm;
