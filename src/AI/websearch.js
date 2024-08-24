//@TODO: Implement a web search AI AGENT that can search the web for information on a given token
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { pull } from "langchain/hub";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";

module.exports = async function runAgent(input) {

  const tools = [new TavilySearchResults({ maxResults: 1 })];
  const prompt = await pull("hwchase17/openai-functions-agent");
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo-1106",
    temperature: 0,
  });

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools,
  });

  const result = await agentExecutor.invoke({
    // input: "what is the weather in wailea?",
    input: input,
  });

  console.log(result);

}

runAgent(input);