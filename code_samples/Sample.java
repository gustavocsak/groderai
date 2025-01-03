/**
 * The Sample program implements the methods described in Assignment 3 
 * 
 * @author Gustavo
 * @since 2024-12-10
 */
public class Sample {

  /**
   * Returns true if the array contains the given character
   * 
   * @param arr the array to be searched
   * @param c the character to search for
   * @return {@code true} if the array contains the character {@code c}, {@code false} otherwise
   */
  public boolean containsCharacter(char[] arr, char c) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == c) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if the array contains a duplicate character
   * precondition: arr is sorted
   * 
   * @param arr the array to be searched
   * @return {@code true} if the array contains a duplicate character, {@code false} otherwise
   */
  public boolean containsDuplicateSorted(char[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      if (arr[i] == arr[i + 1]) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if the array contains a duplicate character
   * 
   * @param arr the array to be searched
   * @return {@code true} if the array contains a duplicate character, {@code false} otherwise
   */
  public boolean containsDuplicate(char[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
      for (int j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Converts all characters in the array to lowercase.
   * Non-letter characters are ignored.
   * 
   * @param arr array of characters to be converted
   */
  public void toLowercaseArray(char[] arr) {
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] >= 'A' && arr[i] <= 'Z') {
        arr[i] = toLowercase(arr[i]);
      }
    }
  }

  /**
   * Checks if the given character is a letter.
   * 
   * @param c the character to be checked
   * @return {@code true} if the character is a letter, {@code false} otherwise
   */
  public boolean isLetter(char c) {
    return ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'));
  }

  /**
   * Compares two character arrays to determine if they contain the exact same letters 
   * in any order and any case, with the same frequency.
   * 
   * @param left the first character array to compare
   * @param right the second character array to compare
   * @return {@code true} if the arrays contain the same letters with the same frequency, 
   *         {@code false} otherwise
   */
  public boolean isEqual(char[] left, char[] right) {
    final int LETTERS = 26;
    int[] leftFrequency = new int[LETTERS];
    int[] rightFrequency = new int[LETTERS];

    for (int i = 0; i < left.length; i++) {
      char c = left[i];
      if (isLetter(c)) {
        int index = toLowercase(c) - 'a';
        leftFrequency[index]++;
      }
    }

    for (int i = 0; i < right.length; i++) {
      char c = right[i];
      if (isLetter(c)) {
        int index = toLowercase(c) - 'a';
        rightFrequency[index]++;
      }
    }

    for (int i = 0; i < LETTERS; i++) {
      if (leftFrequency[i] != rightFrequency[i]) {
        return false;
      }
    }

    return true;

  }

  /**
   * Converts the given character to lowercase if it is an uppercase letter. 
   * If the character is already in lowercase or is not a letter, it is returned unchanged.
   *
   * @param c the character to be converted to lowercase
   * @return the lowercase equivalent of {@code c} if it is an uppercase letter; 
   *         otherwise, returns the original character
   */
  public char toLowercase(char c) {
    if (c >= 'A' && c <= 'Z') {
      return (char)(c + ('a' - 'A'));
    } else {
      return c;
    }
  }
}
