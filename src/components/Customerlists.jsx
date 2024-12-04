import React, { useContext } from 'react'
import { CustomerlistContext } from '../page/dashboard/Customer_page';

export default function Customerlists() {
      const data = useContext(CustomerlistContext);
    
      return (
        <>
            {
                data.length > 0 && data.map((data) => {
                return (
                    <tr key={data._id}>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.firstname}</td>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.lastname}</td>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.username}</td>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.phone}</td>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.email}</td>
                    <td class="px-2 lg:py-3 py-2 text-sm text-start text-black font-medium">{data.address}</td>
                    </tr>
                )
                })
            }
        </>
  )
}
