export class StringExtensions {
  /**
   * Truncates a string if its lenght is higher than the max lenght
   * @param maxLength String will be truncated if its length is higher than this value.
   */
  public static truncate(text: string, maxLength: number): string {
    if (text == null) {
      return text;
    }
    if (text.length > maxLength) {
      return text.substr(0, maxLength) + ' ...';
    } else {
      return text;
    }
  }
}
