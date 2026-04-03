import React, { useState, useCallback } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import KnowledgeCheck from './KnowledgeCheck.js';
import CommandExercise from './CommandExercise.js';
import ScenarioExercise from './ScenarioExercise.js';
import ProgressBar from './ProgressBar.js';
import LessonComplete from './LessonComplete.js';
import type { Lesson } from '../lessons/types.js';
import type { Mood } from './PlantBuddy.js';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
  overallProgress: number;
}

export default function LessonPlayer({ lesson, onComplete, onBack, overallProgress }: LessonPlayerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [finished, setFinished] = useState(false);
  const [bitMood, setBitMood] = useState<Mood>('idle');
  const [bitMessage, setBitMessage] = useState('');

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];

  // All hooks must be called before any early return
  React.useEffect(() => {
    setShowContinue(false);
    setBitMood('idle');
    setBitMessage('');
    if (currentStep?.type === 'content') {
      const timer = setTimeout(() => setShowContinue(true), 600);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, currentStep?.type]);

  React.useEffect(() => {
    if (!currentStep && !finished) {
      onComplete();
    }
  }, [currentStep, finished, onComplete]);

  useInput((_input, key) => {
    if (finished) return;
    if (key.escape) {
      onBack();
      return;
    }
    if (currentStep?.type !== 'content') return;
    if (!showContinue || !key.return) return;
    advance();
  });

  const advance = () => {
    if (stepIndex + 1 >= totalSteps) {
      setFinished(true);
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  const handleMoodChange = useCallback((mood: Mood, message: string) => {
    setBitMood(mood);
    setBitMessage(message);
  }, []);

  // Early returns AFTER all hooks
  if (finished) {
    return (
      <LessonComplete
        lessonTitle={lesson.title}
        overallProgress={overallProgress}
        onContinue={onComplete}
      />
    );
  }

  if (!currentStep) {
    return null;
  }

  return (
    <Box flexDirection="column">
      <ProgressBar
        current={stepIndex}
        total={totalSteps}
        lessonTitle={lesson.title}
        difficulty={lesson.difficulty}
        overallProgress={overallProgress}
        bitMood={bitMood}
        bitMessage={bitMessage}
      />

      {currentStep.type === 'content' && (
        <Box flexDirection="column" padding={1}>
          <Box marginBottom={1}>
            <Text bold color="yellow">
              {figures.info} {currentStep.title}
            </Text>
          </Box>
          {currentStep.items.map((item, index) => (
            <Box key={index} marginBottom={1} flexDirection="column">
              <Text bold>{item.title}</Text>
              <Box paddingLeft={2}>
                <Text dimColor>{item.explanation}</Text>
              </Box>
              {item.command && (
                <Box paddingLeft={2} marginTop={0}>
                  <Text color="green">
                    $ {item.command}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
          {showContinue && (
            <Box marginTop={1}>
              <Text dimColor>Press {chalk.cyan('Enter')} to continue  {chalk.dim('|')}  {chalk.cyan('Esc')} to go back</Text>
            </Box>
          )}
        </Box>
      )}

      {currentStep.type === 'command-exercise' && (
        <CommandExercise
          key={stepIndex}
          exercise={currentStep}
          onComplete={advance}
          overallProgress={overallProgress}
          onMoodChange={handleMoodChange}
        />
      )}

      {currentStep.type === 'multiple-choice' && (
        <KnowledgeCheck
          key={stepIndex}
          exercise={currentStep}
          onComplete={advance}
          overallProgress={overallProgress}
          onMoodChange={handleMoodChange}
        />
      )}

      {currentStep.type === 'scenario' && (
        <ScenarioExercise
          key={stepIndex}
          exercise={currentStep}
          onComplete={advance}
          overallProgress={overallProgress}
          onMoodChange={handleMoodChange}
        />
      )}

      <Box paddingX={1} marginTop={1}>
        <Text dimColor>Press {chalk.cyan('Esc')} to exit lesson</Text>
      </Box>
    </Box>
  );
}
