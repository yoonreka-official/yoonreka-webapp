import type { CSSProperties, PropsWithChildren } from 'react';

export interface FlexProps extends PropsWithChildren {
  id?: string;
  className?: string;
  style?: CSSProperties;

  direction?: CSSProperties['flexDirection'];
  flex?: CSSProperties['flex'];
  gap?: CSSProperties['gap'];
  inline?: boolean;
  items?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  shrink?: CSSProperties['flexShrink'];
  wrap?: CSSProperties['flexWrap'];

  height?: CSSProperties['height'];
}

function Flex({
  id,
  children,
  className,
  style,
  direction,
  flex,
  gap,
  inline,
  shrink,
  wrap,
  items,
  justify,
  height,
}: FlexProps) {
  return (
    <div
      id={id}
      className={className}
      style={{
        alignItems: items,
        display: inline ? 'inline-flex' : 'flex',
        flex,
        flexDirection: direction,
        flexShrink: shrink,
        flexWrap: wrap,
        gap,
        justifyContent: justify,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Flex;
