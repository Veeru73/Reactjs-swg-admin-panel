// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';

// export const CheckBoxButton = ({ onClick, BtnLabel, BtnSize, BtnVariant, BtnClass, type, value ,fulldata}) => {
//   const [isChecked, setIsChecked] = useState(false);

//   const handleClick = (e) => {
//     setIsChecked(!isChecked);
//     onClick({ "data":e, "isChecked": !isChecked });
//   };

//   return (
//     <>
//       <Button
//         onClick={() => handleClick(fulldata)}
//         className={`${BtnClass} ${isChecked ? 'checked mb-2' : 'mb-2'}`}
//         type={type}
//         variant={BtnVariant}
//         size={BtnSize}
//         style={{
//           backgroundColor: isChecked ? '#0d6efd' : '',
//           color: isChecked ? '#fff' : '',

//         }}
//       >
//         {BtnLabel}
//       </Button>
//     </>
//   )
// }


import React from 'react';
import { Button } from 'react-bootstrap';

export const CheckBoxButton = ({ onClick, BtnLabel, BtnSize, BtnVariant, BtnClass, type, fulldata, isChecked, disabled }) => {

  const disable = disabled ? true : false;
  const handleClick = () => {
    onClick({ "data": fulldata, "isChecked": !isChecked });
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`${BtnClass} ${isChecked ? 'checked mb-2' : 'mb-2'}`}
        type={type}
        variant={BtnVariant}
        size={BtnSize}
        style={{
          backgroundColor: isChecked ? '#0d6efd' : '',
          color: isChecked ? '#fff' : '',
        }}
        disabled={disable}
      >
        {BtnLabel}
      </Button>
    </>
  )
}

