import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CardCollapse from '~/components/cards/CardCollapse'
import Flex from '~/components/display/Flex'
import Select from '~/components/inputs/Select'
import Body from '~/components/typography/Body'
import {
  GetMyStudyMaterialsDocument,
  MyStudyMaterials_StudyMaterialFragment,
} from '~/types/api'
import { AttachmentFile } from '~/types/lectures.type'
import { StudyMaterialAttachmentViewer } from './StudyMaterialAttachmentViewer'
import NoData from '~/components/utils/NoData'
import { COLORS } from '~/configs/theme'

export function StudyMaterials() {
  const { previousData, data = previousData } = useQuery(
    GetMyStudyMaterialsDocument,
  )
  const [selectedStudyMaterial, setSelectedStudyMaterial] =
    useState<MyStudyMaterials_StudyMaterialFragment | null>(null)

  const studyMaterials = useMemo(() => data?.studyMaterials ?? [], [data])
  const materialAttachments = useMemo(
    () => selectedStudyMaterial?.materialAttachments ?? [],
    [selectedStudyMaterial],
  )

  const handleSelectStudyMaterial = useCallback(
    (value?: string) => {
      const studyMaterial = studyMaterials.find(({ id }) => id === value)
      if (studyMaterial) {
        setSelectedStudyMaterial(studyMaterial)
      }
    },
    [studyMaterials],
  )

  useEffect(() => {
    if (studyMaterials.length > 0) {
      handleSelectStudyMaterial(studyMaterials[0].id)
    }
  }, [studyMaterials, handleSelectStudyMaterial])

  if (studyMaterials.length === 0) {
    return (
      <NoData
        description={
          <Body color={COLORS.FONT['30']} size={14}>
            등록된 개별자료가 없습니다.
          </Body>
        }
        disableWrapper
      />
    )
  }
  return (
    <div className="space-y-2">
      <Select
        className="!border-blue-400"
        value={selectedStudyMaterial?.id}
        options={studyMaterials.map((item) => ({
          label: item.title,
          value: item.id,
        }))}
        onChange={handleSelectStudyMaterial}
      />

      {materialAttachments.map((item) => (
        <CardCollapse
          className="!rounded-2xl"
          title={
            <Flex direction="column" gap={4} justify="center">
              <Body size={14} weight="bold">
                {item.name}
              </Body>
            </Flex>
          }
        >
          <div>
            <StudyMaterialAttachmentViewer
              attachment={item.attachment as unknown as AttachmentFile}
            />
          </div>
        </CardCollapse>
      ))}
    </div>
  )
}
