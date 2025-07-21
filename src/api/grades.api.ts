import { gql } from '@apollo/client'

import { appolo } from '~/utils/apollo.util.ts'

import type { GradeType, LectureGradeDetail } from '~/types/grades.type.ts'

export const getLectureGrades = (myLectureId: string, gradeType: GradeType) => {
  return appolo.query<{ myLecture: LectureGradeDetail }>({
    query: gql`
      query MyLecture($myLectureId: ID!, $gradeType: GradeType!) {
        myLecture(id: $myLectureId) {
          id
          title

          # 성적 항목별 "Comment"
          myLabelComments {
            labelId
            comment
          }

          # 수업성적의 성적 항목들 모음
          gradeFormLabels(gradeType: $gradeType) {
            id
            type # 과제성적, 테스트, 진도, 오늘의 과제 (지윤T모의고사는 과제성적만 있음)
            value # 성적 항목 라벨 이름값 (ex. 단어, 리스닝, 구문, 어법 ...)
          }

          lessons {
            date

            attachment {
              mimeType
              id
              size
              url
              filename
              createdAt
              updatedAt
            }

            myLessonGrade(gradeType: $gradeType) {
              comment
              attendanceStatus
              supplementary
              data {
                id
                label
                maxValue
                type
                value
                value2
              }
              gradeType
              id
              createdAt
              updatedAt
            }

            topThirtyPercentGrades(gradeType: $gradeType) {
              labelId
              value
              __typename
            }

            topGrades(gradeType: $gradeType) {
              labelId
              value
              __typename
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { myLectureId, gradeType },
  })
}
