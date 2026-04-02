import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';
import figures from 'figures';
import type { CommandExerciseStep } from '../lessons/types.js';
import type { Mood } from './PlantBuddy.js';

interface CommandExerciseProps {
  exercise: CommandExerciseStep;
  onComplete: () => void;
  overallProgress?: number;
  onMoodChange?: (mood: Mood, message: string) => void;
}

function normalizeCommand(cmd: string): string {
  return cmd.trim().replace(/\s+/g, ' ').toLowerCase();
}

function checkAnswer(input: string, acceptedAnswers: readonly string[]): boolean {
  const normalized = normalizeCommand(input);
  return acceptedAnswers.some(answer => normalizeCommand(answer) === normalized);
}

export default function CommandExercise({ exercise, onComplete, onMoodChange }: CommandExerciseProps) {
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showingWrong, setShowingWrong] = useState(false);

  // Set initial mood
  useEffect(() => {
    onMoodChange?.('idle', "Let's see...");
  }, [onMoodChange]);

  useInput((_input, key) => {
    if (solved && key.return) {
      onComplete();
    }
  });

  const handleSubmit = (value: string) => {
    if (solved) return;

    if (checkAnswer(value, exercise.acceptedAnswers)) {
      setSolved(true);
      const msg = attempts === 0 ? 'Perfect! First try!' : attempts === 1 ? 'Nice one!' : 'Got it!';
      const mood: Mood = attempts === 0 ? 'amazed' : 'happy';
      onMoodChange?.(mood, msg);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowingWrong(true);
      setInput('');
      const msg = newAttempts === 1 ? 'Not quite - try again!' : newAttempts === 2 ? "Getting closer!" : 'Check the hint!';
      onMoodChange?.('wrong', msg);
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
            <Box marginBottom={1} paddingLeft={2}>
              <Text color="red">
                {figures.cross} {attempts === 1 ? 'Not quite - give it another shot!' : attempts === 2 ? "You're getting closer!" : 'Almost! Check the hint below.'}
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
              {figures.tick} {attempts === 0 ? 'Perfect! First try!' : attempts === 1 ? 'Nice one!' : 'Got it! Practice makes perfect.'}
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
