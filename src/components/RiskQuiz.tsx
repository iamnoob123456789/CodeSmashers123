import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
}

interface QuizResult {
  riskLevel: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
}

interface Answers {
  [key: number]: number;
}

export function RiskQuiz(): JSX.Element {
  const [answers, setAnswers] = useState<Answers>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  const questions: Question[] = [
    {
      question: 'How would you describe your investment knowledge?',
      options: [
        'No knowledge',
        'Limited knowledge',
        'Good knowledge',
        'Extensive knowledge'
      ]
    },
    {
      question: 'How long do you plan to invest your money?',
      options: [
        'Less than 1 year',
        '1-3 years',
        '3-5 years',
        'More than 5 years'
      ]
    },
    {
      question: 'How would you react to a 20% drop in your investment value?',
      options: [
        'Sell all investments',
        'Sell some investments',
        'Hold and wait for recovery',
        'Invest more'
      ]
    }
  ];

  const handleAnswer = (answerIndex: number): void => {
    const newAnswers: Answers = { ...answers, [currentQuestion]: answerIndex };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Simple scoring - just for demonstration
      const score = Object.values(newAnswers).reduce((sum: number, ans: number) => sum + (ans || 0), 0);
      
      let riskLevel: 'Conservative' | 'Moderate' | 'Aggressive';
      let description: string;

      if (score < 4) {
        riskLevel = 'Conservative';
        description = 'You prefer safer investments with lower returns.';
      } else if (score < 8) {
        riskLevel = 'Moderate';
        description = 'You are comfortable with moderate risk for balanced returns.';
      } else {
        riskLevel = 'Aggressive';
        description = 'You are comfortable with high risk for potentially higher returns.';
      }

      setResult({
        riskLevel,
        description
      });
    }
  };

  const resetQuiz = (): void => {
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
  };

  if (result) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Risk Profile</h2>
        <div className="mb-6">
          <h3 className="text-lg font-semibold">{result.riskLevel}</h3>
          <p className="text-gray-600">{result.description}</p>
        </div>
        <button
          onClick={resetQuiz}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const progressPercentage = (currentQuestion / questions.length) * 100;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Risk Assessment Quiz</h2>
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <h3 className="text-lg font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default RiskQuiz;