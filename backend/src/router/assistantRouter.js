const express = require("express");
const path = require('path')
const multer = require('multer');
const { uploadFiles } = require('../model/assistant/Assistant.model');
const router = express.Router();
const OpenAI = require("openai");

const ASSISTANT_ID = process.env.ASSISTANT_ID

const formatObjectToString = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join(", ");
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.all("/", (req, res, next) => {
  next();
});

router.post('/', async (req, res) => {
  const { userId } = req.body;

  try {
    // Step 1: Create Assistant in OpenAI
    // const assistant = await openai.beta.assistants.create({
    //   name: `Soccer Bot - User ${userId}`,
    //   instructions: "You are a soccer analytics bot. Answer user questions based on uploaded soccer data.",
    //   model: "gpt-4o",
    //   tools: [{ type: "file_search" }],
    // });

    // Step 2: Create a Thread for the Assistant
    const thread = await openai.beta.threads.create();

    // Step 3: Save to MongoDB
    // const newAssistant = new Assistant({
    //   assistantId: assistant.id,
    //   threadId: thread.id
    // });

    const newAssistant = {
      threadId: thread.id
    };

    // await newAssistant.save();
    // return newAssistant;
    res.json({ message: "Assistant Created Successfully", ids: newAssistant });
  } catch (error) {
    console.error("Error creating assistant:", error);
    res.status(500).json({ error: "Error Creating Assistant" });
  }
})

router.post('/create-assistant', async (req, res) => {
  try {
    const assistant = await openai.beta.assistants.create({
      name: `Soccer Bot`,
      instructions: "You are a soccer analytics bot assisting football coaching.",
      model: "gpt-4o",
      // tools: [{ type: "retrieval" }],
    });

    res.json({ message: "Assistant Created Successfully", id: assistant.id });
    //save this assistant id in .env file

  } catch (error) {
    console.error("Assistant Creation Failed:", error.response?.data || error.message);
    res.status(500).send("Assistant Creation Failed");
  }
})

router.get('/get-assistant', async (req, res) => {
  try {
    const assistants = await openai.beta.assistants.list();

    res.json({
      message: "Assistant list fetched successfully",
      assistants: assistants.data,
    });

  } catch (error) {
    console.error("Failed to fetch assistant list:", error.response?.data || error.message);
    res.status(500).send("Failed to fetch assistant list");
  }
});

router.post("/generate-training-plan", async (req, res) => {
  const { drillName, duration, ageGroup, trainingFocus, playerCount, physicalIntensity, trainingStyle, notes, threadId } = req.body;
  if (!threadId) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Invalid request. Thread ID is required.",
      });
  }
  try {

    // const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });.
    const thread = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: `Generate An AI-powered training plan focused on the next training session overview: 
        Drill Name - ${drillName}, Duration: ${duration}, Age Group: ${ageGroup}, Training Focus: ${trainingFocus}, Player Count: ${playerCount}, Physical Intensity: ${physicalIntensity}, Training Style: ${trainingStyle}, Notes: ${notes}`
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: ASSISTANT_ID,
        instructions: "AI Training Plan Generator"
      }
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      console.log("###################################", messages.data[0].content[0].text.value)
      // for (const message of messages.data.reverse()) {
      //   console.log(`${message.role} > ${message.content[0].text.value}`);
      // }
      res.json({ status: "success", message: messages.data[0].content[0].text.value });
    } else {
      console.log(run.status);
    }


    // await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: error.message });
  }
});


router.post("/generate-game-plan-ai", async (req, res) => {

  const { matchDetails, tactics, keyTacticalPrinciples, threadId } = req.body;
  console.log(matchDetails)
  try {

    // const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });.

    const matchDetailsString = formatObjectToString(matchDetails);
    const tacticsString = formatObjectToString(tactics);

    const thread = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: `Generate an AI-powered game plan based on the following details:
    Match Details: ${matchDetailsString},
    Tactics: ${tacticsString},
    Key Tactical Principles: ${keyTacticalPrinciples}.
    The response should be in an object format with the following fields:
    - aiSuggestions: Tactical suggestions for the game.
    - recommendedFormation: Recommended formation based on the tactics.
    - recommendedPlayStyle: Suggested play style based on the tactics.
    - keyTacticalPrinciples: The key tactical principles that should be followed during the match.
    And inside the object, each field should only contain string data, not array or another object
    Do not add any mark down string in the beginning and ending of the response.`
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: ASSISTANT_ID,
      }
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );
      console.log("###################################", messages.data[0].content[0].text.value)
      // for (const message of messages.data.reverse()) {
      //   console.log(`${message.role} > ${message.content[0].text.value}`);
      // }
      res.json({ status: "success", aiResponseData: messages.data[0].content[0].text.value });
    } else {
      console.log(run.status);
    }


    // await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/generate-followup-chat", async (req, res) => {
  const { userQuery, tactics, matchDetails, aiSuggestions, keyTacticalPrinciples, threadId } = req.body;
  if (!userQuery) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Invalid request. Message is required.",
      });
  }
  try {

    // const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });.
    const thread = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: userQuery
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: ASSISTANT_ID,
        instructions: `You are a soccer assistant helping coaches to make a game plan. you will use the following game data as your base. Tactics: ${tactics}, Match Details: ${matchDetails}, AI Suggestions: ${aiSuggestions}, Key Tactical Principles: ${keyTacticalPrinciples} `,
      }
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );

      console.log("###################################", messages.data[0].content[0].text.value)
      // for (const message of messages.data.reverse()) {
      //   console.log(`${message.role} > ${message.content[0].text.value}`);
      // }
      res.json({ status: "success", message: messages.data[0].content[0].text.value });
    } else {
      console.log(run.status);
    }


    // await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/elite-coach-advisor", async (req, res) => {
  const { message, threadId } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Invalid request. Message is required.",
      });
  }
  try {

    // const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });.
    const thread = await openai.beta.threads.messages.create(
      threadId,
      {
        role: "user",
        content: message
      }
    );

    let run = await openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: ASSISTANT_ID,
        instructions: `You are an Elite Coach Assistant with UEFA Pro License expertise.`,
      }
    );

    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );

      console.log("###################################", messages.data[0].content[0].text.value)
      // for (const message of messages.data.reverse()) {
      //   console.log(`${message.role} > ${message.content[0].text.value}`);
      // }
      res.json({ status: "success", message: messages.data[0].content[0].text.value });
    } else {
      console.log(run.status);
    }


    // await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Save user message and get bot response
// router.post('/message', userAuthorization, async (req, res) => {
//     const { chatId, userId, message } = req.body;
//     if (!userId || !message) {
//         return res.status(400).json({ status: "error", message: "Invalid request. User ID and message are required." });
//     }
//     try {
//         const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });
//         const botResponse = await processBotResponse(message);
//         await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });
//         res.json({ status: "success", userMessage, botResponse });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// });

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the upload folder
  },
  filename: (req, file, cb) => {
    // Generate a unique file name while preserving the original extension
    const fileExtension = path.extname(file.originalname); // Extract extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique identifier
    cb(null, uniqueSuffix + fileExtension); // Combine unique identifier and extension
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files', 10), async (req, res) => { // Allow up to 10 files
  try {
    const { threadId, assistantId } = req.body;
    console.log(threadId)
    const files = req.files; // Array of uploaded files


    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedFiles = await uploadFiles(assistantId, threadId, files);
    res.json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
});

module.exports = router;

