import React, { useContext } from 'react'
import { UserlistContext } from '../page/dashboard/Dashboard'

export default function User_lists() {
  const data = useContext(UserlistContext);
    
  return (
    <>
        {
            data.length > 0 && data.map((data) => {
            return (
                <tr key={data._id}>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.firstname}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.lastname}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.username}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.phone}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.email}</td>
                <td class="px-2 lg:py-3 py-2 text-sm text-start font-medium">{data.address}</td>
                </tr>
            )
            })
        }
    </>
  )
}
