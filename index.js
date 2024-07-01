const main = ({ csv, headers }) => {
  const lines = csv.trim().split("\n");
  headers = headers
    ? headers
    : lines[0].split(",").map((header) => header.trim());
  if (typeof headers === "string") {
    headers = headers.split(",").map((header) => header.trim());
  }
  const result = [];
  let i = headers ? 0 : 1;
  for (i; i < lines.length; i++) {
    const obj = {};
    let currentline = lines[i];
    let j = 0;

    // Split by commas not within quotes
    currentline = currentline
      .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map((value) => {
        value = value.trim();
        // Remove surrounding quotes and unescape double quotes
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"');
        }
        return value;
      });

    headers.forEach((header) => {
      obj[header] = currentline[j++];
    });

    result.push(obj);
  }

  return {
    headers,
    data: result,
  };
};

// console.log(main({ fileSource: "../../csv.csv" }));

module.exports = main;
