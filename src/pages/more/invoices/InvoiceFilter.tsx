import InputSegmented from '~/components/inputs/InputSegmented.tsx'
import useInvoices from '~/hooks/useInvoices.ts'
import { InvoiceType } from '~/types/api'

const INVOICE_TYPES: Array<{ value: InvoiceType; label: string }> = [
  { value: InvoiceType.Lecture, label: '원비' },
  { value: InvoiceType.Book, label: '교재비' },
]

function InvoiceFilter() {
  const {
    state: { invoiceType },
    handleInvoiceType,
  } = useInvoices()

  return (
    <div>
      <InputSegmented
        value={invoiceType}
        options={INVOICE_TYPES}
        onChange={handleInvoiceType}
      />
    </div>
  )
}

export default InvoiceFilter
