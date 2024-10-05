import { useTheme } from '../components/ThemeProvider';

export const useThemedStyles = () => {
  const { theme } = useTheme();

  const getThemedClass = (darkClass: string, lightClass: string) => {
    return theme === 'dark' ? darkClass : lightClass;
  };

  return { getThemedClass };
};
