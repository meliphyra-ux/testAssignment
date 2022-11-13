import {FC} from 'react'
interface AdditionInfoBlocksProps{
    title: string;
    array: string[];
    bgColor: string;
    textColor: string;
    borderColor: string;
}

const AdditionInfoBlocks: FC<AdditionInfoBlocksProps> = ({title,  array, bgColor, textColor, borderColor}) => {
  return (
    <>
        <h6 className='pt-[15px] pb-[10px]'>{title}</h6>
        <ul className='flex max-w-full xl:flex-wrap overflow-scroll xl:overflow-visible'>
            {array ? array.map(item => (
                <li key={item} 
                className="border-[1px] py-4 min-w-[222px] text-center rounded-lg mr-2 flex-none"
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    borderColor: borderColor
                }}>{item}</li>
            )) : <></>}
        </ul>
    </>
  )
}

export default AdditionInfoBlocks