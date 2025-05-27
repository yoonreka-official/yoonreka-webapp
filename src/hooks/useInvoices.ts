import { updateInvoice } from '~/api/invoice.api.ts'
import { useAppDispatch, useAppSelector } from '~/stores'
import {
  fetchInvoices,
  setInvoiceType,
  setSelectedInvoice,
} from '~/stores/InvoiceSlice.ts'
import { InvoiceType } from '~/types/api'

import type {
  Invoice,
  InvoiceParams,
  InvoiceRequestBody,
} from '~/types/invoice.type.ts'

const useInvoices = () => {
  const state = useAppSelector((state) => state.invoice)

  const dispatch = useAppDispatch()

  const fetchData = async (params?: InvoiceParams) => {
    try {
      await dispatch(fetchInvoices(params || { types: [InvoiceType.Lecture] }))
    } catch (e) {
      console.error(e)
    }
  }

  const handleUpdateInvoice = async (body: InvoiceRequestBody) => {
    try {
      const { data } = await updateInvoice(body)
      console.log('UPDATE --- ', data)

      if (state.selected?.type) {
        fetchData({ types: [state.selected.type] })
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleInvoiceType = (type: InvoiceType) => {
    dispatch(setInvoiceType(type))
    return fetchData({ types: [type] })
  }

  const handleSelectedInvoice = (invoice?: Invoice) => {
    dispatch(setSelectedInvoice(invoice))
  }

  return {
    state,
    fetchData,
    handleUpdateInvoice,
    handleInvoiceType,
    handleSelectedInvoice,
  }
}

export default useInvoices
