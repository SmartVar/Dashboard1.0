import Link from 'next/link';
import React from 'react'
import { Badge } from "@/components/ui/badge"

interface Props {
  _id: string;
  name: string;
  // totalQuestions?: number;
  totalDepartmentalbldgs?: number;
  totalRentedbldgs?: number;
  totalPlots?: number;
  showCount?: boolean;
}

const RenderTag = ({ _id, name, totalDepartmentalbldgs, totalRentedbldgs, totalPlots, showCount }: Props) => {
// const RenderTag = ({ _id, name, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">{name}</Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalDepartmentalbldgs || totalRentedbldgs || totalPlots}</p>
      )}
    </Link>
  )
}

export default RenderTag