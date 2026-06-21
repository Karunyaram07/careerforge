"use client";
import { generateQuiz, saveQuizResult } from '@/actions/interview';
import { useFetch } from '@/app/hooks/useFetch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';
import QuizResult from './Quiz-Result';

const Quiz = () => {
    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [answers,setAnswers]=useState([]); //! Tracks Array user selected answers
    const [showExplanation,setShowExplanation]=useState(false)

    const startNewQuiz =()=>{
        // setCurrentQuestion(0);
        setAnswers([]);
        setShowExplanation(false);
        generateQuizFn();
        setResultData(null) //!Coming From saveQuizResult Server Action
    }

    const {loading:generatingQuiz,
        fn:generateQuizFn,
        data:quizData,
    } = useFetch(generateQuiz);
//! quizData is   "questions": [
//!         {
//!           "question": "string",
//!           "options": ["string", "string", "string", "string"],
//!           "correctAnswer": "string",
//!           "explanation": "string"
//!         }
    
    const {loading:savingResult,
        fn:saveQuizResultFn,
        data:resultData,
        setData:setResultData,
    } = useFetch(saveQuizResult);       
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

    
    

    


    //! quizData example response by GEMINI AI
    //!   {
//!  question: "What is React primarily used for?",
//! options: [
//!   "Database Management",
//!   "Building User Interfaces",
//!  "Operating Systems",
//!    "Network Security"
//! ],
//!  correctAnswer: "Building User Interfaces",
//!  explanation:
//!   "React is a JavaScript library used for building interactive user interfaces."
//! }


    useEffect(()=>{
        //!Set answers to null If the quizData is updated
        if(quizData){
            setAnswers(new Array(quizData.length).fill(null));
        }
    },[quizData]);


    if(generatingQuiz){  //! If quiz is loading, show Loader 
        return <BarLoader className='mt-4' width={"100%"} color='gray'/>
    }

    //! Show Results If quiz is completed
    //!Also Show the Quiz Results Interface
    if(resultData){
        return(
            <div className='mx-2'>
                <QuizResult result={resultData} onStartNew={startNewQuiz}
                //! Passing onStartNew Function If user wants to Start The New Quiz If he wants
                />
            </div>
        )
    }

    if(!quizData){
        return(
            <Card>
          <CardHeader>
            <CardTitle>Ready to test your knowledge?</CardTitle>
            <CardDescription>Skills to consider developing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>
                This quiz contains 10 questions specific to your industry and skills. 
                Take your time and choose the best answer for each question

            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={generateQuizFn} className={"w-full"}>
            Start Quiz
            </Button>
          </CardFooter>
        </Card>
        )
    }
    const handleAnswer=(answer)=>{
        //!As User is not selected any answer
        //! Answers array contains initially as [null,null,.. etc]
        const newAnswers = [...answers]
        newAnswers[currentQuestion]=answer;
        //!Once Option selected by the User, Array will be updated
        //! Updates the answers array with currently selected answer
        //! by user for the Current Quesion
        setAnswers(newAnswers);

    }
    const question = quizData[currentQuestion];
    //! currentQuestion variable tracks index of Question
    //! Goes as quizData[0]; {} first Question 

    const handleNext=()=>{
        //! On clicking Next, check the current question is last
        //! If it's the last question then execute finishQuiz Function
        if(currentQuestion < quizData.length-1){
            //! Set the Next Question 
            setCurrentQuestion(currentQuestion+1)
            setShowExplanation(false);
        } else{
            finishQuiz();
        }
    }

    const calculateScore=()=>{
        let correct=0;
        answers.forEach((answer,index)=>{
            if(answer===quizData[index].correctAnswer){
                correct++;
            }
        })
        return correct/quizData.length *100;
    }
    
    
    const finishQuiz=async()=>{
        //! We will calculate the score of the Quiz in this function
        //! Save the Quiz Results to the Database 
        //! using the server Action saveQuizResult
        //!This will take parameters as questions,answers,score

        const score=calculateScore();;
        try {
            await saveQuizResultFn(quizData,answers,score);  //!Saving the Assessment Results to the Assessment Table of Database
            toast.success("Quiz Completed");
        } catch (error) {
            toast.error("Failed to Save the Quiz Results")  
        }
    }

     
  return (
    <div>
        <Card className={'mx-2'}>
          <CardHeader>
            <CardTitle>
                Question {currentQuestion + 1} of {quizData.length}
            </CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4"}>
            <p className='text-lg font-medium'>
                 {/* //! question= quizData[0];
                  */}
                {question.question}   
            </p>

            <RadioGroup 
            
            onValueChange={handleAnswer}
            value={answers[currentQuestion]} 
            // ! Tracking the User Selected Answer in the array answers[0] for first Question and
            //!  saving using the handleAnswer
            className={"space-y-2"}
            
            >

                {question.options.map((option,index)=>(
                    <div className="flex items-center space-x-2" key={index}>
                <RadioGroupItem  value={option} id={`option-${index}`}/>
                <Label  htmlFor={`option-${index}`}>{option}</Label>
            </div>
                ))}
            
            </RadioGroup>

            {showExplanation && (
                <div className='mt-4 p-4 bg-muted rounded-lg'>
                    <p className='font-medium'>Explanation:</p>
                    <p className='text-muted-foreground'>{question.explanation}</p>

                </div>
            )}
            

          </CardContent>
          <CardFooter>
             {/* //!If we have selected the option only, 
             //!then we will show the 'Show Explanation button'
              */}
             {!showExplanation &&(
                <Button 
                onClick={()=>setShowExplanation(true)}
                variant='outline'

                
                // ! The answers array is not updated it means
                // ! the answer is not selected by user
                // ! Until user selects his answer don't show the explanation
                
                disabled={!answers[currentQuestion]} 
                
                >
                    Show Explanation
                </Button>   

             )}

             <Button
             onClick={handleNext} 
             className={'ml-auto'}
             disabled={!answers[currentQuestion] || savingResult} //!loading:savingResult by the saveQuizResults Function
             //!Next Question have to Move to Next Question
             //!Finish Quiz Have to Save the Quiz results
             
             >
                {savingResult && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                )}

                {currentQuestion < quizData.length-1 ? 
                "Next Question" : "Finish Quiz"}
             </Button>

          </CardFooter>
        </Card>
    </div>
  )
}

export default Quiz