import React, { useState } from 'react';
import { Box, Text } from 'ink';
import chalk from 'chalk';
import figures from 'figures';
import KnowledgeCheck from './KnowledgeCheck.js';
import type { Lesson } from '../lessons/types.js';

interface LessonPlayerProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonPlayer({ lesson, onComplete }: LessonPlayerProps) {
  const [step, setStep] = useState<'intro' | 'content' | 'check'>('intro');
  const [showContinue, setShowContinue] = useState(false);

  React.useEffect(() => {
    if (step === 'intro') {
      const timer = setTimeout(() => setShowContinue(true), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  React.useEffect(() => {
    if (!showContinue) return;

    const handleKeyPress = () => {
      if (step === 'intro') {
        setStep('content');
        setShowContinue(false);
        setTimeout(() => setShowContinue(true), 1000);
      } else if (step === 'content') {
        setStep('check');
      }
    };

    process.stdin.on('data', handleKeyPress);
    return () => {
      process.stdin.off('data', handleKeyPress);
    };
  }, [step, showContinue]);

  const handleCheckComplete = () => {
    onComplete();
  };

  if (step === 'intro') {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text bold color="cyan">
            {figures.pointer} {lesson.title}
          </Text>
        </Box>
        <Box>
          <Text>{lesson.description}</Text>
        </Box>
        {showContinue && (
          <Box marginTop={2}>
            <Text dimColor>Press {chalk.cyan('any key')} to continue...</Text>
          </Box>
        )}
      </Box>
    );
  }

  if (step === 'content') {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={1}>
          <Text bold color="yellow">
            {figures.info} {lesson.contentTitle || 'What You Need to Know'}
          </Text>
        </Box>
        {lesson.content.map((item, index) => (
          <Box key={index} marginBottom={1} flexDirection="column">
            <Text bold>{item.title}</Text>
            <Box paddingLeft={2}>
              <Text dimColor>{item.explanation}</Text>
            </Box>
            {item.command && (
              <Box paddingLeft={2} marginTop={1}>
                <Text color="green">
                  $ {item.command}
                </Text>
              </Box>
            )}
          </Box>
        ))}
        {showContinue && (
          <Box marginTop={2}>
            <Text dimColor>Press {chalk.cyan('any key')} for knowledge check...</Text>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <KnowledgeCheck
      scenario={lesson.knowledgeCheck}
      onComplete={handleCheckComplete}
    />
  );
}
