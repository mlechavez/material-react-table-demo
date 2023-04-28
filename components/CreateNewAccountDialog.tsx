import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  id: z.string(),
  firstName: z.string().nonempty("The First name is required"),
  lastName: z.string().nonempty("The Last name is required"),
  email: z.string().email(),
  gender: z.enum(["Male", "Female"]),
  imageUrl: z.string(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onClose: () => void;
  open: boolean;
  data?: any;
}
const CreateNewAccountDialog = ({ data, onClose, open }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: !data
      ? undefined
      : {
          id: data.id,
          firstName: data["First name"],
          lastName: data.lastName,
          email: data.email,
          gender: data.gender,
        },
  });

  const onSubmit = (data: FieldValues) => {
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Create New Account</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack sx={{ width: "100%", gap: "1.5rem" }}>
            <input {...register("id")} type="hidden" />
            <TextField
              {...register("firstName")}
              label="First name"
              error={!!errors.firstName}
              helperText={errors?.firstName ? errors.firstName.message : ""}
            />
            <TextField
              {...register("lastName")}
              label="Last name"
              error={!!errors.lastName}
              helperText={errors?.lastName ? errors.lastName.message : ""}
            />
            <TextField
              {...register("email")}
              label="Email"
              error={!!errors.email}
              helperText={errors?.email ? errors.email.message : ""}
            />
            <TextField
              {...register("gender")}
              label="Gender"
              error={!!errors.gender}
              helperText={errors?.gender ? errors.gender.message : ""}
              select
              value="male"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>

            <TextField
              {...register("imageUrl")}
              label="Image"
              error={!!errors.imageUrl}
              helperText={errors?.imageUrl ? errors.imageUrl.message : ""}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create New Account
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateNewAccountDialog;
