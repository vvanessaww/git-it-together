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

// Each stage line is [text, colorName] segments
// {F} in a segment means the face goes there
// Colors: 'leaf' = green canopy, 'trunk' = brown trunk, 'ground' = dark ground, 'face' = mood-colored
interface Segment {
  text: string;
  color: 'leaf' | 'trunk' | 'ground' | 'face' | 'glow';
}

interface StageLine {
  segments: Segment[];
}

interface Stage {
  lines: StageLine[];
  message: string;
}

function makeLine(...parts: [string, Segment['color']][]): StageLine {
  return { segments: parts.map(([text, color]) => ({ text, color })) };
}

const STAGES: Stage[] = [
  // Lv 0: Seed
  {
    lines: [
      makeLine(['         ', 'leaf']),
      makeLine(['         ', 'leaf']),
      makeLine(['    .    ', 'leaf']),
      makeLine(['    |    ', 'trunk']),
      makeLine(['   """   ', 'ground']),
    ],
    message: "I'm just a seed!",
  },
  // Lv 1: Tiny sprout with face
  {
    lines: [
      makeLine(['         ', 'leaf']),
      makeLine(['    %    ', 'leaf']),
      makeLine(['   %', 'leaf'], ['{F}', 'face'], ['%   ', 'leaf']),
      makeLine(['   %', 'leaf'], ['|', 'trunk'], ['%   ', 'leaf']),
      makeLine(['   """   ', 'ground']),
    ],
    message: "I'm sprouting!",
  },
  // Lv 2: Small tree
  {
    lines: [
      makeLine(['    %    ', 'leaf']),
      makeLine(['   %%% ', 'leaf']),
      makeLine(['  %', 'leaf'], ['{F}', 'face'], ['%  ', 'leaf']),
      makeLine(['    |    ', 'trunk']),
      makeLine(['   """   ', 'ground']),
    ],
    message: 'Growing!',
  },
  // Lv 3: Medium tree
  {
    lines: [
      makeLine(['   %%%   ', 'leaf']),
      makeLine(['  %% %%  ', 'leaf']),
      makeLine(['  %', 'leaf'], ['{F}', 'face'], ['%  ', 'leaf']),
      makeLine(['    |    ', 'trunk']),
      makeLine(['   """   ', 'ground']),
    ],
    message: 'Getting tall!',
  },
  // Lv 4: Big tree
  {
    lines: [
      makeLine(['  \\', 'leaf'], ['%%%', 'leaf'], ['/  ', 'leaf']),
      makeLine([' %% ', 'leaf'], ['. ', 'face'], ['%% ', 'leaf']),
      makeLine([' (%', 'leaf'], ['{F}', 'face'], ['%) ', 'leaf']),
      makeLine(['    |    ', 'trunk']),
      makeLine(['   """   ', 'ground']),
    ],
    message: 'Almost grown!',
  },
  // Lv 5: Full majestic tree
  {
    lines: [
      makeLine([' \\\\', 'leaf'], ['%%%%%', 'leaf'], ['// ', 'leaf']),
      makeLine(['%%% ', 'leaf'], ['. ', 'face'], ['%%% ', 'leaf']),
      makeLine([' ((', 'leaf'], ['%', 'leaf'], ['{F}', 'face'], ['%', 'leaf'], [')) ', 'leaf']),
      makeLine(['    |    ', 'trunk']),
      makeLine(['  """""  ', 'ground']),
    ],
    message: 'FULL GROWN!',
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

const COLOR_MAP = {
  leaf:   'green',
  trunk:  'yellow',       // brownish in most terminals
  ground: 'gray',
  face:   'white',        // overridden by mood
  glow:   'yellowBright',
} as const;

export default function BitBuddy({ progress, mood = 'idle', message }: BitBuddyProps) {
  const stageIdx = getStageIndex(progress);
  const stage = STAGES[stageIdx];
  const face = FACES[mood];
  const displayMessage = message ?? stage.message;
  const moodColor = MOOD_COLORS[mood];

  return (
    <Box flexDirection="row">
      <Box flexDirection="column" alignItems="center">
        {stage.lines.map((line, lineIdx) => (
          <Box key={lineIdx}>
            {line.segments.map((seg, segIdx) => {
              if (seg.text === '{F}') {
                return <Text key={segIdx} color={moodColor}>{face}</Text>;
              }
              if (seg.text.includes('{F}')) {
                const parts = seg.text.split('{F}');
                const segColor = seg.color === 'face' ? moodColor : COLOR_MAP[seg.color];
                return (
                  <React.Fragment key={segIdx}>
                    <Text color={segColor}>{parts[0]}</Text>
                    <Text color={moodColor}>{face}</Text>
                    <Text color={segColor}>{parts[1]}</Text>
                  </React.Fragment>
                );
              }
              const segColor = seg.color === 'face' ? moodColor : COLOR_MAP[seg.color];
              return <Text key={segIdx} color={segColor}>{seg.text}</Text>;
            })}
          </Box>
        ))}
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
