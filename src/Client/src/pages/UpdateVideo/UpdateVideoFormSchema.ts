import * as Yup from "yup";

export type UpdateVideoFormValues = {
  name: string;
  description?: string;
};

export const updateVideoFormSchema = Yup.object().shape({
  name: Yup.string().required("Username field is required"),
  description: Yup.string().optional(),
});
