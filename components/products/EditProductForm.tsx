"use client";

import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

type EditProductFormProps = {
  children: React.ReactNode;
};

const EditProductForm = ({ children }: EditProductFormProps) => {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await updateProduct(result.data, id);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    toast.success("Producto actualizado correctamente.");
    router.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Guardar Cambios"
        />
      </form>
    </div>
  );
};

export default EditProductForm;
