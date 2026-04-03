export type Difficulty = 'getting-started' | 'beginner' | 'intermediate' | 'advanced' | 'bonus';

export interface ContentItem {
  title: string;
  explanation: string;
  command?: string;
}

export interface ContentStep {
  type: 'content';
  title: string;
  items: ContentItem[];
}

export interface CommandExerciseStep {
  type: 'command-exercise';
  prompt: string;
  acceptedAnswers: string[];
  hints: string[];
  explanation: string;
}

export interface MultipleChoiceStep {
  type: 'multiple-choice';
  situation: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ScenarioStep {
  type: 'scenario';
  title: string;
  situation: string;
  steps: {
    prompt: string;
    acceptedAnswers: string[];
    hint: string;
  }[];
  completionMessage: string;
}

export type LessonStep =
  | ContentStep
  | CommandExerciseStep
  | MultipleChoiceStep
  | ScenarioStep;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  steps: LessonStep[];
  completed: boolean;
}
