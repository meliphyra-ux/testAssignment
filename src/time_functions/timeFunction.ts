export const calculateDaysAfterCreation = (createdAt: string) : number => {
    return Math.floor(
        (Date.now() - Date.parse(createdAt)) / 1000 / 60 / 60 / 24
      );
}