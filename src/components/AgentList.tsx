import { Agent, AgentInfo } from "../@types/agents";

interface Props {
  agentList: Agent[];
  agentView: Agent | undefined;
  handleAgentInfo: (agent: AgentInfo) => void;
  handleAgentAudio: (audio: string) => void;
  handleAgentView: (agent: Agent) => void;
  handleShowAgentInfo: ()=> void;
}

function AgentList({ agentList, agentView, handleAgentAudio,handleAgentView, handleShowAgentInfo, handleAgentInfo}: Props) {
  return (
    <div className="flex flex-wrap gap-[5px] lg:w-[800px] 2xl:w-[1100px] absolute bottom-2">
      {agentList.length > 0 && (
        <>
          {agentList.map((agent) => (
            <div
              onClick={() => {
                handleAgentAudio(agent.voiceLine.mediaList[0].wave);
                handleAgentView(agent);
                handleAgentInfo(agent);
                handleShowAgentInfo();
              }}
              className={`border-solid border-[1px] border-zinc-400 hover:bg-select ${
                agent === agentView ? "bg-select" : ""
              }`}
            >
              <img
                src={agent.displayIcon}
                alt={agent.displayName}
                className="2xl:w-[100px] 2xl:h-[100px] lg:w-[70px] lg:h-[70px] cursor-pointer"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default AgentList;
