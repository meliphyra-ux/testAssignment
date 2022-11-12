import {FC} from 'react'
import { Location } from '../api_functions/fetchData'
interface LocationAndContactsProps{
    location: Location
    name: string;
    address: string;
    phone: string;
    email: string;
}

const LocationAndContacts:FC<LocationAndContactsProps> = ({location,name,address,phone,email}) => {
    const zIndexText = "relative z-20 text-lg my-2";
  return (
    <aside>
        <div className='relative overflow-hidden bg-[#2A3047] px-10 py-8 text-white rounded-lg'>
            <div className='w-2/3 aspect-square bg-[#202336] absolute left-[-20%] bottom-1/2 translate-y-1/2 rounded-full z-10'>.</div>
            <h3 className={`${zIndexText} font-bold`}>{name}</h3>
            <p className={`${zIndexText}`}>{address}</p>
            <p className={`${zIndexText}`}>{phone}, {email}</p>
        </div>
    </aside>
  )
}

export default LocationAndContacts