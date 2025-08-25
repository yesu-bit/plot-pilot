import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import React, { useState } from "react";

interface RightPanelProps {
  onSave: () => void;
  title: string;
  setTitle: (title: string) => void;
}

export default function RightPanel({
  onSave,
  title,
  setTitle,
}: RightPanelProps) {
  const [edit, setEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleOpenEdit = () => {
    setTempTitle(title);
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(e.target.value);
  };

  const handleSaveTitle = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempTitle?.trim()) {
      setTitle(tempTitle?.trim());
    }
    setEdit(false);
  };

  const handleCancelEdit = () => {
    setTempTitle(title);
    setEdit(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      return;
    }
    if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex items-center justify-between px-12 py-2 mb-3 shadow-sm shadow-slate-200">
      {edit ? (
        <form onSubmit={handleSaveTitle} className="flex items-center gap-2">
          <Input
            name="title"
            value={tempTitle}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            className="text-lg font-medium"
          />
          <Button type="submit" variant="contained" size="small">
            Save
          </Button>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <div
          onClick={handleOpenEdit}
          className="cursor-pointer text-lg font-medium"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOpenEdit();
            }
          }}
        >
          {title}
        </div>
      )}
      <Button variant="contained" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}
