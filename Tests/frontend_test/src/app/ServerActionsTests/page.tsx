import { FormComponent } from "./testHOC/FormComponent";
import createHOC from "./testHOC/FormCreateChar";

const CreateCharacterForm = createHOC(FormComponent);

export default async function Create() {
  return <CreateCharacterForm />;
}
