export interface Project {
  id: string;
  title: string;
  date: string;
  description: string;
  fullDescription: string;
  githubUrl?: string | null;
  deployedUrl?: string | null;
  linkedinUrl?: string | null;
  videoUrl?: string | null;
  videoLabel?: string | null;
  reportUrl?: string | null;
  devpostUrl?: string | null;
  reportLabel?: string | null;
  tags: string[];
}