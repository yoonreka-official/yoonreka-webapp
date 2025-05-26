import InputSegmented from '~/components/inputs/InputSegmented.tsx'
import useInvoices from '~/hooks/useInvoices.ts'
import { InvoiceType } from '~/types/invoice.type.ts'

const INVOICE_TYPES: Array<{ value: InvoiceType; label: string }> = [
  { value: InvoiceType.LECTURE, label: '원비' },
  { value: InvoiceType.BOOK, label: '교재비' },
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
