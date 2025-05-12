import { Command } from '../types';

/**
 * Optimizes a sequence of commands by applying two optimization rules:
 * 1. Consecutive repetitions are converted to a number prefix
 * 2. Repeated patterns are converted to a pattern with a multiplier
 * 
 * Examples:
 * - ЛЛЛЛВВПППОНННБ -> 4Л2В3ПО3НБ
 * - ЛЛЛНННЛЛЛНННО -> 2(3Л3Н)О
 */
export const optimizeCommands = (commandString: string): string => {
  // First, optimize consecutive repetitions (e.g., ЛЛЛЛ -> 4Л)
  let optimized = optimizeConsecutive(commandString);
  
  // Then, try to find and optimize repeating patterns (e.g., ЛЛЛНННЛЛЛННН -> 2(3Л3Н))
  optimized = optimizePatterns(optimized);
  
  return optimized;
};

/**
 * Optimizes consecutive repetitions of the same command
 * Example: ЛЛЛЛ -> 4Л
 */
export const optimizeConsecutive = (commandString: string): string => {
  if (!commandString) return '';
  
  let result = '';
  let count = 1;
  
  for (let i = 0; i < commandString.length; i++) {
    // If current character is the same as the next one, increment count
    if (i + 1 < commandString.length && commandString[i] === commandString[i + 1]) {
      count++;
    } else {
      // Otherwise, add the optimized sequence to the result
      result += count > 1 ? `${count}${commandString[i]}` : commandString[i];
      count = 1;
    }
  }
  
  return result;
};

/**
 * Finds and optimizes repeating patterns in the command string
 * Example: ЛЛЛНННЛЛЛННН -> 2(3Л3Н)
 */
export const optimizePatterns = (commandString: string): string => {
  if (commandString.length < 4) return commandString; // Too short for meaningful patterns
  
  // Try different pattern lengths
  for (let patternLength = Math.floor(commandString.length / 2); patternLength >= 2; patternLength--) {
    // Check different starting positions
    for (let start = 0; start <= commandString.length - patternLength * 2; start++) {
      const pattern = commandString.substring(start, start + patternLength);
      let repetitions = 1;
      let currentPos = start + patternLength;
      
      // Count repetitions of the pattern
      while (currentPos + patternLength <= commandString.length && 
             commandString.substring(currentPos, currentPos + patternLength) === pattern) {
        repetitions++;
        currentPos += patternLength;
      }
      
      // If we found a repeating pattern worth optimizing
      if (repetitions > 1) {
        // Create the optimized command string
        const prefix = start > 0 ? commandString.substring(0, start) : '';
        const suffix = currentPos < commandString.length ? commandString.substring(currentPos) : '';
        
        // Apply the optimization and recurs for potentially more optimizations
        return optimizePatterns(`${prefix}${repetitions}(${pattern})${suffix}`);
      }
    }
  }
  
  return commandString;
};

/**
 * Expands an optimized command back to its original form for execution
 */
export const expandOptimizedCommand = (optimizedCommand: string): string => {
  let expanded = optimizedCommand;
  
  // Expand pattern repetitions like 2(3Л3Н)
  const patternRegex = /(\d+)\(([^)]+)\)/g;
  expanded = expanded.replace(patternRegex, (match, count, pattern) => {
    return pattern.repeat(parseInt(count, 10));
  });
  
  // Expand numeric repetitions like 4Л
  const numericRegex = /(\d+)([ЛПВНОБ])/g;
  expanded = expanded.replace(numericRegex, (match, count, command) => {
    return command.repeat(parseInt(count, 10));
  });
  
  return expanded;
};

/**
 * Parses a command string into individual commands
 */
export const parseCommands = (commandString: string): Command[] => {
  const validCommands: Command[] = ['Л', 'П', 'В', 'Н', 'О', 'Б'];
  
  // Filter out any invalid characters
  return Array.from(commandString)
    .filter((char) => validCommands.includes(char as Command)) as Command[];
};
