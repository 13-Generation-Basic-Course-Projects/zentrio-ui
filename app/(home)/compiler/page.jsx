"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import {
  Play,
  Settings,
  Share2,
  Code,
  Terminal as TerminalIcon, // Added Code icon for editor toggle
} from "lucide-react";

// --- PISTON CONFIGURATION ---
const PISTON_API_URL = "https://emkc.org/api/v2/piston"; // Public Piston API endpoint

// --- LANGUAGE TEMPLATES ---
const languageTemplates = {
  c: {
    filename: "main.c",
    code: `#include <stdio.h>\n\nint main( ) {\n    printf("Hello, C!");\n    return 0;\n}`,
  },
  cpp: {
    filename: "main.cpp",
    code: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}`,
  },
  java: {
    filename: "Main.java",
    code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}`,
  },
  js: {
    filename: "index.js",
    code: `// Welcome to your interactive IDE!\nconsole.log("Hello from JavaScript!");\nconsole.log({ a: 1, b: [2, 3] });`,
  },
  py: {
    filename: "main.py",
    code: `# Welcome to your Python environment!\nprint("Hello from Python!")`,
  },
  php: {
    filename: "index.php",
    code: `<?php\n\necho "Hello from PHP!";\n?>`,
  },
};

// --- ADVANCED STATE & THEME MANAGEMENT ---
const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue); // Initialize with default value for SSR

  useEffect(() => {
    // This effect runs only on the client after initial render
    if (typeof window !== "undefined") {
      try {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
          setState(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
  }, [key]); // Run once on mount

  // Update localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

// --- UI COMPONENTS ---

const LanguageSidebar = ({
  activeLanguage,
  onLanguageChange,
  availableLanguages,
}) => {
  return (
    <div className="w-16 bg-gray-100 dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-700/50 flex flex-col items-center py-4 space-y-2 flex-shrink-0">
      {availableLanguages.map((lang) => (
        <button
          key={lang.id}
          onClick={() => onLanguageChange(lang.id)}
          className={`w-10 h-10 flex items-center justify-center font-bold text-sm rounded-small transition-colors ${
            activeLanguage === lang.id
              ? "bg-primary text-white"
              : "hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          title={lang.name}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

const OutputPanel = ({ lines, onClear }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current?.parentElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col font-mono text-sm">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
        <span className="font-semibold">Output</span>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
        >
          Clear
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              line.type === "error"
                ? "text-red-500"
                : line.type === "log"
                ? "text-gray-700 dark:text-gray-300"
                : ""
            }`}
          >
            {line.text}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function CompilerComponent() {
  // Initialize with default values, which will be overridden by localStorage on client-side
  const [code, setCode] = usePersistentState(
    "currentCode",
    languageTemplates.js.code
  );
  const [activeLanguage, setActiveLanguage] = usePersistentState(
    "activeLanguage",
    "js"
  );
  const [currentFilename, setCurrentFilename] = usePersistentState(
    "currentFilename",
    languageTemplates.js.filename
  );

  const [outputLines, setOutputLines] = useState([]);
  const [showOutputPanel, setShowOutputPanel] = useState(false); // State to toggle output panel on small screens
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [pistonRuntimes, setPistonRuntimes] = useState([]); // Stores fetched runtimes from Piston
  const [mounted, setMounted] = useState(false); // State to track if component is mounted on client
  const editorRef = useRef(null);

  // Set mounted state after first client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Piston runtimes on component mount
  useEffect(() => {
    const fetchRuntimes = async () => {
      try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);
        if (!response.ok) {
          throw new Error(`Failed to fetch runtimes: ${response.statusText}`);
        }
        const data = await response.json();
        setPistonRuntimes(data);
        console.log("Piston Runtimes:", data); // Log available runtimes for debugging
      } catch (error) {
        console.error("Error fetching Piston runtimes:", error);
        setOutputLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `Failed to load Piston runtimes: ${error.message}`,
          },
        ]);
      }
    };
    fetchRuntimes();
  }, []);

  // Map our language IDs to Piston's available runtimes
  const getPistonConfig = useCallback(
    (langId) => {
      const runtime = pistonRuntimes.find(
        (r) => r.language === langId || r.aliases.includes(langId)
      );
      if (runtime) {
        let selectedVersion = runtime.version; // Default to the main version string
        if (runtime.versions && runtime.versions.length > 0) {
          // Find the latest version if multiple are available
          selectedVersion = runtime.versions.reduce((latest, current) => {
            // Simple version comparison, might need more robust logic for complex versions
            // Ensure both are valid numbers for comparison
            const floatCurrent = parseFloat(current);
            const floatLatest = parseFloat(latest);
            if (isNaN(floatCurrent) || isNaN(floatLatest)) {
              // Fallback to string comparison or just pick one if not numbers
              return current > latest ? current : latest;
            }
            return floatCurrent > floatLatest ? current : latest;
          }, runtime.versions[0]); // Ensure initial value is from the array
        }
        return { runtime: runtime.language, version: selectedVersion };
      }
      return null;
    },
    [pistonRuntimes]
  );

  // Languages to display in the sidebar, filtered by what Piston supports
  const availableSidebarLanguages = [
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
    { id: "java", name: "Java" },
    { id: "js", name: "JS" },
    { id: "py", name: "Py" },
    { id: "php", name: "PHP" },
  ].filter((lang) => getPistonConfig(lang.id)); // Only show languages Piston supports

  const handleLanguageChange = (langId) => {
    setActiveLanguage(langId);
    const template = languageTemplates[langId];
    if (template) {
      setCode(template.code);
      setCurrentFilename(template.filename);
      setOutputLines([]); // Clear output on language change
    }
  };

  const handleRun = async () => {
    setIsLoading(true);
    setOutputLines([{ type: "info", text: `> Running ${currentFilename}...` }]);

    const pistonConfig = getPistonConfig(activeLanguage);
    if (!pistonConfig) {
      setOutputLines((prev) => [
        ...prev,
        {
          type: "error",
          text: `Piston runtime not found for: ${activeLanguage}. Please check Piston API availability or language ID.`,
        },
        { type: "info", text: "=== Code Execution Failed ===" },
      ]);
      setIsLoading(false);
      setShowOutputPanel(true);
      return;
    }

    try {
      const response = await fetch(`${PISTON_API_URL}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: pistonConfig.runtime,
          version: pistonConfig.version,
          files: [
            {
              name: currentFilename,
              content: code,
            },
          ],
          // stdin: "your_input_here", // If you want to add stdin
          // args: ["-Wall"], // Command line arguments for the program
          // compile_timeout: 10000, // Timeout for compilation in milliseconds
          // run_timeout: 3000, // Timeout for execution in milliseconds
          // compile_memory_limit: 256 * 1024 * 1024, // Memory limit for compilation in bytes
          // run_memory_limit: 256 * 1024 * 1024, // Memory limit for execution in bytes
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.compile && data.compile.output) {
          setOutputLines((prev) => [
            ...prev,
            {
              type: "error",
              text: `Compilation Output:\n${data.compile.output}`,
            },
          ]);
        }
        if (data.run && data.run.output) {
          setOutputLines((prev) => [
            ...prev,
            { type: "log", text: data.run.output },
          ]);
        }
        if (data.run && data.run.stderr) {
          setOutputLines((prev) => [
            ...prev,
            { type: "error", text: `Runtime Error:\n${data.run.stderr}` },
          ]);
        }

        let statusMessage = "=== Code Execution Finished ===";
        if (data.run && data.run.code !== 0) {
          statusMessage = `=== Code Execution Failed (Exit Code: ${data.run.code}) ===`;
        } else if (data.run && data.run.signal) {
          statusMessage = `=== Code Execution Failed (Signal: ${data.run.signal}) ===`;
        } else if (data.compile && data.compile.code !== 0) {
          statusMessage = `=== Code Compilation Failed (Exit Code: ${data.compile.code}) ===`;
        }

        setOutputLines((prev) => [
          ...prev,
          { type: "info", text: statusMessage },
        ]);
      } else {
        setOutputLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `Piston API Error: ${data.message || response.statusText}`,
          },
          { type: "info", text: "=== Code Execution Failed ===" },
        ]);
      }
    } catch (e) {
      setOutputLines((prev) => [
        ...prev,
        { type: "error", text: `Network error: ${e.message}` },
        { type: "info", text: "=== Code Execution Failed ===" },
      ]);
    } finally {
      setIsLoading(false);
      setShowOutputPanel(true); // Always show output panel after run attempt
    }
  };

  return (
    <div className="h-[800px] m-12 border-2 rounded-2xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col font-sans antialiased overflow-hidden">
      <header className="bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700/50 px-4 py-2 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center space-x-3">
          <h1 className="text-lg font-bold tracking-wider">
            Zentrio Online Complier
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {/* Conditionally render filename only when mounted to avoid hydration mismatch */}
          {mounted && (
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-4 hidden md:block">
              {currentFilename}
            </span>
          )}
          <button
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          {/* Toggle buttons for small screens */}
          <button
            onClick={() => setShowOutputPanel(false)}
            className={`p-2 md:hidden rounded-lg ${
              !showOutputPanel
                ? "bg-primary text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Show Editor"
          >
            <Code size={16} />
          </button>
          <button
            onClick={() => setShowOutputPanel(true)}
            className={`p-2 md:hidden rounded-lg ${
              showOutputPanel
                ? "bg-primary text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            title="Show Output"
          >
            <TerminalIcon size={16} />
          </button>
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="bg-primary text-white px-4 py-1.5 rounded-small font-medium flex items-center space-x-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Play size={16} />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Run</span>
              </>
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {" "}
        {/* Added flex-col and md:flex-row */}
        <LanguageSidebar
          activeLanguage={activeLanguage}
          onLanguageChange={handleLanguageChange}
          availableLanguages={availableSidebarLanguages}
        />
        {/* Editor Panel */}
        {mounted ? ( // Conditionally render Editor and Output only after mounted
          <div
            className={`flex-1 flex flex-col min-w-0 ${
              showOutputPanel && "hidden md:flex"
            }`}
          >
            {" "}
            {/* Hidden on small screens when output is shown */}
            <Editor
              onMount={(editor) => (editorRef.current = editor)}
              height="100%"
              language={activeLanguage}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                fontSize: 14,
                tabSize: 2,
                minimap: { enabled: true, scale: 0.8 },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                renderLineHighlight: "gutter",
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: "on",
              }}
            />
          </div>
        ) : (
          // Placeholder for SSR/initial client render
          <div className="flex-1 flex items-center justify-center min-w-0">
            Loading editor...
          </div>
        )}
        {/* Output Panel */}
        {mounted ? ( // Conditionally render Editor and Output only after mounted
          <div
            className={`flex-1 flex flex-col min-w-0 border-l border-gray-200 dark:border-gray-700/50 ${
              !showOutputPanel && "hidden md:flex"
            }`}
          >
            {" "}
            {/* Hidden on small screens when editor is shown */}
            <OutputPanel
              lines={outputLines}
              onClear={() => setOutputLines([])}
            />
          </div>
        ) : (
          // Placeholder for SSR/initial client render
          <div className="flex-1 flex items-center justify-center min-w-0 border-l border-gray-200 dark:border-gray-700/50">
            Loading output...
          </div>
        )}
      </div>
    </div>
  );
}
