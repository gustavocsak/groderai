export type CodeAnalysis = {
  documentation: string[];
  linting_errors: string[];
  missing_requirements: string[];
  readability: string[];
  restricted_usage: string[];
};

export type Metadata = {
  description: string;
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
};

export type ApiResponse = {
  metadata: Metadata;
  students: Student[];
};

export const testdata = {
  metadata: {
    description:
      "This program reads a text file word by word, saves it in an array of Strings, processes the words, sorts the words in alphabetical order, keeps only one instance of each word and saves them in sorted order in another file.",
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
      "Use Javadoc comment style and comment your class",
      "describe the parameter(s) required for each method",
      "describe the return value (or output) for each method",
      "describe the purpose of the program",
      "Comment should be placed on the top of the method",
      "indentation & alignment",
      "Do not use any magic numbers and please use variables for any calculations",
    ],
    title: "Lab10",
  },
  students: [
    {
      code_analysis: {
        documentation: [
          "Javadoc style comments are used throughout the code.",
          "Each method has a detailed description of its purpose, parameters, and return value.",
          "The class is documented with a description of the program's purpose and author information.",
          "Comments are placed at the top of each method",
        ],
        linting_errors: [],
        missing_requirements: [],
        readability: [
          "Code is well-formatted with consistent indentation and spacing.",
          "Variable names are descriptive and meaningful.",
          "The logic is clear and easy to follow.",
          "Code is well-commented and easy to understand",
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
    },
    {
      code_analysis: {
        documentation: [
          "The code includes a header comment with the program name, author, ID, and date.",
          "There are comments explaining certain sections of the code, but not in Javadoc style for all methods.",
          "Some methods lack proper documentation or clear explanations of their purpose and functionality",
        ],
        linting_errors: [],
        missing_requirements: [
          "The program does not use Javadoc style comments for all methods.",
          "The program does not check for and handle exceptions properly. The try-catch block could be improved for better error handling.",
          "The program takes too long to run in cases of a large number of words, causing the program to fail.",
        ],
        readability: [
          "The code uses descriptive variable names, but some parts could be more concise.",
          "The logic for filtering words is complex and could be improved for better readability.",
          "Some of the comments do not add value and are not necessary.",
        ],
        restricted_usage: [
          "The program uses the Scanner class repeatedly, which might impact the efficiency and performance for large files.",
          "The program fails to handle the cases of incorrect user input and improper file access.",
        ],
      },
      filename: "sonichedgehog.java",
      methods: [
        {
          errors: [],
          expected_prototype:
            "public static String[] filterWords(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] filterWords(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype: "public static boolean isLetter(char c)",
          is_correct: true,
          is_documented: true,
          prototype: "public static boolean isLetter(char c)",
          time_complexity: "O(1)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String[] wordSorter(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] wordSorter(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype:
            "public static String[] removeDuplicates(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "public static String[] removeDuplicates(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype:
            "public static void saveToFile(String[] words, String fileName) throws FileNotFoundException",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void saveToFile(String[] words, String fileName) throws FileNotFoundException",
          time_complexity: "O(n)",
        },
      ],
      name: "Sonic Hedgehog",
    },
    {
      code_analysis: {
        documentation: [
          "The code includes a header comment with program information.",
          "Methods have comments explaining their purpose, but not in Javadoc style.",
          "Some comments could be more descriptive and informative.",
          "The code lacks Javadoc-style comments for most of the methods which makes it hard to understand the methods' purpose and parameters.",
        ],
        linting_errors: [],
        missing_requirements: [
          "The code does not handle potential exceptions during file operations which is a major flaw.",
          "The code should be improved to handle cases where the input file might not be found or might be empty",
          "The code is not efficient and it might take a long time to sort arrays of larger sizes.  The bubble sort algorithm has O(n^2) complexity which is very inefficient. ",
        ],
        readability: [
          "Code is generally readable but could benefit from more consistent formatting and spacing.",
          "The use of regular expressions in cleanWords() is concise but may not be easy to understand for everyone.",
          "The logic for handling words with internal symbols could be made clearer.",
        ],
        restricted_usage: [
          "The code uses a Set (LinkedHashSet) to store unique words, which might not be allowed according to assignment restrictions.",
          "The program uses bubble sort for sorting which is inefficient for large input files",
        ],
      },
      filename: "drybones.java",
      methods: [
        {
          errors: [],
          expected_prototype:
            "private static int countWordsInFile(String fileName) throws IOException",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static int countWordsInFile(String fileName) throws IOException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "private static void readWordsFromFile(String fileName, String[] words) throws IOException",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static void readWordsFromFile(String fileName, String[] words) throws IOException",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "private static void cleanWords(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "private static void cleanWords(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "private static void printLetterCount(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "private static void printLetterCount(String[] words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype: "private static void sortWords(String[] words)",
          is_correct: true,
          is_documented: true,
          prototype: "private static void sortWords(String[] words)",
          time_complexity: "O(n^2)",
        },
        {
          errors: [],
          expected_prototype:
            "private static void saveUniqueWords(String[] words, String outputFileName) throws IOException",
          is_correct: true,
          is_documented: true,
          prototype:
            "private static void saveUniqueWords(String[] words, String outputFileName) throws IOException",
          time_complexity: "O(n)",
        },
      ],
      name: "Dry Bones",
    },
    {
      code_analysis: {
        documentation: [
          "The code lacks comprehensive documentation, especially for methods.  Comments are sparse and do not provide sufficient explanations of the code's functionality.",
          "There are very few comments that describe purpose, parameters, and return values of methods.",
        ],
        linting_errors: [
          "The code uses ArrayList, which is not allowed according to the assignment instructions.",
          "The code uses TreeSet, which is a Java library method for sorting.",
        ],
        missing_requirements: [
          "The program does not check for and handle exceptions properly.",
          "The program uses Java's built-in sorting capabilities (TreeSet).",
          "The program does not save the unique words to the output file properly. It saves the words to a hardcoded file name instead of using the user-specified output file name.",
          "The program does not prompt the user for input and output filenames.",
          "The program does not provide feedback to the user on whether the process was successful.  This program does not meet most of the requirements of the assignment and should be considered incomplete.",
        ],
        readability: [
          "The code is not well-organized and lacks clear structure. The methods are not well separated.",
          "The logic is hard to follow in several places, and the code could be made more concise and efficient.",
          "The code's functionality is unclear and difficult to understand due to the lack of comments.",
        ],
        restricted_usage: [
          "The code uses ArrayList and TreeSet which are not allowed according to the assignment instructions.",
        ],
      },
      filename: "spyrothedragon.java",
      methods: [
        {
          errors: [],
          expected_prototype:
            "public static List<String> readAndProcessWords(Scanner input)",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static List<String> readAndProcessWords(Scanner input)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static int[] countLetterFrequencies(List<String> words)",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static int[] countLetterFrequencies(List<String> words)",
          time_complexity: "O(n)",
        },
        {
          errors: [],
          expected_prototype:
            "public static void printLetterFrequencies(int[] letterFrequency)",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void printLetterFrequencies(int[] letterFrequency)",
          time_complexity: "O(1)",
        },
        {
          errors: [],
          expected_prototype:
            "public static void saveWordsToFile(Set<String> words, String outputFileName)",
          is_correct: true,
          is_documented: true,
          prototype:
            "public static void saveWordsToFile(Set<String> words, String outputFileName)",
          time_complexity: "O(n)",
        },
      ],
      name: "Spyro the Dragon",
    },
  ],
};
