import clsx from 'clsx'

interface Props {
  className?: string
  vertical?: boolean
}

function SectionDivider({ className, vertical }: Props) {
  return vertical ? (
    <div className={clsx('w-1 bg-gray-50', className)} />
  ) : (
    <div className={clsx('h-1 bg-gray-50', className)} />
  )
}

export default SectionDivider
