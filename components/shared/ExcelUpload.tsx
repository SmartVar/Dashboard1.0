'use-client'

import React, { useState } from 'react';
// @ts-ignore
import {ExcelRenderer, OutTable} from 'react-excel-renderer';

const ExcelUpload: React.FC = () => {
  const [cols, setCols] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0];

    if (!fileObj) return;

    ExcelRenderer(fileObj, (err: any, resp: { cols: any[]; rows: any[]; }) => {
      if (err) {
        console.log(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={fileHandler} />
      <OutTable data={rows} columns={cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
    </div>
  );
};

export default ExcelUpload;
