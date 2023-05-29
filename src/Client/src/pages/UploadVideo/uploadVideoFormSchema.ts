import * as Yup from "yup";

type test = {
  name: string;
  file: FileList;
};

export const uploadVideoFormSchema = Yup.object<test>().shape({
  name: Yup.string().required("Username field is required"),
  description: Yup.string().optional(),
  file: Yup.mixed().required("File is required"),
});
