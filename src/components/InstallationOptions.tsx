import { useState } from "react"
import Terminal from "./Terminal"

type InstallationOptionsProps = {
  CLICode: string
  ManualCode: string
}

const InstallationOptions = ({ CLICode, ManualCode }: InstallationOptionsProps) => {
  const [selectedOption, setSelectedOption] = useState<"cli" | "manual">("cli")

  const options: Array<{ id: "cli" | "manual"; label: string }> = [
    { id: "cli", label: "CLI" },
    { id: "manual", label: "Manual" },
  ]

  const selectedCode = selectedOption === "cli" ? CLICode : ManualCode

  return (
    <div className="mt-4 w-full max-w-[42rem]">
      <div className="mb-3 inline-flex rounded-md border border-black/10 bg-neutral-100 p-1 dark:border-white/10 dark:bg-[#0b0b0b]">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setSelectedOption(option.id)}
            className={`px-4 py-1.5 font-mono text-xs transition-colors duration-200 ${
              selectedOption === option.id
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <Terminal
        code={selectedCode}
        fileName={selectedOption === "cli" ? "CLI" : "Manual"}
      />
    </div>
  )
}

export default InstallationOptions
