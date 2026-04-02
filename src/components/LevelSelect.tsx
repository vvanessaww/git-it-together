import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import type { Difficulty } from '../lessons/types.js';

interface LevelSelectProps {
  onSelect: (level: Difficulty) => void;
  onBack: () => void;
}

export default function LevelSelect({ onSelect }: LevelSelectProps) {
  const items = [
    {
      label: `${chalk.green(figures.circle)} Beginner       ${chalk.dim('— git status, add, commit, push, branches, conflicts')}`,
      value: 'beginner' as Difficulty,
    },
    {
      label: `${chalk.yellow(figures.circle)} Intermediate   ${chalk.dim('— stash, reset, revert, amend, rebase')}`,
      value: 'intermediate' as Difficulty,
    },
    {
      label: `${chalk.red(figures.circle)} Advanced        ${chalk.dim('— reflog, bisect, cherry-pick, worktrees')}`,
      value: 'advanced' as Difficulty,
    },
  ];

  const handleSelect = (item: { value: Difficulty }) => {
    onSelect(item.value);
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="cyan">
          {figures.pointer} Choose your level:
        </Text>
      </Box>

      <SelectInput items={items} onSelect={handleSelect} />

      <Box marginTop={1}>
        <Text dimColor>
          Use {chalk.cyan('arrow keys')} to navigate {figures.pointerSmall} {chalk.cyan('Enter')} to select
        </Text>
      </Box>
    </Box>
  );
}
