import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import type { MultipleChoiceStep } from '../lessons/types.js';

interface KnowledgeCheckProps {
  exercise: MultipleChoiceStep;
  onComplete: () => void;
}

export default function KnowledgeCheck({ exercise, onComplete }: KnowledgeCheckProps) {
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

          {isCorrect ? (
            <Box
              marginBottom={1}
              paddingX={2}
              borderStyle="round"
              borderColor="green"
              flexDirection="column"
            >
              <Text color="green" bold>
                {figures.tick} Correct!
              </Text>
              <Text dimColor>{exercise.explanation}</Text>
            </Box>
          ) : (
            <Box flexDirection="column">
              <Box
                marginBottom={1}
                paddingX={2}
                borderStyle="round"
                borderColor="red"
                flexDirection="column"
              >
                <Text color="red" bold>
                  {figures.cross} Not quite...
                </Text>
                <Text dimColor>{exercise.explanation}</Text>
              </Box>
              <Box paddingX={2}>
                <Text>
                  The correct answer is: <Text bold color="green">{exercise.options[exercise.correctAnswer]}</Text>
                </Text>
              </Box>
            </Box>
          )}

          {showContinue && (
            <Box marginTop={2}>
              <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
