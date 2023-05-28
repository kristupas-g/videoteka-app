export type Video = {
  id: string;
  name: string;
  thumbnail?: string;
};

export type VideoUpload = {
  name: string;
  description: string;
  file: FileList;
};
