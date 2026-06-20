"use server";

import { industries } from "@/data/industries";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { select } from "framer-motion/client";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data){
    //!Check for userId of Clerk in prisma
    const {userId}=await auth();
    if(!userId){
        throw new Error("User Not Authorised")
    }
    const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    });

    if(!user){
        throw new Error("User Not Found");
    }

    try {

        const result = await prisma.$transaction(
            
        // If the user has industry insights just return them
        //If the user does not have industry insights, then fill with default values later replace by the AI
        //Update the User Table
            async(tx)=>{
                let industryInsight = await tx.industryInsight.findUnique({
                    where:{
                        industry:data.industry
                    },
                }); //From the Onboarding form searching the user wuth the particular industry
             // If industry doesn't exist, create it with default values
            if (!industryInsight){
                // industryInsight=await tx.industryInsight.create({
                //     data:{
                //         industry:data.industry,
                //         salaryRanges:[],//default
                //         growthRate:0,
                //         demandLevel:"MEDIUM",
                //         topSkills:[],
                //         marketOutlook:"NEUTRAL",
                //         keyTrends:[],
                //         recommendedSkills:[],
                //         nextUpdate:new Date(Date.now()+7*24*60*60*1000),//1 week from now
                //     },
                // });

        //!create insights using GEMINI AI if user have no industry insights
                            
                            const insights=await generateAIInsights(data.industry)
                            //! Saving the AI Genearted Response to the Database
                            industryInsight = await tx.industryInsight.create({
                                data:{
                                    industry:data.industry,
                                    ...insights,
                                    nextUpdate:new Date(Date.now()+7*24*60*60*1000),
                                },
                            } 
                        );
        
        
            }

            //Update the User Table
            const updatedUser=await tx.user.update({
                where:{
                    id:user.id
                },
                data:{
                    industry:data.industry,
                    experience:data.experience,
                    bio:data.bio,
                    skills:data.skills,
                }
            });

            return {updatedUser,industryInsight};
            }
            ,{timeout:300000}
            
        );
        return {success:true,...result}
        
    } catch (error) {
        console.error("Failed to update user and industry",error.message);
        throw new Error("Failed to update user profile");
        
    }


} 



export async function getUserOnboardingStatus(){
    //Check for userId of Clerk in prisma
    const {userId}=await auth();
    if(!userId){
        throw new Error("User Not Authorised")
    }
    const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    });

    if(!user){
        throw new Error("User Not Found");
    }
    try {
        const user = await prisma.user.findUnique({
            where:{
                clerkUserId:userId
            },
            select:{
                industry:true,
            },
        })

        return {
            isOnboarded: !!user?.industry,
        }
        
    } catch (error) {
        console.error("Failed to fetch onboarding status",error.message);
        throw new Error("Failed to fetch onboarding status"+error.message);
        
        
    }

}