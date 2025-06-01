import { useState, useEffect } from 'react';
import {
  IconCircleCheck,
  IconCircleFilled,
  IconArrowNarrowRight,
} from '@tabler/icons-react';

export function BuildLoader() {
  const [buildSteps, setBuildSteps] = useState([
    { name: 'Transpiling TypeScript', progress: 0, color: 'bg-blue-500' },
    { name: 'Bundling modules', progress: 0, color: 'bg-purple-500' },
    { name: 'Optimizing assets', progress: 0, color: 'bg-amber-500' },
    { name: 'Generating output', progress: 0, color: 'bg-emerald-500' },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) {
      // Reset after completion
      setTimeout(() => {
        setBuildSteps((steps) =>
          steps.map((step) => ({ ...step, progress: 0 }))
        );
        setCurrentStepIndex(0);
        setIsComplete(false);
      }, 2000);
      return;
    }

    const interval = setInterval(() => {
      setBuildSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        const currentStep = newSteps[currentStepIndex];

        if (currentStep && currentStep.progress < 100) {
          // Increment current step progress
          currentStep.progress = Math.min(
            currentStep.progress + Math.random() * 5 + 1,
            100
          );
          return newSteps;
        } else if (currentStepIndex < newSteps.length - 1) {
          // Move to next step
          setCurrentStepIndex((prev) => prev + 1);
          return newSteps;
        } else {
          // All steps complete
          clearInterval(interval);
          setIsComplete(true);
          return newSteps;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStepIndex, isComplete]);

  // Calculate overall progress
  const overallProgress =
    buildSteps.reduce((acc, step) => acc + step.progress, 0) /
    buildSteps.length;

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-zinc-700">Build Progress</span>
          <span className="text-zinc-500">{Math.round(overallProgress)}%</span>
        </div>
        <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {buildSteps.map((step, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span
                className={`font-medium ${
                  index < currentStepIndex
                    ? 'text-zinc-700'
                    : index === currentStepIndex
                      ? 'text-zinc-900'
                      : 'text-zinc-400'
                }`}
              >
                {step.name}
              </span>
              <span
                className={`${
                  index < currentStepIndex
                    ? 'text-zinc-700'
                    : index === currentStepIndex
                      ? 'text-zinc-900'
                      : 'text-zinc-400'
                }`}
              >
                {Math.round(step.progress)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${step.color} transition-all duration-200`}
                style={{
                  width: `${step.progress}%`,
                  opacity: index < currentStepIndex ? 0.7 : 1,
                }}
              />
            </div>

            {/* Build artifacts visualization */}
            {step.progress > 0 && (
              <div className="flex mt-1 overflow-hidden h-2">
                {Array.from({ length: 20 }).map((_, i) => {
                  const threshold = (i / 20) * 100;
                  const isVisible = step.progress >= threshold;
                  const width = Math.random() * 10 + 5;

                  return (
                    <div
                      key={i}
                      className={`h-2 mx-0.5 rounded-sm transition-all duration-300 ${step.color}`}
                      style={{
                        width: `${width}px`,
                        opacity: isVisible ? 0.3 + Math.random() * 0.7 : 0,
                        transform: `scaleY(${isVisible ? 1 : 0})`,
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {isComplete && (
        <div className="mt-4 text-center text-sm font-medium text-emerald-600">
          Build completed successfully!
        </div>
      )}
    </div>
  );
}

export function DatabaseLoader() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing connection...');

  const statuses = [
    { text: 'Initializing connection...', threshold: 10 },
    { text: 'Establishing secure channel...', threshold: 25 },
    { text: 'Authenticating credentials...', threshold: 40 },
    { text: 'Verifying database schema...', threshold: 60 },
    { text: 'Testing connection pool...', threshold: 75 },
    { text: 'Optimizing query performance...', threshold: 90 },
    { text: 'Connection established', threshold: 100 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 5, 100);

        // Update status based on progress
        for (let i = statuses.length - 1; i >= 0; i--) {
          const status = statuses[i];
          if (status && newProgress >= status.threshold) {
            setStatus(status.text);
            break;
          }
        }

        if (newProgress === 100) {
          clearInterval(interval);
          // Reset after completion
          setTimeout(() => {
            setProgress(0);
          }, 2000);
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Calculate the number of active nodes based on progress
  const totalNodes = 6;
  const activeNodes = Math.ceil((progress / 100) * totalNodes);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="mb-6 relative">
        {/* Database icon with nodes */}
        <div className="w-24 h-24 border-2 border-zinc-300 rounded-md flex items-center justify-center relative">
          <div className="w-16 h-16 bg-zinc-100 rounded-sm flex items-center justify-center">
            <div className="text-xs font-mono text-zinc-500">DB</div>
          </div>

          {/* Connection nodes */}
          {Array.from({ length: totalNodes }).map((_, i) => {
            const angle = i * (360 / totalNodes) * (Math.PI / 180);
            const x = Math.cos(angle) * 50;
            const y = Math.sin(angle) * 50;
            const isActive = i < activeNodes;

            return (
              <div
                key={i}
                className={`absolute w-3 h-3 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-zinc-200'} transition-colors duration-300`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  boxShadow: isActive
                    ? '0 0 8px rgba(16, 185, 129, 0.6)'
                    : 'none',
                }}
              />
            );
          })}

          {/* Connection lines */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="-60 -60 120 120"
          >
            {Array.from({ length: totalNodes }).map((_, i) => {
              const angle = i * (360 / totalNodes) * (Math.PI / 180);
              const x = Math.cos(angle) * 30;
              const y = Math.sin(angle) * 30;
              const isActive = i < activeNodes;

              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x}
                  y2={y}
                  stroke={isActive ? '#10b981' : '#e5e7eb'}
                  strokeWidth="1.5"
                  strokeDasharray={isActive ? 'none' : '2,2'}
                />
              );
            })}
          </svg>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-zinc-600 text-center">{status}</div>
      </div>
    </div>
  );
}

