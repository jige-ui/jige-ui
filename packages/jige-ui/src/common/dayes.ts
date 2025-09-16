export { esday as dayes } from "esday";

import { esday } from "esday";
import customParseFormatPlugin from "esday/plugins/advancedParse";
import isTodayPlugin from "esday/plugins/isToday";

esday.extend(isTodayPlugin).extend(customParseFormatPlugin);
