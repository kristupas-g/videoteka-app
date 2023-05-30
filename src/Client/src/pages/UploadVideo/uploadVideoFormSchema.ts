import * as Yup from "yup";

export type UploadVideoFormValues = {
  name: string;
  description?: string;
  file: FileList;
};

export const uploadVideoFormSchema = Yup.object().shape({
  name: Yup.string().required("Username field is required"),
  description: Yup.string().optional(),
  file: Yup.mixed().required("File is required"),
});
