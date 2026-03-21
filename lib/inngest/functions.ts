import { sendWelcomeEmail } from "../nodemailer";
import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const sendSignUpEmail = inngest.createFunction(
    {
        id : 'sign-up-email',
        triggers : [{event : 'app/user.created'}],
    },
    async ({event , step})=>{
        const userProfile = `
            - Country : ${event.data.country}
            - InvestmentGoal : ${event.data.investmentGoal}
            - RiskTolerance : ${event.data.riskTolerance}
            - PreferredIndustry : ${event.data.preferredIndustry}
        `
        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro',{
            model: step.ai.models.gemini({model : 'gemini-2.5-flash-lite'}),
            body:{
                contents:[{
                    role:'user',
                    parts:[
                        {text:prompt}
                    ]
                }]
            }
        })

        await step.run('send-welcome-email',async()=>{
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text:null) || 'Thanks for joining stocksense , now you have the tools to command the market at your fingertips'

            const {data:{email,name}} = event;
            return await sendWelcomeEmail({email,name,intro:introText})
            
        })

        return {
            succes:true,
            message : 'Welcome email sent successfully'
        }
    }
)