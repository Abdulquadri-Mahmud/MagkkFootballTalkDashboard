import React, { useContext } from 'react'
import { ProductContext } from '../page/dashboard/Products_page';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Product_list() {
    const data = useContext(ProductContext);

    const navigate = useNavigate();
    // Delete an item
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://fake-api-one-rust.vercel.app/api/gadget/delete_products/${id}`, {
                method: "DELETE",
            });
            
            navigate(0);

        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
      <>
          <tr key={data._id}>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium flex"></td>
                    <div className="w-[50px] px-2 pb-2">
                        <img src={data.image.length > 0 && data.image[0]} alt="" className='max-w-[50px] h-[50px]'/>
                    </div>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.name}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.price}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.date}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.description}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">
                    <Link to={`/update_product/${data._id}`}>
                        <FaRegEdit className='text-green-600 cursor-pointer text-xl'/>
                    </Link>
                </td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">
                    <MdDelete onClick={() => handleDelete(data._id)} className='text-red-600 cursor-pointer text-xl'/>
                </td>
            </tr>
      </>
  )
}
