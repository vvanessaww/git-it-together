import { lesson as lesson01 } from './01-ai-workflow-basics.js';
import { lesson as lesson02 } from './02-branches-for-features.js';
import { lesson as lesson03 } from './03-merge-conflicts.js';
import { lesson as lesson04 } from './04-undoing-mistakes.js';
import { lesson as lesson05 } from './05-stashing-work.js';
import { lesson as lesson06 } from './06-rewriting-history.js';
import { lesson as lesson07 } from './07-reflog-recovery.js';
import { lesson as lesson08 } from './08-bisect-debugging.js';
import { lesson as lesson09 } from './09-cherry-pick-advanced.js';
import type { Lesson } from './types.js';

export const lessons: Lesson[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
];
