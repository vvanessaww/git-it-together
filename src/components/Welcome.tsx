import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';

interface WelcomeProps {
  onContinue: () => void;
}

const ANIM_STAGES = [
  { progress: 0,    label: 'Egg',              delay: 1200 },
  { progress: 0.15, label: 'Hatched!',         delay: 800 },
  { progress: 0.3,  label: 'Got an arm!',      delay: 800 },
  { progress: 0.5,  label: 'Both arms!',       delay: 800 },
  { progress: 0.8,  label: 'Full body!',       delay: 800 },
  { progress: 1.0,  label: 'FULLY UPGRADED!',  delay: 1500 },
];

export default function Welcome({ onContinue }: WelcomeProps) {
  const [ready, setReady] = useState(false);
  const [animStage, setAnimStage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start the "press enter" prompt after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Cycle through animation stages
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

      {/* Animated Bit evolution showcase */}
      <Box marginBottom={1} paddingX={2} paddingY={1} borderStyle="round" borderColor="gray" flexDirection="column" alignItems="center">
        <Text dimColor>Meet {chalk.cyan('Bit')} — your bot buddy! Complete lessons to evolve Bit:</Text>
        <Box marginTop={1}>
          <BitBuddy
            progress={currentAnim.progress}
            mood={animStage === 0 ? 'idle' : animStage === ANIM_STAGES.length - 1 ? 'celebrate' : 'happy'}
            message={currentAnim.label}
          />
        </Box>
        <Box marginTop={0}>
          <Text dimColor>
            {ANIM_STAGES.map((_, i) => i === animStage ? chalk.cyan('\u25cf') : chalk.gray('\u25cb')).join(' ')}
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
          {chalk.yellow('3 levels')} {chalk.dim('|')} {chalk.yellow('9 lessons')} {chalk.dim('|')} {chalk.yellow('Type real commands')} {chalk.dim('|')} {chalk.yellow('Grow your bot')}
        </Text>
      </Box>

      {ready && (
        <Box marginTop={1}>
          <Text dimColor>
            Press {chalk.cyan('Enter')} to hatch your Bit...
          </Text>
        </Box>
      )}
    </Box>
  );
}
