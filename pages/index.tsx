import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import MaterialReactTable, {
  MRT_ColumnDef,
  MaterialReactTableProps,
} from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Image from "next/image";
import CreateNewAccountDialog from "../components/CreateNewAccountDialog";
import { IEmployee } from "../models/employee";

const Home = () => {
  const [newAccountModalOpen, setNewAccountModalOpen] = useState(false);
  const [tableData, setTableData] = useState<IEmployee[] | undefined>([]);
  const { data, error, isLoading } = useSWR("/employees", async () => {
    const response = await fetch("/api/employees");
    return (await response.json()) as IEmployee[];
  });
  const [singleEmployee, setSingleEmployee] = useState<IEmployee | null>();

  useEffect(() => {
    if (data) setTableData([...data]);
  }, [data]);

  const columns = useMemo<MRT_ColumnDef<IEmployee>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        header: "Id",
        muiTableBodyCellEditTextFieldProps: {
          variant: "outlined",
          inputProps: {
            readOnly: true,
          },
        },
      },
      {
        accessorFn: (row) => row.firstName,
        header: "First name",
      },
      {
        accessorFn: (row) => row.lastName,
        header: "Last name",
      },
      {
        accessorFn: (row) => row.email,
        header: "Email",
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          variant: "outlined",
        },
      },
      {
        accessorFn: (row) => row.gender,
        header: "Gender",
        editSelectOptions: [
          { text: "Male", value: "Male" },
          { text: "Female", value: "Female" },
        ],
        editVariant: "select",
      },
      {
        accessorFn: (row) => row.imageUrl,
        header: "Image",
        Cell: ({ cell }) => (
          <Image
            src={cell.getValue<string>().toString()}
            width="30"
            height="30"
            alt={""}
          />
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <Typography variant="h3" component="h1" mb={2}>
        Material React Table Demo
      </Typography>

      <MaterialReactTable
        columns={columns}
        data={tableData ?? []}
        enableColumnActions={false}
        enableEditing
        enableRowActions
        enableStickyHeader
        initialState={{
          columnVisibility: { Id: false },
        }}
        muiTableContainerProps={{ sx: { maxHeight: "500px" } }}
        renderRowActions={({ cell, row, table }) => (
          <Box display="flex" gap={1}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  // table.setEditingRow(row);
                  // console.log(cell);
                  // console.log(row);
                  // console.log(row._valuesCache);
                  // setSingleEmployee((prevValue) => prevrow._valuesCache);

                  setNewAccountModalOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton onClick={() => console.log("Deleted")}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            variant="contained"
            onClick={() => setNewAccountModalOpen(true)}
          >
            Create New Employee
          </Button>
        )}
        state={{
          isLoading,
        }}
      />
      <CreateNewAccountDialog
        data={singleEmployee}
        onClose={() => setNewAccountModalOpen(false)}
        open={newAccountModalOpen}
      />
    </Box>
  );
};

export default Home;
