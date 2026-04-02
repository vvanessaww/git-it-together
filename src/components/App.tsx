import React, { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import Welcome from './Welcome.js';
import LevelSelect from './LevelSelect.js';
import LessonPlayer from './LessonPlayer.js';
import { lessons } from '../lessons/index.js';
import type { Difficulty } from '../lessons/types.js';

type Screen = 'welcome' | 'levels' | 'menu' | 'lesson';

const difficultyLabels: Record<Difficulty, string> = {
  beginner: chalk.green('Beginner'),
  intermediate: chalk.yellow('Intermediate'),
  advanced: chalk.red('Advanced'),
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<Difficulty>('beginner');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);

  const filteredLessons = lessons.filter(l => l.difficulty === selectedLevel);

  const menuItems = [
    ...filteredLessons.map((lesson, index) => ({
      label: `${lesson.completed ? figures.tick : figures.circle} ${lesson.title}`,
      value: index,
    })),
    {
      label: `${chalk.dim(figures.arrowLeft + ' Back to levels')}`,
      value: -1,
    },
  ];

  const handleLevelSelect = (level: Difficulty) => {
    setSelectedLevel(level);
    setScreen('menu');
  };

  const handleLessonSelect = (item: { value: number }) => {
    if (item.value === -1) {
      setScreen('levels');
      return;
    }
    setSelectedLesson(item.value);
    setScreen('lesson');
  };

  const handleLessonComplete = () => {
    setScreen('menu');
  };

  if (screen === 'welcome') {
    return <Welcome onContinue={() => setScreen('levels')} />;
  }

  if (screen === 'levels') {
    return (
      <LevelSelect
        onSelect={handleLevelSelect}
        onBack={() => setScreen('welcome')}
      />
    );
  }

  if (screen === 'lesson') {
    return (
      <LessonPlayer
        lesson={filteredLessons[selectedLesson]}
        onComplete={handleLessonComplete}
      />
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          {figures.pointer} {difficultyLabels[selectedLevel]} Lessons
        </Text>
      </Box>
      <SelectInput items={menuItems} onSelect={handleLessonSelect} />
      <Box marginTop={1}>
        <Text dimColor>
          Use {chalk.cyan('arrow keys')} to navigate {figures.pointerSmall} {chalk.cyan('Enter')} to select
        </Text>
      </Box>
    </Box>
  );
}
