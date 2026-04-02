import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import type { Difficulty } from '../lessons/types.js';
import type { Mood } from './PlantBuddy.js';
import BitBuddy from './PlantBuddy.js';

interface ProgressBarProps {
  current: number;
  total: number;
  lessonTitle: string;
  difficulty: Difficulty;
  overallProgress: number;
  bitMood?: Mood;
  bitMessage?: string;
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: '#22c55e',
  intermediate: '#eab308',
  advanced: '#ef4444',
};

const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export default function ProgressBar({ current, total, lessonTitle, difficulty, overallProgress, bitMood = 'idle', bitMessage = '' }: ProgressBarProps) {
  const progress = total > 0 ? current / total : 0;
  const percent = Math.round(progress * 100);
  const barWidth = 20;
  const filled = Math.round(progress * barWidth);
  const empty = barWidth - filled;
  const color = difficultyColors[difficulty];

  const filledBar = chalk.hex(color)('\u2588'.repeat(filled));
  const emptyBar = chalk.gray('\u2591'.repeat(empty));

  return (
    <Box paddingX={1} paddingY={0}>
      <Box flexDirection="column" flexGrow={1}>
        <Box>
          <Text bold>{lessonTitle}</Text>
          <Text dimColor>  {chalk.hex(color)(difficultyLabels[difficulty])}</Text>
        </Box>
        <Box>
          <Text>
            {filledBar}{emptyBar} <Text bold color={percent === 100 ? 'green' : undefined}>{percent}%</Text>
          </Text>
        </Box>
      </Box>
      <Box marginLeft={2}>
        <BitBuddy progress={overallProgress} mood={bitMood} message={bitMessage} />
      </Box>
    </Box>
  );
}
