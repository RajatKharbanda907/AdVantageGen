const { text } = require("express");
const {OpenAI} = require("openai")
const fs = require("fs")
const {InferenceClient} = require("@huggingface/inference");
const sharp = require("sharp")
const multer = require("multer")


const path = require("path");


// go back from controllers → backend → uploads
const filePath = path.join(__dirname, `../uploads/${Date.now()}.png`);
let logopath;
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,"./uploads")
    },
    filename: function(req,file,cb){
        return cb(null,`uploadedfile${Date.now()}-${file.originalname}`)
    }
})
const upload = multer({storage})


const uploadlogo =async (req,res)=>{  
  if(!req.file){
    res.status(400).json({
        success:true,
        message:"error occur in  uploading",
        
    })


  }
  logopath=req.file.path;
  if(!logopath){
    res.status(400).json({
        success:false,
        message:"logo is not uploaded"
    })
  }
  console.log(logopath)
  res.status(200).json({
    success:true,
    message:"logo uploaded successfully",
    imagepath:logopath
  })

}


const generateimage = async (req,res)=>{

    const userprompt = req.body.prompt;
    if(!userprompt){
        return res.status(400).json({
            success:false,
            message:"please enter the prompt"
        })
    }
    const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HF_TOKEN,
   });
   
   const chatCompletion = await client.chat.completions.create({
	model: "Qwen/Qwen3.5-35B-A3B:novita",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: `You are a professional AI prompt engineer
Generate detailed, vivid, cinematic prompts optimized for SDXL.
Include lighting, composition, camera angle, and style.
Return only the prompt.`
                },{
                    type:"text",
                    text:userprompt
                }
               
            ],
        },
    ],
});

const  optimizedprompt  = chatCompletion.choices[0].message.content;

const imageclient = new InferenceClient(process.env.HF_TOKEN);

const image = await imageclient.textToImage({
    provider: "nscale",
    model: "stabilityai/stable-diffusion-xl-base-1.0",
	inputs: optimizedprompt,
	parameters: { num_inference_steps: 5 },
});
console.log(image)
 const buffer=Buffer.from(await image.arrayBuffer());



const logo=await sharp(logopath).resize(100).toBuffer();
const outputpath = path.join(__dirname,`../uploads/${Date.now()}-output.png`)
await sharp(buffer).composite([
    {
        input:logo,
        gravity:"southeast",
        blend:"over",
        opacity:0.5
    }
]).toFile(outputpath)
   //fs.writeFileSync(filePath,buffer)



const chatCompletion1 = await client.chat.completions.create({
	model: "Qwen/Qwen3.5-35B-A3B:novita",
    messages: [
        {
            role: "system",
            content: [
                {
                    type: "text",
                    text: "You are an expert social media strategist who generates viral captions and hashtags in JSON format."
                },{
                    type:"text",
                    text:` 
          Topic: ${optimizedprompt}
        Platform: Instagram

         Return ONLY JSON:
      {
         "caption": "string",
         "hashtags": ["tag1", "tag2", "tag3"]
        }`
                }
               
            ],
        },
    ],
});
console.log(optimizedprompt)


const  captionsandhastag  = chatCompletion1.choices[0].message.content;
const parsed= JSON.parse(captionsandhastag)
const captions= parsed.caption
const hastags= parsed.hastags
res.status(200).json({
    success:true,
    message:"successfully image genrated",
    image: outputpath,
   captionsandhastag:captionsandhastag,
    caption: captions,
    hastag: hastags
})





  
}

module.exports = { generateimage,uploadlogo,upload};