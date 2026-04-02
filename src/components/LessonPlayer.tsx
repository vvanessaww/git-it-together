import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import KnowledgeCheck from './KnowledgeCheck.js';
import CommandExercise from './CommandExercise.js';
import ScenarioExercise from './ScenarioExercise.js';
import ProgressBar from './ProgressBar.js';
import type { Lesson } from '../lessons/types.js';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const totalSteps = lesson.steps.length;
  const currentStep = lesson.steps[stepIndex];

  React.useEffect(() => {
    setShowContinue(false);
    if (currentStep?.type === 'content') {
      const timer = setTimeout(() => setShowContinue(true), 600);
      return () => clearTimeout(timer);
    }
  }, [stepIndex, currentStep?.type]);

  useInput((_input, key) => {
    if (currentStep?.type !== 'content') return;
    if (!showContinue || !key.return) return;
    advance();
  });

  const advance = () => {
    if (stepIndex + 1 >= totalSteps) {
      onComplete();
    } else {
      setStepIndex(prev => prev + 1);
    }
  };

  if (!currentStep) {
    onComplete();
    return null;
  }

  return (
    <Box flexDirection="column">
      <ProgressBar
        current={stepIndex}
        total={totalSteps}
        lessonTitle={lesson.title}
        difficulty={lesson.difficulty}
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
              <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
            </Box>
          )}
        </Box>
      )}

      {currentStep.type === 'command-exercise' && (
        <CommandExercise exercise={currentStep} onComplete={advance} />
      )}

      {currentStep.type === 'multiple-choice' && (
        <KnowledgeCheck exercise={currentStep} onComplete={advance} />
      )}

      {currentStep.type === 'scenario' && (
        <ScenarioExercise exercise={currentStep} onComplete={advance} />
      )}
    </Box>
  );
}
