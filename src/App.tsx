import { useEffect, useState } from "react";
import { Agent, AgentInfo, AgentAbility } from "./@types/agents";
import AgentInfoSelect from "./components/AgentInfoSelect";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { getListAgents } from "./services/api";

function App() {
  const [listAgents, setListAgents] = useState<Agent[]>([]);
  const [agentView, setAgentView] = useState<Agent>();
  const [agentInfo, setAgentInfo] = useState<AgentInfo>();
  const [agentAbility, setAgentAbility] = useState<AgentAbility>();
  const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false);
  const [showAgentAbility, setShowAgentAbility] = useState<boolean>(false);

  const { setVoice } = useVoiceAgent();

  const getAgents = async () => {
    const { data } = await getListAgents();
    setListAgents(data.data);
  };

  const playVoiceAgent = (audio: string) => {
    setVoice(audio);
  };

  const handleShowAgentInfo = () => {
    setShowAgentInfo(true);
    setShowAgentAbility(false);
  };

  const handleShowAgentAbility = () => {
    setShowAgentInfo(false);
    setShowAgentAbility(true);
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <main
      className={`relative flex flex-col items-center ${
        agentView ? "justify-between" : "justify-end"
      } h-[98vh] overflow-hidden `}
    >
      {agentView && (
        <div>
          <img
            src={agentView.bustPortrait}
            alt={agentView.displayName}
            className=" w-[600px] h-[100%] mt-[30px]"
          />

          <div className="absolute left-[75%] top-[10%] bg-[#000] w-[300px]">
            <div className="flex flex-col">
              <span className="text-[18px] text-white font-codePro uppercase bold ">
                {agentView.role.displayName}
              </span>
              <span className="text-[50px] text-[#ebedb2] font-anton uppercase ">
                {agentView.displayName}
              </span>
            </div>
            <div className='flex flex-col'>
              <div className="flex gap-[16px]">
                <div
                  onClick={() => {
                    handleShowAgentInfo();
                    setAgentInfo(agentView);
                  }}
                >
                  <img
                    src={agentView.role.displayIcon}
                    alt=""
                    className="w-[40px] h=[40px]"
                  />
                </div>
                {agentView.abilities.map(
                  (ability) =>
                    ability.displayIcon && (
                      <div
                        onClick={() => {
                          handleShowAgentAbility();
                          setAgentAbility(ability);
                        }}
                      >
                        <img
                          src={ability.displayIcon}
                          alt={ability.displayName}
                          className="w-[40px] h=[40px]"
                        />
                      </div>
                    )
                )}
              </div>
              <AgentInfoSelect agentAbility={agentAbility} agentInfo={agentInfo} showAbility={showAgentAbility} showInfo={showAgentInfo}/>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-[10px] w-[1100px]">
        {listAgents.length > 0 && (
          <>
            {listAgents.map((agent) => (
              <div
                onClick={() => {
                  playVoiceAgent(agent.voiceLine.mediaList[0].wave);
                  setAgentView(agent);
                  setAgentInfo(agent);
                  handleShowAgentInfo();
                }}
              >
                <img
                  src={agent.displayIcon}
                  alt={agent.displayName}
                  className="w-[100px] h=[100px]"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}

export default App;
