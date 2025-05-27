import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import useInvoices from '~/hooks/useInvoices.ts'
import useLoading from '~/hooks/useLoading.ts'
import InvoiceCard from '~/pages/more/invoices/InvoiceCard.tsx'
import InvoiceFilter from '~/pages/more/invoices/InvoiceFilter.tsx'
import InvoiceNotice from '~/pages/more/invoices/InvoiceNotice.tsx'
import InvoiceUpdateBottomSheet from '~/pages/more/invoices/InvoiceUpdateBottomSheet.tsx'
import { InvoiceType } from '~/types/api'

import type { Nullable } from '~/types/utils/nullable.type.ts'

function Invoices() {
  const {
    state: { list, isLoading, invoiceType },
    fetchData,
    handleInvoiceType,
  } = useInvoices()
  const { toggleLoading } = useLoading()

  const [params] = useSearchParams()
  const invoiceTypeFromQuery = params.get('invoiceType') as
    | Nullable<InvoiceType>
    | undefined

  useEffect(() => {
    ;(async () => {
      toggleLoading(true)
      if (invoiceTypeFromQuery) {
        handleInvoiceType(invoiceTypeFromQuery)
        await fetchData({
          types: [invoiceTypeFromQuery],
        })
      } else if (invoiceType) {
        await fetchData({
          types: [invoiceType],
        })
      } else {
        await fetchData()
      }

      toggleLoading(false)
    })()
  }, [])

  return (
    <div>
      <InvoiceFilter />
      <InvoiceNotice />

      {!isLoading &&
        list.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}

      <InvoiceUpdateBottomSheet />
    </div>
  )
}

export default Invoices
