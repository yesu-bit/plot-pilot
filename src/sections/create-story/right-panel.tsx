import Button from "@/src/components/ui/button";
import React from "react";

export default function RightPanel({ onSave }: { onSave: () => void }) {
  return (
    <div className="flex-3/12">
      <Button variant="contained" onClick={onSave}>
        Save
      </Button>
    </div>
  );
}
