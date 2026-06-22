"use client"
import { improveWithAI } from '@/actions/resume';
import { useFetch } from '@/app/hooks/useFetch';
import { entrySchema } from '@/app/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parse } from 'date-fns';
import { Loader2, PlusCircle, Sparkles, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

//!handleAdd and handleDelete NEEd

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

const EntryForm = ({type,entries,onChange}) => {
    //! type is about work or experience or Education
    //! Entries are the input given by the uSer we will track as the field.value Hence entries={field.value}
    //! onChange is used to manipulate those recieved inputs...
    const [isAdding,setIsAdding] = useState(false);

      const {control,
        setValue,
        register,
        handleSubmit:handleValidation,
        watch,
        formState:{errors},
        reset
      }= useForm({
        resolver:zodResolver(entrySchema),
        defaultValues: { //!Initial shape of entry form data
            title: "",
              organization: "",
              startDate: "",
              endDate: "",
              description: "",
              current: false,
        },
      });



    const handleAdd = handleValidation((data) => {
      console.log("Form Data:", data);
    const formattedEntry = {
      ...data,
      startDate: formatDisplayDate(data.startDate),
      endDate: data.current ? "" : formatDisplayDate(data.endDate),
    };
    onChange([...entries, formattedEntry]);
    reset(); //!     It resets all form fields back to their defaultValues
    setIsAdding(false);
                                      //!     Before adding, entries contains:
                                  //! [
                                  //!   {
                                  //!     title: "Intern",
                                  //!     organization: "Google"
                                  //!   }
                                  //! ]
                                  //! and your new entry is:
                                  //! formattedEntry = {
                                  // !  title: "SDE",
                                  //!   organization: "Multicoreware"
                                  // !}
                                  //! Then:
                                  // !onChange([...entries, formattedEntry]);
                                  // !becomes:
                                  //! onChange([
                                  // !  {
                                  // !    title: "Intern",
                                  // !    organization: "Google"
                                  // !  },
                                  // !  {
                                  // !    title: "SDE",
                                  // !    organization: "Multicoreware"
                                  // !  }
                                  // !]);
                                  //!     reset();
                                  //!     setIsAdding(false);
                                  //!   });
  });





  const handleDelete = (index) => { //!Here index refers to the field index that user wants to delete in.

//!      {entries.map((entry, index) => (
//!     <Button onClick={() => handleDelete(index)}>
// !    Delete
// !    </Button>
//!     ))}


//! creates a new array containing only the elements that satisfy a condition.
//! filter checks from 0 to length of entries like 0!=2 1!=2   2=2--> we will leave this entry as it's not satisfying condition....
const newEntries = entries.filter((_, i) => i !== index);
    onChange(newEntries);  //! Update the entries after leaving the entries which has not satisfied the filter condition
  };

      const {
        loading:isImproving,
        fn:improveWithAIFn,
        data:improvedContent,
        error:improveError,
      } = useFetch(improveWithAI)

      useEffect(()=>{
        //! If we have clicked on improve with AI Button 
        //! then it will overwrite or change the description 
        if(improvedContent && !isImproving){
            setValue("description",improvedContent)
            toast.success("Description improved successfully! ")
        }
        if(improveError){
            toast.error(improveError.message || "Failed to improve description")
        }
      },[improvedContent,improveError,isImproving])
  

      const  handleImproveDescription =async()=>{
          const description = watch('description');
          if(!description){
            toast.error("Please enter a description first: ")
            return;
          }

          await improveWithAIFn({
            currentdesc:description,
            type:type.toLowerCase(), //experience,education,project
          })

      }

      const current = watch("current");
  return (
    <div className='space-y-4'>

      <div className='space-y-4'>
                {entries.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title} @ {item.organization}
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleDelete(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.current
                  ? `${item.startDate} - Present`
                  : `${item.startDate} - ${item.endDate}`}
              </p>
              <p className="mt-2 text-sm whitespace-pre-wrap">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}


      </div>

        {/* 
        //! If USer clicks on Plus button then isAdding becomes true
        //!Then we will render the following Form  
         */}

        {isAdding &&(
            <Card>
  <CardHeader>
    <CardTitle>Add {type}</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className='space-y-4'>
           <div className='space-y-2'>
            <Input
            placeholder="Title/Position"
            {...register("title")} //!Store the title in the entrySchema...
            error={errors.title}
            />
            {/* 
            //! Displaying Errors with Red ParaGraph
            */}
            {errors.title && (
                <p className='text-sm text-red-500'>
                    {errors.title.message}
                </p>
            )}
            
            </div> 

           <div className='space-y-2'>
            <Input
            placeholder="Organisation/Company"
            {...register("organization")} //!Store the title in the entrySchema...
            error={errors.organization}
            />
            {/* 
            //! Displaying Errors with Red ParaGraph
            */}
            {errors.organization && (
                <p className='text-sm text-red-500'>
                    {errors.organization.message}
                </p>
            )}
            
            </div> 
    </div>
    <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
            <Input
            type="month"
            {...register("startDate")}
            error={errors.startDate}
            />
            
            {errors.startDate && (
                <p className='text-sm text-red-500'>
                    {errors.startDate.message}
                </p>
            )}
        </div>

        <div className='space-y-2'>
            <Input
            type="month"
            {...register("endDate")}
            disabled={current}
            //!When we selected Current then EndDate WIll be disabled
            error={errors.endDate}
            />

            {errors.endDate && (
                <p className='text-sm text-red-500'>
                    {errors.endDate.message}
                </p>
            )}
        </div>
    </div>

    <div className='flex items-center space-x-2'>
        <input
        type='checkbox'
        id='current'
        {...register("current")}
        onChange={(e)=>{
            //! setValue comes from the useForm hook by React
            setValue("current",e.target.checked);
            //!Tracks Whether CheckBox is ticked
            if(e.target.checked){
                //!If current named checkbox is ticked set endDate Nill 
                setValue("endDate","");
            }
        }}
        />
        <label htmlFor='current'>Current {type}</label>
    </div>

    <div className='space-y-2'>
            <Textarea
            placeholder={`Description of your ${type.toLowerCase()}`}
            className={'h-32'}
            {...register("description")}
            error={errors.description}
            />
            
            {errors.description && (
                <p className='text-sm text-red-500'>
                    {errors.description.message}
                </p>
            )}
        </div>


        <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>






  </CardContent>
  <CardFooter className='flex justify-end space-x-2'>
     <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
  </CardFooter>
</Card>
        )}


        {!isAdding && (
            
            <Button
            className={'w-full'}
            variant='outline'
            onClick = {()=>setIsAdding(true)}
            >
                {/* 

//!  User is wants adding a new Experience/Education/Project entry.
//! Then Show a Plus BUtton
*/}
                <PlusCircle className='h-4 w-4 mr-2' />
                Add {type}
            </Button>
        )}


    </div>
  )
}

export default EntryForm