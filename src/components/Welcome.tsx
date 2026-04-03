import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';
import { lessons } from '../lessons/index.js';

interface WelcomeProps {
  onContinue: () => void;
}

const ANIM_STAGES = [
  { progress: 0,    label: 'Seed',             delay: 1200 },
  { progress: 0.15, label: 'Sprouting!',       delay: 800 },
  { progress: 0.3,  label: 'Small tree!',      delay: 800 },
  { progress: 0.5,  label: 'Getting tall!',    delay: 800 },
  { progress: 0.8,  label: 'Big tree!',        delay: 800 },
  { progress: 1.0,  label: 'FULL GROWN!',      delay: 1500 },
];

export default function Welcome({ onContinue }: WelcomeProps) {
  const [ready, setReady] = useState(false);
  const [animStage, setAnimStage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stage = ANIM_STAGES[animStage];
    timerRef.current = setTimeout(() => {
      setAnimStage(prev => (prev + 1) % ANIM_STAGES.length);
    }, stage.delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [animStage]);

  useInput((_input, key) => {
    if (!ready) return;
    if (key.return) {
      onContinue();
    }
  });

  const currentAnim = ANIM_STAGES[animStage];

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Box marginBottom={1}>
        <Text bold color="cyan">
          {figures.arrowRight} Welcome to Git It Together!
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text>
          Learn Git by {chalk.magenta('actually typing commands')} — not just reading about them.
        </Text>
      </Box>

      <Box marginBottom={1} paddingX={2} paddingY={1} borderStyle="round" borderColor="gray" flexDirection="column" alignItems="center">
        <Text dimColor>Meet your {chalk.green('git tree')}! Complete lessons to grow it:</Text>
        <Box marginTop={1}>
          <BitBuddy
            progress={currentAnim.progress}
            mood={animStage === 0 ? 'idle' : animStage === ANIM_STAGES.length - 1 ? 'celebrate' : 'happy'}
            message={currentAnim.label}
          />
        </Box>
        <Box marginTop={0}>
          <Text dimColor>
            {ANIM_STAGES.map((_, i) => i === animStage ? chalk.green('\u25cf') : chalk.gray('\u25cb')).join(' ')}
          </Text>
        </Box>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>
          Built for PMs, designers, and anyone working with AI coding tools:
        </Text>
      </Box>

      <Box marginBottom={1} paddingLeft={2}>
        <Text color="green">
          {figures.tick} Claude Code   {figures.tick} Cursor   {figures.tick} GitHub Copilot   {figures.tick} v0 / Bolt
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text bold>
          {chalk.yellow(`${new Set(lessons.map(l => l.difficulty)).size} levels`)} {chalk.dim('|')} {chalk.yellow(`${lessons.length} lessons`)} {chalk.dim('|')} {chalk.yellow('Type real commands')} {chalk.dim('|')} {chalk.yellow('Grow your tree')}
        </Text>
      </Box>

      {ready && (
        <Box marginTop={1}>
          <Text dimColor>
            Press {chalk.cyan('Enter')} to plant your seed...
          </Text>
        </Box>
      )}
    </Box>
  );
}
