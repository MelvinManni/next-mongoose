export const formatDateShort = (d) => {
    const date = new Date(d);
    const day = date.toLocaleDateString(undefined, { day: "2-digit" });
    const month = date.toLocaleDateString(undefined, { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  export function dateToInputString(d) {
    const date = new Date(d);
    const day = date.toLocaleDateString(undefined, { day: "2-digit" });
    const month = date.toLocaleDateString(undefined, { month: "2-digit" });
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }