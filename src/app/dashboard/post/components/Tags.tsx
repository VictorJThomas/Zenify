const Tags = ({ moods, selectedMood }: { moods: Array<{ mood: string; value: string }>; selectedMood?: string }) => {
  return (
    <div className="p-4 py-10 flex gap-3">
      {moods.map((mood, index) => (
        <button
          key={index}
          className={`ring-1 p-2 text-xs rounded-md pointer-events-none ${
            mood.value === selectedMood ? "ring-indigo-600 text-white bg-indigo-600" : "ring-indigo-600"
          }`}
        >
          {mood.mood}
        </button>
      ))}
    </div>
  );
};

export default Tags;
