export interface PostEntry {
  slug: string;
  title: string;
  body: string;
  date?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
  layout?: string;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  body: string;
  summary?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
  repo?: string;
  demo?: string;
  order?: number;
}
