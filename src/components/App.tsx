import React, { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import Welcome from './Welcome.js';
import LessonPlayer from './LessonPlayer.js';
import { lessons } from '../lessons/index.js';

type Screen = 'welcome' | 'menu' | 'lesson';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);

  const menuItems = lessons.map((lesson, index) => ({
    label: `${lesson.completed ? figures.tick : figures.circle} ${lesson.title}`,
    value: index,
  }));

  const handleLessonSelect = (item: { value: number }) => {
    setSelectedLesson(item.value);
    setScreen('lesson');
  };

  const handleLessonComplete = () => {
    setScreen('menu');
  };

  if (screen === 'welcome') {
    return <Welcome onContinue={() => setScreen('menu')} />;
  }

  if (screen === 'lesson') {
    return (
      <LessonPlayer
        lesson={lessons[selectedLesson]}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          {figures.pointer} Choose a lesson:
        </Text>
      </Box>
      <SelectInput items={menuItems} onSelect={handleLessonSelect} />
      <Box marginTop={1}>
        <Text dimColor>
          Use {chalk.cyan('↑↓')} to navigate • {chalk.cyan('Enter')} to select • {chalk.cyan('Ctrl+C')} to exit
        </Text>
      </Box>
    </Box>
  );
}
