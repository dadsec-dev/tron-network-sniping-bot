import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";

async function createSearchAgent() {
  const tools = [new TavilySearchResults({ maxResults: 3 })];
  const prompt = await pull("hwchase17/openai-functions-agent");
  const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo-1106",
    temperature: 0.7,
  });

  const agent = await createOpenAIFunctionsAgent({
    llm,
    tools,
    prompt,
  });

  return new AgentExecutor({
    agent,
    tools,
  });
}

async function searchWeb(query) {
  const agent = await createSearchAgent();
  const result = await agent.invoke({
    input: query,
  });
  return result.output;
}

module.exports = { searchWeb };

// searchWeb("What is the latest news about AI?").then(console.log);