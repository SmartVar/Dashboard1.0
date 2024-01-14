import React from 'react'

interface NotingDraftingProps {
  _id: string;
  type: string;
  category: string;
  description: string;
  createdAt: Date;
}

// const templates = [
//   {
//     _id: '1',
//     type: 'History',
//     category: 'Report',
//     description: 'This is in connection to R.O. letter at 294/C, in this regards, the report in respect of Matheran PO and Holiday Home repairing is still not received from Navi Mumbai Division. Therefore, draft reminder letter is put up at 230/C, if agreed, for approval please.\n\nPut up for perusal and further orders please.',
//     createdAt: new Date('2023-09-01T12:00:00.000Z'),
//   },
   
// ];



const NotingDrafting = ({
  _id,
  type,
  category,
  description,
  createdAt
}: NotingDraftingProps) => {
  return (
    <div className="mt-11 flex justify-between gap-5 
    max-sm:flex-col sm:items-center">category</div>
  )
}

export default NotingDrafting