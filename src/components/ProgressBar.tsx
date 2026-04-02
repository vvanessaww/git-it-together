import React from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import type { Difficulty } from '../lessons/types.js';

interface ProgressBarProps {
  current: number;
  total: number;
  lessonTitle: string;
  difficulty: Difficulty;
}

const difficultyColors: Record<Difficulty, string> = {
  beginner: 'green',
  intermediate: 'yellow',
  advanced: 'red',
};

export default function ProgressBar({ current, total, lessonTitle, difficulty }: ProgressBarProps) {
  const filled = current;
  const empty = total - current;
  const color = difficultyColors[difficulty];

  const bar = chalk.hex(color === 'green' ? '#22c55e' : color === 'yellow' ? '#eab308' : '#ef4444')(
    figures.squareSmallFilled.repeat(filled)
  ) + chalk.gray(figures.squareSmall.repeat(empty));

  return (
    <Box paddingX={1} paddingY={0} justifyContent="space-between">
      <Text dimColor>
        {lessonTitle}
      </Text>
      <Text>
        {' '}{bar} <Text dimColor>{current}/{total}</Text>
      </Text>
    </Box>
  );
}
