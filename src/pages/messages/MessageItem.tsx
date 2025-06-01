import clsx from 'clsx'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import ButtonAttachment from '~/components/notifications/ButtonAttachment'
import type { UserChatFragment } from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'

export interface MessageItemProps {
  userChat: UserChatFragment
}

export function MessageItem({ userChat }: MessageItemProps) {
  const isTeacher = useMemo(() => !!userChat.administrator, [userChat])

  const name = useMemo(() => {
    if (userChat.administrator) {
      return userChat.administrator.name
    }
    return userChat.user.name
  }, [userChat.administrator, userChat.user.name])

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 px-1 text-[13px]">
        <div className="font-medium">{name}</div>
        <div className="text-gray-400">
          {dayjs(userChat.createdAt).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>

      <div
        className={clsx('rounded-lg px-3 py-3 ', {
          'border-blue-100 border bg-blue-50/50': isTeacher,
          'bg-white': !isTeacher,
        })}
        style={{
          boxShadow: '0px 4px 20px 0px rgba(206, 218, 241, 0.4)',
        }}
      >
        <div className="whitespace-pre-wrap">{userChat.message}</div>

        {userChat.attachments.length > 0 &&
          userChat.attachments.map((file, idx) => (
            <ButtonAttachment
              key={idx}
              attachment={file as unknown as AttachmentFile}
            />
          ))}
      </div>
    </div>
  )
}
