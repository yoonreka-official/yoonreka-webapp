import { SCROLL_BASE_ID } from '~/layouts/ScreenBase.tsx';

function useScroll() {
  const reset = () => {
    const scrollBase = document.getElementById(SCROLL_BASE_ID);
    scrollBase?.scrollTo({ top: 0 });
  };

  return { reset };
}

export default useScroll;
