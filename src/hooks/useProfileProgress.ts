export const useProfileProgress = (sections: Record<string, any>) => {
  const completed = Object.values(sections).filter((v) => Boolean(v)).length;
  const total = Object.keys(sections).length;

  const progress = Math.round((completed / total) * 100);

  const missingSections = Object.entries(sections)
    .filter(([_, val]) => !val)
    .map(([key]) => key);

  return { progress, completed, total, missingSections };
};
