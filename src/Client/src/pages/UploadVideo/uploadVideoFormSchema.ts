import * as Yup from "yup";

type test = {
  name: string;
  file: FileList;
};

export const uploadVideoFormSchema = Yup.object<test>().shape({
  name: Yup.string().required("Username field is required"),
  file: Yup.mixed().required("File is required"),
});
