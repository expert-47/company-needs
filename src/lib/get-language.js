export const getLanguageBasedValue = (
  data,
  value,
  defaultValue = "",
  local = "en"
) => {
  if (!data) return "";
  if (local == "ar") {
    return data[`${value}_ar`] && data[`${value}_ar`]?.trim()
      ? data[`${value}_ar`]
      : data[value] || defaultValue;
  } else {
    return data[value] || defaultValue;
  }
};
