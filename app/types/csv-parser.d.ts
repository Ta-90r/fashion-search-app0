declare module "csv-parser" {
  import { Transform } from "stream";

  const csvParser: () => Transform;
  export default csvParser;
}
