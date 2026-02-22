import React, { useEffect, useState } from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import figures from 'figures';

interface WelcomeProps {
  onContinue: () => void;
}

export default function Welcome({ onContinue }: WelcomeProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const handleKeyPress = () => {
      onContinue();
    };

    process.stdin.on('data', handleKeyPress);
    return () => {
      process.stdin.off('data', handleKeyPress);
    };
  }, [ready, onContinue]);

  return (
    <Box flexDirection="column" padding={2} borderStyle="round" borderColor="cyan">
      <Box marginBottom={1}>
        <Text bold color="cyan">
          {figures.arrowRight} Welcome to Git It Together!
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text>
          An interactive tutorial for learning Git in {chalk.magenta('AI-assisted')} workflows.
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text dimColor>
          Perfect for PMs, designers, and anyone working with tools like:
        </Text>
      </Box>

      <Box marginBottom={1} paddingLeft={2}>
        <Text color="green">
          {figures.tick} Claude Code / Cursor
        </Text>
      </Box>
      <Box marginBottom={1} paddingLeft={2}>
        <Text color="green">
          {figures.tick} GitHub Copilot
        </Text>
      </Box>
      <Box marginBottom={1} paddingLeft={2}>
        <Text color="green">
          {figures.tick} v0.dev / Bolt
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text bold>
          You'll learn the {chalk.yellow('essential Git commands')} needed to collaborate on projects.
        </Text>
      </Box>

      {ready && (
        <Box marginTop={2}>
          <Text dimColor>
            Press {chalk.cyan('any key')} to start...
          </Text>
        </Box>
      )}
    </Box>
  );
}
