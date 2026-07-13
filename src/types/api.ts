import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: string; output: string; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** A field whose value conforms to the standard phone number format. */
  PhoneNumber: { input: any; output: any; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: number; output: number; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: string; output: string; }
};

export type AdminAdministratorFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<AdministratorRole>>;
};

export type AdminApplyLessonVideoLocalHlsInput = {
  id: Scalars['ID']['input'];
  playlistFileId: Scalars['ID']['input'];
  segmentFileIds: Array<Scalars['ID']['input']>;
  variantPlaylistFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminBookFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCreateAdministratorInput = {
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 전화번호 */
  phone: Scalars['PhoneNumber']['input'];
};

export type AdminCreateBookInput = {
  memo?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type AdminCreateExamInput = {
  answerFileId?: InputMaybe<Scalars['ID']['input']>;
  answerFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  category?: InputMaybe<Scalars['String']['input']>;
  cutline?: InputMaybe<Scalars['Float']['input']>;
  displaySettings?: InputMaybe<ExamDisplaySettingsInput>;
  isRetest?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  levelCuts?: InputMaybe<Array<ExamLevelCutInput>>;
  maxScore?: InputMaybe<Scalars['Float']['input']>;
  originExamId?: InputMaybe<Scalars['ID']['input']>;
  questionFileId?: InputMaybe<Scalars['ID']['input']>;
  questionFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  status?: InputMaybe<ExamStatus>;
  title: Scalars['String']['input'];
};

export type AdminCreateLectureGradeFormCandidateInput = {
  labels: Array<LectureGradeFormLabelInput>;
  title: Scalars['String']['input'];
};

export type AdminCreateLectureInput = {
  /** 소속교재 (id) */
  bookId?: InputMaybe<Scalars['ID']['input']>;
  /** 수업 색상 */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 수업 기본 가격 */
  defaultPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 수업 종료 일자 */
  endDate: Scalars['Date']['input'];
  /** 수업 기타 설명 */
  etc?: InputMaybe<Scalars['String']['input']>;
  /** 학년 */
  grade: Scalars['Int']['input'];
  /** 수업 장소 */
  place?: InputMaybe<Scalars['String']['input']>;
  /** 소속학교 (id) */
  schoolId: Scalars['ID']['input'];
  /** 수업 시작 일자 */
  startDate: Scalars['Date']['input'];
  /** 수업 담당 강사 (id) */
  teacherIds: Array<Scalars['ID']['input']>;
  /** 수업 시간 계획 */
  timePlannings: Array<LectureTimePlanningInput>;
  /** 수업명 */
  title: Scalars['String']['input'];
  /** 학생 (id) */
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminCreateLectureInvoiceInput = {
  bookIds: Array<Scalars['ID']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  isRepeat: Scalars['Boolean']['input'];
  lectureId: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  payDueDay: Scalars['Int']['input'];
  price: Scalars['Int']['input'];
  type: InvoiceType;
  userId: Scalars['ID']['input'];
};

export type AdminCreateLessonVideoInput = {
  chapters?: InputMaybe<Array<LessonVideoChapterInput>>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  materialIds: Array<Scalars['ID']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  sourceType: LessonVideoSourceType;
  title: Scalars['String']['input'];
  visibility?: InputMaybe<LessonVideoVisibility>;
  youtubeVideoId?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCreateMaterialInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  lectureIds: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminCreateNoticeInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  lectureIds: Array<Scalars['ID']['input']>;
  link?: InputMaybe<Scalars['URL']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminCreateSchoolInput = {
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: SchoolType;
};

export type AdminCreateStudyMaterialInput = {
  description: Scalars['String']['input'];
  lectureIds: Array<Scalars['ID']['input']>;
  materialAttachments: Array<StudyMaterialAttachmentInput>;
  title: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminCreateTeacherInput = {
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 전화번호 */
  phone?: InputMaybe<Scalars['PhoneNumber']['input']>;
};

export type AdminCreateUserChatInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type AdminCreateUserInput = {
  /** 생년월일 */
  birthDate: Scalars['Date']['input'];
  /** 고유 번호 */
  code: Scalars['String']['input'];
  /** 성별 */
  gender: Gender;
  lectureIds: Array<Scalars['ID']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 부모 이름 */
  parentName?: InputMaybe<Scalars['String']['input']>;
  /** 부모 전화번호 */
  parentPhone?: InputMaybe<Scalars['PhoneNumber']['input']>;
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 회비 예정일 */
  payDueDay?: InputMaybe<Scalars['Int']['input']>;
  /** 전화번호 */
  phone: Scalars['PhoneNumber']['input'];
  /** 학원 등록일 */
  registeredDate: Scalars['Date']['input'];
  /** 소속학교 (id) */
  schoolId: Scalars['ID']['input'];
  /** 상태 */
  state: UserState;
};

export type AdminCreateWorkLogInput = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endTime?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type AdminDeleteUserFromLectureInput = {
  lectureId: Scalars['ID']['input'];
  /** 학생 (id) */
  userId: Scalars['ID']['input'];
};

export type AdminExamDocumentFileClassification = {
  __typename?: 'AdminExamDocumentFileClassification';
  answerCandidateCount: Scalars['Int']['output'];
  confidence: Scalars['Float']['output'];
  containsAnswerCandidates: Scalars['Boolean']['output'];
  extractedTextLength: Scalars['Int']['output'];
  fileId: Scalars['ID']['output'];
  filename: Scalars['String']['output'];
  reasons: Array<Scalars['String']['output']>;
  role: ExamDocumentFileRole;
};

export type AdminExamFilterInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  isRetest?: InputMaybe<Scalars['Boolean']['input']>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lessonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  statuses?: InputMaybe<Array<ExamStatus>>;
};

export type AdminExamQuestionCandidate = {
  __typename?: 'AdminExamQuestionCandidate';
  allowedAnswers?: Maybe<Array<Scalars['String']['output']>>;
  answer: Scalars['String']['output'];
  confidence: Scalars['Float']['output'];
  no: Scalars['Int']['output'];
  point: Scalars['Float']['output'];
  questionType: ExamQuestionType;
  reasons: Array<Scalars['String']['output']>;
  sourceFileId: Scalars['ID']['output'];
  sourceFilename: Scalars['String']['output'];
  unit?: Maybe<Scalars['String']['output']>;
};

export type AdminExamQuestionInput = {
  allowedAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  answer: Scalars['String']['input'];
  no: Scalars['Int']['input'];
  point: Scalars['Float']['input'];
  questionType: ExamQuestionType;
  recognitionRegions?: InputMaybe<Array<ExamQuestionRecognitionRegionInput>>;
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type AdminExamStatistics = {
  __typename?: 'AdminExamStatistics';
  /** 응시자 수 */
  applicants: Scalars['Int']['output'];
  /** 점수대별 인원 (만점 대비 5구간) */
  histogram: Array<Scalars['Int']['output']>;
  /** 최고점 */
  max?: Maybe<Scalars['Float']['output']>;
  /** 평균 */
  mean?: Maybe<Scalars['Float']['output']>;
  /** 표준편차 */
  stddev?: Maybe<Scalars['Float']['output']>;
  /** 상위 10% 평균 */
  topTenPercentMean?: Maybe<Scalars['Float']['output']>;
};

export type AdminInquiryFilterInput = {
  answered?: InputMaybe<Scalars['Boolean']['input']>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  whoes?: InputMaybe<Array<InquiryWho>>;
};

export type AdminLectureFilterInput = {
  grades?: InputMaybe<Array<Scalars['Int']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  schoolIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  states?: InputMaybe<Array<LectureState>>;
  teacherIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminLectureInvoiceFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  methods?: InputMaybe<Array<InvoiceMethod>>;
  states?: InputMaybe<Array<LectureInvoiceState>>;
  types?: InputMaybe<Array<InvoiceType>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminLessonFilterInput = {
  date?: InputMaybe<Scalars['Date']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminLessonGradePaginationFilterInput = {
  gradeTypes?: InputMaybe<Array<GradeType>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  lessonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  retests?: InputMaybe<Array<Retest>>;
  schoolIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  supplementaries?: InputMaybe<Array<Supplementary>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminLessonGradesFilterInput = {
  gradeTypes?: InputMaybe<Array<GradeType>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lessonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  retests?: InputMaybe<Array<Retest>>;
  schoolIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  supplementaries?: InputMaybe<Array<Supplementary>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminLessonVideoFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lessonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  sourceTypes?: InputMaybe<Array<LessonVideoSourceType>>;
  visibilities?: InputMaybe<Array<LessonVideoVisibility>>;
};

export type AdminLessonVideoMultipartCompletedPartInput = {
  eTag: Scalars['String']['input'];
  partNumber: Scalars['Int']['input'];
};

export type AdminLessonVideoMultipartPartUpload = {
  __typename?: 'AdminLessonVideoMultipartPartUpload';
  expiresAt: Scalars['Date']['output'];
  partNumber: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type AdminLessonVideoMultipartUploadSession = {
  __typename?: 'AdminLessonVideoMultipartUploadSession';
  expiresAt: Scalars['Date']['output'];
  key: Scalars['String']['output'];
  partCount: Scalars['Int']['output'];
  partSize: Scalars['Int']['output'];
  sessionToken: Scalars['String']['output'];
  uploadId: Scalars['String']['output'];
};

export type AdminLessonVideoViewerStatus = {
  __typename?: 'AdminLessonVideoViewerStatus';
  /** 시청 완료 여부 */
  isCompleted: Scalars['Boolean']['output'];
  /** 진도율 */
  progressRatio: Scalars['Float']['output'];
  user: User;
  /** 누적 체류 시간 (초) */
  watchedSeconds: Scalars['Int']['output'];
};

export type AdminLessonVideoViewerStatusSummary = {
  __typename?: 'AdminLessonVideoViewerStatusSummary';
  /** 평균 진도율 */
  averageProgressRatio: Scalars['Float']['output'];
  /** 진도율 100% 인원 */
  fullyWatchedCount: Scalars['Int']['output'];
  /** 진도율 90% 이상 인원 */
  overNinetyPercentCount: Scalars['Int']['output'];
  /** 대상 학생 수 */
  totalCount: Scalars['Int']['output'];
};

export type AdminLessonVideoViewerStatuses = {
  __typename?: 'AdminLessonVideoViewerStatuses';
  statuses: Array<AdminLessonVideoViewerStatus>;
  summary: AdminLessonVideoViewerStatusSummary;
};

export type AdminMaterialFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminNoticeFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminNotifyLessonGradeInput = {
  lessonId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminSchoolFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminSetExamQuestionsInput = {
  examId: Scalars['ID']['input'];
  questions: Array<AdminExamQuestionInput>;
};

export type AdminStudyMaterialFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureStates?: InputMaybe<Array<LectureState>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminTeacherFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  nameContains?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<AdministratorRole>>;
};

export type AdminTransferLectureInput = {
  /** 이전 수업 (id) */
  fromLectureId: Scalars['ID']['input'];
  /** 이동 수업 (id) */
  toLectureId: Scalars['ID']['input'];
  /** 이동 일자 */
  transferDate: Scalars['Date']['input'];
  /** 학생 (id) */
  userId: Scalars['ID']['input'];
};

export type AdminUpdateAdministratorInput = {
  id: Scalars['ID']['input'];
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
  /** 전화번호 */
  phone: Scalars['PhoneNumber']['input'];
};

export type AdminUpdateBookInput = {
  id: Scalars['ID']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  /** 이름 */
  title: Scalars['String']['input'];
};

export type AdminUpdateExamInput = {
  answerFileId?: InputMaybe<Scalars['ID']['input']>;
  answerFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  category?: InputMaybe<Scalars['String']['input']>;
  cutline?: InputMaybe<Scalars['Float']['input']>;
  displaySettings?: InputMaybe<ExamDisplaySettingsInput>;
  id: Scalars['ID']['input'];
  isRetest?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  levelCuts?: InputMaybe<Array<ExamLevelCutInput>>;
  maxScore?: InputMaybe<Scalars['Float']['input']>;
  originExamId?: InputMaybe<Scalars['ID']['input']>;
  questionFileId?: InputMaybe<Scalars['ID']['input']>;
  questionFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  status?: InputMaybe<ExamStatus>;
  title: Scalars['String']['input'];
};

export type AdminUpdateInquiryInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  /** 문의 답변 첨부파일 ID */
  answerFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['URL']['input']>;
};

export type AdminUpdateLectureInput = {
  /** 소속교재 (id) */
  bookId?: InputMaybe<Scalars['ID']['input']>;
  /** 수업 색상 */
  color?: InputMaybe<Scalars['String']['input']>;
  /** 수업 기본 가격 */
  defaultPrice?: InputMaybe<Scalars['Int']['input']>;
  /** 수업 종료 일자 */
  endDate: Scalars['Date']['input'];
  /** 수업 기타 설명 */
  etc?: InputMaybe<Scalars['String']['input']>;
  /** 학년 */
  grade: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  /** 수업 장소 */
  place?: InputMaybe<Scalars['String']['input']>;
  /** 소속학교 (id) */
  schoolId: Scalars['ID']['input'];
  /** 수업 시작 일자 */
  startDate: Scalars['Date']['input'];
  /** 수업 담당 강사 (id) */
  teacherIds: Array<Scalars['ID']['input']>;
  /** 수업 시간 계획 */
  timePlannings: Array<LectureTimePlanningInput>;
  /** 수업명 */
  title: Scalars['String']['input'];
  /** 학생 (id) */
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminUpdateLectureInvoiceInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpdateLessonVideoInput = {
  chapters?: InputMaybe<Array<LessonVideoChapterInput>>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  fileId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  materialIds: Array<Scalars['ID']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  sourceType: LessonVideoSourceType;
  title: Scalars['String']['input'];
  visibility?: InputMaybe<LessonVideoVisibility>;
  youtubeVideoId?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpdateMaterialInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  lectureIds: Array<Scalars['ID']['input']>;
  title: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminUpdateNoticeInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  lectureIds: Array<Scalars['ID']['input']>;
  link?: InputMaybe<Scalars['URL']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminUpdateOperationInput = {
  id: Scalars['ID']['input'];
  info?: InputMaybe<Array<OperationInfoInput>>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpdateSchoolInput = {
  id: Scalars['ID']['input'];
  memo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type: SchoolType;
};

export type AdminUpdateStudyMaterialInput = {
  id: Scalars['ID']['input'];
  materialAttachments: Array<StudyMaterialAttachmentInput>;
  title: Scalars['String']['input'];
};

export type AdminUpdateTeacherInput = {
  id: Scalars['ID']['input'];
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 전화번호 */
  phone?: InputMaybe<Scalars['PhoneNumber']['input']>;
};

export type AdminUpdateUserInput = {
  /** 생년월일 */
  birthDate: Scalars['Date']['input'];
  /** 고유 번호 */
  code: Scalars['String']['input'];
  /** 성별 */
  gender: Gender;
  id: Scalars['ID']['input'];
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 이름 */
  name: Scalars['String']['input'];
  /** 부모 이름 */
  parentName?: InputMaybe<Scalars['String']['input']>;
  /** 부모 전화번호 */
  parentPhone?: InputMaybe<Scalars['PhoneNumber']['input']>;
  /** 비밀번호 */
  password?: InputMaybe<Scalars['String']['input']>;
  /** 회비 예정일 */
  payDueDay?: InputMaybe<Scalars['Int']['input']>;
  /** 전화번호 */
  phone: Scalars['PhoneNumber']['input'];
  /** 학원 등록일 */
  registeredDate: Scalars['Date']['input'];
  /** 소속학교 (id) */
  schoolId: Scalars['ID']['input'];
  /** 상태 */
  state: UserState;
};

export type AdminUpdateWorkLogInput = {
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUploadLessonAttachmentInput = {
  fileId?: InputMaybe<Scalars['ID']['input']>;
  lessonId: Scalars['ID']['input'];
};

export type AdminUpsertExamAnswerInput = {
  questionNo: Scalars['Int']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUpsertExamAnswersInput = {
  answers: Array<AdminUpsertExamAnswerInput>;
  submissionId: Scalars['ID']['input'];
};

export type AdminUpsertExamSubmissionInput = {
  examId: Scalars['ID']['input'];
  scanFileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  submitType?: InputMaybe<ExamSubmitType>;
  userId: Scalars['ID']['input'];
};

export type AdminUpsertLectureGradeFormInput = {
  commonMessage?: InputMaybe<Scalars['String']['input']>;
  gradeType: GradeType;
  labels: Array<LectureGradeFormLabelInput>;
  lectureId: Scalars['ID']['input'];
};

export type AdminUpsertLectureLabelCommentInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  labelId: Scalars['ID']['input'];
  lectureId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type AdminUpsertLessonGradeInput = {
  attendanceStatus?: InputMaybe<AttendanceStatus>;
  comment?: InputMaybe<Scalars['String']['input']>;
  formData?: InputMaybe<Array<LectureGradeFormDataInput>>;
  gradeType: GradeType;
  lessonId: Scalars['ID']['input'];
  retest?: InputMaybe<Retest>;
  supplementary?: InputMaybe<Supplementary>;
  userId: Scalars['ID']['input'];
};

export type AdminUpsertManyLessonGradeInput = {
  attendanceStatus?: InputMaybe<AttendanceStatus>;
  comment?: InputMaybe<Scalars['String']['input']>;
  formData?: InputMaybe<Array<LectureGradeFormDataInput>>;
  gradeType: GradeType;
  ignoreEmptyValue?: InputMaybe<Scalars['Boolean']['input']>;
  lessonId: Scalars['ID']['input'];
  retest?: InputMaybe<Retest>;
  supplementary?: InputMaybe<Supplementary>;
  userId: Scalars['ID']['input'];
};

export type AdminUpsertUserConsultingInput = {
  data?: InputMaybe<Array<ConsultingDataInput>>;
  userId: Scalars['ID']['input'];
};

export type AdminUserChatFilterInput = {
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminUserFilterInput = {
  grades?: InputMaybe<Array<Scalars['Int']['input']>>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  nameContains?: InputMaybe<Scalars['String']['input']>;
  onlyAdminUnreadUserChats?: InputMaybe<Scalars['Boolean']['input']>;
  schoolIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  state?: InputMaybe<UserState>;
};

export type AdminWorkLogAuditLogFilterInput = {
  workLogIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminWorkLogFilterInput = {
  administratorIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Administrator = {
  __typename?: 'Administrator';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 조교 이메일 */
  emailAddress?: Maybe<Scalars['EmailAddress']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  /** 조교 이름 */
  name: Scalars['String']['output'];
  /** 비밀번호 */
  password: Scalars['String']['output'];
  /** 연락처 */
  phone: Scalars['String']['output'];
  roles: Array<AdministratorRole>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type AdministratorEdge = {
  __typename?: 'AdministratorEdge';
  cursor: Scalars['String']['output'];
  node: Administrator;
};

export type AdministratorPagination = {
  __typename?: 'AdministratorPagination';
  edges: Array<AdministratorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum AdministratorRelayOrder {
  Id = 'ID'
}

export enum AdministratorRole {
  AdminAssistant = 'ADMIN_ASSISTANT',
  AdminPrincipal = 'ADMIN_PRINCIPAL'
}

/** 출석 상태 */
export enum AttendanceStatus {
  /** 결석 */
  Absent = 'ABSENT',
  /** 조퇴 */
  EarlyLeave = 'EARLY_LEAVE',
  /** 지각 */
  Late = 'LATE',
  /** 출석 */
  Present = 'PRESENT'
}

export type AuditLogDiff = {
  __typename?: 'AuditLogDiff';
  current?: Maybe<Scalars['JSON']['output']>;
  path: Scalars['String']['output'];
  previous?: Maybe<Scalars['JSON']['output']>;
};

export type AuthTokenPair = {
  __typename?: 'AuthTokenPair';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

/** 교재 */
export type Book = {
  __typename?: 'Book';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  /** 책 이름 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type BookEdge = {
  __typename?: 'BookEdge';
  cursor: Scalars['String']['output'];
  node: Book;
};

export type BookPagination = {
  __typename?: 'BookPagination';
  edges: Array<BookEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum BookRelayOrder {
  Id = 'ID'
}

export type ClientCreateInquiryInput = {
  /** 문의 할 문제집의 정보 (ex. 문제집 이름, 페이지, 번호를 적어주세요. (없으면 빈칸)) */
  bookInfo?: InputMaybe<Scalars['String']['input']>;
  /** 문의 내용 */
  description: Scalars['String']['input'];
  /** 문의 첨부파일 ID */
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 문의할 수업 ID */
  lectureId: Scalars['ID']['input'];
  /** 문의 제목 */
  title: Scalars['String']['input'];
  /** 문의 주체 (학생 / 학부모) */
  who: InquiryWho;
};

export type ClientCreateUserChatInput = {
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type ClientCreateUserSchoolReportCardInput = {
  /** 성적표 파일 ID */
  fileId: Scalars['ID']['input'];
  /** 학년 (1,2,3학년 의 숫자값 1,2,3) */
  grade: Scalars['Int']['input'];
  /** 등급 (1,2,3 등급) */
  level: Scalars['Int']['input'];
  /** 백분위 */
  percentage?: InputMaybe<Scalars['Int']['input']>;
  /** 석차 (등수) */
  rank: Scalars['Int']['input'];
  /** 학교 ID */
  schoolId: Scalars['ID']['input'];
  /** 점수 */
  score: Scalars['Int']['input'];
  /** 학기 (1,2학기 의 숫자값 1,2) */
  term: Scalars['Int']['input'];
  /** 전체 인원 */
  totalCount: Scalars['Int']['input'];
  /** 성적표 타입 (중간고사, 기말고사, 모의고사) */
  type: SchoolReportType;
};

export type ClientExamQuestionResult = {
  __typename?: 'ClientExamQuestionResult';
  /** 정답 */
  answer: Scalars['String']['output'];
  /** 획득 점수 */
  earnedPoint?: Maybe<Scalars['Float']['output']>;
  /** 시험 답안 ID (오답 재풀이용) */
  examAnswerId?: Maybe<Scalars['ID']['output']>;
  /** 정답 여부 */
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  /** 문항 번호 */
  no: Scalars['Int']['output'];
  /** 배점 */
  point: Scalars['Float']['output'];
  /** 문항 이미지 크롭 data URL (좌표 미설정 시 null) */
  questionImageDataUrl?: Maybe<Scalars['String']['output']>;
  questionType: ExamQuestionType;
  /** 영역/단원 태그 */
  unit?: Maybe<Scalars['String']['output']>;
  /** 내 답안 */
  value?: Maybe<Scalars['String']['output']>;
};

export type ClientExamResult = {
  __typename?: 'ClientExamResult';
  /** 성적 표시 설정 */
  displaySettings?: Maybe<ExamDisplaySettings>;
  /** 시험 */
  exam: Exam;
  /** 문제 PDF */
  questionFile?: Maybe<PrivateFile>;
  /** 문항별 결과 */
  questionResults: Array<ClientExamQuestionResult>;
  /** 시험 통계 (실시간 계산) */
  statistics: ClientExamStatistics;
  /** 내 시험 제출 */
  submission: ExamSubmission;
};

export type ClientExamStatistics = {
  __typename?: 'ClientExamStatistics';
  /** 응시자 수 */
  applicants: Scalars['Int']['output'];
  /** 점수대별 인원 (만점 대비 20% 단위 5구간) */
  histogram: Array<Scalars['Int']['output']>;
  /** 최고점 */
  max?: Maybe<Scalars['Float']['output']>;
  /** 평균 */
  mean?: Maybe<Scalars['Float']['output']>;
  /** 내 등수 (동점 공동순위) */
  myRank?: Maybe<Scalars['Int']['output']>;
  /** 표준편차 */
  stddev?: Maybe<Scalars['Float']['output']>;
  /** 상위 10% 평균 */
  topTenPercentMean?: Maybe<Scalars['Float']['output']>;
};

export type ClientExamSubmissionFilterInput = {
  /** 수업 ID */
  lectureId?: InputMaybe<Scalars['ID']['input']>;
};

export type ClientInquiryFilterInput = {
  /** 답변 여부 */
  answered?: InputMaybe<Scalars['Boolean']['input']>;
  /** 문의 주체 (학생 / 학부모) */
  whoes: InquiryWho;
};

export type ClientLectureInvoiceFilterInput = {
  /** 조회할 수업 ID 목록 */
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** 결제 방법 */
  methods?: InputMaybe<Array<InvoiceMethod>>;
  /** 대기중, 완료, 미납 */
  states?: InputMaybe<Array<LectureInvoiceState>>;
  /** 수업료, 교재비 */
  types?: InputMaybe<Array<InvoiceType>>;
};

export type ClientLessonFilterInput = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type ClientLessonGradesFilterInput = {
  gradeTypes?: InputMaybe<Array<GradeType>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type ClientLessonVideoHlsPlaylistDocument = {
  __typename?: 'ClientLessonVideoHlsPlaylistDocument';
  isMaster: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ClientRequestLectureInvoiceInput = {
  /** 납부 완료 요청할 회비 ID */
  lectureInvoiceId: Scalars['ID']['input'];
  /** 납부 방법 (카드, 이체, 서울페이) */
  method: InvoiceMethod;
  /** 납부 완료 요청 메모 */
  userMemo?: InputMaybe<Scalars['String']['input']>;
};

export type ClientRetryWrongAnswerInput = {
  /** 시험 답안 ID */
  examAnswerId: Scalars['ID']['input'];
  /** 재풀이 답안 */
  value: Scalars['String']['input'];
};

export type ClientUpdateUserSchoolReportCardInput = {
  /** 성적표 파일 ID */
  fileId: Scalars['ID']['input'];
  /** 학년 (1,2,3학년 의 숫자값 1,2,3) */
  grade: Scalars['Int']['input'];
  /** 성적표 ID */
  id: Scalars['ID']['input'];
  /** 등급 (1,2,3 등급) */
  level: Scalars['Int']['input'];
  /** 백분위 */
  percentage?: InputMaybe<Scalars['Int']['input']>;
  /** 석차 (등수) */
  rank: Scalars['Int']['input'];
  /** 학교 ID */
  schoolId: Scalars['ID']['input'];
  /** 점수 */
  score: Scalars['Int']['input'];
  /** 학기 (1,2학기 의 숫자값 1,2) */
  term: Scalars['Int']['input'];
  /** 전체 인원 */
  totalCount: Scalars['Int']['input'];
  /** 성적표 타입 (중간고사, 기말고사, 모의고사) */
  type: SchoolReportType;
};

export type ClientUpsertLessonVideoProgressInput = {
  /** 마지막 재생 위치 (초, 이어보기) */
  lastPositionSeconds: Scalars['Int']['input'];
  /** 강의 영상 ID */
  lessonVideoId: Scalars['ID']['input'];
  /** 이번에 시청한 구간 */
  segment?: InputMaybe<WatchedSegmentInput>;
};

export type ClientWrongAnswer = {
  __typename?: 'ClientWrongAnswer';
  /** 시험 */
  exam: Exam;
  /** 오답 답안 */
  examAnswer: ExamAnswer;
  /** 해결 여부 (마지막 재풀이가 정답) */
  isResolved: Scalars['Boolean']['output'];
  /** 문제 PDF */
  questionFile?: Maybe<PrivateFile>;
  /** 문항 이미지 크롭 data URL (좌표 미설정 시 null) */
  questionImageDataUrl?: Maybe<Scalars['String']['output']>;
};

export type ClientWrongAnswerFilterInput = {
  /** 시험 ID */
  examId?: InputMaybe<Scalars['ID']['input']>;
  /** 수업 ID */
  lectureId?: InputMaybe<Scalars['ID']['input']>;
  /** 미해결(마지막 재풀이가 정답이 아닌) 오답만 조회 */
  onlyUnresolved?: InputMaybe<Scalars['Boolean']['input']>;
  /** 영역/단원 태그 */
  unit?: InputMaybe<Scalars['String']['input']>;
};

export type ConsultingData = {
  __typename?: 'ConsultingData';
  contents: Scalars['String']['output'];
  date: Scalars['Date']['output'];
};

export type ConsultingDataInput = {
  contents: Scalars['String']['input'];
  date: Scalars['Date']['input'];
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum DeviceType {
  Android = 'ANDROID',
  Ios = 'IOS',
  Unknown = 'UNKNOWN'
}

export type Exam = {
  __typename?: 'Exam';
  admin_answerFile?: Maybe<PrivateFile>;
  admin_lesson: Lesson;
  admin_questionFile?: Maybe<PrivateFile>;
  admin_questions: Array<ExamQuestion>;
  admin_statistics: AdminExamStatistics;
  admin_submissionCount: Scalars['Int']['output'];
  /** 시험 유형 (실전모의고사, 복습테스트, 오답복습 등) */
  category?: Maybe<Scalars['String']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 커트라인 */
  cutline?: Maybe<Scalars['Float']['output']>;
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 성적 표시 설정 */
  displaySettings?: Maybe<ExamDisplaySettings>;
  id: Scalars['ID']['output'];
  /** 재시험 여부 */
  isRetest: Scalars['Boolean']['output'];
  /** 등급컷 (null이면 표시 안 함) */
  levelCuts?: Maybe<Array<ExamLevelCut>>;
  /** 만점 */
  maxScore: Scalars['Float']['output'];
  originExamId?: Maybe<Scalars['ID']['output']>;
  status: ExamStatus;
  /** 시험 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type ExamAnswer = {
  __typename?: 'ExamAnswer';
  admin_question: ExamQuestion;
  /** 자동인식 신뢰도 (향후 자동인식용) */
  confidence?: Maybe<Scalars['Float']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 획득 점수 */
  earnedPoint?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  /** 정답 여부 */
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  /** 검수 필요 여부 */
  needsReview: Scalars['Boolean']['output'];
  /** 답안의 문항 */
  question: ExamQuestion;
  /** 오답 재풀이 기록 */
  retries: Array<ExamAnswerRetry>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  /** 학생 답안 */
  value?: Maybe<Scalars['String']['output']>;
};

export type ExamAnswerRetry = {
  __typename?: 'ExamAnswerRetry';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  /** 정답 여부 */
  isCorrect: Scalars['Boolean']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  /** 재풀이 답안 */
  value: Scalars['String']['output'];
};

export type ExamDisplaySettings = {
  __typename?: 'ExamDisplaySettings';
  /** 히스토그램 표시 여부 */
  showHistogram?: Maybe<Scalars['Boolean']['output']>;
  /** 등급 표시 여부 */
  showLevel?: Maybe<Scalars['Boolean']['output']>;
  /** 등수 표시 여부 */
  showRank?: Maybe<Scalars['Boolean']['output']>;
  /** 통계 표시 여부 */
  showStatistics?: Maybe<Scalars['Boolean']['output']>;
};

export type ExamDisplaySettingsInput = {
  /** 히스토그램 표시 여부 */
  showHistogram?: InputMaybe<Scalars['Boolean']['input']>;
  /** 등급 표시 여부 */
  showLevel?: InputMaybe<Scalars['Boolean']['input']>;
  /** 등수 표시 여부 */
  showRank?: InputMaybe<Scalars['Boolean']['input']>;
  /** 통계 표시 여부 */
  showStatistics?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ExamDocumentFileRole {
  Answer = 'ANSWER',
  Question = 'QUESTION',
  Unknown = 'UNKNOWN'
}

export type ExamEdge = {
  __typename?: 'ExamEdge';
  cursor: Scalars['String']['output'];
  node: Exam;
};

export type ExamLevelCut = {
  __typename?: 'ExamLevelCut';
  /** 등급 */
  level: Scalars['Int']['output'];
  /** 등급컷 점수 */
  score: Scalars['Float']['output'];
};

export type ExamLevelCutInput = {
  /** 등급 */
  level: Scalars['Int']['input'];
  /** 등급컷 점수 */
  score: Scalars['Float']['input'];
};

export type ExamPagination = {
  __typename?: 'ExamPagination';
  edges: Array<ExamEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ExamQuestion = {
  __typename?: 'ExamQuestion';
  /** 허용 답안 */
  allowedAnswers?: Maybe<Array<Scalars['String']['output']>>;
  /** 정답 */
  answer: Scalars['String']['output'];
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  /** 문항 번호 */
  no: Scalars['Int']['output'];
  /** 배점 */
  point: Scalars['Float']['output'];
  questionType: ExamQuestionType;
  /** 답안지 자동 인식 영역 설정 */
  recognitionRegions?: Maybe<Array<ExamQuestionRecognitionRegion>>;
  /** 영역/단원 태그 (오답노트 분류) */
  unit?: Maybe<Scalars['String']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type ExamQuestionRecognitionRegion = {
  __typename?: 'ExamQuestionRecognitionRegion';
  /** 원본 이미지 높이 대비 영역 높이 비율 (0~1) */
  height: Scalars['Float']['output'];
  kind: ExamQuestionRecognitionRegionKind;
  /** 1부터 시작하는 스캔 파일 페이지 번호 */
  page: Scalars['Int']['output'];
  /** 자동 선택 판정 최소 점수 */
  threshold?: Maybe<Scalars['Float']['output']>;
  /** 선택됐을 때 저장할 답안 값 */
  value?: Maybe<Scalars['String']['output']>;
  /** 원본 이미지 너비 대비 영역 너비 비율 (0~1) */
  width: Scalars['Float']['output'];
  /** 원본 이미지 너비 대비 x 좌표 비율 (0~1) */
  x: Scalars['Float']['output'];
  /** 원본 이미지 높이 대비 y 좌표 비율 (0~1) */
  y: Scalars['Float']['output'];
};

export type ExamQuestionRecognitionRegionInput = {
  /** 원본 이미지 높이 대비 영역 높이 비율 (0~1) */
  height: Scalars['Float']['input'];
  kind: ExamQuestionRecognitionRegionKind;
  /** 1부터 시작하는 스캔 파일 페이지 번호 */
  page?: Scalars['Int']['input'];
  /** 자동 선택 판정 최소 점수 */
  threshold?: InputMaybe<Scalars['Float']['input']>;
  /** 선택됐을 때 저장할 답안 값 */
  value?: InputMaybe<Scalars['String']['input']>;
  /** 원본 이미지 너비 대비 영역 너비 비율 (0~1) */
  width: Scalars['Float']['input'];
  /** 원본 이미지 너비 대비 x 좌표 비율 (0~1) */
  x: Scalars['Float']['input'];
  /** 원본 이미지 높이 대비 y 좌표 비율 (0~1) */
  y: Scalars['Float']['input'];
};

/** 시험 답안지 자동 인식 영역 유형 */
export enum ExamQuestionRecognitionRegionKind {
  /** OMR 버블 영역 */
  Bubble = 'BUBBLE',
  /** 선택지 필기 표시 영역 */
  ChoiceMark = 'CHOICE_MARK',
  /** 문항 이미지 크롭 영역 */
  Question = 'QUESTION',
  /** OCR 텍스트 영역 */
  Text = 'TEXT'
}

/** 시험 문항 유형 */
export enum ExamQuestionType {
  /** 선택형 */
  Choice = 'CHOICE',
  /** 단답형 */
  Short = 'SHORT'
}

export enum ExamRelayOrder {
  Id = 'ID'
}

/** 시험 상태 */
export enum ExamStatus {
  /** 작성중 */
  Draft = 'DRAFT',
  /** 확정 */
  Finalized = 'FINALIZED',
  /** 공개 */
  Published = 'PUBLISHED'
}

export type ExamSubmission = {
  __typename?: 'ExamSubmission';
  admin_answers: Array<ExamAnswer>;
  admin_exam: Exam;
  admin_scanFiles: Array<PrivateFile>;
  admin_user: User;
  /** 문항별 답안 목록 */
  answers: Array<ExamAnswer>;
  confirmedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 시험 ID */
  examId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  /** 커트라인 통과 여부 */
  isPassed?: Maybe<Scalars['Boolean']['output']>;
  status: ExamSubmissionStatus;
  submitType: ExamSubmitType;
  /** 총점 */
  totalScore?: Maybe<Scalars['Float']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

/** 시험 제출 상태 */
export enum ExamSubmissionStatus {
  /** 채점 확정 */
  Confirmed = 'CONFIRMED',
  /** 채점중 */
  Grading = 'GRADING',
  /** 제출 대기 */
  Pending = 'PENDING'
}

/** 시험 제출 방식 */
export enum ExamSubmitType {
  /** 온라인 응시 */
  Online = 'ONLINE',
  /** 현장 응시 */
  Onsite = 'ONSITE'
}

export type File = {
  __typename?: 'File';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** AWS S3에 올리는 원본 파일명 */
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** 파일 MIME타입 */
  mimeType: Scalars['String']['output'];
  /** 파일 크기 (byte) */
  size: Scalars['Int']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['URL']['output'];
};

/** 폼 라벨 옵션 유형 */
export enum FormLabelOptionType {
  /** 숫자 */
  Number = 'NUMBER',
  /** 선택 */
  Select = 'SELECT',
  /** 텍스트 */
  Text = 'TEXT'
}

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

/** 성적 유형 */
export enum GradeType {
  /** 데일리 성적 */
  Default = 'DEFAULT',
  /** 모의고사 */
  Exam = 'EXAM'
}

/** 문의사항 */
export type Inquiry = {
  __typename?: 'Inquiry';
  administrator?: Maybe<Administrator>;
  /** 문의 답변 */
  answer?: Maybe<Scalars['String']['output']>;
  answerAttachments: Array<PrivateFile>;
  answeredAt?: Maybe<Scalars['Timestamp']['output']>;
  attachments: Array<PrivateFile>;
  /** 문의 내용 */
  bookInfo?: Maybe<Scalars['String']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 문의 내용 */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lecture?: Maybe<Lecture>;
  link?: Maybe<Scalars['String']['output']>;
  /** 문의 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
  /** 문의 타입 */
  who: InquiryWho;
};

export type InquiryEdge = {
  __typename?: 'InquiryEdge';
  cursor: Scalars['String']['output'];
  node: Inquiry;
};

export type InquiryPagination = {
  __typename?: 'InquiryPagination';
  edges: Array<InquiryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum InquiryRelayOrder {
  Id = 'ID'
}

/** 문의 주체 */
export enum InquiryWho {
  /** 학부모 */
  Parent = 'PARENT',
  /** 요청 */
  Request = 'REQUEST',
  /** 학생 */
  Student = 'STUDENT'
}

/** 결제 방법 */
export enum InvoiceMethod {
  /** 카드 (중등) */
  Card = 'CARD',
  /** 현금 (중등) */
  Cash = 'CASH',
  Megastudy = 'MEGASTUDY',
  /** 당일 결제 */
  SameDay = 'SAME_DAY',
  /** 서울페이 (중등) */
  Seoulpay = 'SEOULPAY',
  /** 계좌이체 (중등) */
  Transfer = 'TRANSFER',
  Visit = 'VISIT'
}

export enum InvoiceType {
  Book = 'BOOK',
  Lecture = 'LECTURE'
}

export type Lecture = {
  __typename?: 'Lecture';
  admin_labelComments: Array<LectureLabelComment>;
  book?: Maybe<Book>;
  color?: Maybe<Scalars['String']['output']>;
  /** 성정 확인의 공통 메시지 */
  comment?: Maybe<Scalars['String']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  defaultPrice?: Maybe<Scalars['Int']['output']>;
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  endDate: Scalars['Date']['output'];
  etc?: Maybe<Scalars['String']['output']>;
  /** 이동해서 나간 학생들 */
  fromTransfers: Array<UserLectureTransfer>;
  /** 학년 */
  grade: Scalars['Int']['output'];
  gradeForm?: Maybe<LectureGradeForm>;
  gradeFormLabels: Array<LectureGradeFormLabel>;
  id: Scalars['ID']['output'];
  lessons?: Maybe<Array<Lesson>>;
  /** 해당 수업의 "평가 항목" 별 코멘트 목록 */
  myLabelComments: Array<LectureLabelComment>;
  myLessons?: Maybe<Array<Lesson>>;
  place?: Maybe<Scalars['String']['output']>;
  school?: Maybe<School>;
  startDate: Scalars['Date']['output'];
  state: LectureState;
  teachers: Array<Teacher>;
  /** 수업 시간 계획 */
  timePlannings: Array<LectureTimePlanning>;
  title: Scalars['String']['output'];
  /** 이동해서 들어온 학생들 */
  toTransfers: Array<UserLectureTransfer>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  users: Array<User>;
};


export type LectureGradeFormArgs = {
  gradeType: GradeType;
};


export type LectureGradeFormLabelsArgs = {
  gradeType: GradeType;
};

export type LectureEdge = {
  __typename?: 'LectureEdge';
  cursor: Scalars['String']['output'];
  node: Lecture;
};

export type LectureGradeForm = {
  __typename?: 'LectureGradeForm';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  gradeType: GradeType;
  id: Scalars['ID']['output'];
  labels: Array<LectureGradeFormLabel>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type LectureGradeFormCandidate = {
  __typename?: 'LectureGradeFormCandidate';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  labels: Array<LectureGradeFormLabel>;
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type LectureGradeFormData = {
  __typename?: 'LectureGradeFormData';
  /** GradeFormLabel 의 ID */
  id: Scalars['ID']['output'];
  /** GradeFormLabel 의 값 */
  label: Scalars['String']['output'];
  /** type 이 테스트일 경우의 전체문제 */
  maxValue?: Maybe<Scalars['Int']['output']>;
  /** 과제성적, 테스트, 진도, 오늘의 과제 / 지윤T모의고사 */
  type: Scalars['String']['output'];
  /** 선생님이 입력한 값 */
  value?: Maybe<Scalars['JSON']['output']>;
  /** 과제성적, 테스트 추가 정보 */
  value2?: Maybe<Scalars['JSON']['output']>;
};

export type LectureGradeFormDataInput = {
  id: Scalars['String']['input'];
  maxValue?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['JSON']['input']>;
  value2?: InputMaybe<Scalars['JSON']['input']>;
};

export type LectureGradeFormLabel = {
  __typename?: 'LectureGradeFormLabel';
  id: Scalars['String']['output'];
  optionType?: Maybe<FormLabelOptionType>;
  options?: Maybe<Array<Scalars['String']['output']>>;
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LectureGradeFormLabelInput = {
  id: Scalars['String']['input'];
  optionType?: InputMaybe<FormLabelOptionType>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type LectureInvoice = {
  __typename?: 'LectureInvoice';
  books: Array<Book>;
  /** 관리자가 쓰는 메모 */
  comment?: Maybe<Scalars['String']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 회비 예정일 */
  dueDate: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  isRepeat: Scalars['Boolean']['output'];
  lecture?: Maybe<Lecture>;
  link?: Maybe<Scalars['String']['output']>;
  method?: Maybe<InvoiceMethod>;
  paidAt?: Maybe<Scalars['Timestamp']['output']>;
  price: Scalars['Int']['output'];
  state: LectureInvoiceState;
  type: InvoiceType;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
  /** 학생이 납부 완료 시 쓰는 메모 */
  userMemo?: Maybe<Scalars['String']['output']>;
};

export type LectureInvoiceEdge = {
  __typename?: 'LectureInvoiceEdge';
  cursor: Scalars['String']['output'];
  node: LectureInvoice;
};

export type LectureInvoicePagination = {
  __typename?: 'LectureInvoicePagination';
  edges: Array<LectureInvoiceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LectureInvoiceRelayOrder {
  Id = 'ID'
}

export enum LectureInvoiceState {
  /** 미납 */
  Failed = 'FAILED',
  /** 완료 */
  Paid = 'PAID',
  /** 대기중 */
  Pending = 'PENDING'
}

/** 수업의 테스트별 코멘트 */
export type LectureLabelComment = {
  __typename?: 'LectureLabelComment';
  comment?: Maybe<Scalars['String']['output']>;
  labelId: Scalars['ID']['output'];
  userId: Scalars['ID']['output'];
};

export type LecturePagination = {
  __typename?: 'LecturePagination';
  edges: Array<LectureEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LectureRelayOrder {
  Id = 'ID'
}

export enum LectureState {
  /** 완료 */
  Completed = 'COMPLETED',
  /** 진행중 */
  InProgress = 'IN_PROGRESS',
  /** 예정 */
  Upcoming = 'UPCOMING'
}

export type LectureTimePlanning = {
  __typename?: 'LectureTimePlanning';
  /** 수업 요일 */
  dayOfWeek: DayOfWeek;
  /** 수업 종료 시간 (HH:mm) */
  endTime?: Maybe<Scalars['String']['output']>;
  /** 수업 시작 시간 (HH:mm) */
  startTime: Scalars['String']['output'];
};

export type LectureTimePlanningInput = {
  /** 수업 요일 */
  dayOfWeek: DayOfWeek;
  /** 수업 종료 시간 (HH:mm) */
  endTime?: InputMaybe<Scalars['String']['input']>;
  /** 수업 시작 시간 (HH:mm) */
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  admin_lessonGradeCache?: Maybe<LessonGradeCache>;
  admin_lessonGrades: Array<LessonGrade>;
  attachment?: Maybe<PrivateFile>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  date: Scalars['Date']['output'];
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 수업 종료 시간 (HH:mm) */
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lecture: Lecture;
  /** 해당 개별수업의 성적 조회 */
  myLessonGrade?: Maybe<LessonGrade>;
  /** 수업 시작 시간 (HH:mm) */
  startTime: Scalars['String']['output'];
  topGrades: Array<LessonGradeStatistic>;
  topThirtyPercentGrades: Array<LessonGradeStatistic>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};


export type LessonAdmin_LessonGradesArgs = {
  gradeType: GradeType;
};


export type LessonMyLessonGradeArgs = {
  gradeType: GradeType;
};


export type LessonTopGradesArgs = {
  gradeType: GradeType;
};


export type LessonTopThirtyPercentGradesArgs = {
  gradeType: GradeType;
};

export type LessonEdge = {
  __typename?: 'LessonEdge';
  cursor: Scalars['String']['output'];
  node: Lesson;
};

export type LessonGrade = {
  __typename?: 'LessonGrade';
  attendanceStatus?: Maybe<AttendanceStatus>;
  comment?: Maybe<Scalars['String']['output']>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  data?: Maybe<Array<LectureGradeFormData>>;
  gradeType: GradeType;
  id: Scalars['ID']['output'];
  lesson?: Maybe<Lesson>;
  retest: Retest;
  retestDoneAt?: Maybe<Scalars['Timestamp']['output']>;
  retestMemo?: Maybe<Scalars['String']['output']>;
  supplementary: Supplementary;
  supplementaryDoneAt?: Maybe<Scalars['Timestamp']['output']>;
  supplementaryMemo?: Maybe<Scalars['String']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  user?: Maybe<User>;
};

export type LessonGradeCache = {
  __typename?: 'LessonGradeCache';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type LessonGradeEdge = {
  __typename?: 'LessonGradeEdge';
  cursor: Scalars['String']['output'];
  node: LessonGrade;
};

export type LessonGradeMonthly = {
  __typename?: 'LessonGradeMonthly';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** 월 */
  month: Scalars['Date']['output'];
  score?: Maybe<LessonGradeMonthlyScore>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type LessonGradeMonthlyScore = {
  __typename?: 'LessonGradeMonthlyScore';
  assignment?: Maybe<Scalars['String']['output']>;
  attendance?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  progress?: Maybe<Scalars['String']['output']>;
  test?: Maybe<Scalars['String']['output']>;
};

export type LessonGradeMonthlyScoreInput = {
  assignment?: InputMaybe<Scalars['String']['input']>;
  attendance?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  progress?: InputMaybe<Scalars['String']['input']>;
  test?: InputMaybe<Scalars['String']['input']>;
};

export type LessonGradePagination = {
  __typename?: 'LessonGradePagination';
  edges: Array<LessonGradeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LessonGradeRelayOrder {
  Id = 'ID',
  LessonDate = 'LESSON_DATE',
  RetestAt = 'RETEST_AT',
  SupplementaryAt = 'SUPPLEMENTARY_AT'
}

export type LessonGradeStatistic = {
  __typename?: 'LessonGradeStatistic';
  labelId: Scalars['ID']['output'];
  value?: Maybe<Scalars['Int']['output']>;
};

export type LessonPagination = {
  __typename?: 'LessonPagination';
  edges: Array<LessonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LessonRelayOrder {
  Date = 'DATE',
  Id = 'ID'
}

export type LessonVideo = {
  __typename?: 'LessonVideo';
  admin_attachment?: Maybe<PrivateFile>;
  admin_lesson: Lesson;
  admin_materials: Array<Material>;
  attachment?: Maybe<PrivateFile>;
  /** 타임스탬프 챕터 */
  chapters?: Maybe<Array<LessonVideoChapter>>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 영상 길이 (초) */
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  encodingError?: Maybe<Scalars['String']['output']>;
  encodingStatus: LessonVideoEncodingStatus;
  /** HLS 재생목록 파일 */
  hlsPlaylist?: Maybe<PrivateFile>;
  /** 서명 URL이 적용된 HLS master/variant playlist 문서 목록 */
  hlsPlaylistDocuments?: Maybe<Array<ClientLessonVideoHlsPlaylistDocument>>;
  /** 서명 URL로 변환된 HLS playlist 텍스트 */
  hlsPlaylistText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** 공개 여부 */
  isPublished: Scalars['Boolean']['output'];
  /** 회차 ID */
  lessonId: Scalars['ID']['output'];
  /** 연결된 학습자료 목록 */
  materials: Array<Material>;
  memo?: Maybe<Scalars['String']['output']>;
  sourceType: LessonVideoSourceType;
  /** 영상 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  visibility: LessonVideoVisibility;
  youtubeVideoId?: Maybe<Scalars['String']['output']>;
};

export type LessonVideoChapter = {
  __typename?: 'LessonVideoChapter';
  /** 챕터 라벨 */
  label: Scalars['String']['output'];
  /** 챕터 시작 시점 (초) */
  seconds: Scalars['Int']['output'];
};

export type LessonVideoChapterInput = {
  /** 챕터 라벨 */
  label: Scalars['String']['input'];
  /** 챕터 시작 시점 (초) */
  seconds: Scalars['Int']['input'];
};

export type LessonVideoEdge = {
  __typename?: 'LessonVideoEdge';
  cursor: Scalars['String']['output'];
  node: LessonVideo;
};

/** 강의 영상 HLS 인코딩 상태 */
export enum LessonVideoEncodingStatus {
  /** 인코딩 완료 */
  Done = 'DONE',
  /** 인코딩 실패 */
  Failed = 'FAILED',
  /** 인코딩 중 */
  Processing = 'PROCESSING',
  /** 인코딩 전 */
  Ready = 'READY'
}

export type LessonVideoPagination = {
  __typename?: 'LessonVideoPagination';
  edges: Array<LessonVideoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LessonVideoProgress = {
  __typename?: 'LessonVideoProgress';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 삭제 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  /** 시청 완료 여부 */
  isCompleted: Scalars['Boolean']['output'];
  /** 마지막 재생 위치 (초, 이어보기) */
  lastPositionSeconds: Scalars['Int']['output'];
  /** 강의 영상 ID */
  lessonVideoId: Scalars['ID']['output'];
  /** 진도율 (병합 구간 합 / 영상 길이) */
  progressRatio: Scalars['Float']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  /** 누적 체류 시간 (초) */
  watchedSeconds: Scalars['Int']['output'];
  /** 시청 구간 (병합 저장) */
  watchedSegments?: Maybe<Array<WatchedSegment>>;
};

export enum LessonVideoRelayOrder {
  Id = 'ID'
}

/** 강의 영상 소스 유형 */
export enum LessonVideoSourceType {
  /** 직접 업로드 (mp4) */
  Upload = 'UPLOAD',
  /** 유튜브 링크 */
  Youtube = 'YOUTUBE'
}

/** 강의 영상 공개 범위 */
export enum LessonVideoVisibility {
  /** 전체 공개 */
  All = 'ALL',
  /** 수강 강의 공개 */
  Lecture = 'LECTURE'
}

export type Material = {
  __typename?: 'Material';
  administrator: Administrator;
  attachments: Array<PrivateFile>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 수업자료 내용 */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** 전체 공지 여부 */
  isAll: Scalars['Boolean']['output'];
  lectures: Array<Lecture>;
  /** 수업자료 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  users: Array<User>;
};

export type MaterialEdge = {
  __typename?: 'MaterialEdge';
  cursor: Scalars['String']['output'];
  node: Material;
};

export type MaterialPagination = {
  __typename?: 'MaterialPagination';
  edges: Array<MaterialEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum MaterialRelayOrder {
  Id = 'ID'
}

export type Mutation = {
  __typename?: 'Mutation';
  adminCreateAdministrator: Administrator;
  adminDeleteAdministrator: Administrator;
  adminTestNotification: Scalars['Boolean']['output'];
  adminUpdateAdministrator: Administrator;
  admin_abortLessonVideoMultipartUpload: Scalars['Boolean']['output'];
  admin_analyzeLessonVideoFileMetadata: PrivateFile;
  admin_applyLessonVideoLocalHls: LessonVideo;
  admin_checkIn: Scalars['Boolean']['output'];
  admin_classifyExamDocumentFiles: Array<AdminExamDocumentFileClassification>;
  admin_completeLessonVideoMultipartUpload: PrivateFile;
  admin_confirmExamSubmission: ExamSubmission;
  admin_copyExam: Exam;
  admin_createBook: Book;
  admin_createExam: Exam;
  admin_createLecture: Lecture;
  admin_createLectureGradeFormCandidate: LectureGradeFormCandidate;
  admin_createLectureInvoice: Scalars['Boolean']['output'];
  admin_createLessonVideo: LessonVideo;
  admin_createLessonVideoMultipartUpload: AdminLessonVideoMultipartUploadSession;
  admin_createMaterial: Material;
  admin_createNotice: Notice;
  admin_createSchool: School;
  admin_createStudyMaterial: StudyMaterial;
  admin_createTeacher: Teacher;
  admin_createUser: User;
  admin_createUserChat: UserChat;
  admin_createWorkLog: WorkLog;
  admin_deleteBook: Book;
  admin_deleteExam: Exam;
  admin_deleteExamSubmissions: Scalars['Boolean']['output'];
  admin_deleteInquiry: Inquiry;
  admin_deleteLecture: Lecture;
  admin_deleteLectureGradeFormCandidate: LectureGradeFormCandidate;
  admin_deleteLectureInvoice: Scalars['Boolean']['output'];
  admin_deleteLessonVideo: LessonVideo;
  admin_deleteMaterial: Material;
  admin_deleteNotice: Notice;
  admin_deleteSchool: School;
  admin_deleteStudyMaterial: StudyMaterial;
  admin_deleteTeacher: Teacher;
  admin_deleteUser: User;
  admin_deleteUserChat: UserChat;
  admin_deleteUserFromLecture: Lecture;
  admin_encodeLessonVideoHls: LessonVideo;
  admin_extractExamQuestionCandidates: Array<AdminExamQuestionCandidate>;
  admin_generateLessonVideoFilePutObjectUrl: PresignedForm;
  admin_generateLessonVideoMultipartPartUploadUrl: AdminLessonVideoMultipartPartUpload;
  admin_notifyLessonGrades: Scalars['Boolean']['output'];
  admin_readAllUserChats: Scalars['Boolean']['output'];
  admin_recognizeExamSubmission: Array<ExamAnswer>;
  admin_refreshAuthToken: AuthTokenPair;
  admin_regradeExam: Scalars['Boolean']['output'];
  admin_setExamQuestions: Array<ExamQuestion>;
  admin_signInByPhone: AuthTokenPair;
  admin_transferLecture: UserLectureTransfer;
  admin_undoTransferLecture: UserLectureTransfer;
  admin_updateAdministratorPassword: Scalars['Boolean']['output'];
  admin_updateBook: Book;
  admin_updateExam: Exam;
  admin_updateInquiry: Book;
  admin_updateLecture: Lecture;
  admin_updateLectureInvoice: LectureInvoice;
  admin_updateLectureInvoicesPaid: Array<LectureInvoice>;
  admin_updateLessonGradeCache: LessonGradeCache;
  admin_updateLessonGradeMemo: LessonGrade;
  admin_updateLessonGradeMonthlyScore: LessonGradeMonthly;
  admin_updateLessonVideo: LessonVideo;
  admin_updateMaterial: Material;
  admin_updateMyWorkLog: WorkLog;
  admin_updateNotice: Notice;
  admin_updateNoticePin: Notice;
  admin_updateOperation: Operation;
  admin_updateSchool: School;
  admin_updateStudyMaterial: StudyMaterial;
  admin_updateTeacher: Teacher;
  admin_updateUser: User;
  admin_updateWorkLog: WorkLog;
  admin_uploadLessonAttachment: Lesson;
  admin_upsertExamAnswers: Array<ExamAnswer>;
  admin_upsertExamSubmission: ExamSubmission;
  admin_upsertLectureGradeForm: LectureGradeForm;
  admin_upsertLectureLabelComment: LectureLabelComment;
  admin_upsertLessonGrade: LessonGrade;
  admin_upsertManyLessonGrade: Array<LessonGrade>;
  admin_upsertUserConsulting: UserConsulting;
  analyzePrivateFileMetadata: PrivateFile;
  /** 문의 생성하기 */
  createInquiry: Inquiry;
  createUserSchoolReportCard: UserSchoolReportCard;
  /** S3 putObject URL을 생성합니다. */
  generatePrivateFilePutObjectUrl: PresignedForm;
  my_createUserChat: UserChat;
  my_readAllUserChats: Scalars['Boolean']['output'];
  refreshAuthToken: AuthTokenPair;
  /** 납부 완료 버튼 (납부 확인 요청) */
  requestLectureInvoice: LectureInvoice;
  /** 오답 다시 풀기 (본인 답안 검증 + 즉시 채점 후 기록) */
  retryMyWrongAnswer: ExamAnswerRetry;
  /**
   * 학생 로그인
   *
   *     token: 앱으로 부터 넘어오는 ?fcm_token=
   *     deviceType: 앱으로 부터 넘어오는 ?device_type=
   *     userAgent: navigator.userAgent
   *
   */
  signInByPhone: AuthTokenPair;
  /** 학생 로그아웃 */
  signOut: Scalars['Boolean']['output'];
  updateUser: User;
  updateUserPassword: Scalars['Boolean']['output'];
  updateUserSchoolReportCard: UserSchoolReportCard;
  /** 로그인 된 학생의 강의 영상 시청 진도 저장 (멱등 upsert, 서버에서 구간 병합/진도율 계산) */
  upsertMyLessonVideoProgress: LessonVideoProgress;
  upsertUserDevice: UserDevice;
  /** 탈퇴 */
  withdraw: Scalars['Boolean']['output'];
};


export type MutationAdminCreateAdministratorArgs = {
  input: AdminCreateAdministratorInput;
};


export type MutationAdminDeleteAdministratorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminTestNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminUpdateAdministratorArgs = {
  input: AdminUpdateAdministratorInput;
};


export type MutationAdmin_AbortLessonVideoMultipartUploadArgs = {
  sessionToken: Scalars['String']['input'];
};


export type MutationAdmin_AnalyzeLessonVideoFileMetadataArgs = {
  filename: Scalars['String']['input'];
  key: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};


export type MutationAdmin_ApplyLessonVideoLocalHlsArgs = {
  input: AdminApplyLessonVideoLocalHlsInput;
};


export type MutationAdmin_CheckInArgs = {
  lectureId: Scalars['ID']['input'];
  phoneNumber: Scalars['String']['input'];
};


export type MutationAdmin_ClassifyExamDocumentFilesArgs = {
  fileIds: Array<Scalars['ID']['input']>;
};


export type MutationAdmin_CompleteLessonVideoMultipartUploadArgs = {
  parts: Array<AdminLessonVideoMultipartCompletedPartInput>;
  sessionToken: Scalars['String']['input'];
};


export type MutationAdmin_ConfirmExamSubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_CopyExamArgs = {
  examId: Scalars['ID']['input'];
  lessonId: Scalars['ID']['input'];
};


export type MutationAdmin_CreateBookArgs = {
  input: AdminCreateBookInput;
};


export type MutationAdmin_CreateExamArgs = {
  input: AdminCreateExamInput;
};


export type MutationAdmin_CreateLectureArgs = {
  input: AdminCreateLectureInput;
};


export type MutationAdmin_CreateLectureGradeFormCandidateArgs = {
  input: AdminCreateLectureGradeFormCandidateInput;
};


export type MutationAdmin_CreateLectureInvoiceArgs = {
  input: AdminCreateLectureInvoiceInput;
};


export type MutationAdmin_CreateLessonVideoArgs = {
  input: AdminCreateLessonVideoInput;
};


export type MutationAdmin_CreateLessonVideoMultipartUploadArgs = {
  filename: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Float']['input'];
};


export type MutationAdmin_CreateMaterialArgs = {
  input: AdminCreateMaterialInput;
};


export type MutationAdmin_CreateNoticeArgs = {
  input: AdminCreateNoticeInput;
};


export type MutationAdmin_CreateSchoolArgs = {
  input: AdminCreateSchoolInput;
};


export type MutationAdmin_CreateStudyMaterialArgs = {
  input: AdminCreateStudyMaterialInput;
};


export type MutationAdmin_CreateTeacherArgs = {
  input: AdminCreateTeacherInput;
};


export type MutationAdmin_CreateUserArgs = {
  input: AdminCreateUserInput;
};


export type MutationAdmin_CreateUserChatArgs = {
  input: AdminCreateUserChatInput;
};


export type MutationAdmin_CreateWorkLogArgs = {
  input: AdminCreateWorkLogInput;
};


export type MutationAdmin_DeleteBookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteExamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteExamSubmissionsArgs = {
  examId: Scalars['ID']['input'];
  submissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type MutationAdmin_DeleteInquiryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteLectureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteLectureGradeFormCandidateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteLectureInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteLessonVideoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteNoticeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteSchoolArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteStudyMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteUserChatArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteUserFromLectureArgs = {
  input: AdminDeleteUserFromLectureInput;
};


export type MutationAdmin_EncodeLessonVideoHlsArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_ExtractExamQuestionCandidatesArgs = {
  fileIds: Array<Scalars['ID']['input']>;
};


export type MutationAdmin_GenerateLessonVideoMultipartPartUploadUrlArgs = {
  partNumber: Scalars['Int']['input'];
  sessionToken: Scalars['String']['input'];
};


export type MutationAdmin_NotifyLessonGradesArgs = {
  input: AdminNotifyLessonGradeInput;
};


export type MutationAdmin_ReadAllUserChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdmin_RecognizeExamSubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_RefreshAuthTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationAdmin_RegradeExamArgs = {
  examId: Scalars['ID']['input'];
};


export type MutationAdmin_SetExamQuestionsArgs = {
  input: AdminSetExamQuestionsInput;
};


export type MutationAdmin_SignInByPhoneArgs = {
  password: Scalars['String']['input'];
  phone: Scalars['PhoneNumber']['input'];
};


export type MutationAdmin_TransferLectureArgs = {
  input: AdminTransferLectureInput;
};


export type MutationAdmin_UndoTransferLectureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_UpdateAdministratorPasswordArgs = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAdmin_UpdateBookArgs = {
  input: AdminUpdateBookInput;
};


export type MutationAdmin_UpdateExamArgs = {
  input: AdminUpdateExamInput;
};


export type MutationAdmin_UpdateInquiryArgs = {
  input: AdminUpdateInquiryInput;
};


export type MutationAdmin_UpdateLectureArgs = {
  input: AdminUpdateLectureInput;
};


export type MutationAdmin_UpdateLectureInvoiceArgs = {
  input: AdminUpdateLectureInvoiceInput;
};


export type MutationAdmin_UpdateLectureInvoicesPaidArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationAdmin_UpdateLessonGradeCacheArgs = {
  data?: InputMaybe<Scalars['String']['input']>;
  lessonId: Scalars['ID']['input'];
};


export type MutationAdmin_UpdateLessonGradeMemoArgs = {
  id: Scalars['ID']['input'];
  retestMemo?: InputMaybe<Scalars['String']['input']>;
  supplementaryMemo?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdmin_UpdateLessonGradeMonthlyScoreArgs = {
  month: Scalars['Date']['input'];
  score: LessonGradeMonthlyScoreInput;
  userId: Scalars['ID']['input'];
};


export type MutationAdmin_UpdateLessonVideoArgs = {
  input: AdminUpdateLessonVideoInput;
};


export type MutationAdmin_UpdateMaterialArgs = {
  input: AdminUpdateMaterialInput;
};


export type MutationAdmin_UpdateMyWorkLogArgs = {
  input: AdminUpdateWorkLogInput;
};


export type MutationAdmin_UpdateNoticeArgs = {
  input: AdminUpdateNoticeInput;
};


export type MutationAdmin_UpdateNoticePinArgs = {
  id: Scalars['ID']['input'];
  pin: Scalars['Boolean']['input'];
};


export type MutationAdmin_UpdateOperationArgs = {
  input: AdminUpdateOperationInput;
};


export type MutationAdmin_UpdateSchoolArgs = {
  input: AdminUpdateSchoolInput;
};


export type MutationAdmin_UpdateStudyMaterialArgs = {
  input: AdminUpdateStudyMaterialInput;
};


export type MutationAdmin_UpdateTeacherArgs = {
  input: AdminUpdateTeacherInput;
};


export type MutationAdmin_UpdateUserArgs = {
  input: AdminUpdateUserInput;
};


export type MutationAdmin_UpdateWorkLogArgs = {
  input: AdminUpdateWorkLogInput;
};


export type MutationAdmin_UploadLessonAttachmentArgs = {
  input: AdminUploadLessonAttachmentInput;
};


export type MutationAdmin_UpsertExamAnswersArgs = {
  input: AdminUpsertExamAnswersInput;
};


export type MutationAdmin_UpsertExamSubmissionArgs = {
  input: AdminUpsertExamSubmissionInput;
};


export type MutationAdmin_UpsertLectureGradeFormArgs = {
  input: AdminUpsertLectureGradeFormInput;
};


export type MutationAdmin_UpsertLectureLabelCommentArgs = {
  input: AdminUpsertLectureLabelCommentInput;
};


export type MutationAdmin_UpsertLessonGradeArgs = {
  input: AdminUpsertLessonGradeInput;
};


export type MutationAdmin_UpsertManyLessonGradeArgs = {
  inputs: Array<AdminUpsertManyLessonGradeInput>;
};


export type MutationAdmin_UpsertUserConsultingArgs = {
  input: AdminUpsertUserConsultingInput;
};


export type MutationAnalyzePrivateFileMetadataArgs = {
  filename: Scalars['String']['input'];
  key: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};


export type MutationCreateInquiryArgs = {
  input: ClientCreateInquiryInput;
};


export type MutationCreateUserSchoolReportCardArgs = {
  input: ClientCreateUserSchoolReportCardInput;
};


export type MutationMy_CreateUserChatArgs = {
  input: ClientCreateUserChatInput;
};


export type MutationRefreshAuthTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationRequestLectureInvoiceArgs = {
  input: ClientRequestLectureInvoiceInput;
};


export type MutationRetryMyWrongAnswerArgs = {
  input: ClientRetryWrongAnswerInput;
};


export type MutationSignInByPhoneArgs = {
  deviceType?: InputMaybe<DeviceType>;
  password: Scalars['String']['input'];
  phone: Scalars['PhoneNumber']['input'];
  token?: InputMaybe<Scalars['String']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSignOutArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateUserSchoolReportCardArgs = {
  input: ClientUpdateUserSchoolReportCardInput;
};


export type MutationUpsertMyLessonVideoProgressArgs = {
  input: ClientUpsertLessonVideoProgressInput;
};


export type MutationUpsertUserDeviceArgs = {
  input: UpsertUserDeviceInput;
};

export type Notice = {
  __typename?: 'Notice';
  administrator: Teacher;
  attachments: Array<PrivateFile>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 공지 내용 */
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** 전체 공지 여부 */
  isAll: Scalars['Boolean']['output'];
  lectures: Array<Lecture>;
  link?: Maybe<Scalars['String']['output']>;
  /** 고정 공지 여부 */
  pinnedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 공지사항 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  users: Array<User>;
};

export type NoticeEdge = {
  __typename?: 'NoticeEdge';
  cursor: Scalars['String']['output'];
  node: Notice;
};

export type NoticePagination = {
  __typename?: 'NoticePagination';
  edges: Array<NoticeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum NoticeRelayOrder {
  Id = 'ID'
}

export type Notification = {
  __typename?: 'Notification';
  contents: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  lectureInvoice?: Maybe<LectureInvoice>;
  link?: Maybe<NotificationLink>;
  material?: Maybe<Material>;
  notice?: Maybe<Notice>;
  title: Scalars['String']['output'];
  user: User;
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

export type NotificationFilterInput = {
  /** 알림 타입 */
  types?: InputMaybe<Array<NotificationType>>;
};

export type NotificationLink = LectureInvoice | Material | Notice;

export type NotificationPagination = {
  __typename?: 'NotificationPagination';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum NotificationRelayOrder {
  Id = 'ID'
}

export enum NotificationType {
  CheckIn = 'CHECK_IN',
  InvoiceDue = 'INVOICE_DUE',
  NewLessonGrade = 'NEW_LESSON_GRADE',
  NewMaterial = 'NEW_MATERIAL',
  NewNotice = 'NEW_NOTICE',
  NewUserChat = 'NEW_USER_CHAT',
  Test = 'TEST'
}

/** 운영 정보 */
export type Operation = {
  __typename?: 'Operation';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  info: Array<OperationInfo>;
  message?: Maybe<Scalars['String']['output']>;
  type: OperationType;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type OperationInfo = {
  __typename?: 'OperationInfo';
  label: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type OperationInfoInput = {
  label: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export enum OperationType {
  DailyGradeComment = 'DAILY_GRADE_COMMENT',
  Wiki = 'WIKI'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PresignedForm = {
  __typename?: 'PresignedForm';
  key: Scalars['ID']['output'];
  url: Scalars['URL']['output'];
};

export type PrivateFile = {
  __typename?: 'PrivateFile';
  createdAt: Scalars['Timestamp']['output'];
  /** 원본 파일명 */
  filename?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** S3 Key */
  key: Scalars['ID']['output'];
  /** 파일 MIME타입 */
  mimeType: Scalars['String']['output'];
  /** 파일 크기 (byte) */
  size: Scalars['Float']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['URL']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminAdministrator: Administrator;
  admin_administratorPagination: AdministratorPagination;
  admin_book: Book;
  admin_bookPagination: BookPagination;
  admin_exam: Exam;
  admin_examPagination: ExamPagination;
  admin_examSubmission: ExamSubmission;
  admin_examSubmissions: Array<ExamSubmission>;
  admin_inquiry: Inquiry;
  admin_inquiryPagination: InquiryPagination;
  admin_lecture: Lecture;
  admin_lectureGradeFormCandidates: Array<LectureGradeFormCandidate>;
  admin_lectureInvoice: LectureInvoice;
  admin_lectureInvoicePagination: LectureInvoicePagination;
  admin_lecturePagination: LecturePagination;
  admin_lesson: Lesson;
  admin_lessonGradePagination: LessonGradePagination;
  admin_lessonGrades: Array<LessonGrade>;
  admin_lessonPagination: LessonPagination;
  admin_lessonVideo: LessonVideo;
  admin_lessonVideoPagination: LessonVideoPagination;
  admin_lessonVideoViewerStatuses: AdminLessonVideoViewerStatuses;
  admin_lessons: Array<Lesson>;
  admin_material: Material;
  admin_materialPagination: MaterialPagination;
  admin_notice: Notice;
  admin_noticePagination: NoticePagination;
  admin_operation: Operation;
  admin_school: School;
  admin_schoolPagination: SchoolPagination;
  admin_schools: Array<School>;
  admin_studyMaterial: StudyMaterial;
  admin_studyMaterialPagination: StudyMaterialPagination;
  admin_teacher: Teacher;
  admin_teacherPagination: TeacherPagination;
  admin_user: User;
  admin_userChatPagination: UserChatPagination;
  admin_userPagination: UserPagination;
  admin_users: Array<User>;
  admin_workLog: WorkLog;
  admin_workLogAuditLogPagination: WorkLogAuditLogPagination;
  admin_workLogPagination: WorkLogPagination;
  currentAdministrator?: Maybe<Administrator>;
  currentUser?: Maybe<User>;
  file?: Maybe<File>;
  lessonGradeCommentOperation: Operation;
  /** 로그인 된 학생의 시험 결과 조회 (본인 제출 + 채점 확정 검증) */
  myExamResult: ClientExamResult;
  /** 로그인 된 학생의 시험 제출 목록 조회 (채점 확정분만) */
  myExamSubmissions: Array<ExamSubmission>;
  /** 로그인 된 학생의 문의 목록 조회 */
  myInquiries: Array<Inquiry>;
  /** 수업 조회 (로그인된 학생이 수강중인 수업이 아니면 NULL 반환) */
  myLecture?: Maybe<Lecture>;
  /** 로그인 된 학생의 회비 조회 */
  myLectureInvoices: Array<LectureInvoice>;
  /** 로그인 된 학생의 수업 목록 조회 */
  myLectures: Array<Lecture>;
  myLessonGradeMonthlies: Array<LessonGradeMonthly>;
  myLessonGrades: Array<LessonGrade>;
  /** 강의 영상 조회 (공개된 영상 + 수강 검증) */
  myLessonVideo: LessonVideo;
  /** 로그인 된 학생의 강의 영상 시청 진도 목록 조회 */
  myLessonVideoProgresses: Array<LessonVideoProgress>;
  /** 로그인 된 학생의 강의 영상 목록 조회 (공개된 영상 + 수강 검증) */
  myLessonVideos: Array<LessonVideo>;
  /** 로그인 된 학생의 "개별 수업" 목록 조회 */
  myLessons: Array<Lesson>;
  /** 로그인 된 학생의 학습자료 목록 조회 (학생이 수강중인 수업 + 전체 학습자료) */
  myMaterials: Array<Material>;
  /** 로그인 된 학생의 공지 목록 조회 (학생이 수강중인 수업 + 전체 공지) */
  myNotices: Array<Notice>;
  /** 내 알림 목록 조회 */
  myNotificationPagination: NotificationPagination;
  /** 로그인 된 학생의 성젹표 조회 */
  mySchoolReportCards: Array<UserSchoolReportCard>;
  /** 로그인 된 학생의 오답노트 목록 조회 (채점 확정분만) */
  myWrongAnswers: Array<ClientWrongAnswer>;
  /** 로그인 된 학생의 공부하기 자료 목록 조회 */
  my_studyMaterials: Array<StudyMaterial>;
  my_userChatPagination: UserChatPagination;
  schoolPagination: SchoolPagination;
};


export type QueryAdminAdministratorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_AdministratorPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminAdministratorFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AdministratorRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdmin_BookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_BookPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminBookFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BookRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_ExamArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_ExamPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminExamFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ExamRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdmin_ExamSubmissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_ExamSubmissionsArgs = {
  examId: Scalars['ID']['input'];
};


export type QueryAdmin_InquiryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_InquiryPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminInquiryFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<InquiryRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_LectureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_LectureInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_LectureInvoicePaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLectureInvoiceFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LectureInvoiceRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_LecturePaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLectureFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LectureRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_LessonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_LessonGradePaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLessonGradePaginationFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LessonGradeRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdmin_LessonGradesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminLessonGradesFilterInput>;
  order?: InputMaybe<LessonGradeRelayOrder>;
};


export type QueryAdmin_LessonPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLessonFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LessonRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_LessonVideoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_LessonVideoPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLessonVideoFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LessonVideoRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdmin_LessonVideoViewerStatusesArgs = {
  lessonVideoId: Scalars['ID']['input'];
};


export type QueryAdmin_LessonsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminLessonFilterInput>;
  order?: InputMaybe<LessonRelayOrder>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_MaterialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_MaterialPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminMaterialFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MaterialRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_NoticeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_NoticePaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminNoticeFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<NoticeRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_OperationArgs = {
  type: OperationType;
};


export type QueryAdmin_SchoolArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_SchoolPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminSchoolFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SchoolRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_SchoolsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminSchoolFilterInput>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_StudyMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_StudyMaterialPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminStudyMaterialFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<StudyMaterialRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_TeacherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_TeacherPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminTeacherFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TeacherRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_UserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_UserChatPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminUserChatFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_UserPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminUserFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_UsersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminUserFilterInput>;
  order?: InputMaybe<UserRelayOrder>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_WorkLogArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdmin_WorkLogAuditLogPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminWorkLogAuditLogFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WorkLogAuditLogRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdmin_WorkLogPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminWorkLogFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<WorkLogRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyExamResultArgs = {
  submissionId: Scalars['ID']['input'];
};


export type QueryMyExamSubmissionsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientExamSubmissionFilterInput>;
};


export type QueryMyInquiriesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientInquiryFilterInput>;
  order?: InputMaybe<InquiryRelayOrder>;
};


export type QueryMyLectureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyLectureInvoicesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientLectureInvoiceFilterInput>;
  order?: InputMaybe<LectureInvoiceRelayOrder>;
};


export type QueryMyLecturesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<LectureRelayOrder>;
};


export type QueryMyLessonGradesArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientLessonGradesFilterInput>;
  order?: InputMaybe<LessonGradeRelayOrder>;
};


export type QueryMyLessonVideoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyLessonVideoProgressesArgs = {
  lectureId: Scalars['ID']['input'];
};


export type QueryMyLessonVideosArgs = {
  lectureId: Scalars['ID']['input'];
  lessonId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMyLessonsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientLessonFilterInput>;
  order?: InputMaybe<LessonRelayOrder>;
};


export type QueryMyNotificationPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NotificationFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<NotificationRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyWrongAnswersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<ClientWrongAnswerFilterInput>;
};


export type QueryMy_UserChatPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySchoolPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SchoolFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<SchoolRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** 재시험 */
export enum Retest {
  /** 재시험 완료 */
  Done = 'DONE',
  /** 재시험 예정 */
  Need = 'NEED',
  /** 재시험 필요 없음 (통과) */
  NoNeed = 'NO_NEED'
}

export type School = {
  __typename?: 'School';
  admin_users: Array<User>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  type: SchoolType;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type SchoolEdge = {
  __typename?: 'SchoolEdge';
  cursor: Scalars['String']['output'];
  node: School;
};

export type SchoolFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolPagination = {
  __typename?: 'SchoolPagination';
  edges: Array<SchoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum SchoolRelayOrder {
  Id = 'ID'
}

/** 학교 성적표 종류 */
export enum SchoolReportType {
  /** 기말고사 */
  Final = 'FINAL',
  /** 중간고사 */
  Midterm = 'MIDTERM',
  /** 모의고사 */
  Mock = 'MOCK'
}

export enum SchoolType {
  Elementary = 'ELEMENTARY',
  High = 'HIGH',
  Middle = 'MIDDLE'
}

export type StudyMaterial = {
  __typename?: 'StudyMaterial';
  administrator: Administrator;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  /** 전체 공지 여부 */
  isAll: Scalars['Boolean']['output'];
  lectures: Array<Lecture>;
  materialAttachments?: Maybe<Array<StudyMaterialAttachment>>;
  /** 수업자료 제목 */
  title: Scalars['String']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  users: Array<User>;
};

export type StudyMaterialAttachment = {
  __typename?: 'StudyMaterialAttachment';
  attachment: PrivateFile;
  name: Scalars['String']['output'];
};

export type StudyMaterialAttachmentInput = {
  fileId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type StudyMaterialEdge = {
  __typename?: 'StudyMaterialEdge';
  cursor: Scalars['String']['output'];
  node: StudyMaterial;
};

export type StudyMaterialPagination = {
  __typename?: 'StudyMaterialPagination';
  edges: Array<StudyMaterialEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum StudyMaterialRelayOrder {
  Id = 'ID'
}

/** 보강 */
export enum Supplementary {
  /** 보강 완료 */
  Done = 'DONE',
  /** 보강 예정 */
  Need = 'NEED',
  /** 보강 필요 없음 */
  NoNeed = 'NO_NEED'
}

export type Teacher = {
  __typename?: 'Teacher';
  admin_lectures: Array<Lecture>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  /** 강사 이름 */
  name: Scalars['String']['output'];
  /** 연락처 */
  phone?: Maybe<Scalars['String']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type TeacherEdge = {
  __typename?: 'TeacherEdge';
  cursor: Scalars['String']['output'];
  node: Teacher;
};

export type TeacherPagination = {
  __typename?: 'TeacherPagination';
  edges: Array<TeacherEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum TeacherRelayOrder {
  Id = 'ID'
}

export type UpdateUserInput = {
  distractionEndTime?: InputMaybe<Scalars['String']['input']>;
  distractionStartTime?: InputMaybe<Scalars['String']['input']>;
  isDistractionMode: Scalars['Boolean']['input'];
};

export type UpsertUserDeviceInput = {
  token: Scalars['String']['input'];
  type: DeviceType;
  userAgent?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  adminUnreadUserChats: Array<UserChat>;
  admin_userConsulting?: Maybe<UserConsulting>;
  admin_userDevices: Array<UserDevice>;
  admin_userLectureTransfers: Array<UserLectureTransfer>;
  admin_userLessonGradeMonthly: Array<LessonGradeMonthly>;
  /** 생년월일 */
  birthDate: Scalars['Date']['output'];
  code: Scalars['String']['output'];
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 비활성화 시각 */
  deactivatedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 방해금지모드 종료 시간 (HH:mm) */
  distractionEndTime?: Maybe<Scalars['String']['output']>;
  /** 방해금지모드 시작 시간 (HH:mm) */
  distractionStartTime?: Maybe<Scalars['String']['output']>;
  /** 성별(Male, Female) */
  gender: Gender;
  /** 학년 */
  grade?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  /** 방해금지모드 여부 */
  isDistractionMode: Scalars['Boolean']['output'];
  lectures: Array<Lecture>;
  memo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  /** 부모님 이름 */
  parentName?: Maybe<Scalars['String']['output']>;
  /** 부모님 연락처 */
  parentPhone?: Maybe<Scalars['String']['output']>;
  /** 회비 예정일 */
  payDueDay?: Maybe<Scalars['Int']['output']>;
  /** 연락처 */
  phone?: Maybe<Scalars['PhoneNumber']['output']>;
  /** 학원 등록일 */
  registeredDate: Scalars['Date']['output'];
  school: School;
  /** 학생 상태 */
  state: UserState;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  userSchoolReportCards: Array<UserSchoolReportCard>;
};

export type UserChat = {
  __typename?: 'UserChat';
  administrator?: Maybe<Administrator>;
  administratorReadAt?: Maybe<Scalars['Timestamp']['output']>;
  attachments: Array<PrivateFile>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
  userReadAt?: Maybe<Scalars['Timestamp']['output']>;
};

export type UserChatEdge = {
  __typename?: 'UserChatEdge';
  cursor: Scalars['String']['output'];
  node: UserChat;
};

export type UserChatPagination = {
  __typename?: 'UserChatPagination';
  edges: Array<UserChatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserConsulting = {
  __typename?: 'UserConsulting';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  data?: Maybe<Array<ConsultingData>>;
  id: Scalars['ID']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type UserDevice = {
  __typename?: 'UserDevice';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  type: DeviceType;
  updatedAt: Scalars['Timestamp']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserLectureTransfer = {
  __typename?: 'UserLectureTransfer';
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  fromLecture?: Maybe<Lecture>;
  id: Scalars['ID']['output'];
  toLecture?: Maybe<Lecture>;
  transferDate: Scalars['Date']['output'];
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
  user: User;
};

export type UserPagination = {
  __typename?: 'UserPagination';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum UserRelayOrder {
  Id = 'ID',
  UserChatUpdatedAt = 'USER_CHAT_UPDATED_AT'
}

/** 학생의 학교 성적표 */
export type UserSchoolReportCard = {
  __typename?: 'UserSchoolReportCard';
  attachment?: Maybe<PrivateFile>;
  /** 학년 (1,2,3학년 의 숫자값 1,2,3) */
  grade: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  /** 등급 (1,2,3 등급) */
  level: Scalars['Int']['output'];
  /** 백분위 */
  percentage?: Maybe<Scalars['Int']['output']>;
  /** 석차 (등수) */
  rank: Scalars['Int']['output'];
  school?: Maybe<School>;
  /** 점수 */
  score: Scalars['Int']['output'];
  /** 학기 (1,2학기 의 숫자값 1,2) */
  term: Scalars['Int']['output'];
  /** 전체 인원 */
  totalCount?: Maybe<Scalars['Int']['output']>;
  /** 성적표의 종류 (중간고사, 기말고사, 모의고사) */
  type: SchoolReportType;
  user: User;
};

/** 학생 상태 */
export enum UserState {
  /** 재원 */
  Enrolled = 'ENROLLED',
  /** 수업예정 */
  Scheduled = 'SCHEDULED',
  /** 휴원 */
  Suspended = 'SUSPENDED',
  /** 퇴원 */
  Withdrawn = 'WITHDRAWN'
}

export type WatchedSegment = {
  __typename?: 'WatchedSegment';
  /** 시청 구간 종료 (초) */
  e: Scalars['Float']['output'];
  /** 시청 구간 시작 (초) */
  s: Scalars['Float']['output'];
};

export type WatchedSegmentInput = {
  /** 시청 구간 종료 (초) */
  e: Scalars['Float']['input'];
  /** 시청 구간 시작 (초) */
  s: Scalars['Float']['input'];
};

export type WorkLog = {
  __typename?: 'WorkLog';
  admin_administrator?: Maybe<Administrator>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  date: Scalars['Date']['output'];
  /** 작업 내용 */
  description: Scalars['String']['output'];
  /** 작업 종료 시간 (HH:mm) */
  endTime?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  /** 작업 시작 시간 (HH:mm) */
  startTime?: Maybe<Scalars['String']['output']>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};

export type WorkLogAuditLog = {
  __typename?: 'WorkLogAuditLog';
  admin_administrator?: Maybe<Administrator>;
  createdAt: Scalars['Timestamp']['output'];
  diff: Array<AuditLogDiff>;
  id: Scalars['ID']['output'];
};

export type WorkLogAuditLogEdge = {
  __typename?: 'WorkLogAuditLogEdge';
  cursor: Scalars['String']['output'];
  node: WorkLogAuditLog;
};

export type WorkLogAuditLogPagination = {
  __typename?: 'WorkLogAuditLogPagination';
  edges: Array<WorkLogAuditLogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum WorkLogAuditLogRelayOrder {
  Id = 'ID'
}

export type WorkLogEdge = {
  __typename?: 'WorkLogEdge';
  cursor: Scalars['String']['output'];
  node: WorkLog;
};

export type WorkLogPagination = {
  __typename?: 'WorkLogPagination';
  edges: Array<WorkLogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum WorkLogRelayOrder {
  Date = 'DATE',
  Id = 'ID'
}

export type AnalyzePrivateFileMetadataMutationVariables = Exact<{
  key: Scalars['String']['input'];
  filename: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
}>;


export type AnalyzePrivateFileMetadataMutation = { __typename?: 'Mutation', analyzePrivateFileMetadata: { __typename?: 'PrivateFile', id: string, mimeType: string, url: string } };

export type CreateInquiryMutationVariables = Exact<{
  input: ClientCreateInquiryInput;
}>;


export type CreateInquiryMutation = { __typename?: 'Mutation', createInquiry: { __typename?: 'Inquiry', id: string } };

export type ReadAllUserChatsMutationVariables = Exact<{ [key: string]: never; }>;


export type ReadAllUserChatsMutation = { __typename?: 'Mutation', my_readAllUserChats: boolean };

export type RetryMyWrongAnswerMutationVariables = Exact<{
  input: ClientRetryWrongAnswerInput;
}>;


export type RetryMyWrongAnswerMutation = { __typename?: 'Mutation', retryMyWrongAnswer: { __typename?: 'ExamAnswerRetry', id: string, value: string, isCorrect: boolean, createdAt: number } };

export type UpsertMyLessonVideoProgressMutationVariables = Exact<{
  input: ClientUpsertLessonVideoProgressInput;
}>;


export type UpsertMyLessonVideoProgressMutation = { __typename?: 'Mutation', upsertMyLessonVideoProgress: { __typename?: 'LessonVideoProgress', id: string, lessonVideoId: string, lastPositionSeconds: number, watchedSeconds: number, progressRatio: number, isCompleted: boolean, updatedAt: number } };

export type CreateUserChatMutationVariables = Exact<{
  input: ClientCreateUserChatInput;
}>;


export type CreateUserChatMutation = { __typename?: 'Mutation', createUserChat: { __typename?: 'UserChat', id: string } };

export type GetDailyGradeCommentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyGradeCommentQuery = { __typename?: 'Query', operation: { __typename?: 'Operation', id: string, message?: string | null } };

export type DailyGradeComment_OperationFragment = { __typename?: 'Operation', id: string, message?: string | null };

export type GetMyExamResultQueryVariables = Exact<{
  submissionId: Scalars['ID']['input'];
}>;


export type GetMyExamResultQuery = { __typename?: 'Query', examResult: { __typename?: 'ClientExamResult', exam: { __typename?: 'Exam', id: string, title: string, category?: string | null, maxScore: number, isRetest: boolean, levelCuts?: Array<{ __typename?: 'ExamLevelCut', level: number, score: number }> | null }, submission: { __typename?: 'ExamSubmission', id: string, examId: string, totalScore?: number | null, isPassed?: boolean | null, status: ExamSubmissionStatus, submitType: ExamSubmitType, confirmedAt?: number | null }, statistics: { __typename?: 'ClientExamStatistics', applicants: number, histogram: Array<number>, max?: number | null, mean?: number | null, myRank?: number | null, stddev?: number | null, topTenPercentMean?: number | null }, displaySettings?: { __typename?: 'ExamDisplaySettings', showHistogram?: boolean | null, showLevel?: boolean | null, showRank?: boolean | null, showStatistics?: boolean | null } | null, questionResults: Array<{ __typename?: 'ClientExamQuestionResult', examAnswerId?: string | null, no: number, unit?: string | null, questionImageDataUrl?: string | null, questionType: ExamQuestionType, point: number, earnedPoint?: number | null, isCorrect?: boolean | null, value?: string | null, answer: string }>, questionFile?: { __typename?: 'PrivateFile', id: string, filename?: string | null, url: string } | null } };

export type MyExamResult_QuestionResultFragment = { __typename?: 'ClientExamQuestionResult', examAnswerId?: string | null, no: number, unit?: string | null, questionImageDataUrl?: string | null, questionType: ExamQuestionType, point: number, earnedPoint?: number | null, isCorrect?: boolean | null, value?: string | null, answer: string };

export type GetMyExamSubmissionsQueryVariables = Exact<{
  filter?: InputMaybe<ClientExamSubmissionFilterInput>;
}>;


export type GetMyExamSubmissionsQuery = { __typename?: 'Query', submissions: Array<{ __typename?: 'ExamSubmission', id: string, examId: string, totalScore?: number | null, isPassed?: boolean | null, status: ExamSubmissionStatus, submitType: ExamSubmitType, confirmedAt?: number | null, createdAt: number }> };

export type GetMyLectureInvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLectureInvoicesQuery = { __typename?: 'Query', myLectureInvoices: Array<{ __typename?: 'LectureInvoice', id: string, price: number, state: LectureInvoiceState, type: InvoiceType, paidAt?: number | null, method?: InvoiceMethod | null, dueDate: string, lecture?: { __typename?: 'Lecture', id: string, title: string } | null, books: Array<{ __typename?: 'Book', id: string, title: string, price?: number | null }> }> };

export type GetMyLessonVideoQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMyLessonVideoQuery = { __typename?: 'Query', lessonVideo: { __typename?: 'LessonVideo', id: string, title: string, memo?: string | null, lessonId: string, sourceType: LessonVideoSourceType, youtubeVideoId?: string | null, durationSeconds?: number | null, hlsPlaylistText?: string | null, chapters?: Array<{ __typename?: 'LessonVideoChapter', label: string, seconds: number }> | null, attachment?: { __typename?: 'PrivateFile', id: string, filename?: string | null, mimeType: string, size: number, url: string } | null, materials: Array<{ __typename?: 'Material', id: string, title: string, attachments: Array<{ __typename?: 'PrivateFile', id: string, filename?: string | null, mimeType: string, size: number, url: string }> }> } };

export type GetMyLessonVideoProgressesQueryVariables = Exact<{
  lectureId: Scalars['ID']['input'];
}>;


export type GetMyLessonVideoProgressesQuery = { __typename?: 'Query', progresses: Array<{ __typename?: 'LessonVideoProgress', id: string, lessonVideoId: string, lastPositionSeconds: number, watchedSeconds: number, progressRatio: number, isCompleted: boolean }> };

export type GetMyLessonVideosQueryVariables = Exact<{
  lectureId: Scalars['ID']['input'];
}>;


export type GetMyLessonVideosQuery = { __typename?: 'Query', lecture?: { __typename?: 'Lecture', id: string, title: string, lessons?: Array<{ __typename?: 'Lesson', id: string, date: string }> | null } | null, lessonVideos: Array<{ __typename?: 'LessonVideo', id: string, title: string, lessonId: string, sourceType: LessonVideoSourceType, durationSeconds?: number | null, createdAt: number, updatedAt: number }>, progresses: Array<{ __typename?: 'LessonVideoProgress', id: string, lessonVideoId: string, lastPositionSeconds: number, watchedSeconds: number, progressRatio: number, isCompleted: boolean, updatedAt: number }> };

export type MyLessonVideos_LessonVideoFragment = { __typename?: 'LessonVideo', id: string, title: string, lessonId: string, sourceType: LessonVideoSourceType, durationSeconds?: number | null, createdAt: number, updatedAt: number };

export type MyLessonVideos_LessonVideoProgressFragment = { __typename?: 'LessonVideoProgress', id: string, lessonVideoId: string, lastPositionSeconds: number, watchedSeconds: number, progressRatio: number, isCompleted: boolean, updatedAt: number };

export type GetMyMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyMaterialsQuery = { __typename?: 'Query', myMaterials: Array<{ __typename?: 'Material', description: string, id: string, title: string, createdAt: number, updatedAt: number, attachments: Array<{ __typename?: 'PrivateFile', createdAt: number, filename?: string | null, id: string, mimeType: string, size: number, updatedAt: number, url: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, title: string }> }> };

export type GetMyNoticesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyNoticesQuery = { __typename?: 'Query', myNotices: Array<{ __typename?: 'Notice', id: string, title: string, description: string, pinnedAt?: number | null, isAll: boolean, link?: string | null, updatedAt: number, createdAt: number, lectures: Array<{ __typename?: 'Lecture', id: string, title: string }>, attachments: Array<{ __typename?: 'PrivateFile', createdAt: number, filename?: string | null, id: string, mimeType: string, size: number, updatedAt: number, url: string }> }> };

export type GetMyNotificationsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<NotificationRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  filter?: InputMaybe<NotificationFilterInput>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetMyNotificationsQuery = { __typename?: 'Query', myNotificationPagination: { __typename?: 'NotificationPagination', totalCount: number, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node: { __typename?: 'Notification', id: string, createdAt: number, contents: string, title: string, link?: { __typename: 'LectureInvoice', id: string } | { __typename: 'Material', id: string } | { __typename: 'Notice', id: string } | null, lectureInvoice?: { __typename?: 'LectureInvoice', price: number, state: LectureInvoiceState, type: InvoiceType, paidAt?: number | null, method?: InvoiceMethod | null, dueDate: string, lecture?: { __typename?: 'Lecture', id: string, title: string } | null, books: Array<{ __typename?: 'Book', id: string, title: string, price?: number | null }> } | null, material?: { __typename?: 'Material', description: string, id: string, title: string, createdAt: number, updatedAt: number, attachments: Array<{ __typename?: 'PrivateFile', createdAt: number, filename?: string | null, id: string, mimeType: string, size: number, updatedAt: number, url: string }>, lectures: Array<{ __typename?: 'Lecture', id: string, title: string }> } | null, notice?: { __typename?: 'Notice', createdAt: number, description: string, id: string, isAll: boolean, link?: string | null, title: string, updatedAt: number, lectures: Array<{ __typename?: 'Lecture', id: string, title: string }>, attachments: Array<{ __typename?: 'PrivateFile', createdAt: number, filename?: string | null, id: string, mimeType: string, size: number, updatedAt: number, url: string }> } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type GetMyStudyMaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyStudyMaterialsQuery = { __typename?: 'Query', studyMaterials: Array<{ __typename?: 'StudyMaterial', id: string, title: string, isAll: boolean, updatedAt: number, createdAt: number, materialAttachments?: Array<{ __typename?: 'StudyMaterialAttachment', name: string, attachment: { __typename?: 'PrivateFile', filename?: string | null, id: string, mimeType: string, size: number, url: string } }> | null }> };

export type MyStudyMaterials_StudyMaterialFragment = { __typename?: 'StudyMaterial', id: string, title: string, isAll: boolean, updatedAt: number, createdAt: number, materialAttachments?: Array<{ __typename?: 'StudyMaterialAttachment', name: string, attachment: { __typename?: 'PrivateFile', filename?: string | null, id: string, mimeType: string, size: number, url: string } }> | null };

export type GetMyWrongAnswersQueryVariables = Exact<{
  filter?: InputMaybe<ClientWrongAnswerFilterInput>;
}>;


export type GetMyWrongAnswersQuery = { __typename?: 'Query', wrongAnswers: Array<{ __typename?: 'ClientWrongAnswer', isResolved: boolean, questionImageDataUrl?: string | null, exam: { __typename?: 'Exam', id: string, title: string, category?: string | null, maxScore: number }, examAnswer: { __typename?: 'ExamAnswer', id: string, value?: string | null, isCorrect?: boolean | null, earnedPoint?: number | null, question: { __typename?: 'ExamQuestion', id: string, no: number, point: number, unit?: string | null, questionType: ExamQuestionType }, retries: Array<{ __typename?: 'ExamAnswerRetry', id: string, value: string, isCorrect: boolean, createdAt: number }> }, questionFile?: { __typename?: 'PrivateFile', id: string, filename?: string | null, url: string } | null }> };

export type MyWrongAnswers_WrongAnswerFragment = { __typename?: 'ClientWrongAnswer', isResolved: boolean, questionImageDataUrl?: string | null, exam: { __typename?: 'Exam', id: string, title: string, category?: string | null, maxScore: number }, examAnswer: { __typename?: 'ExamAnswer', id: string, value?: string | null, isCorrect?: boolean | null, earnedPoint?: number | null, question: { __typename?: 'ExamQuestion', id: string, no: number, point: number, unit?: string | null, questionType: ExamQuestionType }, retries: Array<{ __typename?: 'ExamAnswerRetry', id: string, value: string, isCorrect: boolean, createdAt: number }> }, questionFile?: { __typename?: 'PrivateFile', id: string, filename?: string | null, url: string } | null };

export type GetUserChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatsQuery = { __typename?: 'Query', userChats: { __typename?: 'UserChatPagination', edges: Array<{ __typename?: 'UserChatEdge', node: { __typename?: 'UserChat', id: string, message?: string | null, createdAt: number, updatedAt: number, user: { __typename?: 'User', id: string, name: string }, administrator?: { __typename?: 'Administrator', id: string, name: string } | null, attachments: Array<{ __typename?: 'PrivateFile', id: string, mimeType: string, size: number, url: string, filename?: string | null, createdAt: number, updatedAt: number }> } }> } };

export type UserChatFragment = { __typename?: 'UserChat', id: string, message?: string | null, createdAt: number, updatedAt: number, user: { __typename?: 'User', id: string, name: string }, administrator?: { __typename?: 'Administrator', id: string, name: string } | null, attachments: Array<{ __typename?: 'PrivateFile', id: string, mimeType: string, size: number, url: string, filename?: string | null, createdAt: number, updatedAt: number }> };

export type GetGradeMonthlyTabQueryVariables = Exact<{
  filter?: InputMaybe<ClientLessonGradesFilterInput>;
  order: LessonGradeRelayOrder;
  asc: Scalars['Boolean']['input'];
}>;


export type GetGradeMonthlyTabQuery = { __typename?: 'Query', lessonGrades: Array<{ __typename?: 'LessonGrade', id: string, updatedAt: number, gradeType: GradeType, attendanceStatus?: AttendanceStatus | null, comment?: string | null, lesson?: { __typename?: 'Lesson', id: string, date: string, startTime: string, endTime: string, lecture: { __typename?: 'Lecture', id: string, title: string, defaultGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null, examGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null } } | null, data?: Array<{ __typename?: 'LectureGradeFormData', id: string, type: string, label: string, value?: any | null, value2?: any | null, maxValue?: number | null }> | null }>, lessonGradeMonthlies: Array<{ __typename?: 'LessonGradeMonthly', id: string, month: string, score?: { __typename?: 'LessonGradeMonthlyScore', attendance?: string | null, assignment?: string | null, test?: string | null, progress?: string | null, comment?: string | null } | null }> };

export type GradeMonthlyTab_LessonGradeFragment = { __typename?: 'LessonGrade', id: string, updatedAt: number, gradeType: GradeType, attendanceStatus?: AttendanceStatus | null, comment?: string | null, lesson?: { __typename?: 'Lesson', id: string, date: string, startTime: string, endTime: string, lecture: { __typename?: 'Lecture', id: string, title: string, defaultGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null, examGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null } } | null, data?: Array<{ __typename?: 'LectureGradeFormData', id: string, type: string, label: string, value?: any | null, value2?: any | null, maxValue?: number | null }> | null };

export type GradeMonthlyTab_LessonGradeMonthlyFragment = { __typename?: 'LessonGradeMonthly', id: string, month: string, score?: { __typename?: 'LessonGradeMonthlyScore', attendance?: string | null, assignment?: string | null, test?: string | null, progress?: string | null, comment?: string | null } | null };

export type GradeMonthlyTab_LessonFragment = { __typename?: 'Lesson', id: string, date: string, startTime: string, endTime: string, lecture: { __typename?: 'Lecture', id: string, title: string, defaultGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null, examGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null } };

export type GradeMonthlyTab_LectureFragment = { __typename?: 'Lecture', id: string, title: string, defaultGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null, examGradeForm?: { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> } | null };

export type GradeMonthlyTab_GradeFormFragment = { __typename?: 'LectureGradeForm', id: string, labels: Array<{ __typename?: 'LectureGradeFormLabel', id: string, type: string, value: string }> };

export const DailyGradeComment_OperationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyGradeComment_Operation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DailyGradeComment_OperationFragment, unknown>;
export const MyExamResult_QuestionResultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyExamResult_QuestionResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientExamQuestionResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examAnswerId"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"questionImageDataUrl"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"earnedPoint"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]} as unknown as DocumentNode<MyExamResult_QuestionResultFragment, unknown>;
export const MyLessonVideos_LessonVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyLessonVideos_LessonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"lessonId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceType"}},{"kind":"Field","name":{"kind":"Name","value":"durationSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyLessonVideos_LessonVideoFragment, unknown>;
export const MyLessonVideos_LessonVideoProgressFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyLessonVideos_LessonVideoProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonVideoProgress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonVideoId"}},{"kind":"Field","name":{"kind":"Name","value":"lastPositionSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"watchedSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progressRatio"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MyLessonVideos_LessonVideoProgressFragment, unknown>;
export const MyStudyMaterials_StudyMaterialFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StudyMaterial"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"materialAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MyStudyMaterials_StudyMaterialFragment, unknown>;
export const MyWrongAnswers_WrongAnswerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyWrongAnswers_WrongAnswer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientWrongAnswer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isResolved"}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examAnswer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"earnedPoint"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"retries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionImageDataUrl"}}]}}]} as unknown as DocumentNode<MyWrongAnswers_WrongAnswerFragment, unknown>;
export const UserChatFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"administrator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserChatFragment, unknown>;
export const GradeMonthlyTab_GradeFormFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureGradeForm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GradeMonthlyTab_GradeFormFragment, unknown>;
export const GradeMonthlyTab_LectureFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"defaultGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"DEFAULT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"examGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"EXAM"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureGradeForm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GradeMonthlyTab_LectureFragment, unknown>;
export const GradeMonthlyTab_LessonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"defaultGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"DEFAULT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"examGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"EXAM"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureGradeForm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GradeMonthlyTab_LessonFragment, unknown>;
export const GradeMonthlyTab_LessonGradeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGrade"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonGrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"gradeType"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_Lesson"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"value2"}},{"kind":"Field","name":{"kind":"Name","value":"maxValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"defaultGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"DEFAULT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"examGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"EXAM"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureGradeForm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GradeMonthlyTab_LessonGradeFragment, unknown>;
export const GradeMonthlyTab_LessonGradeMonthlyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGradeMonthly"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonGradeMonthly"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendance"}},{"kind":"Field","name":{"kind":"Name","value":"assignment"}},{"kind":"Field","name":{"kind":"Name","value":"test"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<GradeMonthlyTab_LessonGradeMonthlyFragment, unknown>;
export const AnalyzePrivateFileMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AnalyzePrivateFileMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyzePrivateFileMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"filename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filename"}}},{"kind":"Argument","name":{"kind":"Name","value":"mimeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AnalyzePrivateFileMetadataMutation, AnalyzePrivateFileMetadataMutationVariables>;
export const CreateInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateInquiryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInquiryMutation, CreateInquiryMutationVariables>;
export const ReadAllUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadAllUserChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"my_readAllUserChats"}}]}}]} as unknown as DocumentNode<ReadAllUserChatsMutation, ReadAllUserChatsMutationVariables>;
export const RetryMyWrongAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryMyWrongAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientRetryWrongAnswerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryMyWrongAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<RetryMyWrongAnswerMutation, RetryMyWrongAnswerMutationVariables>;
export const UpsertMyLessonVideoProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertMyLessonVideoProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientUpsertLessonVideoProgressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertMyLessonVideoProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonVideoId"}},{"kind":"Field","name":{"kind":"Name","value":"lastPositionSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"watchedSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progressRatio"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpsertMyLessonVideoProgressMutation, UpsertMyLessonVideoProgressMutationVariables>;
export const CreateUserChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateUserChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"createUserChat"},"name":{"kind":"Name","value":"my_createUserChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserChatMutation, CreateUserChatMutationVariables>;
export const GetDailyGradeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDailyGradeComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"operation"},"name":{"kind":"Name","value":"lessonGradeCommentOperation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DailyGradeComment_Operation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyGradeComment_Operation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GetDailyGradeCommentQuery, GetDailyGradeCommentQueryVariables>;
export const GetMyExamResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyExamResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"submissionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"examResult"},"name":{"kind":"Name","value":"myExamResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"submissionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"submissionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}},{"kind":"Field","name":{"kind":"Name","value":"isRetest"}},{"kind":"Field","name":{"kind":"Name","value":"levelCuts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"submission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"examId"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"}},{"kind":"Field","name":{"kind":"Name","value":"isPassed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"submitType"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applicants"}},{"kind":"Field","name":{"kind":"Name","value":"histogram"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"mean"}},{"kind":"Field","name":{"kind":"Name","value":"myRank"}},{"kind":"Field","name":{"kind":"Name","value":"stddev"}},{"kind":"Field","name":{"kind":"Name","value":"topTenPercentMean"}}]}},{"kind":"Field","name":{"kind":"Name","value":"displaySettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showHistogram"}},{"kind":"Field","name":{"kind":"Name","value":"showLevel"}},{"kind":"Field","name":{"kind":"Name","value":"showRank"}},{"kind":"Field","name":{"kind":"Name","value":"showStatistics"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionResults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyExamResult_QuestionResult"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyExamResult_QuestionResult"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientExamQuestionResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"examAnswerId"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"questionImageDataUrl"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"earnedPoint"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]} as unknown as DocumentNode<GetMyExamResultQuery, GetMyExamResultQueryVariables>;
export const GetMyExamSubmissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyExamSubmissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientExamSubmissionFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"submissions"},"name":{"kind":"Name","value":"myExamSubmissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"examId"}},{"kind":"Field","name":{"kind":"Name","value":"totalScore"}},{"kind":"Field","name":{"kind":"Name","value":"isPassed"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"submitType"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetMyExamSubmissionsQuery, GetMyExamSubmissionsQueryVariables>;
export const GetMyLectureInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLectureInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myLectureInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyLectureInvoicesQuery, GetMyLectureInvoicesQueryVariables>;
export const GetMyLessonVideoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLessonVideo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"lessonVideo"},"name":{"kind":"Name","value":"myLessonVideo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"memo"}},{"kind":"Field","name":{"kind":"Name","value":"lessonId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceType"}},{"kind":"Field","name":{"kind":"Name","value":"youtubeVideoId"}},{"kind":"Field","name":{"kind":"Name","value":"durationSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"hlsPlaylistText"}},{"kind":"Field","name":{"kind":"Name","value":"chapters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"seconds"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMyLessonVideoQuery, GetMyLessonVideoQueryVariables>;
export const GetMyLessonVideoProgressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLessonVideoProgresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"progresses"},"name":{"kind":"Name","value":"myLessonVideoProgresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonVideoId"}},{"kind":"Field","name":{"kind":"Name","value":"lastPositionSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"watchedSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progressRatio"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}}]}}]}}]} as unknown as DocumentNode<GetMyLessonVideoProgressesQuery, GetMyLessonVideoProgressesQueryVariables>;
export const GetMyLessonVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLessonVideos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"lecture"},"name":{"kind":"Name","value":"myLecture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"lessonVideos"},"name":{"kind":"Name","value":"myLessonVideos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyLessonVideos_LessonVideo"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"progresses"},"name":{"kind":"Name","value":"myLessonVideoProgresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lectureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lectureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyLessonVideos_LessonVideoProgress"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyLessonVideos_LessonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonVideo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"lessonId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceType"}},{"kind":"Field","name":{"kind":"Name","value":"durationSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyLessonVideos_LessonVideoProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonVideoProgress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonVideoId"}},{"kind":"Field","name":{"kind":"Name","value":"lastPositionSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"watchedSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"progressRatio"}},{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetMyLessonVideosQuery, GetMyLessonVideosQueryVariables>;
export const GetMyMaterialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyMaterialsQuery, GetMyMaterialsQueryVariables>;
export const GetMyNoticesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetMyNoticesQuery, GetMyNoticesQueryVariables>;
export const GetMyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationRelayOrder"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"asc"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotificationPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"asc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"asc"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureInvoice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Material"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectureInvoice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"material"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"notice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export const GetMyStudyMaterialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyStudyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"studyMaterials"},"name":{"kind":"Name","value":"my_studyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StudyMaterial"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"materialAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetMyStudyMaterialsQuery, GetMyStudyMaterialsQueryVariables>;
export const GetMyWrongAnswersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyWrongAnswers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientWrongAnswerFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"wrongAnswers"},"name":{"kind":"Name","value":"myWrongAnswers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyWrongAnswers_WrongAnswer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyWrongAnswers_WrongAnswer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClientWrongAnswer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isResolved"}},{"kind":"Field","name":{"kind":"Name","value":"exam"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"maxScore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"examAnswer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"earnedPoint"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"no"}},{"kind":"Field","name":{"kind":"Name","value":"point"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"questionType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"retries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"isCorrect"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questionImageDataUrl"}}]}}]} as unknown as DocumentNode<GetMyWrongAnswersQuery, GetMyWrongAnswersQueryVariables>;
export const GetUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userChats"},"name":{"kind":"Name","value":"my_userChatPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserChat"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"administrator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetUserChatsQuery, GetUserChatsQueryVariables>;
export const GetGradeMonthlyTabDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGradeMonthlyTab"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientLessonGradesFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonGradeRelayOrder"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"asc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"lessonGrades"},"name":{"kind":"Name","value":"myLessonGrades"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"asc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"asc"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGrade"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"lessonGradeMonthlies"},"name":{"kind":"Name","value":"myLessonGradeMonthlies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGradeMonthly"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGrade"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonGrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"gradeType"}},{"kind":"Field","name":{"kind":"Name","value":"attendanceStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lesson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_Lesson"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"value2"}},{"kind":"Field","name":{"kind":"Name","value":"maxValue"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_LessonGradeMonthly"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LessonGradeMonthly"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attendance"}},{"kind":"Field","name":{"kind":"Name","value":"assignment"}},{"kind":"Field","name":{"kind":"Name","value":"test"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lesson"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_Lecture"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lecture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"defaultGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"DEFAULT"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"examGradeForm"},"name":{"kind":"Name","value":"gradeForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gradeType"},"value":{"kind":"EnumValue","value":"EXAM"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GradeMonthlyTab_GradeForm"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureGradeForm"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"labels"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<GetGradeMonthlyTabQuery, GetGradeMonthlyTabQueryVariables>;