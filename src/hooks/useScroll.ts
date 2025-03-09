import { SCROLL_BASE_ID } from '~/layouts/ScreenBase.tsx';

interface Props {
  id?: string;
  className?: string;
  selector?: string;
}

export type ScrollBehavior = 'auto' | 'instant' | 'smooth';

function useScroll(props?: Props) {
  const getScrollElement = () => {
    if (props?.id) {
      return document.getElementById(props.id);
    }

    if (props?.className) {
      return document.getElementsByClassName(props.className)[0];
    }

    if (props?.selector) {
      return document.querySelector(props.selector);
    }

    return document.getElementById(SCROLL_BASE_ID);
  };

  const getCurrentPosition = () => {
    const scrollBase = getScrollElement();
    console.log('SCROLL -- ', scrollBase);
    return scrollBase?.scrollTop;
  };

  const scrollTo = (top: number, behavior: ScrollBehavior = 'instant') => {
    const scrollBase = getScrollElement();
    scrollBase?.scrollTo({ top, behavior });
  };

  const reset = () => {
    const scrollBase = getScrollElement();
    scrollBase?.scrollTo({ top: 0 });
  };

  return { getCurrentPosition, scrollTo, reset };
}

export default useScroll;
