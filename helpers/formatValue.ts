import { OptionKeys } from "../types/state";
import { MetaKeys } from "../types/helpers";

export const formatValue = (str: OptionKeys | MetaKeys, isOpenGraph: boolean = false): string  => 
    `${isOpenGraph && 'og:'}${str.toLowerCase().split(" ").join("_")}`;