export default function DeploymentLoader() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const deploymentSteps = [
    { name: 'Build', duration: 3000 },
    { name: 'Test', duration: 2000 },
    { name: 'Optimize', duration: 1500 },
    { name: 'Deploy', duration: 2500 },
    { name: 'Verify', duration: 1000 },
  ];

  useEffect(() => {
    if (currentStep >= deploymentSteps.length) {
      // Reset after completion
      setTimeout(() => {
        setCurrentStep(0);
        setProgress(0);
      }, 2000);
      return;
    }

    const stepDuration = deploymentSteps[currentStep]?.duration ?? 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (stepDuration / 100);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep((prev) => prev + 1);
            setProgress(0);
          }, 300);
          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-6">
        {deploymentSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative">
              {index < currentStep ? (
                <IconCircleCheck className="w-8 h-8 text-emerald-500" />
              ) : index === currentStep ? (
                <div className="relative">
                  <IconCircleFilled className="w-8 h-8 text-blue-500" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-blue-500 border-r-transparent animate-spin"
                    style={{ width: '2rem', height: '2rem' }}
                  />
                </div>
              ) : (
                <IconCircleFilled className="w-8 h-8 text-zinc-300" />
              )}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${
                index < currentStep
                  ? 'text-emerald-500'
                  : index === currentStep
                    ? 'text-blue-500'
                    : 'text-zinc-400'
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>

      {/* Connection lines */}
      <div className="relative h-0.5 bg-zinc-200 -mt-12 mb-12">
        <div
          className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-300"
          style={{
            width: `${Math.min(((currentStep + progress / 100) / deploymentSteps.length) * 100, 100)}%`,
          }}
        />

        {deploymentSteps.map((_, index) => {
          if (index === deploymentSteps.length - 1) return null;
          const position = ((index + 0.5) / (deploymentSteps.length - 1)) * 100;

          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${position}%` }}
            >
              <IconArrowNarrowRight
                className={`w-3 h-3 ${
                  currentStep > index + 1 ||
                  (currentStep === index + 1 && progress > 50)
                    ? 'text-emerald-500'
                    : 'text-zinc-300'
                }`}
              />
            </div>
          );
        })}
      </div>

      {currentStep < deploymentSteps.length && (
        <div className="w-full">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-zinc-700">
              {deploymentSteps[currentStep]?.name ?? 'Unknown'} in progress...
            </span>
            <span className="text-zinc-500">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-zinc-500">
            {currentStep < deploymentSteps.length - 1
              ? `${deploymentSteps.length - currentStep - 1} steps remaining`
              : 'Final step'}
          </div>
        </div>
      )}
    </div>
  );
}
