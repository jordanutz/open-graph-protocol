export const formatValue = (str, isOpenGraph = false) => 
    `${isOpenGraph && 'og:'} ${str.toLowerCase().split(" ").join("_")}`;
