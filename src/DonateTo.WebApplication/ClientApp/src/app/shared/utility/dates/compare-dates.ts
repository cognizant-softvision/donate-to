/**
 * Compares two Date objects and returns e number value that represents
 * @param date1 First date object to compare.
 * @param date2 Second date object to compare.
 */
export function compareDate(date1: Date | undefined, date2: Date | undefined): CompareDateResult {
  if (date1 && date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const same = d1.getTime() === d2.getTime();
    if (same) {
      return CompareDateResult.Equals;
    }

    if (d1 > d2) {
      return CompareDateResult.Greater;
    }

    if (d1 < d2) {
      return CompareDateResult.Less;
    }
  } else if (!date1 && !date2) {
    return CompareDateResult.Equals;
  } else if (date1 && !date2) {
    return CompareDateResult.Greater;
  } else {
    return CompareDateResult.Less;
  }
}

export enum CompareDateResult {
  Greater = 1,
  Less = -1,
  Equals = 0,
}
