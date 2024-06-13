import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Row {
  name: string;
  value: any;
}
interface Props {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  motorType: string;
  type: string;
  power: number;
  placeNumber: number;
  status: string;
  images: string;
}

function createData(name: string, value: string): Row {
  return { name, value };
}

const TableSpec: React.FC<any> = ({ data }: any) => {
  const rows: Row[] = [
    createData("Description", data.description),
    createData("Brand", data.brand),
    createData("Model", data.model),
    createData("Color", data.color),
    createData("Type", data.type),
    createData("Moto type", data.motorType),
    createData("Power", data.power + " cv"),
    createData("Number place", data.placeNumber + " personnes"),
    createData("Gingerbread", data.name),
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: "bold" }}>
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSpec;
