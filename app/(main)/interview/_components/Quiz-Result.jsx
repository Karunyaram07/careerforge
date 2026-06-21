import { Progress } from '@/components/ui/progress';
import React from 'react'
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import {
  Trophy,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const QuizResult = ({result, hideStartNew=false, onStartNew}) => {   //! Passing onStartNew Function If user wants to Start The New Quiz If he wants
         //! result is resultData
    //! data:{
    //!             userId:user.id,
    //!             quizScore: score,
    //!             questions:questionResults,
    //!             category:"Technical",
    //!             improvementTip,
    //!         }

    //!Passing hideStartNew Variable to know whether we have to show the Start New Quiz Button user want to see Assessment History 
    //! then it has to off. If not we will pass the argument as hideStartNew=true 
 if(!result) return null; 
 return (
    <div className='mx-auto'>
        <h1 className='flex items-center gap-2 text-3xl gradient-title'>
            <Trophy className='h-6 w-6 text-yellow-500'/>
            Quiz Results      
        </h1>   

    <CardContent className={"space-y-6"}>
        {/* Score Overview */}
        <div className='text-center space-y-2'>
            <h3 className='text-2xl font-bold'>
                {result.quizScore.toFixed(1)}%
            </h3>
            <Progress value={result.quizScore} className={"w-full"}/>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
            <div className='bg-muted p-4 rounded-lg'>
                <p className='font-medium'>Improvement Tip: </p>
                <p className='text-muted-foreground'>{result.improvementTip}</p>
            </div>
        )}

        {/*
         //Returning Each Question answers, with user selected answer 
         //! We have questions array from that we can fetch the user selected answer , Original Correct Answer
          //!resultData is 
    //! data:{
    //!             userId:user.id,
    //!             quizScore: score,
    //*             questions:[questionResults Array this contains 
    //*                  question:q.question,
    //*                  answer:q.correctAnswer,
    //*                  userAnswer:answers[index],!
    //*                  isCorrect: q.correctAnswer===answers[index],
    //*                  explanation:q.explanation]
    //!             category:"Technical",
    //!             improvementTip,
    //!         }
          */}

        <div className='space-y-4'>
            <h3 className='font-medium'>Question Review</h3>
            {result.questions.map((q,index)=>(
                <div key={index} className='border rounded-lg p-4 space-y-2'>
                    <div className='flex items-start justify-between gap-2'>
                    <p className='font-medium'>{q.question}</p>
                     {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}   


                </div>
                <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>


              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>                
                 </div>
            ))}
        </div>
   </CardContent>
{/* 
   // !Assessment History Page cannot have the start Quiz button...
// ! SO we will send as <QuizResult result={resultData} onStartNew={startNewQuiz} hideStartNew={true}/>


// ! hideStartNew is a prop that controls whether the Start New Quiz button 
// !should be shown. default value is false we will send
// ! If hideStartNew is exists, then we do not show Start New Quiz Button
// ! If not exists, we will show the Start New Quiz button
 */}

    {!hideStartNew && ( 

        
        // const startNewQuiz =()=>{
        // setCurrentQuestion(0);
        // setAnswers([]);
        // setShowExplanation(false);
        // generateQuizFn();
        // setResultData(null) //!Coming From saveQuizResult Server Action}

        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
   
    </div>
  )
}

export default QuizResult;

