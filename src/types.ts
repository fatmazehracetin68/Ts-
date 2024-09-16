export type Tag = {
  label: string;
  value: string;
};

export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

export type Note = {
  id: string;
} & NoteData;
