export type Video = {
  id: string;
  name: string;
  description: string;
  views: number;
  uploaderId: string;
  username: string;
  created: Date;
  thumbnailUrl: string;
  videoUrl: string;
};

export type VideoUpload = {
  name: string;
  description: string;
  file: FileList;
};
