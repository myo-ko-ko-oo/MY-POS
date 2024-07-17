// // 
// import { Button, TextInput } from "flowbite-react";
// import React from "react";
// import { useState } from "react";

// const CountQty = ({item }) => {
//  const[count,setCount]=useState(1)
// console.log(item,"cart add");
//   return (
//     <div className="flex gap-2 items-center">
//       <div className="minus">
//         <Button
//           onClick={(e) =>setCount(-1) }
//           disabled={count === 0}
//           size="xs"
//         >
//           <i className="fa-solid fa-minus"></i>
//         </Button>
//       </div>
//       <div className="input">
//         <TextInput
//           type="text"
//           value={count}
//           // onChange={(e)=>setCount(e.target.value)}
//           className="w-10"
//         />
//       </div>
//       <div className="plus">
//         <Button onClick={(e) =>setCount(+1)} size="xs">
//           <i className="fa-solid fa-plus"></i>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default CountQty;

import { Button, TextInput } from "flowbite-react";
import React from "react";

const CountQty = ({ item, updateQuantity }) => {
  const handleInputChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    if (!isNaN(newCount)) {
      updateQuantity(item.id, newCount);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="minus">
        <Button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity === 0}
          size="xs"
        >
          <i className="fa-solid fa-minus"></i>
        </Button>
      </div>
      <div className="input">
        <TextInput
          type="text"
          value={item.quantity}
          onChange={handleInputChange}
          className="w-10"
        />
      </div>
      <div className="plus">
        <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} size="xs">
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
    </div>
  );
};

export default CountQty;


