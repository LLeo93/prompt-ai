export interface Prompt {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags?: string[];
  history?: {
    title: string;
    content: string;
    tags?: string[];
    updatedAt: string;
  }[];
}
