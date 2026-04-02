import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';
import type { CommandExerciseStep } from '../lessons/types.js';

interface CommandExerciseProps {
  exercise: CommandExerciseStep;
  onComplete: () => void;
  overallProgress?: number;
}

function normalizeCommand(cmd: string): string {
  return cmd.trim().replace(/\s+/g, ' ').toLowerCase();
}

function checkAnswer(input: string, acceptedAnswers: readonly string[]): boolean {
  const normalized = normalizeCommand(input);
  return acceptedAnswers.some(answer => normalizeCommand(answer) === normalized);
}

export default function CommandExercise({ exercise, onComplete, overallProgress = 0 }: CommandExerciseProps) {
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
              <BitBuddy
                progress={overallProgress}
                mood="wrong"
                message={attempts === 1 ? 'Not quite - try again!' : attempts === 2 ? "You're getting closer!" : 'Check the hint!'}
              />
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

          <BitBuddy
            progress={overallProgress}
            mood={attempts === 0 ? 'amazed' : 'happy'}
            message={attempts === 0 ? 'Perfect! First try!' : attempts === 1 ? 'Nice one!' : 'Got it! Practice makes perfect.'}
          />

          <Box
            marginTop={1}
            paddingX={2}
            borderStyle="round"
            borderColor="green"
            flexDirection="column"
          >
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
