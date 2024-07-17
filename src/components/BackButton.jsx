import React from 'react'
import { BiArrowBack as BackIcon } from "react-icons/bi";
const BackButton = () => {
  return (
    <>
     <div className=" mx-auto px-3 pt-3">
        <span   className=" text-lg   text-gray-600 cursor-pointer dark:text-white">
          <BackIcon className="text-2xl"/>
        </span>
      </div>
    </>
  )
}

export default BackButton