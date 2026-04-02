import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';
import type { MultipleChoiceStep } from '../lessons/types.js';

interface KnowledgeCheckProps {
  exercise: MultipleChoiceStep;
  onComplete: () => void;
  overallProgress?: number;
}

export default function KnowledgeCheck({ exercise, onComplete, overallProgress = 0 }: KnowledgeCheckProps) {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showContinue, setShowContinue] = useState(false);

  const handleSelect = (item: { value: number }) => {
    setSelectedAnswer(item.value);
    setAnswered(true);
    setTimeout(() => setShowContinue(true), 1000);
  };

  useInput((_input, key) => {
    if (!showContinue) return;
    if (key.return) {
      onComplete();
    }
  });

  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="magenta">
          {figures.questionMarkPrefix} Knowledge Check
        </Text>
      </Box>

      <Box marginBottom={2} paddingX={2} borderStyle="round" borderColor="yellow">
        <Text italic>{exercise.situation}</Text>
      </Box>

      {!answered ? (
        <>
          <Box marginBottom={1}>
            <Text bold>What should you do?</Text>
          </Box>
          <SelectInput
            items={exercise.options.map((opt, idx) => ({
              label: opt,
              value: idx,
            }))}
            onSelect={handleSelect}
          />
        </>
      ) : (
        <>
          <Box marginBottom={1} flexDirection="column">
            <Text bold>Your answer:</Text>
            <Box paddingLeft={2}>
              <Text color={isCorrect ? 'green' : 'red'}>
                {isCorrect ? figures.tick : figures.cross} {exercise.options[selectedAnswer!]}
              </Text>
            </Box>
          </Box>

          <BitBuddy
            progress={overallProgress}
            mood={isCorrect ? 'happy' : 'wrong'}
            message={isCorrect ? 'You got it!' : "Don't worry, you'll get the next one!"}
          />

          <Box
            marginTop={1}
            paddingX={2}
            borderStyle="round"
            borderColor={isCorrect ? 'green' : 'red'}
            flexDirection="column"
          >
            <Text dimColor>{exercise.explanation}</Text>
            {!isCorrect && (
              <Text>
                Correct answer: <Text bold color="green">{exercise.options[exercise.correctAnswer]}</Text>
              </Text>
            )}
          </Box>

          {showContinue && (
            <Box marginTop={1}>
              <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
