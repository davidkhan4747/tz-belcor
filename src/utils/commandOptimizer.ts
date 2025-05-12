import { Command } from '../types';

export const optimizeCommands = (commandString: string): string => {
  let optimized = optimizeConsecutive(commandString);
  optimized = optimizePatterns(optimized);
  
  return optimized;
};

export const optimizeConsecutive = (commandString: string): string => {
  if (!commandString) return '';
  
  let result = '';
  let count = 1;
  
  for (let i = 0; i < commandString.length; i++) {
    if (i + 1 < commandString.length && commandString[i] === commandString[i + 1]) {
      count++;
    } else {
      result += count > 1 ? `${count}${commandString[i]}` : commandString[i];
      count = 1;
    }
  }
  
  return result;
};

export const optimizePatterns = (commandString: string): string => {
  if (commandString.length < 4) return commandString;
  
  for (let patternLength = Math.floor(commandString.length / 2); patternLength >= 2; patternLength--) {
    for (let start = 0; start <= commandString.length - patternLength * 2; start++) {
      const pattern = commandString.substring(start, start + patternLength);
      let repetitions = 1;
      let currentPos = start + patternLength;
      
      while (currentPos + patternLength <= commandString.length && 
             commandString.substring(currentPos, currentPos + patternLength) === pattern) {
        repetitions++;
        currentPos += patternLength;
      }
      
      if (repetitions > 1) {
        const prefix = start > 0 ? commandString.substring(0, start) : '';
        const suffix = currentPos < commandString.length ? commandString.substring(currentPos) : '';
        
        return optimizePatterns(`${prefix}${repetitions}(${pattern})${suffix}`);
      }
    }
  }
  
  return commandString;
};

export const expandOptimizedCommand = (optimizedCommand: string): string => {
  let expanded = optimizedCommand;
  
  const patternRegex = /(\d+)\(([^)]+)\)/g;
  expanded = expanded.replace(patternRegex, (match, count, pattern) => {
    return pattern.repeat(parseInt(count, 10));
  });
  
  const numericRegex = /(\d+)([ЛПВНОБ])/g;
  expanded = expanded.replace(numericRegex, (match, count, command) => {
    return command.repeat(parseInt(count, 10));
  });
  
  return expanded;
};

export const parseCommands = (commandString: string): Command[] => {
  const validCommands: Command[] = ['Л', 'П', 'В', 'Н', 'О', 'Б'];
  
  return Array.from(commandString)
    .filter((char) => validCommands.includes(char as Command)) as Command[];
};
