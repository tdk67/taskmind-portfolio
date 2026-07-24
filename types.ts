export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  githubUrl?: string | null;
  deployedUrl?: string | null;
  linkedinUrl?: string | null;
  tags: string[];
}