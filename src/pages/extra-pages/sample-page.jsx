// EditableTable.jsx
import React, { useEffect, useMemo, useState } from "react";
import { TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";

/**
 * Props:
 * - initialData: array of row objects (from API)
 * - columnsConfig: [{ name, selectorField, editable?, type? }]
 * - onSave: function(updatedRowsOrAll) - called with array
 * - loading: boolean (optional) -> progressPending for DataTable
 */
const EditableTable = ({
  initialData = [],
  columnsConfig = [],
  onSave,
  loading = false,
}) => {
  const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState(null); // { rowId, field }

  // Keep local data in sync when parent passes new initialData
  useEffect(() => {
    if (Array.isArray(initialData)) {
      const normalized = initialData.map((row, idx) => ({
        ...row,
        // ensure stable identity even if `id` missing
        _rowIndex: row.id ?? idx,
      }));
      setData(normalized);
    } else {
      setData([]);
    }
  }, [initialData]);

  const handleEdit = (rowId, field, value) => {
    setData((prev) =>
      prev.map((row) => {
        const id = row.id ?? row._rowIndex;
        if (id === rowId) {
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  };

  const EditableCell = ({ row, field, type = "text" }) => {
    const rowId = row.id ?? row._rowIndex;
    const isEditing =
      editingCell && editingCell.rowId === rowId && editingCell.field === field;

    const rawValue = row[field];

    if (isEditing) {
      return (
        <TextField
          autoFocus
          type={
            type === "number" ? "number" : type === "date" ? "date" : "text"
          }
          value={rawValue ?? ""}
          onChange={(e) => handleEdit(rowId, field, e.target.value)}
          onBlur={() => setEditingCell(null)}
          size="small"
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              fontSize: "0.9rem",
              padding: "6px 8px",
            },
          }}
        />
      );
    }

    // display formatting
    let display = rawValue ?? "";
    if (type === "date" && rawValue) {
      try {
        display = dayjs(rawValue).format("YYYY-MM-DD");
      } catch {
        display = rawValue;
      }
    }

    return (
      <div
        style={{
          cursor: "pointer",
          padding: "6px 8px",
          minHeight: 28,
          display: "flex",
          alignItems: "center",
        }}
        onDoubleClick={() => setEditingCell({ rowId, field })}
        title="Double-click to edit"
      >
        {display}
      </div>
    );
  };

  // Map parent columns config -> data-table columns
  const columns = useMemo(() => {
    const cols = columnsConfig.map((col) => {
      const key = col.selectorField || col.name;
      // editable column uses custom cell
      if (col.editable) {
        return {
          name: col.name,
          // sortable: true,
          minWidth: col.minWidth || "120px",
          cell: (row) => <EditableCell row={row} field={key} type={col.type} />,
          // provide id for accessibility
          grow: col.grow ?? 1,
        };
      }

      // non-editable: show formatted value (especially for dates)
      return {
        name: col.name,
        selector: (row) => row[key],
        cell: (row) => {
          const v = row[key];
          if (col.type === "date" && v) {
            try {
              return dayjs(v).format("YYYY-MM-DD");
            } catch {
              return v ?? "";
            }
          }
          return v ?? "";
        },
        sortable: true,
        minWidth: col.minWidth || "120px",
        grow: col.grow ?? 1,
      };
    });

    // Actions column (per-row Save)
    if (columnsConfig.some((c) => c.editable)) {
      cols.push({
        name: "Actions",
        cell: (row) => {
          const rowId = row.id ?? row._rowIndex;
          return (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => onSave && handleSaveAll()}
                className="save-btn"
              >
                Save
              </button>
            </div>
          );
        },
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        minWidth: "120px",
      });
    }
    return cols;
  }, [columnsConfig, onSave, editingCell]);

  // If you want a global Save button above the table
  const handleSaveAll = () => {
    console.log("Saving all data:", data);
    onSave?.(data);
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        highlightOnHover
        pagination
        progressPending={!!loading}
        noHeader
      />
    </div>
  );
};

export default EditableTable;
