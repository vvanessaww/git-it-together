import React from 'react';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';
import figures from 'figures';
import BitBuddy from './PlantBuddy.js';
import type { Difficulty } from '../lessons/types.js';

interface LevelSelectProps {
  onSelect: (level: Difficulty) => void;
  onBack: () => void;
  completedByLevel: Record<Difficulty, number>;
  totalByLevel: Record<Difficulty, number>;
  overallProgress: number;
}

export default function LevelSelect({ onSelect, completedByLevel, totalByLevel, overallProgress }: LevelSelectProps) {
  const formatProgress = (level: Difficulty) => {
    const done = completedByLevel[level];
    const total = totalByLevel[level];
    if (done === total && total > 0) return chalk.green(`${done}/${total} done!`);
    if (done > 0) return chalk.yellow(`${done}/${total}`);
    return chalk.dim(`0/${total}`);
  };

  const items = [
    {
      label: `${chalk.green(figures.circle)} Beginner        ${formatProgress('beginner')}  ${chalk.dim('basics: status, add, commit, push, branches')}`,
      value: 'beginner' as Difficulty,
    },
    {
      label: `${chalk.yellow(figures.circle)} Intermediate    ${formatProgress('intermediate')}  ${chalk.dim('power tools: stash, reset, revert, rebase')}`,
      value: 'intermediate' as Difficulty,
    },
    {
      label: `${chalk.red(figures.circle)} Advanced         ${formatProgress('advanced')}  ${chalk.dim('pro moves: reflog, bisect, cherry-pick')}`,
      value: 'advanced' as Difficulty,
    },
    {
      label: `${chalk.magenta(figures.star)} Bonus            ${formatProgress('bonus')}  ${chalk.dim('extras: bash, branching, terminal tricks')}`,
      value: 'bonus' as Difficulty,
    },
  ];

  const handleSelect = (item: { value: Difficulty }) => {
    onSelect(item.value);
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box justifyContent="space-between" marginBottom={1}>
        <Box flexDirection="column">
          <Text bold color="cyan">
            {figures.pointer} Choose your level:
          </Text>
          <Text dimColor>Complete the first 3 levels to grow your tree  {chalk.magenta('|')}  Bonus lessons are just for fun</Text>
        </Box>
        <BitBuddy progress={overallProgress} mood="idle" />
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
