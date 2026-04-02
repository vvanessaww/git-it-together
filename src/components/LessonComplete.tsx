import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import BitBuddy from './PlantBuddy.js';

interface LessonCompleteProps {
  lessonTitle: string;
  overallProgress: number;
  onContinue: () => void;
}

const CHEERS = [
  'You crushed it!',
  'Nailed it!',
  'That was awesome!',
  'Git wizard in the making!',
  'You make it look easy!',
  'Onward and upward!',
  'Bit is so proud of you!',
  'Leveling up!',
];

export default function LessonComplete({ lessonTitle, overallProgress, onContinue }: LessonCompleteProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [cheer] = useState(() => CHEERS[Math.floor(Math.random() * CHEERS.length)]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useInput((_input, key) => {
    if (showPrompt && key.return) {
      onContinue();
    }
  });

  return (
    <Box flexDirection="column" padding={2} alignItems="center">
      <Box marginBottom={1}>
        <Text bold color="green">
          {chalk.green('~*~')} Lesson Complete! {chalk.green('~*~')}
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>{lessonTitle}</Text>
      </Box>

      <BitBuddy progress={overallProgress} mood="celebrate" message={cheer} />

      {showPrompt && (
        <Box marginTop={1}>
          <Text dimColor>Press {chalk.cyan('Enter')} to go back to lessons...</Text>
        </Box>
      )}
    </Box>
  );
}
