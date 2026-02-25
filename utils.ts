
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'এইমাত্র';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${toBanglaNumber(diffInMinutes)} মিনিট আগে`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${toBanglaNumber(diffInHours)} ঘণ্টা আগে`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${toBanglaNumber(diffInDays)} দিন আগে`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${toBanglaNumber(diffInMonths)} মাস আগে`;
};

export const toBanglaNumber = (n: number | string): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return n.toString().replace(/\d/g, (digit) => banglaDigits[parseInt(digit)]);
};
