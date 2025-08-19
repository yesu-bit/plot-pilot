import React from "react";

export default function RightPanel({ onSave }: { onSave: () => void }) {
  return (
    <div>
      <button onClick={onSave}>Save</button>
    </div>
  );
}
