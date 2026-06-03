import { useState } from "react";
import { X, Plus } from "lucide-react";
import { color, ink, fontFamily } from "../tokens";

interface Props {
  dishes: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export function RetroDishTags({
  dishes,
  onChange,
  placeholder = "输入菜名",
}: Props) {
  const [editorVisible, setEditorVisible] = useState(false);
  const [input, setInput] = useState("");

  const commit = () => {
    const value = input.trim();
    if (!value || dishes.includes(value)) {
      setInput("");
      return;
    }
    onChange([...dishes, value]);
    setInput("");
  };

  const remove = (dish: string) => onChange(dishes.filter((d) => d !== dish));

  return (
    <div>
      {dishes.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {dishes.map((dish) => (
            <span
              key={dish}
              className="inline-flex items-center gap-1 px-2 py-1 text-[12px] rounded"
              style={{ background: ink.chip, color: color.espresso }}
            >
              {dish}
              <button
                onClick={() => remove(dish)}
                aria-label={`移除 ${dish}`}
                className="size-3.5 inline-flex items-center justify-center"
                style={{ color: color.muted }}
              >
                <X className="size-3" strokeWidth={2} />
              </button>
            </span>
          ))}
        </div>
      )}

      {editorVisible ? (
        <div
          className="mt-3 flex items-stretch gap-2 p-2 rounded"
          style={{ border: `1px solid ${ink.edge}`, background: color.paper }}
        >
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
            }}
            placeholder={placeholder}
            className="flex-1 px-2 text-[13px] outline-none bg-transparent"
            style={{ color: color.espresso }}
          />
          <button
            onClick={commit}
            className="px-3 h-8 text-[12px] tracking-[0.15em] rounded"
            style={{
              background: color.espresso,
              color: color.paper,
              fontFamily: fontFamily.serif,
            }}
          >
            添 加
          </button>
          <button
            onClick={() => {
              setEditorVisible(false);
              setInput("");
            }}
            className="px-3 h-8 text-[12px] tracking-[0.15em] rounded"
            style={{
              border: `1px solid ${ink.edge}`,
              color: color.espresso,
              fontFamily: fontFamily.serif,
            }}
          >
            取 消
          </button>
        </div>
      ) : (
        <button
          onClick={() => setEditorVisible(true)}
          className="mt-3 inline-flex items-center gap-1 px-3 h-8 text-[12px] rounded-full"
          style={{
            border: `1px dashed ${ink.edge}`,
            color: color.espresso,
            fontFamily: fontFamily.serif,
          }}
        >
          <Plus className="size-3.5" strokeWidth={1.75} />
          添加菜品
        </button>
      )}
    </div>
  );
}
