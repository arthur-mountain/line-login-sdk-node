export const getRandNumBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const handeError = (
  err: LINE.ErrorResponse
): MAIN.ErrorMessage => {
  return {
    error: err?.error,
    message: err?.error_description
  }
}