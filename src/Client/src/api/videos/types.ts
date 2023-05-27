export type Video = {
  id: string;
  name: string;
  thumbnail?: string;
};

export type VideoUpload = {
  name: string;
  file: FileList;
};
