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
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  Timestamp: { input: number; output: number; }
  URL: { input: string; output: string; }
};

export type AdminAdministratorFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<AdministratorRole>>;
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

export type AdminInquiryFilterInput = {
  answered?: InputMaybe<Scalars['Boolean']['input']>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
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

export type AdminLessonGradeFilterInput = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  lessonIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  retests?: InputMaybe<Array<Retest>>;
  schoolIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  supplementaries?: InputMaybe<Array<Supplementary>>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AdminMaterialFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminNoticeFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminNotifyLessonGradeInput = {
  lessonId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type AdminSchoolFilterInput = {
  nameContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminStudyMaterialFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  titleContains?: InputMaybe<Scalars['String']['input']>;
};

export type AdminTeacherFilterInput = {
  lectureIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  nameContains?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<AdministratorRole>>;
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

export type AdminUpdateMaterialInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type AdminUpdateNoticeInput = {
  description: Scalars['String']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  link?: InputMaybe<Scalars['URL']['input']>;
  pinned?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
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

export type AdminUploadLessonAttachmentInput = {
  fileId?: InputMaybe<Scalars['ID']['input']>;
  lessonId: Scalars['ID']['input'];
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

export type ClientRequestLectureInvoiceInput = {
  /** 납부 완료 요청할 회비 ID */
  lectureInvoiceId: Scalars['ID']['input'];
  /** 납부 방법 (카드, 이체, 서울페이) */
  method: InvoiceMethod;
  /** 납부 완료 요청 메모 */
  userMemo?: InputMaybe<Scalars['String']['input']>;
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
  adminLabelComments: Array<LectureLabelComment>;
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
  /** 학년 */
  grade: Scalars['Int']['output'];
  gradeForm?: Maybe<LectureGradeForm>;
  gradeFormLabels: Array<LectureGradeFormLabel>;
  id: Scalars['ID']['output'];
  lessons?: Maybe<Array<Lesson>>;
  /** 해당 수업의 "평가 항목" 별 코멘트 목록 */
  myLabelComments: Array<LectureLabelComment>;
  place?: Maybe<Scalars['String']['output']>;
  school?: Maybe<School>;
  startDate: Scalars['Date']['output'];
  teachers: Array<Teacher>;
  /** 수업 시간 계획 */
  timePlannings: Array<LectureTimePlanning>;
  title: Scalars['String']['output'];
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
  type: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LectureGradeFormLabelInput = {
  id: Scalars['String']['input'];
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
  /** 수업 종료 시간 (HH:MM) */
  endTime?: Maybe<Scalars['String']['output']>;
  /** 수업 시작 시간 (HH:MM) */
  startTime: Scalars['String']['output'];
};

export type LectureTimePlanningInput = {
  /** 수업 요일 */
  dayOfWeek: DayOfWeek;
  /** 수업 종료 시간 (HH:MM) */
  endTime?: InputMaybe<Scalars['String']['input']>;
  /** 수업 시작 시간 (HH:MM) */
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type Lesson = {
  __typename?: 'Lesson';
  adminLessonGrades: Array<LessonGrade>;
  attachment?: Maybe<PrivateFile>;
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  date: Scalars['Date']['output'];
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 수업 종료 시간 (HH:MM) */
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lecture: Lecture;
  /** 해당 개별수업의 성적 조회 */
  myLessonGrade?: Maybe<LessonGrade>;
  /** 수업 시작 시간 (HH:MM) */
  startTime: Scalars['String']['output'];
  topGrades: Array<LessonGradeStatistic>;
  topThirtyPercentGrades: Array<LessonGradeStatistic>;
  /** 최근 수정 시각 */
  updatedAt: Scalars['Timestamp']['output'];
};


export type LessonAdminLessonGradesArgs = {
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

export type LessonGradeEdge = {
  __typename?: 'LessonGradeEdge';
  cursor: Scalars['String']['output'];
  node: LessonGrade;
};

export type LessonGradePagination = {
  __typename?: 'LessonGradePagination';
  edges: Array<LessonGradeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LessonGradeRelayOrder {
  Id = 'ID',
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
  adminCreateBook: Book;
  adminCreateLecture: Lecture;
  adminCreateMaterial: Material;
  adminCreateSchool: School;
  adminCreateTeacher: Teacher;
  adminCreateUser: User;
  adminDeleteAdministrator: Administrator;
  adminDeleteBook: Book;
  adminDeleteLecture: Lecture;
  adminDeleteMaterial: Material;
  adminDeleteSchool: School;
  adminDeleteTeacher: Teacher;
  adminDeleteUser: User;
  adminRefreshAuthToken: AuthTokenPair;
  adminSignInByPhone: AuthTokenPair;
  adminTestNotification: Scalars['Boolean']['output'];
  adminUpdateAdministrator: Administrator;
  adminUpdateAdministratorPassword: Scalars['Boolean']['output'];
  adminUpdateBook: Book;
  adminUpdateLecture: Lecture;
  adminUpdateMaterial: Material;
  adminUpdateSchool: School;
  adminUpdateTeacher: Teacher;
  adminUpdateUser: User;
  adminUploadLessonAttachment: Lesson;
  adminUpsertLectureGradeForm: LectureGradeForm;
  adminUpsertLectureLabelComment: LectureLabelComment;
  admin_createLectureInvoice: Scalars['Boolean']['output'];
  admin_createNotice: Notice;
  admin_createStudyMaterial: StudyMaterial;
  admin_createUserChat: UserChat;
  admin_deleteInquiry: Inquiry;
  admin_deleteLectureInvoice: Scalars['Boolean']['output'];
  admin_deleteNotice: Notice;
  admin_deleteStudyMaterial: StudyMaterial;
  admin_deleteUserChat: UserChat;
  admin_notifyLessonGrades: Scalars['Boolean']['output'];
  admin_readAllUserChats: Scalars['Boolean']['output'];
  admin_updateInquiry: Book;
  admin_updateLectureInvoice: LectureInvoice;
  admin_updateLectureInvoicesPaid: Array<LectureInvoice>;
  admin_updateLessonGradeMemo: LessonGrade;
  admin_updateNotice: Notice;
  admin_updateOperation: Operation;
  admin_updateStudyMaterial: StudyMaterial;
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
  upsertUserDevice: UserDevice;
  /** 탈퇴 */
  withdraw: Scalars['Boolean']['output'];
};


export type MutationAdminCreateAdministratorArgs = {
  input: AdminCreateAdministratorInput;
};


export type MutationAdminCreateBookArgs = {
  input: AdminCreateBookInput;
};


export type MutationAdminCreateLectureArgs = {
  input: AdminCreateLectureInput;
};


export type MutationAdminCreateMaterialArgs = {
  input: AdminCreateMaterialInput;
};


export type MutationAdminCreateSchoolArgs = {
  input: AdminCreateSchoolInput;
};


export type MutationAdminCreateTeacherArgs = {
  input: AdminCreateTeacherInput;
};


export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput;
};


export type MutationAdminDeleteAdministratorArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteBookArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteLectureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteSchoolArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminRefreshAuthTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationAdminSignInByPhoneArgs = {
  password: Scalars['String']['input'];
  phone: Scalars['PhoneNumber']['input'];
};


export type MutationAdminTestNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminUpdateAdministratorArgs = {
  input: AdminUpdateAdministratorInput;
};


export type MutationAdminUpdateAdministratorPasswordArgs = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationAdminUpdateBookArgs = {
  input: AdminUpdateBookInput;
};


export type MutationAdminUpdateLectureArgs = {
  input: AdminUpdateLectureInput;
};


export type MutationAdminUpdateMaterialArgs = {
  input: AdminUpdateMaterialInput;
};


export type MutationAdminUpdateSchoolArgs = {
  input: AdminUpdateSchoolInput;
};


export type MutationAdminUpdateTeacherArgs = {
  input: AdminUpdateTeacherInput;
};


export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput;
};


export type MutationAdminUploadLessonAttachmentArgs = {
  input: AdminUploadLessonAttachmentInput;
};


export type MutationAdminUpsertLectureGradeFormArgs = {
  input: AdminUpsertLectureGradeFormInput;
};


export type MutationAdminUpsertLectureLabelCommentArgs = {
  input: AdminUpsertLectureLabelCommentInput;
};


export type MutationAdmin_CreateLectureInvoiceArgs = {
  input: AdminCreateLectureInvoiceInput;
};


export type MutationAdmin_CreateNoticeArgs = {
  input: AdminCreateNoticeInput;
};


export type MutationAdmin_CreateStudyMaterialArgs = {
  input: AdminCreateStudyMaterialInput;
};


export type MutationAdmin_CreateUserChatArgs = {
  input: AdminCreateUserChatInput;
};


export type MutationAdmin_DeleteInquiryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteLectureInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteNoticeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteStudyMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_DeleteUserChatArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdmin_NotifyLessonGradesArgs = {
  input: AdminNotifyLessonGradeInput;
};


export type MutationAdmin_ReadAllUserChatsArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAdmin_UpdateInquiryArgs = {
  input: AdminUpdateInquiryInput;
};


export type MutationAdmin_UpdateLectureInvoiceArgs = {
  input: AdminUpdateLectureInvoiceInput;
};


export type MutationAdmin_UpdateLectureInvoicesPaidArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationAdmin_UpdateLessonGradeMemoArgs = {
  id: Scalars['ID']['input'];
  retestMemo?: InputMaybe<Scalars['String']['input']>;
  supplementaryMemo?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAdmin_UpdateNoticeArgs = {
  input: AdminUpdateNoticeInput;
};


export type MutationAdmin_UpdateOperationArgs = {
  input: AdminUpdateOperationInput;
};


export type MutationAdmin_UpdateStudyMaterialArgs = {
  input: AdminUpdateStudyMaterialInput;
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
  size: Scalars['Int']['output'];
  updatedAt: Scalars['Timestamp']['output'];
  url: Scalars['URL']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminAdministrator: Administrator;
  adminAdministratorPagination: AdministratorPagination;
  adminBook: Book;
  adminBookPagination: BookPagination;
  adminLecture: Lecture;
  adminLecturePagination: LecturePagination;
  adminLesson: Lesson;
  adminLessonPagination: LessonPagination;
  adminMaterial: Material;
  adminMaterialPagination: MaterialPagination;
  adminNotice: Notice;
  adminNoticePagination: NoticePagination;
  adminSchool: School;
  adminSchoolPagination: SchoolPagination;
  adminSchools: Array<School>;
  adminTeacher: Teacher;
  adminTeacherPagination: TeacherPagination;
  adminUsers: Array<User>;
  admin_inquiry: Inquiry;
  admin_inquiryPagination: InquiryPagination;
  admin_lectureInvoice: LectureInvoice;
  admin_lectureInvoicePagination: LectureInvoicePagination;
  admin_lessonGradePagination: LessonGradePagination;
  admin_lessons: Array<Lesson>;
  admin_operation: Operation;
  admin_studyMaterial: StudyMaterial;
  admin_studyMaterialPagination: StudyMaterialPagination;
  admin_user: User;
  admin_userChatPagination: UserChatPagination;
  admin_userPagination: UserPagination;
  currentAdministrator?: Maybe<Administrator>;
  currentUser?: Maybe<User>;
  file?: Maybe<File>;
  lessonGradeCommentOperation: Operation;
  /** 로그인 된 학생의 문의 목록 조회 */
  myInquiries: Array<Inquiry>;
  /** 수업 조회 (로그인된 학생이 수강중인 수업이 아니면 NULL 반환) */
  myLecture?: Maybe<Lecture>;
  /** 로그인 된 학생의 회비 조회 */
  myLectureInvoices: Array<LectureInvoice>;
  /** 로그인 된 학생의 수업 목록 조회 */
  myLectures: Array<Lecture>;
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
  /** 로그인 된 학생의 공부하기 자료 목록 조회 */
  my_studyMaterials: Array<StudyMaterial>;
  my_userChatPagination: UserChatPagination;
  schoolPagination: SchoolPagination;
};


export type QueryAdminAdministratorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminAdministratorPaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminAdministratorFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AdministratorRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdminBookArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminBookPaginationArgs = {
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


export type QueryAdminLectureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminLecturePaginationArgs = {
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


export type QueryAdminLessonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminLessonPaginationArgs = {
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


export type QueryAdminMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminMaterialPaginationArgs = {
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


export type QueryAdminNoticeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminNoticePaginationArgs = {
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


export type QueryAdminSchoolArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminSchoolPaginationArgs = {
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


export type QueryAdminSchoolsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminSchoolFilterInput>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdminTeacherArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminTeacherPaginationArgs = {
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


export type QueryAdminUsersArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminUserFilterInput>;
  order?: InputMaybe<UserRelayOrder>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
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


export type QueryAdmin_LessonGradePaginationArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminLessonGradeFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<LessonGradeRelayOrder>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_LessonsArgs = {
  asc?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<AdminLessonFilterInput>;
  order?: InputMaybe<LessonRelayOrder>;
  withDeleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAdmin_OperationArgs = {
  type: OperationType;
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


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
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
  users: Array<User>;
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
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  lectures: Array<Lecture>;
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
  adminUserDevices: Array<UserDevice>;
  admin_userConsulting?: Maybe<UserConsulting>;
  /** 생년월일 */
  birthDate: Scalars['Date']['output'];
  code: Scalars['String']['output'];
  /** 최초 생성 시각 */
  createdAt: Scalars['Timestamp']['output'];
  /** 비활성화 시각 */
  deactivatedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 탈퇴 시각 */
  deletedAt?: Maybe<Scalars['Timestamp']['output']>;
  /** 방해금지모드 종료 시간 (HH:MM) */
  distractionEndTime?: Maybe<Scalars['String']['output']>;
  /** 방해금지모드 시작 시간 (HH:MM) */
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

export type CreateUserChatMutationVariables = Exact<{
  input: ClientCreateUserChatInput;
}>;


export type CreateUserChatMutation = { __typename?: 'Mutation', createUserChat: { __typename?: 'UserChat', id: string } };

export type GetDailyGradeCommentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDailyGradeCommentQuery = { __typename?: 'Query', operation: { __typename?: 'Operation', id: string, message?: string | null } };

export type DailyGradeComment_OperationFragment = { __typename?: 'Operation', id: string, message?: string | null };

export type GetMyLectureInvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLectureInvoicesQuery = { __typename?: 'Query', myLectureInvoices: Array<{ __typename?: 'LectureInvoice', id: string, price: number, state: LectureInvoiceState, type: InvoiceType, paidAt?: number | null, method?: InvoiceMethod | null, dueDate: string, lecture?: { __typename?: 'Lecture', id: string, title: string } | null, books: Array<{ __typename?: 'Book', id: string, title: string, price?: number | null }> }> };

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

export type GetUserChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserChatsQuery = { __typename?: 'Query', userChats: { __typename?: 'UserChatPagination', edges: Array<{ __typename?: 'UserChatEdge', node: { __typename?: 'UserChat', id: string, message?: string | null, createdAt: number, updatedAt: number, user: { __typename?: 'User', id: string, name: string }, administrator?: { __typename?: 'Administrator', id: string, name: string } | null, attachments: Array<{ __typename?: 'PrivateFile', id: string, mimeType: string, size: number, url: string, filename?: string | null, createdAt: number, updatedAt: number }> } }> } };

export type UserChatFragment = { __typename?: 'UserChat', id: string, message?: string | null, createdAt: number, updatedAt: number, user: { __typename?: 'User', id: string, name: string }, administrator?: { __typename?: 'Administrator', id: string, name: string } | null, attachments: Array<{ __typename?: 'PrivateFile', id: string, mimeType: string, size: number, url: string, filename?: string | null, createdAt: number, updatedAt: number }> };

export const DailyGradeComment_OperationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyGradeComment_Operation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<DailyGradeComment_OperationFragment, unknown>;
export const MyStudyMaterials_StudyMaterialFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StudyMaterial"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"materialAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<MyStudyMaterials_StudyMaterialFragment, unknown>;
export const UserChatFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"administrator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UserChatFragment, unknown>;
export const AnalyzePrivateFileMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AnalyzePrivateFileMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"size"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"analyzePrivateFileMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"Argument","name":{"kind":"Name","value":"filename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filename"}}},{"kind":"Argument","name":{"kind":"Name","value":"mimeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mimeType"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"size"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AnalyzePrivateFileMetadataMutation, AnalyzePrivateFileMetadataMutationVariables>;
export const CreateInquiryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInquiry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateInquiryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createInquiry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateInquiryMutation, CreateInquiryMutationVariables>;
export const ReadAllUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadAllUserChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"my_readAllUserChats"}}]}}]} as unknown as DocumentNode<ReadAllUserChatsMutation, ReadAllUserChatsMutationVariables>;
export const CreateUserChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ClientCreateUserChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"createUserChat"},"name":{"kind":"Name","value":"my_createUserChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserChatMutation, CreateUserChatMutationVariables>;
export const GetDailyGradeCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDailyGradeComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"operation"},"name":{"kind":"Name","value":"lessonGradeCommentOperation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DailyGradeComment_Operation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DailyGradeComment_Operation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Operation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]} as unknown as DocumentNode<GetDailyGradeCommentQuery, GetDailyGradeCommentQueryVariables>;
export const GetMyLectureInvoicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyLectureInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myLectureInvoices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyLectureInvoicesQuery, GetMyLectureInvoicesQueryVariables>;
export const GetMyMaterialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMyMaterialsQuery, GetMyMaterialsQueryVariables>;
export const GetMyNoticesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"pinnedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetMyNoticesQuery, GetMyNoticesQueryVariables>;
export const GetMyNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationRelayOrder"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"asc"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotificationPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"asc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"asc"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LectureInvoice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Material"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lectureInvoice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"paidAt"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"lecture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"material"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"notice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lectures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contents"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export const GetMyStudyMaterialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMyStudyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"studyMaterials"},"name":{"kind":"Name","value":"my_studyMaterials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyStudyMaterials_StudyMaterial"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StudyMaterial"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"isAll"}},{"kind":"Field","name":{"kind":"Name","value":"materialAttachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"attachment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetMyStudyMaterialsQuery, GetMyStudyMaterialsQueryVariables>;
export const GetUserChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"userChats"},"name":{"kind":"Name","value":"my_userChatPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserChat"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"administrator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetUserChatsQuery, GetUserChatsQueryVariables>;