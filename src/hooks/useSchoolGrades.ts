import { createSchoolGrade, updateSchoolGrade } from '~/api/school-grade.api.ts'
import { useAppDispatch, useAppSelector } from '~/stores'
import { fetchSchoolGrades, setSelected } from '~/stores/SchoolGradeSlice.ts'

import type {
  SchoolGrade,
  SchoolGradeBody,
  SchoolGradeUpdateBody,
} from '~/types/school-grades.type.ts'

const useSchoolGrades = () => {
  const state = useAppSelector((state) => state.schoolGrade)

  const dispatch = useAppDispatch()

  const fetchData = async () => {
    try {
      await dispatch(fetchSchoolGrades())
    } catch (e) {
      console.error(e)
    }
  }

  const handleCreate = async (body: SchoolGradeBody) => {
    try {
      const { data } = await createSchoolGrade(body)
      console.log('CREATE --- ', data)
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdate = async (body: SchoolGradeUpdateBody) => {
    try {
      const { data } = await updateSchoolGrade(body)
      console.log('UPDATE --- ', data)
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  const handleSelected = (schoolGrade?: SchoolGrade) => {
    dispatch(setSelected(schoolGrade))
  }

  return {
    state,
    fetchData,
    handleCreate,
    handleUpdate,
    handleSelected,
  }
}

export default useSchoolGrades
