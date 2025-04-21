import React from "react";
import Option from "./Option";

export default function Question({ question, setQuestion }) {
  const updateTitle = (e) => {
    setQuestion((prev) => ({ ...prev, title: e.target.value }));
  };

  const addOption = () => {
    if (question.options.length >= 4) {
      alert("Max 4 options allowed.");
      return;
    }

    setQuestion((prev) => ({
      ...prev,
      options: [...prev.options, { id: prev.options.length + 1, value: "" }],
    }));
  };

  const updateOption = (index, value) => {
    setQuestion((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) =>
        i === index ? { ...opt, value } : opt
      ),
    }));
  };

  const selectAnswer = (optionId) => {
    setQuestion((prev) => ({ ...prev, answer: optionId }));
  };

  const deleteOption = (index) => {
    // Check if the option being deleted is the selected answer
    const isAnswer = question.answer === question.options[index].id;

    setQuestion((prev) => {
      const updatedOptions = prev.options.filter((_, i) => i !== index);

      return {
        ...prev,
        options: updatedOptions,
        // If the deleted option was the selected answer, unmark it
        answer: isAnswer ? null : prev.answer,
      };
    });
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      {/* Question Input */}
      <input
        type="text"
        placeholder="Enter question......"
        value={question.title}
        onChange={updateTitle}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-gray-700"
      />

      {/* Options Section */}
      <h5 className="mt-4 text-gray-800 font-semibold">Options</h5>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div key={option.id} className="flex items-center justify-between">
            <Option
              option={option}
              index={index}
              updateOption={(value) => updateOption(index, value)}
              isSelected={question.answer === option.id}
              selectAnswer={() => selectAnswer(option.id)}
            />
            {/* Delete Button */}
            <button
              onClick={() => deleteOption(index)}
              className="ml-2 text-red-600 hover:text-red-800 text-lg"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200 w-full"
        onClick={addOption}
      >
        + Add Option
      </button>
    </div>
  );
}
