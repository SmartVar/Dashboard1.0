// /* eslint-disable no-unused-vars */
// // import { Input } from "@chakra-ui/react";
// // @ts-ignore
// "use client"
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";
// // import {getValue, row, Column, table} from "@tanstack/react-table"

// const EditableCell = ({  }) => {
//   const initialValue = getValue();
//   const [value, setValue] = useState(initialValue);

//   // When the input is blurred, we'll call our table meta's updateData function
//   const onBlur = () => {
//     table.options.meta?.updateData(row.index, column.id, value);
//   };

//   // If the initialValue is changed external, sync it up with our state
//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   return (
//     <Input
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//       onBlur={onBlur}
//       className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
//     />
//   );
// };
// export default EditableCell;
