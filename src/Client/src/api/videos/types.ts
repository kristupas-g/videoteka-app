export type Video = {
  id: string;
  name: string;
  description: string;
  views: number;
  thumbnail?: string;
  uploaderId: string;
  username: string;
  created: Date;
};

export type VideoUpload = {
  name: string;
  description: string;
  file: FileList;
};
