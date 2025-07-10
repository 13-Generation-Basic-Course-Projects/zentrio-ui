"use client"
import { useEffect, useState } from 'react';
import DocumentLayout from "../documentcomponent/DocumentLayout";
import Privatedocument from "../documentcomponent/PrivateDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";

export default function DocumentAuthorize({
  user,
  documents,
  publicDocuments,
  boardId,
  boardName,
  tokenFromGoogle,
  preventUserImage,
  workspaceId,
  docIdPage,
  expr
}) {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [showBlur, setShowBlur] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Session storage key
  const SESSION_KEY = 'documentSession';
  const SESSION_EXPIRED_KEY = 'documentSessionExpired';

  useEffect(() => {
    // Check if session was manually expired (user saw session expired screen)
    const wasSessionExpired = localStorage.getItem(SESSION_EXPIRED_KEY);
    if (wasSessionExpired === 'true') {
      setSessionExpired(true);
      setIsSessionValid(false);
      return;
    }

    // Check existing session in localStorage first
    const checkExistingSession = () => {
      try {
        const savedSession = localStorage.getItem(SESSION_KEY);
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          const now = Date.now();
          const timeElapsed = now - sessionData.timestamp;
          const remainingTime = sessionData.expiresIn - timeElapsed;

          if (remainingTime > 0) {
            // Session is still valid
            setIsSessionValid(true);
            setTimeRemaining(remainingTime);
            
            // If less than 1 second remaining, show blur immediately
            if (remainingTime <= 1000) {
              setShowBlur(true);
            }
            
            return { valid: true, remainingTime };
          } else {
            // Session has expired
            localStorage.removeItem(SESSION_KEY);
            localStorage.setItem(SESSION_EXPIRED_KEY, 'true');
            setSessionExpired(true);
            return { valid: false, remainingTime: 0 };
          }
        }
        return { valid: false, remainingTime: 0 };
      } catch (error) {
        console.error('Error checking existing session:', error);
        localStorage.removeItem(SESSION_KEY);
        return { valid: false, remainingTime: 0 };
      }
    };

    // Create new session if expr is provided and no valid existing session
    const createNewSession = () => {
      if (expr) {
        try {
          const sessionData = {
            expr: expr,
            timestamp: Date.now(),
            expiresIn: 3000000 // 50 minutes (50 * 60 * 1000 ms)
          };
          
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
          setIsSessionValid(true);
          setTimeRemaining(3000000);
          return true;
        } catch (error) {
          console.error('Error creating session:', error);
          setIsSessionValid(false);
          return false;
        }
      }
      return false;
    };

    // Check if there's an existing session first
    const existingSession = checkExistingSession();
    
    // Only create new session if no valid existing session exists
    if (!existingSession.valid) {
      if (expr) {
        createNewSession();
      } else {
        // No session and no expr - user needs to login
        setIsSessionValid(false);
      }
    }

  }, [expr]);

  // Handle countdown timer
  useEffect(() => {
    if (isSessionValid && timeRemaining > 0) {
      const interval = setInterval(() => {
        const savedSession = localStorage.getItem(SESSION_KEY);
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          const now = Date.now();
          const timeElapsed = now - sessionData.timestamp;
          const remainingTime = sessionData.expiresIn - timeElapsed;

          if (remainingTime > 0) {
            setTimeRemaining(remainingTime);
            
            // Show blur in last 1 second
            if (remainingTime <= 1000 && !showBlur) {
              setShowBlur(true);
            }
          } else {
            // Session expired
            localStorage.removeItem(SESSION_KEY);
            localStorage.setItem(SESSION_EXPIRED_KEY, 'true');
            setSessionExpired(true);
            setIsSessionValid(false);
            setShowBlur(false);
            clearInterval(interval);
          }
        } else {
          // Session was removed
          localStorage.setItem(SESSION_EXPIRED_KEY, 'true');
          setSessionExpired(true);
          setIsSessionValid(false);
          clearInterval(interval);
        }
      }, 100); // Check every 100ms for smooth countdown

      return () => clearInterval(interval);
    }
  }, [isSessionValid, timeRemaining, showBlur]);

  // Handle session expiration
  const handleSessionExpired = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.setItem(SESSION_EXPIRED_KEY, 'true');
    console.log('Session expired, please login again');
    // You might want to call a parent component function here
    // onSessionExpired?.();
  };

  // Handle login again (this would be called when user logs in)
  const handleLoginAgain = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_EXPIRED_KEY); // Clear expired flag
    setSessionExpired(false);
    setIsSessionValid(false);
    setShowBlur(false);
    setTimeRemaining(0);
    // Redirect to login or refresh
    window.location.reload();
  };

  // Format time remaining for display
  const formatTimeRemaining = (time) => {
    const totalSeconds = Math.ceil(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // If session is expired, show login prompt
  if (sessionExpired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg shadow-md text-center rounded-xl" >
          <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
          <p className="text-gray-600 mb-4">Your session has expired. Please login again.</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLoginAgain}
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  // If no valid session, show access denied
  if (!isSessionValid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need valid authorization to access this document.</p>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`transition-all duration-300 ${showBlur ? 'blur-sm pointer-events-none' : ''}`}>
        <DocumentLayout
          user={user}
          documents={documents}
          publicDocuments={publicDocuments}
          boardId={boardId}
          boardName={boardName}
          workspaceId={workspaceId}
          tokenFromGoogle={tokenFromGoogle}
          preventUserImage={preventUserImage}
          docIdPage={docIdPage}
          privatedocument={
            <Privatedocument
              title="Private"
              modal={[<ModalCreateDocu key="private-modal" boardId={boardId} />]}
              preventUserImage={preventUserImage}
              workspaceId={workspaceId}
              boardId={boardId}
              docIdPage={docIdPage}
            />
          }
          publicdocument={
            <PublicDocument
              title="Public"
              modal={[<ModalCreateDocu key="public-modal" boardId={boardId} />]}
              preventUserImage={preventUserImage}
              workspaceId={workspaceId}
              boardId={boardId}
              docIdPage={docIdPage}
            />
          }
        />
      </div>
      
      {/* Session countdown display (optional - for debugging) */}
      {isSessionValid && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
          Session: {formatTimeRemaining(timeRemaining)}
        </div>
      )}
      
      {/* Blur overlay with session expiring message */}
      {showBlur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Session Expiring</h3>
            <p className="text-gray-600 mb-4">Your session is about to expire. Please login again.</p>
            <div className="text-sm text-gray-500">
              Time remaining: {formatTimeRemaining(timeRemaining)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}