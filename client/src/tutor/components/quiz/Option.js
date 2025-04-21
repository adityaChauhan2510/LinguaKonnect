import React from "react";

export default function Option({
  option,
  index,
  updateOption,
  isSelected,
  selectAnswer,
}) {
  return (
    <div className="flex items-center gap-3 mt-2">
      <input
        type="text"
        placeholder={`Option ${index + 1}`}
        value={option.value}
        onChange={(e) => updateOption(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md"
      />
      <button
        className={`px-3 py-1 rounded-md ${
          isSelected ? "bg-green-500 text-white" : "bg-gray-300"
        }`}
        onClick={selectAnswer}
      >
        {isSelected ? "✔ Answer" : "Set as Answer"}
      </button>
    </div>
  );
}
