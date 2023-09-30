import { Column, type ColumnType } from "../Column";
import { Box } from "@mui/material";

type ColumnsProps = {
  columns: ColumnType[];
  setColumns: (columns: ColumnType[]) => void;
};

export const Columns = ({ columns, setColumns }: ColumnsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "50px",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {columns.map((column, index) => (
        <Column
          key={column.id}
          currentColumnIndex={index}
          columns={columns}
          currentColumn={column}
          setColumns={setColumns}
        />
      ))}
    </Box>
  );
};
