export type Tag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
export type TagSortBy = "created" | "updated";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tag: Tag;
}
