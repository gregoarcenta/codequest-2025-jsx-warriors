import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es-mx"; // Importa el idioma español

dayjs.extend(relativeTime);
dayjs.locale("es-mx");

export default dayjs;
