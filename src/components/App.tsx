import React, { useState } from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import Welcome from './Welcome.js';
import LevelSelect from './LevelSelect.js';
import LessonPlayer from './LessonPlayer.js';
import BitBuddy from './PlantBuddy.js';
import { lessons as allLessons } from '../lessons/index.js';
import type { Difficulty, Lesson } from '../lessons/types.js';

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
  const [lessons, setLessons] = useState<Lesson[]>(allLessons);

  const completedCount = lessons.filter(l => l.completed).length;
  const overallProgress = lessons.length > 0 ? completedCount / lessons.length : 0;

  const filteredLessons = lessons.filter(l => l.difficulty === selectedLevel);
  const levelCompleted = filteredLessons.filter(l => l.completed).length;

  const menuItems = [
    ...filteredLessons.map((lesson, index) => ({
      label: `${lesson.completed ? chalk.green(figures.tick) : chalk.dim(figures.circle)} ${lesson.title}`,
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
    const lessonId = filteredLessons[selectedLesson].id;
    setLessons(prev => prev.map(l =>
      l.id === lessonId ? { ...l, completed: true } : l
    ));
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
        completedByLevel={{
          beginner: lessons.filter(l => l.difficulty === 'beginner' && l.completed).length,
          intermediate: lessons.filter(l => l.difficulty === 'intermediate' && l.completed).length,
          advanced: lessons.filter(l => l.difficulty === 'advanced' && l.completed).length,
        }}
        totalByLevel={{
          beginner: lessons.filter(l => l.difficulty === 'beginner').length,
          intermediate: lessons.filter(l => l.difficulty === 'intermediate').length,
          advanced: lessons.filter(l => l.difficulty === 'advanced').length,
        }}
        overallProgress={overallProgress}
      />
    );
  }

  if (screen === 'lesson') {
    return (
      <LessonPlayer
        lesson={filteredLessons[selectedLesson]}
        onComplete={handleLessonComplete}
        onBack={() => setScreen('menu')}
        overallProgress={overallProgress}
      />
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box justifyContent="space-between" marginBottom={1}>
        <Box flexDirection="column">
          <Text bold color="cyan">
            {figures.pointer} {difficultyLabels[selectedLevel]} Lessons
          </Text>
          <Text dimColor>
            {levelCompleted}/{filteredLessons.length} completed
          </Text>
        </Box>
        <BitBuddy progress={overallProgress} mood="idle" />
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
