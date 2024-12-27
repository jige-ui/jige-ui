import { esday } from 'esday'
import { customParseFormatPlugin } from 'esday/plugins/customParseFormat'
import { isTodayPlugin } from 'esday/plugins/isToday'

esday.extend(isTodayPlugin).extend(customParseFormatPlugin)

export { esday as dayes }
