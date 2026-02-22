export interface ContentItem {
  title: string;
  explanation: string;
  command?: string;
}

export interface KnowledgeCheckScenario {
  situation: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contentTitle?: string;
  content: ContentItem[];
  knowledgeCheck: KnowledgeCheckScenario;
  completed: boolean;
}
