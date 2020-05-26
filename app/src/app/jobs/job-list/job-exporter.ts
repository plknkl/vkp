import { saveAs } from 'file-saver'
import { Job } from '../../models/job'

export function exportData(items: Job[]) {

  const data = items.map((item: Job) => {
    return  {
      Shift: item.shift.name,
      Actor: item.actor.name,
      Batch: item.batch.businessId,
      Article: item.batch.article.name,
      Quantity: item.quantity,
      Started: item.startedAt,
      Finished: item.endedAt
    }
  })

  const replacer = (_, value) => value === null ? '' : value
  const header = Object.keys(data[0]);
  let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
  csv.unshift(header.join(','));
  let csvArray = csv.join('\r\n');

  var blob = new Blob([csvArray], {type: 'text/csv' })
  saveAs(blob, "export.csv");
}
