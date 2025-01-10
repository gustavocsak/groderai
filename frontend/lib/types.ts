export type CodeAnalysis = {
  documentation: string[];
  linting_errors: string[];
  missing_requirements: string[];
  readability: string[];
  restricted_usage: string[];
};

export type Metadata = {
  summary: string;
  language: string;
  requirements: string[];
  title: string;
};

export type Method = {
  errors: string[];
  expected_prototype: string;
  is_correct: boolean;
  is_documented: boolean;
  prototype: string | "N/A";
  time_complexity: string;
};

export type Student = {
  name: string;
  filename: string;
  methods: Method[];
  code_analysis: CodeAnalysis;
  summary: string[];
  code: string;
};

export type ApiResponse = {
  metadata: Metadata;
  students: Student[];
};

export const testdata = {
  metadata: {
    language: "Java",
    requirements: [
      "No Syntax Errors",
      "No Runtime Errors",
      "Program must contains at least 5 methods",
      "The program cannot take too long to run or run infinite loop at some points",
      "Prompt the user for input and output file names",
      "Create the output to save the sorted words. DO NOT overwrite the original input file.",
      "Change all words to lower case",
      "You have to count number of matching words before you declare the size of the array",
      "If words have a punctuation symbol at the beginning or at the end of the words then remove the punctuation marks from both sides of the word, keep the word.",
      "If words still have any symbol except '-' and letter, then ignore the word",
      "Ignore the words that contain digits",
      "Remove spaces from both sides of the words",
      "Save the words in a file",
      "Sort the words in alphabetical order",
      "Save only one instance of each word, if there are many occurrences of the same word",
      "The input file (unsorted.txt) is used to test your program. If the output misses/contains too many/few words, it will be considered as bugs.",
      "You are not allowed to use Java sort methods",
      "Do not overwrite the original input file",
      "The program should create an output file if the output does not exist.",
      "Print number of the words, and frequency of each letter ('a' to 'z'), ignore cases",
      "DO NOT use ArrayList because students in 1150 never have an chance to learn it. It is NOT fair that you used ArrayList",
      "DO NOT declare a string array with fixed number of elements. You have to count number of matching words before you declare the size of the array",
      "Take too much time to run the program",
      "header information at the top of the program [include your name, class section and program description]",
      "Use Javadoc comment style and comment your class - describe the parameter(s) required for each method - describe the return value (or output) for each method - describe the purpose of the program - Comment should be placed on the top of the method",
      "indentation & alignment",
      "Do not use any magic numbers and please use variables for any calculations",
    ],
    summary:
      "This assignment requires students to write a Java program that reads a text file, processes the words (converting to lowercase, removing punctuation, handling invalid characters), sorts them alphabetically, removes duplicates, and saves the unique words to an output file. The program should also display the total word count and letter frequencies.  Specific restrictions include not using ArrayList, Java's built-in sort methods, and avoiding magic numbers.",
    title: "Text File Processor",
  },
  students: [
    {
      code: "import java.io.File;\nimport java.io.FileNotFoundException;\nimport java.io.PrintWriter;\nimport java.util.Scanner;\n/**\n * * Program Name: Lab10\n * * Author:       Crash Bandicoot\n * * Id:           102033\n * * Date:         November 19, 2024\n * * Compiler:     JDK 22.0.2\n */\npublic class Lab10 {\n    /**\n     * This program reads a text file word by word, saves it in an array of Strings, processes the words, sorts\n     * the words in alphabetical order, keeps only one instance of each word and saves them in sorted order in another file.\n     */\n    public static void main(String[] args) throws FileNotFoundException {\n        Scanner consoleInput = new Scanner(System.in);\n        // Prompt the user input for input file name and output file names.\n        System.out.print(\"Input source file name: \");\n        String sourceFileName = consoleInput.next();\n        System.out.print(\"Input output file name: \");\n        String outputFileName = consoleInput.next();\n\n        // Create file objects.\n        File sourceFile = new File(sourceFileName);\n        File outputFile = new File(outputFileName);\n\n        //Check if source file exists. If not exit program.\n        if (!sourceFile.exists()) {\n            System.out.println(\"File \" + sourceFileName + \" not found\");\n            return;\n        }\n        // Count number of the words in the file.\n        int wordCount = countWords(sourceFile);\n        // Create an array and populate it with words from a file. Change all world to lower case.\n        String[] allWords = getWordsFromFile(sourceFile, wordCount);\n        // Print total word count and letter frequency to console.\n        printWordCountAndLetterFrequency(allWords);\n\n        //  Remove non-letter symbols in the beginning and at the end of the words, in non-letter symbol is in the middle\n        //  and isn't '-' set that word to empty string.\n        cleanWords(allWords);\n\n        // Remove all empty strings from array.\n        String[] validStringsArray = removeEmptyStrings(allWords);\n        // Sort array in alphabetic order.\n        sortArray(validStringsArray);\n\n        // Get array with only unique words.\n        String[] uniqueWords = getUniqueWords(validStringsArray);\n        // Save unique words in a file.\n        writeToFile(uniqueWords, outputFile);\n    }\n\n    /**\n     * Counts number of the words in the file and return count.\n     *\n     * @param file text file to read\n     *\n     * @return the count of words in a file\n     */\n    public static int countWords(File file) throws FileNotFoundException {\n        Scanner fileReader = new Scanner(file);\n\n        int count = 0;\n        while (fileReader.hasNext()) {\n            fileReader.next();\n            count++;\n        }\n        fileReader.close();\n\n        return count;\n    }\n\n    /**\n     * Creates an array of String with size equal to the number of the words in the file.\n     * Populate array with words set to lowercase.\n     *\n     * @param file text file to read\n     * @param size number of the words in the file\n     *\n     * @return the String array that contains all words from file in lowercase\n     */\n    public static String[] getWordsFromFile(File file, int size) throws FileNotFoundException {\n        Scanner fileReader = new Scanner(file);\n        String[] words = new String[size];\n\n        for (int i = 0; i < words.length && fileReader.hasNext(); i++) {\n            words[i] = fileReader.next().toLowerCase();\n        }\n        fileReader.close();\n\n        return words;\n    }\n\n    /**\n     * Print number of the words, and frequency of each letter ('a' to 'z') ignoring letter cases, on the\n     * screen.\n     *\n     * @param words String array with words\n     */\n    public static void printWordCountAndLetterFrequency(String[] words) {\n        // Print word count.\n        System.out.println(\"\\nWord total count: \" + words.length);\n        System.out.println();\n\n        // Create an array that contains frequency of each letter.\n        int[] letterFrequency = getLetterFrequency(words);\n        System.out.println(\"Letter frequency: \");\n        for (int i = 0; i < letterFrequency.length; i++) {\n            System.out.printf(\"%c:%6d\\n\", (char) (i + 'a'), letterFrequency[i]);\n        }\n    }\n\n    /**\n     * Creates an int array to store the frequency of each letter ('a' to 'z') in all words from the input string array.\n     * Ignores non-alphabet characters, assumes all strings are already in lowercase.\n     *\n     * @param words String array with words\n     *\n     * @return an int array containing frequency of each letter.\n     */\n    public static int[] getLetterFrequency(String[] words) {\n        // An array of size total number of letters in the alphabet to store the frequency of each letter.\n        int[] letterFrequency = new int['z' - 'a' + 1];\n        for (int i = 0; i < words.length; i++) {\n            String curWord = words[i];\n            for (int j = 0; j < curWord.length(); j++) {\n                char curChar = curWord.charAt(j);\n                if (isALetter(curChar)) {\n                    // If the character is a letter, increment the count at its corresponding position in the letterFrequency array.\n                    letterFrequency[curChar - 'a'] += 1;\n                }\n            }\n        }\n\n        return letterFrequency;\n    }\n\n    /**\n     * Clean array of strings to get valid words.\n     * If words have any non-letter symbols in the beginning or at the end of the words, remove them.\n     * If the word still contains any other non-letter symbol except hyphen '-', then set this word to an empty string.\n     *\n     * @param words String array with words\n     */\n    public static void cleanWords(String[] words) {\n        for (int i = 0; i < words.length; i++) {\n            // Remove non-letter symbols from the end and beginning.\n            words[i] = trimNonLetters(words[i]);\n            // If the word is invalid assign empty string to it.\n            if (isInvalidWord(words[i]))\n                words[i] = \"\";\n        }\n    }\n\n    /**\n     * If word have any non-letter symbols in the beginning or at the end of the words, remove them\n     * from both sides of the words.\n     *\n     * @param word string - one word\n     *\n     * @return string without non-letter symbols at the beginning and end\n     */\n    public static String trimNonLetters(String word) {\n        // Set word first character position and last position.\n        int wordStart = 0;\n        int wordEnd = word.length() - 1;\n\n        // Trim front.\n        while (!isALetter(word.charAt(wordStart)) && wordStart <= wordEnd) {\n            // All characters arent letters.\n            if (wordStart == wordEnd) return \"\";\n            // Move start position to the next char.\n            wordStart++;\n        }\n\n        // Trim end.\n        while (!isALetter(word.charAt(wordEnd)) && wordEnd > wordStart) {\n            // Move end position to the previous char.\n            wordEnd--;\n        }\n\n        // Return word where it starts and ends with letter.\n        return word.substring(wordStart, wordEnd + 1);\n    }\n\n    /**\n     * Check if the word still contains any other non-letter symbol except hyphen '-', if it does the word is invalid,\n     * if not it is valid.\n     *\n     * @param word string - one word\n     *\n     * @return if word is invalid return true, else return false\n     */\n    public static boolean isInvalidWord(String word) {\n        for (int i = 0; i < word.length(); i++) {\n            char curChar = word.charAt(i);\n            if (!isALetter(curChar) && curChar != '-')\n                // If it is non-letter and not '-' - word is invalid.\n                return true;\n        }\n\n        return false;\n    }\n\n    /**\n     * Removes empty values from the array, returns new array that contains only non-empty values.\n     *\n     * @param arr string array\n     *\n     * @return new array without empty strings\n     */\n    public static String[] removeEmptyStrings(String[] arr) {\n        // An array sized to the number of non-empty strings.\n        String[] onlyWords = new String[countNonEmptyStrings(arr)];\n        // Used to track insert position for the array.\n        int position = 0;\n\n        for (int i = 0; i < arr.length; i++) {\n            if (!arr[i].isEmpty()) {\n                // If element is not empty, populate new array.\n                onlyWords[position] = arr[i];\n                position++;\n            }\n        }\n\n        return onlyWords;\n    }\n\n    /**\n     * Counts number of non-empty values in the array.\n     *\n     * @param arr string array\n     *\n     * @return count of non-empty items in the array\n     */\n    public static int countNonEmptyStrings(String[] arr) {\n        int count = 0;\n        for (int i = 0; i < arr.length; i++) {\n            if (!arr[i].isEmpty())\n                count++;\n        }\n\n        return count;\n    }\n\n    /**\n     * Sorts string array in the alphabetic order.\n     *\n     * @param arr string array\n     */\n    public static void sortArray(String[] arr) {\n        for (int i = 0; i < arr.length - 1; i++) {\n            int minIndex = i;\n            for (int j = i + 1; j < arr.length; j++) {\n                if (arr[minIndex].compareTo(arr[j]) > 0) {\n                    minIndex = j;\n                }\n            }\n\n            if (minIndex != i) {\n                String temp = arr[i];\n                arr[i] = arr[minIndex];\n                arr[minIndex] = temp;\n            }\n        }\n    }\n\n    /**\n     * Returns array that contains unique words only. Assumes that the passed array has been sorted.\n     *\n     * @param arr string array\n     *\n     * @return string array that contains unique words\n     */\n    public static String[] getUniqueWords(String[] arr) {\n        // An array sized to the number of unique words.\n        String[] uniqueWords = new String[countUniqueWords(arr)];\n        // Used to track insert position for the array.\n        int position = 0;\n\n        for (int i = 0; i < arr.length; i++) {\n            if (i == 0 || !arr[i].equals(arr[i - 1])) {\n                // If it is first element or the element that is not equals to the previous one, it is unique.\n                uniqueWords[position] = arr[i];\n                position++;\n            }\n        }\n\n        return uniqueWords;\n    }\n\n    /**\n     * Counts number of unique values in the array.\n     *\n     * @param arr string array\n     *\n     * @return count of the unique items in the array\n     */\n    public static int countUniqueWords(String[] arr) {\n        int count = 1;\n        for (int i = 1; i < arr.length; i++) {\n            if (!arr[i].equals(arr[i - 1]))\n                count++;\n        }\n\n        return count;\n    }\n\n    /**\n     * Writes array of words to file.\n     *\n     * @param words string array of words\n     * @param outputFile file to write to\n     */\n    public static void writeToFile(String[] words, File outputFile) throws FileNotFoundException {\n        PrintWriter writer = new PrintWriter(outputFile);\n        for(int i = 0; i < words.length; i++){\n            writer.println(words[i]);\n        }\n\n        writer.close();\n    }\n\n    /**\n     * Check if character is a letter. Assumes that the passed character is set to lowercase.\n     *\n     * @param character character\n     *\n     * @return if it is a letter returns true, if not false\n     */\n    public static boolean isALetter(char character) {\n        return character >= 'a' && character <= 'z';\n    }\n}\n",
      code_analysis: {
        documentation: [
          "Javadoc style comments are used consistently throughout the code.",
          "Comments clearly describe parameters, return values, and the overall program purpose.",
          "Method comments are well-written and easy to understand. ",
          "Header information is included at the top of the program file, including author, ID, date, and a brief description of the program's functionality.",
        ],
        linting_errors: [],
        missing_requirements: [],
        readability: [
          "Code is well-formatted with proper indentation and alignment.",
          "Variable names are descriptive and easy to understand.",
          "Code is well-structured and easy to follow.",
          "The program uses multiple methods, improving code organization and modularity. ",
        ],
        restricted_usage: [],
      },
      filename: "crashbandicoot.java",
      methods: [
        {
          errors: [],
          expected_prototype:
            "public static int countWords(File file) throws FileNotFoundException",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static int countWords(File file) throws FileNotFoundException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String[] getWordsFromFile(File file, int size) throws FileNotFoundException",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static String[] getWordsFromFile(File file, int size) throws FileNotFoundException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static void printWordCountAndLetterFrequency(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void printWordCountAndLetterFrequency(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static int[] getLetterFrequency(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "public static int[] getLetterFrequency(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "public static void cleanWords(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "public static void cleanWords(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String trimNonLetters(String word)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String trimNonLetters(String word)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static boolean isInvalidWord(String word)",
          is_correct: true,
          is_documented: true,
          prototype: "public static boolean isInvalidWord(String word)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String[] removeEmptyStrings(String[] arr)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] removeEmptyStrings(String[] arr)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static int countNonEmptyStrings(String[] arr)",
          is_correct: true,
          is_documented: true,
          prototype: "public static int countNonEmptyStrings(String[] arr)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "public static void sortArray(String[] arr)",
          is_correct: true,
          is_documented: true,
          prototype: "public static void sortArray(String[] arr)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String[] getUniqueWords(String[] arr)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] getUniqueWords(String[] arr)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static int countUniqueWords(String[] arr)",
          is_correct: true,
          is_documented: true,
          prototype: "public static int countUniqueWords(String[] arr)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static void writeToFile(String[] words, File outputFile) throws FileNotFoundException",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void writeToFile(String[] words, File outputFile) throws FileNotFoundException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "public static boolean isALetter(char character)",
          is_correct: true,
          is_documented: true,
          prototype: "public static boolean isALetter(char character)",
          time_complexity: "O(1)",
        },
      ],
      name: "Crash Bandicoot",
      summary: [
        "The program successfully reads words from a file, processes them correctly according to the requirements (handling lowercase conversion, punctuation removal, and invalid characters), sorts them alphabetically using a custom sorting algorithm, removes duplicates, and saves the unique words to an output file.",
        "The program uses multiple methods and adheres to good programming practices.",
        "The total word count and letter frequencies are displayed to the console.",
        "There are no syntax or runtime errors.",
      ],
    },
    {
      code: "/**\n ** Program Name: Lab10\n ** Author: Sonic Hedgehog\n ** Id: 102031\n ** Date: Nov 18, 2024\n */\nimport java.util.Scanner;\nimport java.io.*;\n\npublic class Lab10 {\n    public static void main(String[] args) throws FileNotFoundException {\n        // Scanner to take input from the user for file names\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter the input file name: \");\n        String inFile = sc.nextLine();  // Input file name\n        System.out.print(\"Enter the output file name: \");\n        String outFile = sc.nextLine(); // Output file name\n        sc.close(); // Close the scanner\n\n        // Count the number of words in the input file\n        int count = 0;\n        Scanner countWords = new Scanner(new File(inFile));\n        while (countWords.hasNext()) {\n            count++; // Increment count for each word found\n            countWords.next(); // Read next word\n        }\n        countWords.close(); // Close the scanner\n\n        // Create an array to hold all words from the input file\n        String[] words = new String[count];\n        Scanner wordsScanner = new Scanner(new File(inFile));\n        for (int i = 0; i < count; i++) {\n            words[i] = wordsScanner.next().toLowerCase(); // Convert each word to lowercase and store in array\n        }\n        wordsScanner.close(); // Close the scanner\n\n        // Display the number of words found in the file\n        System.out.println(\"Number of words: \" + count);\n\n        // Count how many times each letter appears in the words\n        char ch;\n        for (int i = 0; i < 26; i++) {\n            ch = (char) ('a' + i); // Get the letter corresponding to the index\n            int letterCount = 0;\n            // Iterate through each word and count occurrences of the letter\n            for (String word : words) {\n                for (int k = 0; k < word.length(); k++) {\n                    if (word.charAt(k) == ch) {\n                        letterCount++; // Increment if the letter matches\n                    }\n                }\n            }\n            // Display the count of the letter in the words\n            System.out.println(ch + \" appears \" + letterCount + \" times.\");\n        }\n\n        // Filter out invalid words (e.g., non-alphabetical characters)\n        String[] filteredWords = filterWords(words);\n        // Sort the filtered words alphabetically\n        String[] sortedWords = wordSorter(filteredWords);\n        // Remove duplicate words from the sorted array\n        String[] uniqueWords = removeDuplicates(sortedWords);\n        // Save the unique words to the output file\n        saveToFile(uniqueWords, outFile);\n    }\n\n    /**\n     * If words have any non-letter symbols in the beginning or at the end of the words, they are removed.\n     * If the word still contains any other non-letter symbol except hyphen '-', it is also removed.\n     * @param words input array of words for filtering\n     * @return new filtered array\n     */\n    public static String[] filterWords(String[] words) {\n        String[] temp = new String[words.length]; // Temporary array to hold filtered words\n        int validCount = 0; // Counter to track the number of valid words\n\n        for (String word : words) {\n            // Trim non-letter characters from the beginning of the word\n            int start = 0;\n            while (start < word.length() && !isLetter(word.charAt(start))) {\n                start++;\n            }\n\n            // Trim non-letter characters from the end of the word\n            int end = word.length() - 1;\n            while (end >= start && !isLetter(word.charAt(end))) {\n                end--;\n            }\n\n            // Build the cleaned word from the valid characters\n            String cleanedWord = \"\";\n            if (start <= end) {\n                for (int i = start; i <= end; i++) {\n                    cleanedWord += word.charAt(i); // Append valid characters\n                }\n            }\n\n            // Check if the cleaned word contains only letters or hyphens\n            boolean isValid = true;\n            for (int i = 0; i < cleanedWord.length(); i++) {\n                char c = cleanedWord.charAt(i);\n                if (!isLetter(c) && c != '-') {\n                    isValid = false; // If non-letter or non-hyphen character found, mark invalid\n                    break;\n                }\n            }\n\n            // Add the valid cleaned word to the result array\n            if (isValid && !cleanedWord.isEmpty()) {\n                temp[validCount++] = cleanedWord;\n            }\n        }\n\n        // Create a new array to hold the final valid words\n        String[] result = new String[validCount];\n        for (int i = 0; i < validCount; i++) {\n            result[i] = temp[i]; // Copy valid words to result array\n        }\n\n        return result;\n    }\n\n    /**\n     * Verifies if something is a letter (doesn't check uppercase because of toLowerCase() earlier).\n     * @param c input letter\n     * @return true or false based on whether c is a letter\n     */\n    public static boolean isLetter(char c) {\n        return (c >= 'a' && c <= 'z');\n    }\n\n    /**\n     * Sorts an array of words alphabetically.\n     * @param words input array of unsorted words\n     * @return new sorted array of words\n     */\n    public static String[] wordSorter(String[] words) {\n        // Create a new array with the same length as the original\n        String[] sortedWords = new String[words.length];\n\n        // Copy elements from the original array to the new one\n        for (int i = 0; i < words.length; i++) {\n            sortedWords[i] = words[i];  // Copy each word into the new array\n        }\n\n        int n = sortedWords.length;\n\n        // Implement selection sort to sort the words alphabetically\n        for (int i = 0; i < n - 1; i++) {\n            int minIndex = i;\n            for (int j = i + 1; j < n; j++) {\n                if (sortedWords[j].compareTo(sortedWords[minIndex]) < 0) {\n                    minIndex = j; // Find the minimum word in the remaining unsorted portion\n                }\n            }\n\n            // Swap the minimum word with the current position\n            String temp = sortedWords[minIndex];\n            sortedWords[minIndex] = sortedWords[i];\n            sortedWords[i] = temp;\n        }\n\n        return sortedWords;\n    }\n\n    /**\n     * Removes any duplicate words in an array.\n     * @param words input array with potential duplicates.\n     * @return new array without duplicates.\n     */\n    public static String[] removeDuplicates(String[] words) {\n        String[] temp = new String[words.length]; // Temporary array to hold unique words\n        int uniqueCount = 0; // Counter to track the number of unique words\n\n        // Check each word for duplicates\n        for (String word : words) {\n            boolean isDuplicate = false;\n            for (int j = 0; j < uniqueCount; j++) {\n                if (word.equals(temp[j])) {\n                    isDuplicate = true; // Mark word as duplicate if it already exists in the temp array\n                    break;\n                }\n            }\n            // Add the word to the result array if it's not a duplicate\n            if (!isDuplicate) {\n                temp[uniqueCount++] = word;\n            }\n        }\n\n        // Create a new array for the unique words\n        String[] result = new String[uniqueCount];\n        for (int i = 0; i < uniqueCount; i++) {\n            result[i] = temp[i]; // Copy unique words to result array\n        }\n\n        return result;\n    }\n\n    /**\n     * Writes every word in an array into a file.\n     * @param words array to write\n     * @param fileName name of file to write to\n     * @throws FileNotFoundException if the file does not exist\n     */\n    public static void saveToFile(String[] words, String fileName) throws FileNotFoundException {\n        PrintWriter writer = new PrintWriter(new File(fileName)); // Create PrintWriter for the output file\n        for (String word : words) {\n            writer.println(word); // Write each word to the file\n        }\n        writer.close(); // Close the writer\n    }\n}\n",
      code_analysis: {
        documentation: [
          "The code includes a header comment with author, ID, date, and program description.",
          "The main method is documented but lacks detailed explanation of its steps.",
          "Several methods lack documentation, particularly filterWords, wordSorter, removeDuplicates, saveToFile.",
        ],
        linting_errors: [],
        missing_requirements: [],
        readability: [
          "The code is somewhat readable, though using more descriptive variable names would improve it.",
          "The use of nested loops in some methods (e.g., counting letter frequencies) could be made more efficient.",
          "Functions are relatively short and specialized to their tasks.",
          "The implementation of selection sort could be made slightly clearer for better readability.",
          "The lack of comments in some critical sections makes understanding the logic difficult.",
        ],
        restricted_usage: [
          "No use of ArrayList detected.",
          "Custom sorting algorithm is used (Selection sort) rather than built-in methods.",
        ],
      },
      filename: "sonichedgehog.java",
      methods: [
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] filterWords(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "public static boolean isLetter(char c)",
          time_complexity: "O(1)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] wordSorter(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] removeDuplicates(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void saveToFile(String[] words, String fileName) throws FileNotFoundException",
          time_complexity: "O(n)",
        },
      ],
      name: "Sonic Hedgehog",
      summary: [
        "The program processes words from an input file, counts letter frequencies, filters out invalid words, sorts the remaining words alphabetically, removes duplicates, and saves the unique words to an output file.",
        "The program handles file input/output correctly and displays letter frequencies.",
        "The use of nested loops for letter frequency counting results in less efficient time complexity.",
        "The filtering logic correctly removes words with invalid characters.",
        "Selection sort is used for sorting words, resulting in O(n^2) time complexity.",
      ],
    },
    {
      code: '//Text File Processor \n//Dry Bones\n//102032\n//Nov 19 2024\n//JDK 1.8\n//Counts number of words and frequency of letters in a text file then creates a new sorted text file based on input file\n\nimport java.io.*;\nimport java.util.*;\n\npublic class Lab10 {\n\n    /**\n     * Main method to prompt user for file names, process words in a text file, \n     * count their frequency and save unique words to an output file in alphabetical order\n     * @throws IOException If an input/output error occurs\n     */\n    public static void main(String[] args) throws IOException {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter the intput file name: ");\n        String inputFileName = scanner.nextLine();\n        // Prompt for output file name\n        System.out.print("Enter the output file name: ");\n        String outputFileName = scanner.nextLine();\n        \n        // Count words in the input file\n        int wordCount = countWordsInFile(inputFileName);\n        System.out.println("Number of words: " + wordCount);\n\n        // Create an array and read words\n        String[] words = new String[wordCount];\n        readWordsFromFile(inputFileName, words);\n\n        // Clean and convert words to lowercase\n        cleanWords(words);\n\n        // Print letter frequency\n        printLetterCount(words);\n\n        // Sort words in alphabetical order\n        sortWords(words);\n\n        // Save unique words to the output file\n        saveUniqueWords(words, outputFileName);\n\n        scanner.close();\n    }\n\n    /**\n     * Counts the number of words in the specified input file.\n     * \n     * @param fileName The name of the input file\n     * @return The number of words in the file\n     * @throws IOException If an input/output error occurs\n     */\n    private static int countWordsInFile(String fileName) throws IOException {\n        BufferedReader reader = new BufferedReader(new FileReader(fileName));\n        int count = 0;\n        String line;\n        while ((line = reader.readLine()) != null) {\n            String[] words = line.split("\\\\s+");\n            count += words.length;\n        }\n        reader.close();\n        return count;\n    }\n\n    /**\n     * Reads words from the specified input file and stores them in the provided array.\n     * \n     * @param fileName The name of the input file\n     * @param words An array to store the words\n     * @throws IOException If an input/output error occurs\n     */\n    private static void readWordsFromFile(String fileName, String[] words) throws IOException {\n        BufferedReader reader = new BufferedReader(new FileReader(fileName));\n        int index = 0;\n        String line;\n        while ((line = reader.readLine()) != null) {\n            String[] lineWords = line.split("\\\\s+");\n            for (String word : lineWords) {\n                words[index++] = word;\n            }\n        }\n        reader.close();\n    }\n\n    /**\n     * Cleans words by converting them to lowercase and removing symbols \n     * from the beginning and end of each word. Words with internal symbols except for hyphens are discarded\n     * @param words An array of words to be cleaned and converted to lowercase\n     */\n    private static void cleanWords(String[] words) {\n        for (int i = 0; i < words.length; i++) {\n            words[i] = words[i].toLowerCase().replaceAll("^[^a-zA-Z]+|[^a-zA-Z]+$", "");\n            if (words[i].matches(".*[^a-zA-Z-].*")) {\n                words[i] = ""; // Remove words with internal symbols except hyphen\n            }\n        }\n    }\n\n    /**\n     * Prints the frequency of each letter (a-z) in the array of words\n     * @param char c \n     * @param words An array of words*/\n    private static void printLetterCount(String[] words) {\n        int[] count = new int[26];\n        for (String word : words) {\n            for (char c : word.toCharArray()) {\n                if (c >= \'a\' && c <= \'z\') {\n                    count[c - \'a\']++;\n                }\n            }\n        }\n        for (int i = 0; i < 26; i++) {\n            System.out.println((char) (\'a\' + i) + ": " + count[i]);\n        }\n    }\n\n    /**\n     * Sorts the array of words in alphabetical order using bubble sort\n     * \n     * @param words An array of words \n     */\n    private static void sortWords(String[] words) {\n        for (int i = 0; i < words.length - 1; i++) {\n            for (int j = 0; j < words.length - i - 1; j++) {\n                if (words[j].compareTo(words[j + 1]) > 0) {\n                    String temp = words[j];\n                    words[j] = words[j + 1];\n                    words[j + 1] = temp;\n                }\n            }\n        }\n    }\n\n    /**\n     * Saves unique words from the array to the output file\n     * add() doesn\'t add words if they are already in the set\n     * equals() method checks if the String is already in the set\n     * \n     * @param words An array of words \n     * @param outputFileName The name of the output file\n     * @throws IOException If an input/output error occurs\n     */\n    private static void saveUniqueWords(String[] words, String outputFileName) throws IOException {\n        Set<String> uniqueWords = new LinkedHashSet<>();\n        for (String word : words) {\n            if (!word.isEmpty()) {\n                uniqueWords.add(word);//calls "word".equals("word") if true the word is not added\n            }\n        }\n\n        BufferedWriter writer = new BufferedWriter(new FileWriter(outputFileName));\n        for (String word : uniqueWords) {\n            writer.write(word);\n            writer.newLine();\n        }\n        writer.close();\n    }\n}\n',
      code_analysis: {
        documentation: [
          "The program is documented well with Javadoc-style comments.",
          "The header information is present.",
          "Comments clearly explain the purpose of each method.",
          "The documentation could be more detailed in places.",
        ],
        linting_errors: [],
        missing_requirements: [],
        readability: [
          "The code is generally readable and well-structured.",
          "Variable and method names could be improved for clarity.",
          "The use of nested loops in the bubble sort algorithm reduces the efficiency of the code.",
          "The logic for removing words with invalid characters is relatively clear.",
          "The code for counting letter frequencies could be more efficient.",
        ],
        restricted_usage: [],
      },
      filename: "drybones.java",
      methods: [
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static int countWordsInFile(String fileName) throws IOException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static void readWordsFromFile(String fileName, String[] words) throws IOException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "private static void cleanWords(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "private static void printLetterCount(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype: "private static void sortWords(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static void saveUniqueWords(String[] words, String outputFileName) throws IOException",
          time_complexity: "O(n)",
        },
      ],
      name: "Dry Bones",
      summary: [
        "The program reads a text file, counts the words and letters and outputs it to the console.",
        "It cleans the words and converts them to lowercase.",
        "Words with internal symbols are discarded.",
        "The program then sorts words alphabetically using bubble sort.",
        "Finally, it saves unique words to an output file.",
      ],
    },
    {
      code: 'import java.io.File;\nimport java.io.FileNotFoundException;\nimport java.io.PrintWriter;\nimport java.util.ArrayList;\nimport java.util.List;\nimport java.util.Scanner;\nimport java.util.Set;\nimport java.util.TreeSet;\n\npublic class Sample {\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n\n        try {\n            // Step 1: Prompt user for file names\n            System.out.print("Enter input file name (with path): ");\n            String inputFileName = scanner.nextLine();\n\n            System.out.print("Enter output file name: ");\n            String outputFileName = scanner.nextLine();\n\n            // Step 2: Open the input file\n            File inputFile = new File("unsorted.txt");\n            if (!inputFile.exists()) {\n                System.out.println("File " + inputFileName + " not found.");\n                return;\n            }\n\n            // Step 3: Read and process words\n            Scanner input = new Scanner(inputFile);\n            List<String> words = readAndProcessWords(input);\n            input.close();\n\n            // Step 4: Count and display letter frequencies\n            int[] letterFrequency = countLetterFrequencies(words);\n            System.out.println("Letter Frequencies:");\n            printLetterFrequencies(letterFrequency);\n\n            // Step 5: Sort words alphabetically and remove duplicates\n            Set<String> uniqueWords = new TreeSet<>(words);\n\n            // Step 6: Save unique words to the output file\n            saveWordsToFile(uniqueWords, outputFileName);\n\n            System.out.println("\\nProcessing complete. Words saved to " + outputFileName);\n\n        } catch (FileNotFoundException e) {\n            System.out.println("Error: " + e.getMessage());\n        } finally {\n            scanner.close();\n        }\n    }\n\n    /**\n     * Reads words from the file, cleans them, and returns a list of valid words.\n     *\n     * @param input Scanner object for the file\n     * @return List of processed words\n     */\n    public static List<String> readAndProcessWords(Scanner input) {\n        List<String> words = new ArrayList<>();\n        while (input.hasNext()) {\n            String word = input.next();\n\n            // Remove non-letter symbols from the beginning and end of the word\n            word = word.replaceAll("^[^a-zA-Z]+|[^a-zA-Z]+$", "");\n\n            // Validate the word (only allow letters and hyphens)\n            if (!word.matches("^[a-zA-Z]+(-[a-zA-Z]+)?$")) {\n                continue; // Skip invalid words\n            }\n\n            // Convert to lowercase\n            word = word.toLowerCase();\n\n            // Add cleaned word to the list\n            words.add(word);\n        }\n        return words;\n    }\n\n    /**\n     * Counts the frequency of each letter in the list of words.\n     *\n     * @param words List of processed words\n     * @return Array containing letter frequencies (\'a\' to \'z\')\n     */\n    public static int[] countLetterFrequencies(List<String> words) {\n        int[] letterFrequency = new int[26];\n        for (String word : words) {\n            for (char c : word.toCharArray()) {\n                if (Character.isLetter(c)) {\n                    letterFrequency[c - \'a\']++;\n                }\n            }\n        }\n        return letterFrequency;\n    }\n\n    /**\n     * Prints the frequencies of each letter (\'a\' to \'z\') to the console.\n     *\n     * @param letterFrequency Array of letter frequencies\n     */\n    public static void printLetterFrequencies(int[] letterFrequency) {\n        for (char c = \'a\'; c <= \'z\'; c++) {\n            System.out.println(c + ": " + letterFrequency[c - \'a\']);\n        }\n    }\n\n    /**\n     * Saves a set of unique, sorted words to the specified output file.\n     *\n     * @param words          Set of unique words\n     * @param outputFileName Name of the output file\n     */\n    public static void saveWordsToFile(Set<String> words, String outputFileName) {\n        try (PrintWriter writer = new PrintWriter("sorted_unique.txt")) {\n            for (String word : words) {\n                writer.println(word);\n            }\n        } catch (FileNotFoundException e) {\n            System.out.println("Error writing to file: " + outputFileName);\n        }\n    }\n}\n\n',
      code_analysis: {
        documentation: [
          "The program has some comments but they are insufficient for all the methods and operations.",
          "Comments are not always clear or detailed enough.",
        ],
        linting_errors: [],
        missing_requirements: [
          "The program does not prompt the user for the input and output filenames. It uses a fixed input file: unsorted.txt",
          'The program saves the unique, sorted words to a file named "sorted_unique.txt" instead of allowing the user to specify the output filename.',
          "The program uses the ArrayList, violating the assignment restriction.",
        ],
        readability: [
          "The code is relatively easy to follow but could benefit from more descriptive variable and method names.",
          "The use of regular expressions for cleaning words is concise but could be more explicit for better understanding.",
          "Some methods perform multiple operations, decreasing clarity.",
        ],
        restricted_usage: [
          "The program uses ArrayList, which violates a stated requirement.",
        ],
      },
      filename: "spyrothedragon.java",
      methods: [
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static List<String> readAndProcessWords(Scanner input)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static int[] countLetterFrequencies(List<String> words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void printLetterFrequencies(int[] letterFrequency)",
          time_complexity: "O(1)",
        },
        {
          errors: [],
          expected_prototype: "N/A",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void saveWordsToFile(Set<String> words, String outputFileName)",
          time_complexity: "O(n)",
        },
      ],
      name: "Spyro the Dragon",
      summary: [
        "The program reads words from a hardcoded file (unsorted.txt) and processes them, removing punctuation and converting to lowercase.",
        "The program counts letter frequencies, sorts words alphabetically using TreeSet (which automatically handles uniqueness and sorting), and saves the unique sorted words to a file (sorted_unique.txt).",
        "The program does not adhere to requirements for user input of filenames and uses of ArrayList.",
      ],
    },
  ],
};
