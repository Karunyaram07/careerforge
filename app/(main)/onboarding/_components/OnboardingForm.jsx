    "use client"
import { updateUser } from '@/actions/user'
import { useFetch } from '@/app/hooks/useFetch'
    import { onboardingSchema } from '@/app/lib/schema'
import { Button } from '@/components/ui/button'
    import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
    import { Label } from '@/components/ui/label'
    import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
    import { zodResolver } from '@hookform/resolvers/zod'
    import { useRouter } from 'next/navigation'
    import React, { useEffect, useState } from 'react'
    import { useForm } from 'react-hook-form'
    import { toast } from "sonner";

import { Loader2 } from 'lucide-react'
    const OnboardingForm = ({industries}) => {
        const [selectedIndustry,setSelectedIndustry]=useState(null);
        const router=useRouter()
        const onSubmit =async(values)=>{
            try {
                const formattedIndustry =`${values.industry}-${values.subIndustry.toLowerCase().replace(/ /g, "-")}`;
                await updateUserFn({...values,
                    industry:formattedIndustry,
                });
                
            } catch (error) {
                console.error("Onboarding error: ",error);
            };


                //?values is the object coming from React Hook Form:

                /* ?{
                ? industry: "software",
                ? subIndustry: "web-development",
                ? experience: "2",
                 ?skills: "React, Next.js",
                 ?bio: "Frontend Developer"
                ? } */
            
            console.log(values);
        }
        const {data:updatedData,
            fn:updateUserFn,
            loading:updateLoading,
        
        }=useFetch(updateUser)
        const{
            register,
            handleSubmit,
            formState:{errors},
            setValue,
            watch,
        
        }=useForm({
            resolver:zodResolver(onboardingSchema)});
        const watchIndustry=watch("industry")   // If industry is selcted only it has to show Specialisation field so take a watch on industry 
        // by using watch param by useForm 

        useEffect(()=>{
            if(updatedData?.success && !updateLoading){
                toast.success("Profile Updated Successfully")
                router.push('/dashboard')
                router.refresh();
                
            }

        },[updatedData,updateLoading])





    return (
        <div className='flex items-center justify-center bg-background'>
            <Card className={'w-full max-w-lg mt-10 mx-2 mb-10'}>
    <CardHeader>
        <CardTitle className={"gradient-title text-4xl"}>Complete Your Profile</CardTitle>
        <CardDescription>
            Select your industry to
            get personalized career insights and recommendations
        </CardDescription>
    </CardHeader>
    <CardContent>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>   

            {/*
            //!Handle Submit contains all the field values as handleSubmit is provided by the React-Hook-Forms..
             Internally it have the code to collect all of the fields. Now we will 
             //*1.take a function and take the collected values in that via values
             //*2.And sending them as a parameter to updateUser Server Action then that action will update our database...}}
            
            */}
            
            <div className='space-y-2'>
                <Label htmlFor='industry'>Industry</Label>

            <Select
            onValueChange={(value)=>{
                setValue("industry",value);
                setSelectedIndustry(
                    industries.find((ind)=>ind.id===value)
                );
                setValue("subIndustry"," ")
            }}
            
            >
    <SelectTrigger id="industry">
        <SelectValue placeholder="Select and Industry" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
        {industries.map((ind)=>(
            <SelectItem value={ind.id} key={ind.id}>
                {ind.name}
            </SelectItem>
        ))}
        </SelectGroup>
    </SelectContent>
    </Select>
    {errors.industry &&(<p className='text-sm text-red-500'>
        {errors.industry.message}

    </p>)}
            </div>
            
            { watchIndustry &&(
            <div className='space-y-2'>
                <Label htmlFor='subIndustry'>Specialization</Label>

            <Select
            onValueChange={(value)=>{
                
                setValue("subIndustry",value)
            }}
            
            >
    <SelectTrigger id="subIndustry">
        <SelectValue placeholder="Select an SubIndustry" />
    </SelectTrigger>
    <SelectContent>
        <SelectGroup>
        {selectedIndustry?.subIndustries.map((ind)=>(
            <SelectItem value={ind} key={ind}>
                {ind}
            </SelectItem>
        ))}
        </SelectGroup>
    </SelectContent>
    </Select>
    {errors.subIndustry&&(<p className='text-sm text-red-500'>
        {errors.subIndustry.message}

    </p>)}
            </div>)
    }

    <div className='space-y-2'>
                <Label htmlFor='experience'>Years of Experience</Label>
                <Input
                id='experience'
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
                
                />

                


           
    {errors.experience &&(<p className='text-sm text-red-500'>
        {errors.experience.message}

    </p>)}
            </div>


    















  <div className='space-y-2'>
                <Label htmlFor='skills'>Skills</Label>
                <Input
                id='skills'
                placeholder="e.g., Python, JavaScript, Project Management"
                {...register("skills")}
                
                />
                <p className='text-sm text-muted-foregrounded'>
                    Separate multiple skills with commas
                    </p>
                


           
    {errors.skills&&(<p className='text-sm text-red-500'>
        {errors.skills.message}

    </p>)}
            </div>

  <div className='space-y-2'>
                <Label htmlFor='skills'>Professional Bio</Label>
                <Textarea
                id='bio'
                className={"h-32"}
                placeholder="Tell us about your Professional Background"
                {...register("bio")}
                
                />


                {/* 

// * register()
// * "React Hook Form, please track this field and store its value."

// * handleSubmit()
// * "Collect all registered field values,
// * validate them using the resolver (e.g., Zod),
// * and pass the final validated object to onSubmit()."

// ! Because React Hook Form manages form state internally,
// ! we don't need separate useState() hooks for every field.

// ? Instead of this: we have to do like this but * React Hook Form automatically tracks and updates these values.
// const [industry, setIndustry] = useState("");
// const [skills, setSkills] = useState("");
// const [bio, setBio] = useState("");


*/}
        
               
                


           
    {errors.bio&&(<p className='text-sm text-red-500'>
        {errors.bio.message}

    </p>)}
            </div>






        <Button type='submit' className={'w-full'} disabled={updateLoading}>
        {updateLoading ? (<>
            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
            Saving..</>):("Complete Profile")}
            Complete Profile
        </Button>

    

        </form>
    </CardContent>
    </Card> 

        </div>
    )
    }

    export default OnboardingForm







