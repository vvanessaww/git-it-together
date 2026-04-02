import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';
import figures from 'figures';
import type { CommandExerciseStep } from '../lessons/types.js';

interface CommandExerciseProps {
  exercise: CommandExerciseStep;
  onComplete: () => void;
}

function normalizeCommand(cmd: string): string {
  return cmd.trim().replace(/\s+/g, ' ').toLowerCase();
}

function checkAnswer(input: string, acceptedAnswers: readonly string[]): boolean {
  const normalized = normalizeCommand(input);
  return acceptedAnswers.some(answer => normalizeCommand(answer) === normalized);
}

export default function CommandExercise({ exercise, onComplete }: CommandExerciseProps) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showingWrong, setShowingWrong] = useState(false);

  useInput((_input, key) => {
    if (solved && key.return) {
      onComplete();
    }
  });

  const handleSubmit = (value: string) => {
    if (solved) return;

    if (checkAnswer(value, exercise.acceptedAnswers)) {
      setSolved(true);
    } else {
      setAttempts(prev => prev + 1);
      setShowingWrong(true);
      setInput('');
    }
  };

  const currentHint = attempts > 0 && attempts <= exercise.hints.length
    ? exercise.hints[attempts - 1]
    : attempts > exercise.hints.length && exercise.hints.length > 0
      ? exercise.hints[exercise.hints.length - 1]
      : null;

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="yellow">
          {figures.play} Type the Command
        </Text>
      </Box>

      <Box marginBottom={1} paddingX={2} borderStyle="round" borderColor="cyan">
        <Text>{exercise.prompt}</Text>
      </Box>

      {!solved ? (
        <>
          <Box marginBottom={1}>
            <Text color="green">{'$ '}</Text>
            <TextInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              placeholder="type your command here..."
            />
          </Box>

          {showingWrong && (
            <Box marginBottom={1}>
              <Text color="red">
                {figures.cross} Not quite. Try again!
              </Text>
            </Box>
          )}

          {currentHint && (
            <Box marginBottom={1} paddingLeft={2}>
              <Text color="yellow">
                {figures.info} Hint: {currentHint}
              </Text>
            </Box>
          )}

          {attempts >= 3 && (
            <Box paddingLeft={2}>
              <Text dimColor>
                Answer: {chalk.green(exercise.acceptedAnswers[0])}
              </Text>
            </Box>
          )}
        </>
      ) : (
        <>
          <Box marginBottom={1}>
            <Text color="green">
              {'$ '}{input || exercise.acceptedAnswers[0]}
            </Text>
          </Box>

          <Box
            marginBottom={1}
            paddingX={2}
            borderStyle="round"
            borderColor="green"
            flexDirection="column"
          >
            <Text color="green" bold>
              {figures.tick} {attempts === 0 ? 'Perfect!' : 'Correct!'}
              {attempts === 0 && ' First try!'}
            </Text>
            <Text dimColor>{exercise.explanation}</Text>
          </Box>

          <Box marginTop={1}>
            <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
          </Box>
        </>
      )}
    </Box>
  );
}
