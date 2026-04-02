import React, { useEffect, useState } from 'react';
import { Box, Text, useInput } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useInput((_input, key) => {
    if (!ready) return;
    if (key.return) {
      onContinue();
    }
  });

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Box marginBottom={1} justifyContent="space-between">
        <Box flexDirection="column">
          <Text bold color="cyan">
            {figures.arrowRight} Welcome to Git It Together!
          </Text>
          <Box marginTop={1}>
            <Text>
              Learn Git by {chalk.magenta('actually typing commands')} — not just reading about them.
            </Text>
          </Box>
        </Box>
        <Box marginLeft={2}>
          <BitBuddy progress={0} mood="idle" message="" />
        </Box>
      </Box>

      <Box marginBottom={1} paddingX={2} borderStyle="round" borderColor="gray">
        <Box flexDirection="column">
          <Text>
            Meet {chalk.cyan('Bit')} — your little bot buddy!
          </Text>
          <Text dimColor>
            Bit starts as a tiny egg and evolves as you complete lessons.
          </Text>
          <Text dimColor>
            Finish all 9 lessons to fully upgrade Bit!
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
