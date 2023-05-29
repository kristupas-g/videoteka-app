export type Video = {
  id: string;
  uploaderId: string;
  name: string;
  description: string;
  views: number;
  thumbnail?: string;
};

export type VideoUpload = {
  name: string;
  description: string;
  file: FileList;
};
