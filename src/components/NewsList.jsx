import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { newsListContext } from '../page/dashboard/NewsPage';

export default function NewsList() {
    const data = useContext(newsListContext);
    
    const navigate = useNavigate();
    // Delete an item
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://fake-api-one-rust.vercel.app/api/news/delete_news/${id}`, {
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
            <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">
                <div className="w-[50px] px-2 pb-2">
                    <img src={data.source} alt="" className='max-w-[50px] h-[50px]'/>
                </div>
            </td>
            <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.title}</td>
            <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.date}</td>
            <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">
                <Link to={`/update_news/${data._id}`}>
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
