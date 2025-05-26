import { Skeleton } from 'antd'

import Flex from '~/components/display/Flex.tsx'

function NotificationLoading() {
  return (
    <Flex direction="column" gap={8}>
      <Skeleton
        title={{
          style: { width: '100%', height: 74, borderRadius: 16 },
        }}
        paragraph={false}
        active
      />
      <Skeleton
        title={{
          style: { width: '100%', height: 74, borderRadius: 16 },
        }}
        paragraph={false}
        active
      />
      <Skeleton
        title={{
          style: { width: '100%', height: 74, borderRadius: 16 },
        }}
        paragraph={false}
        active
      />
    </Flex>
  )
}

export default NotificationLoading
