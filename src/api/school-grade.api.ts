import { gql } from '@apollo/client';

import { appolo } from '~/utils/apollo.util.ts';

import type {
  SchoolGrade,
  SchoolGradeBody,
  SchoolGradeUpdateBody,
  SchoolPagination,
} from '~/types/school-grades.type.ts';

export const getSchoolGrades = () => {
  return appolo.query<{ mySchoolReportCards: SchoolGrade[] }>({
    query: gql`
      query MySchoolReportCards {
        mySchoolReportCards {
          id
          grade
          level
          percentage
          rank
          score
          term
          totalCount
          type
          school {
            id
            name
            type
          }
          attachment {
            createdAt
            filename
            id
            mimeType
            size
            updatedAt
            url
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
  });
};

export const createSchoolGrade = (body: SchoolGradeBody) => {
  return appolo.mutate({
    mutation: gql`
      mutation CreateUserSchoolReportCard(
        $input: ClientCreateUserSchoolReportCardInput!
      ) {
        createUserSchoolReportCard(input: $input) {
          attachment {
            createdAt
            filename
            id
            mimeType
            size
            updatedAt
            url
          }
          id
          grade
          level
          percentage
          rank
          score
          term
          totalCount
          type
        }
      }
    `,
    variables: { input: body },
  });
};

export const updateSchoolGrade = (body: SchoolGradeUpdateBody) => {
  return appolo.mutate({
    mutation: gql`
      mutation UpdateUserSchoolReportCard(
        $input: ClientUpdateUserSchoolReportCardInput!
      ) {
        updateUserSchoolReportCard(input: $input) {
          id
        }
      }
    `,
    variables: { input: body },
  });
};

export const getSchools = (nameContains: string) => {
  return appolo.query<{ schoolPagination: SchoolPagination }>({
    query: gql`
      query SchoolPagination($filter: SchoolFilterInput) {
        schoolPagination(filter: $filter) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              name
              type
            }
          }
        }
      }
    `,
    fetchPolicy: 'no-cache',
    variables: { filter: { nameContains } },
  });
};
