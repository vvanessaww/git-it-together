import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';
import type { ScenarioStep } from '../lessons/types.js';

interface ScenarioExerciseProps {
  exercise: ScenarioStep;
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

export default function ScenarioExercise({ exercise, onComplete, overallProgress = 0 }: ScenarioExerciseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showingWrong, setShowingWrong] = useState(false);
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const currentStep = exercise.steps[currentStepIndex];
  const totalSteps = exercise.steps.length;

  useInput((_input, key) => {
    if (done && key.return) {
      onComplete();
    }
  });

  const handleSubmit = (value: string) => {
    if (done || !currentStep) return;

    if (checkAnswer(value, currentStep.acceptedAnswers)) {
      const newCompleted = [...completedCommands, value];
      setCompletedCommands(newCompleted);
      setInput('');
      setAttempts(0);
      setShowingWrong(false);

      if (currentStepIndex + 1 >= totalSteps) {
        setDone(true);
      } else {
        setCurrentStepIndex(prev => prev + 1);
      }
    } else {
      setAttempts(prev => prev + 1);
      setShowingWrong(true);
      setInput('');
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="magenta">
          {figures.pointer} {exercise.title}
        </Text>
      </Box>

      <Box marginBottom={1} paddingX={2} borderStyle="round" borderColor="yellow">
        <Text italic>{exercise.situation}</Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>
          Step {Math.min(currentStepIndex + 1, totalSteps)} of {totalSteps}
        </Text>
      </Box>

      {/* Show completed steps */}
      {completedCommands.map((cmd, idx) => (
        <Box key={idx} marginBottom={0} paddingLeft={1}>
          <Text color="green">
            {figures.tick} $ {cmd}
          </Text>
        </Box>
      ))}

      {!done ? (
        <>
          <Box marginBottom={1} marginTop={completedCommands.length > 0 ? 1 : 0}>
            <Text bold>{currentStep.prompt}</Text>
          </Box>

          <Box marginBottom={1}>
            <Text color="green">{'$ '}</Text>
            <TextInput
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              placeholder="type your command..."
            />
          </Box>

          {showingWrong && (
            <Box marginBottom={1}>
              <BitBuddy
                progress={overallProgress}
                mood="wrong"
                message={attempts === 1 ? 'Not quite - try again!' : 'Check the hint!'}
              />
            </Box>
          )}

          {attempts >= 1 && (
            <Box marginBottom={1} paddingLeft={2}>
              <Text color="yellow">
                {figures.info} Hint: {currentStep.hint}
              </Text>
            </Box>
          )}

          {attempts >= 3 && (
            <Box paddingLeft={2}>
              <Text dimColor>
                Answer: {chalk.green(currentStep.acceptedAnswers[0])}
              </Text>
            </Box>
          )}
        </>
      ) : (
        <>
          <BitBuddy
            progress={overallProgress}
            mood="celebrate"
            message={exercise.completionMessage}
          />

          <Box marginTop={1}>
            <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
          </Box>
        </>
      )}
    </Box>
  );
}
