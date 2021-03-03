export const wait = (ms: number) => new Promise((_, reject) => setTimeout(reject, ms, new Error(`Timeout after ${ms} ms`)))

export const convertUid = (uid: any) => {
  return +uid
}