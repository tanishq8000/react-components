import React, { useState } from "react";

const data = [
  { name: "Tanishq", age: 25, Place: "Pune" },
  { name: "Soham", age: 27, Place: "Ujjain" },
  { name: "Tanvi", age: 10, Place: "Delhi" },
  { name: "Omkar", age: 18, Place: "Mumbai" },
  { name: "Shubham", age: 10, Place: "Jaipur" },
];

const headers = Object.keys(data[0]);

const Sortable = () => {
  const [tableData, setTableData] = useState(data);
  const [config, setConfig] = useState({ key: null, dir: "asc" });

  const handleSort = (header) => {
    let direction = "asc";

    if (config.key === header && config.dir === "asc") {
      direction = "desc";
    }

    const sortedTable = [...tableData].sort((a, b) => {
      if (a[header] < b[header]) {
        return direction === "asc" ? -1 : 1;
      } else {
        return direction === "asc" ? 1 : -1;
      }
    });
    setTableData(sortedTable);
    setConfig({ key: header, dir: direction });
  };
  return (
    <div>
      <table className="border-3 border-amber-800 m-5">
        <thead className="cursor-pointer">
          <tr>
            {headers.map((d, idx) => (
              <th
                onClick={() => {
                  handleSort(d);
                }}
                className="border-2 border-amber-500 py-3 px-6 text-red-500 bg-blue-200"
                key={idx}
              >
                {d}
                {config.key === d ? (config.dir === "asc" ? " 🔼" : " 🔽") : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx}>
              {headers.map((h, idxx) => (
                <td
                  className="border-2 border-amber-500 text-center py-0.5"
                  key={idxx}
                >
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sortable;
