import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import chalk from 'chalk';
import figures from 'figures';
import type { ScenarioStep } from '../lessons/types.js';
import type { Mood } from './PlantBuddy.js';

interface ScenarioExerciseProps {
  exercise: ScenarioStep;
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

export default function ScenarioExercise({ exercise, onComplete, onMoodChange }: ScenarioExerciseProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [input, setInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showingWrong, setShowingWrong] = useState(false);
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const currentStep = exercise.steps[currentStepIndex];
  const totalSteps = exercise.steps.length;

  useEffect(() => {
    onMoodChange?.('idle', 'Walk me through it!');
  }, [onMoodChange]);

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
        onMoodChange?.('celebrate', 'Scenario complete!');
      } else {
        setCurrentStepIndex(prev => prev + 1);
        onMoodChange?.('happy', 'Nice! Next step...');
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setShowingWrong(true);
      setInput('');
      onMoodChange?.('wrong', newAttempts === 1 ? 'Not quite!' : 'Check the hint!');
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
            <Box marginBottom={1} paddingLeft={2}>
              <Text color="red">
                {figures.cross} {attempts === 1 ? 'Not quite - try again!' : 'Check the hint!'}
              </Text>
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
          <Box
            marginTop={1}
            paddingX={2}
            borderStyle="round"
            borderColor="green"
            flexDirection="column"
          >
            <Text color="green" bold>
              {figures.tick} Scenario Complete!
            </Text>
            <Text dimColor>{exercise.completionMessage}</Text>
          </Box>

          <Box marginTop={1}>
            <Text dimColor>Press {chalk.cyan('Enter')} to continue...</Text>
          </Box>
        </>
      )}
    </Box>
  );
}
