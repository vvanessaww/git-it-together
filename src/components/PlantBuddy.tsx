import React from 'react';
import { Box, Text } from 'ink';

type Mood = 'idle' | 'happy' | 'wrong' | 'amazed' | 'celebrate';

interface BitBuddyProps {
  progress: number; // 0 to 1
  mood?: Mood;
  message?: string;
}

const FACES: Record<Mood, string> = {
  idle:      'o_o',
  happy:     '^_^',
  wrong:     '>_<',
  amazed:    '*_*',
  celebrate: '^o^',
};

const MOOD_COLORS: Record<Mood, string> = {
  idle:      'white',
  happy:     'greenBright',
  wrong:     'redBright',
  amazed:    'yellowBright',
  celebrate: 'greenBright',
};

interface Stage {
  lines: string[];   // ASCII art lines, {F} = face placeholder
  faceLine: number;  // which line has the face
  message: string;   // default message
}

const STAGES: Stage[] = [
  // Lv 0: Egg (no lessons)
  {
    lines: [
      '       ',
      '  ,-.  ',
      ' (._.) ',
      "  `-'  ",
      '       ',
    ],
    faceLine: -1, // no dynamic face on egg
    message: "Hi! I'm Bit!",
  },
  // Lv 1: Hatched (1-2 lessons)
  {
    lines: [
      '       ',
      '  ,-.  ',
      ' ({F}) ',
      "  `-'  ",
      '       ',
    ],
    faceLine: 2,
    message: 'I can see!',
  },
  // Lv 2: Got an arm (3-4 lessons)
  {
    lines: [
      '       ',
      '  ,-.  ',
      ' ({F})>',
      "  `-'  ",
      '   |   ',
    ],
    faceLine: 2,
    message: 'Look, an arm!',
  },
  // Lv 3: Both arms (5-6 lessons)
  {
    lines: [
      '       ',
      '  ,-.  ',
      'd({F})b',
      "  `-'  ",
      '  /|\\  ',
    ],
    faceLine: 2,
    message: 'Both arms!',
  },
  // Lv 4: Full body (7-8 lessons)
  {
    lines: [
      '       ',
      '  ,-.  ',
      'd({F})b',
      "  `-'  ",
      ' _/ \\_ ',
    ],
    faceLine: 2,
    message: 'Almost there!',
  },
  // Lv 5: Fully upgraded (all 9)
  {
    lines: [
      '\\ ,-. /',
      'd({F})b',
      "  `-'  ",
      ' _/|\\_ ',
      ' _/ \\_ ',
    ],
    faceLine: 1,
    message: 'FULLY UPGRADED!',
  },
];

function getStageIndex(progress: number): number {
  if (progress <= 0) return 0;
  if (progress < 0.23) return 1;
  if (progress < 0.45) return 2;
  if (progress < 0.67) return 3;
  if (progress < 0.9) return 4;
  return 5;
}

export default function BitBuddy({ progress, mood = 'idle', message }: BitBuddyProps) {
  const stageIdx = getStageIndex(progress);
  const stage = STAGES[stageIdx];
  const face = FACES[mood];
  const displayMessage = message ?? stage.message;
  const moodColor = MOOD_COLORS[mood];
  const bodyColor = stageIdx >= 5 ? 'yellowBright' : 'cyan';

  return (
    <Box flexDirection="row">
      <Box flexDirection="column" alignItems="center">
        {stage.lines.map((line, i) => {
          if (i === stage.faceLine) {
            const parts = line.split('{F}');
            return (
              <Box key={i}>
                <Text color={bodyColor}>{parts[0]}</Text>
                <Text color={moodColor}>{face}</Text>
                <Text color={bodyColor}>{parts[1]}</Text>
              </Box>
            );
          }
          return (
            <Box key={i}>
              <Text color={bodyColor}>{line}</Text>
            </Box>
          );
        })}
      </Box>
      {displayMessage && (
        <Box marginLeft={1} flexDirection="column" justifyContent="center">
          <Text dimColor italic>{'> '}{displayMessage}</Text>
        </Box>
      )}
    </Box>
  );
}

export { getStageIndex, STAGES };
export type { Mood };
