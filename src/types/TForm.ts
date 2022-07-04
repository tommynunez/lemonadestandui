import { TFormFields } from "./TformFields";

export type TForm = {
    name: string,
    formHasLoaded: boolean,
    formFields: Array<TFormFields>,
};