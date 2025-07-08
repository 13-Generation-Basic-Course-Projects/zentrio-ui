"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Code,
  Terminal,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- PISTON CONFIGURATION ---
const PISTON_API_URL = "https://emkc.org/api/v2/piston";

// --- LANGUAGE TEMPLATES ---
const languageTemplates = {
  c: {
    filename: "main.c",
    code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, C!");\n    return 0;\n}`,
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

// --- ADVANCED STATE MANAGEMENT (Fixed - no localStorage) ---
const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);

  // Simple in-memory storage for demo purposes
  // In production, you might want to use a different approach
  return [state, setState];
};

// --- MOBILE DETECTION ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// --- UI COMPONENTS ---
const LanguageSidebar = ({
  activeLanguage,
  onLanguageChange,
  availableLanguages,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full md:h-auto
          w-64 md:w-16 bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-700
          flex flex-col md:items-center py-4 space-y-2
          transform transition-transform duration-300 ease-in-out
          z-50 md:z-auto md:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Languages
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Language Buttons */}
        <div className="flex flex-col md:items-center space-y-2 px-4 md:px-0 w-full">
          {availableLanguages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                onLanguageChange(lang.id);
                onClose();
              }}
              className={`
                w-full md:w-10 h-10 md:h-10 
                flex items-center md:justify-center
                font-bold text-sm rounded-small
                transition-colors px-3 md:px-0
                ${
                  activeLanguage === lang.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }
              `}
              title={lang.name}
            >
              <span className="md:hidden mr-3">{lang.name}</span>
              <span className="hidden md:inline">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </>
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
    <div className="h-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col font-mono text-xs sm:text-sm">
      <div className="p-2 sm:p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
        <span className="font-semibold text-sm sm:text-base">Output</span>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs sm:text-sm px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          Clear
        </button>
      </div>
      <div className="flex-1 p-2 sm:p-3 overflow-y-auto">
        {lines.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">
            Run your code to see output here...
          </div>
        ) : (
          lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap mb-1 ${
                line.type === "error"
                  ? "text-red-500"
                  : line.type === "log"
                  ? "text-gray-700 dark:text-gray-300"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            >
              {line.text}
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

// --- FALLBACK TEXTAREA EDITOR ---
const FallbackEditor = ({ value, onChange, language, onMount }) => {
  const textareaRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if (onMount && textareaRef.current) {
      // Provide a simple API similar to Monaco Editor
      const mockEditor = {
        getValue: () => value,
        setValue: (newValue) => onChange(newValue),
        focus: () => textareaRef.current?.focus(),
        getSelection: () => null,
        setSelection: () => {},
      };
      onMount(mockEditor);
    }
  }, [onMount, value, onChange]);

  useEffect(() => {
    // Update line numbers when content changes
    const lineCount = value.split("\n").length;
    setLines(Array.from({ length: lineCount }, (_, i) => i + 1));
  }, [value]);

  const handleTextareaChange = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Handle tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      onChange(newValue);

      // Restore cursor position
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      <div className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Code Editor ({language})
        </span>
      </div>
      <div className="flex-1 flex overflow-hidden">
        {/* Line numbers */}
        <div className="bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 px-2 py-3 text-xs text-gray-500 dark:text-gray-400 font-mono select-none min-w-[3rem] text-right">
          {lines.map((lineNum) => (
            <div key={lineNum} className="leading-6 h-6">
              {lineNum}
            </div>
          ))}
        </div>

        {/* Code textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          className="flex-1 p-3 font-mono text-sm border-none outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white leading-6"
          placeholder="Write your code here..."
          spellCheck={false}
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            lineHeight: "1.5",
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function CompilerComponent() {
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
  const [currentView, setCurrentView] = useState("editor"); // 'editor' or 'output'
  const [isLoading, setIsLoading] = useState(false);
  const [pistonRuntimes, setPistonRuntimes] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [useMonaco, setUseMonaco] = useState(true);
  const editorRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);

    // Force fallback editor on mobile devices
    if (isMobile) {
      setUseMonaco(false);
    }
  }, [isMobile]);

  // Fetch Piston runtimes
  useEffect(() => {
    const fetchRuntimes = async () => {
      try {
        const response = await fetch(`${PISTON_API_URL}/runtimes`);
        if (!response.ok) {
          throw new Error(`Failed to fetch runtimes: ${response.statusText}`);
        }
        const data = await response.json();
        setPistonRuntimes(data);
      } catch (error) {
        console.error("Error fetching Piston runtimes:", error);
        setOutputLines([
          {
            type: "error",
            text: `Failed to load Piston runtimes: ${error.message}`,
          },
        ]);
      }
    };
    fetchRuntimes();
  }, []);

  const getPistonConfig = useCallback(
    (langId) => {
      const runtime = pistonRuntimes.find(
        (r) => r.language === langId || r.aliases.includes(langId)
      );
      if (runtime) {
        let selectedVersion = runtime.version;
        if (runtime.versions && runtime.versions.length > 0) {
          selectedVersion = runtime.versions.reduce((latest, current) => {
            const floatCurrent = parseFloat(current);
            const floatLatest = parseFloat(latest);
            if (isNaN(floatCurrent) || isNaN(floatLatest)) {
              return current > latest ? current : latest;
            }
            return floatCurrent > floatLatest ? current : latest;
          }, runtime.versions[0]);
        }
        return { runtime: runtime.language, version: selectedVersion };
      }
      return null;
    },
    [pistonRuntimes]
  );

  const availableSidebarLanguages = [
    { id: "c", name: "C" },
    { id: "cpp", name: "C++" },
    { id: "java", name: "Java" },
    { id: "js", name: "JS" },
    { id: "py", name: "Py" },
    { id: "php", name: "PHP" },
  ].filter((lang) => getPistonConfig(lang.id));

  const handleLanguageChange = (langId) => {
    setActiveLanguage(langId);
    const template = languageTemplates[langId];
    if (template) {
      setCode(template.code);
      setCurrentFilename(template.filename);
      setOutputLines([]);
    }
  };

  useEffect(() => {
    const hasCode =
      languageTemplates?.c?.code != null ||
      languageTemplates?.cpp?.code != null ||
      languageTemplates?.java?.code != null ||
      languageTemplates?.js?.code != null ||
      languageTemplates?.py?.code != null;

    if (hasCode) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "Not Allow";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [
    languageTemplates?.c?.code,
    languageTemplates?.cpp?.code,
    languageTemplates?.java?.code,
    languageTemplates?.js?.code,
    languageTemplates?.py?.code,
  ]);

  const handleRun = async () => {
    setIsLoading(true);
    setOutputLines([{ type: "info", text: `> Running ${currentFilename}...` }]);
    setCurrentView("output"); // Auto-switch to output on mobile

    const pistonConfig = getPistonConfig(activeLanguage);
    if (!pistonConfig) {
      setOutputLines((prev) => [
        ...prev,
        {
          type: "error",
          text: `Runtime not found for: ${activeLanguage}`,
        },
        { type: "info", text: "=== Execution Failed ===" },
      ]);
      setIsLoading(false);
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
          files: [{ name: currentFilename, content: code }],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.compile && data.compile.output) {
          setOutputLines((prev) => [
            ...prev,
            { type: "error", text: `Compilation:\n${data.compile.output}` },
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
            { type: "error", text: `Error:\n${data.run.stderr}` },
          ]);
        }

        const statusMessage =
          data.run && data.run.code === 0
            ? "=== Execution Completed ==="
            : "=== Execution Failed ===";

        setOutputLines((prev) => [
          ...prev,
          { type: "info", text: statusMessage },
        ]);
      } else {
        setOutputLines((prev) => [
          ...prev,
          {
            type: "error",
            text: `API Error: ${data.message || response.statusText}`,
          },
        ]);
      }
    } catch (e) {
      setOutputLines((prev) => [
        ...prev,
        { type: "error", text: `Network error: ${e.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
    setEditorReady(true);
  };

  const handleMonacoError = () => {
    console.log("Monaco Editor failed to load, falling back to textarea");
    setUseMonaco(false);
  };

  // Get current language display name
  const currentLanguageName =
    availableSidebarLanguages.find((lang) => lang.id === activeLanguage)
      ?.name || activeLanguage;

  return (
    <div className="h-[400px] mx-4 my-10 sm:h-[400px] md:h-[600px] lg:h-[800px] min-w-80 max-w-7xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white flex flex-col font-sans antialiased overflow-hidden sm:m-4 md:m-6 lg:m-8 border-2 rounded-xl">
      {/* Header */}
      <header className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg md:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-sm sm:text-lg font-bold tracking-wide truncate">
              <span className="hidden sm:inline">Zentrio Online Compiler</span>
              <span className="sm:hidden">Zentrio IDE</span>
            </h1>
            {mounted && (
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                {currentLanguageName} • {currentFilename}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          {/* Mobile view toggle */}
          <div className="flex md:hidden bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setCurrentView("editor")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                currentView === "editor"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Code size={14} className="sm:hidden" />
              <span className="hidden sm:inline">Code</span>
            </button>
            <button
              onClick={() => setCurrentView("output")}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                currentView === "output"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Terminal size={14} className="sm:hidden" />
              <span className="hidden sm:inline">Output</span>
            </button>
          </div>

          {/* Run button */}
          <button
            onClick={handleRun}
            disabled={isLoading}
            className="bg-primary hover:opacity-hover disabled:bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-small font-medium flex items-center space-x-1 sm:space-x-2 transition-colors text-xs sm:text-sm"
          >
            <Play size={14} />

            <span className="hidden sm:inline">
              {isLoading ? "Running..." : "Run"}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Language Sidebar */}
        <LanguageSidebar
          activeLanguage={activeLanguage}
          onLanguageChange={handleLanguageChange}
          availableLanguages={availableSidebarLanguages}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-w-0">
          {/* Editor Panel */}
          <div
            className={`flex-1 flex flex-col min-w-0 ${
              currentView === "output" ? "hidden md:flex" : "flex"
            }`}
          >
            {mounted ? (
              useMonaco ? (
                <Editor
                  onMount={handleEditorMount}
                  height="100%"
                  language={activeLanguage}
                  value={code}
                  onChange={(value) => setCode(value)}
                  theme="vs-light"
                  options={{
                    fontSize: isMobile ? 14 : 14,
                    tabSize: 2,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    lineNumbers: "on",
                    glyphMargin: false,
                    folding: !isMobile,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: "gutter",
                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    padding: { top: 10, bottom: 10 },
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                      verticalScrollbarSize: isMobile ? 8 : 12,
                      horizontalScrollbarSize: isMobile ? 8 : 12,
                    },
                  }}
                  onError={handleMonacoError}
                />
              ) : (
                <FallbackEditor
                  value={code}
                  onChange={setCode}
                  language={activeLanguage}
                  onMount={handleEditorMount}
                />
              )
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loading editor...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div
            className={`flex-1 flex flex-col min-w-0 md:border-l border-gray-200 dark:border-gray-700 ${
              currentView === "editor" ? "hidden md:flex" : "flex"
            }`}
          >
            {mounted ? (
              <OutputPanel
                lines={outputLines}
                onClear={() => setOutputLines([])}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loading output...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}