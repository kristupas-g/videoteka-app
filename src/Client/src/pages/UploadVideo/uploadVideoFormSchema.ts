import * as Yup from "yup";

export type UploadVideoFormValues = {
  name: string;
  description?: string;
  file: FileList;
};

export const uploadVideoFormSchema = Yup.object().shape({
  name: Yup.string().required("Username field is required"),
  description: Yup.string().optional(),
  file: Yup.mixed<FileList>()
    .required("File is required")
    .test("fileRequired", "File is required", (value) => value.length === 1)
    .test(
      "fileSize",
      "File size must be less than or equal to 30MB",
      (value) => {
        if (!value || value.length === 0) {
          return true;
        }

        return value[0].size / 1024 / 1024 <= 30;
      }
    )
    .test("fileFormat", "File must be in MP4 format", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return value[0].type === "video/mp4";
    }),
});
